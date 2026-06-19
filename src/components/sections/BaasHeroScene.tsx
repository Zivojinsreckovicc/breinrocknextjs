"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Interactive particle word "BAAS": the letters are sampled from an offscreen
 * canvas into a three.js point cloud that dissolves (scatters + fades) on hover
 * and reassembles on leave, with a subtle pointer parallax. three is
 * dynamically imported (out of the main bundle / SSR), the pixel ratio is
 * capped, the loop pauses when offscreen, and motion is disabled (static word)
 * under prefers-reduced-motion.
 */
export function BaasHeroScene({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;
    let cleanup = () => {};

    (async () => {
      let three: typeof import("three");
      try {
        three = await import("three");
      } catch {
        return;
      }
      const parent = canvas.parentElement;
      if (!mounted || !parent) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let width = parent.clientWidth;
      let height = parent.clientHeight;

      // --- Sample the word "BAAS" from an offscreen canvas -------------------
      const FW = 400;
      const FH = 150;
      const off = document.createElement("canvas");
      off.width = FW;
      off.height = FH;
      const ctx = off.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#fff";
      ctx.font = "900 110px Arial, Helvetica, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("BAAS", FW / 2, FH / 2 + 4);
      const pixels = ctx.getImageData(0, 0, FW, FH).data;

      const SCALE_X = 4.6;
      const SCALE_Y = SCALE_X * (FH / FW);
      const step = 2;
      const homeArr: number[] = [];
      const dirArr: number[] = [];
      const seedArr: number[] = [];
      for (let y = 0; y < FH; y += step) {
        for (let x = 0; x < FW; x += step) {
          if (pixels[(y * FW + x) * 4 + 3] > 128) {
            homeArr.push(
              ((x - FW / 2) / FW) * SCALE_X,
              (-(y - FH / 2) / FH) * SCALE_Y,
              (Math.random() - 0.5) * 0.06
            );
            dirArr.push(
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 1.2
            );
            seedArr.push(Math.random());
          }
        }
      }
      const count = seedArr.length;
      if (count === 0) return;

      const home = new Float32Array(homeArr);
      const dirs = new Float32Array(dirArr);
      const seeds = new Float32Array(seedArr);
      const current = new Float32Array(home);
      const colors = new Float32Array(count * 3).fill(1);

      // --- Scene -----------------------------------------------------------
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new three.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);

      const scene = new three.Scene();
      const camera = new three.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 4.4;

      const geometry = new three.BufferGeometry();
      geometry.setAttribute("position", new three.BufferAttribute(current, 3));
      geometry.setAttribute("color", new three.BufferAttribute(colors, 3));
      const material = new three.PointsMaterial({
        color: 0x4f8ff0,
        size: 0.06,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: three.AdditiveBlending,
      });
      const cloud = new three.Points(geometry, material);
      const group = new three.Group();
      group.add(cloud);
      scene.add(group);

      // --- Interaction state ----------------------------------------------
      // `hover` fades the effect in/out; the dissolve itself is local to the
      // pointer — only particles within RADIUS of the cursor scatter + fade.
      let hover = 0;
      let targetHover = 0;
      const tilt = { x: 0, y: 0 };
      const targetTilt = { x: 0, y: 0 };
      const spread = 0.5; // how far the affected particles scatter
      const RADIUS = 0.5; // size of the dissolved patch around the cursor (world units)
      const pointerWorld = { x: 0, y: 0 };
      const ndc = new three.Vector3();

      // Project a pointer event onto the z=0 plane the word lives on.
      const setPointerFromEvent = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
        ndc.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize();
        const dist = -camera.position.z / ndc.z;
        pointerWorld.x = camera.position.x + ndc.x * dist;
        pointerWorld.y = camera.position.y + ndc.y * dist;
      };

      const renderFrame = () => renderer.render(scene, camera);

      const updateParticles = () => {
        const inv = 1 / RADIUS;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          let f = 0;
          if (hover > 0.001) {
            const dx = home[i3] - pointerWorld.x;
            const dy = home[i3 + 1] - pointerWorld.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            // Jitter the edge per particle so the patch dissolves organically.
            const influence = 1 - d * inv * (0.85 + seeds[i] * 0.3);
            if (influence > 0) f = influence * influence * hover;
          }
          current[i3] = home[i3] + dirs[i3] * spread * f;
          current[i3 + 1] = home[i3 + 1] + dirs[i3 + 1] * spread * f;
          current[i3 + 2] = home[i3 + 2] + dirs[i3 + 2] * spread * f;
          const b = 1 - f; // fade scattered particles toward invisible (additive)
          colors[i3] = b;
          colors[i3 + 1] = b;
          colors[i3 + 2] = b;
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
      };

      let raf = 0;
      let running = false;
      const animate = () => {
        if (!mounted) return;
        hover += (targetHover - hover) * 0.12;
        tilt.x += (targetTilt.x - tilt.x) * 0.05;
        tilt.y += (targetTilt.y - tilt.y) * 0.05;
        if (hover > 0.001 || Math.abs(targetHover - hover) > 0.001) {
          updateParticles();
        }
        group.rotation.x = tilt.x;
        group.rotation.y = tilt.y;
        renderFrame();
        raf = requestAnimationFrame(animate);
      };
      const start = () => {
        if (running || reduceMotion) return;
        running = true;
        raf = requestAnimationFrame(animate);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      // --- Pointer (motion users only) ------------------------------------
      const onPointerEnter = (e: PointerEvent) => {
        setPointerFromEvent(e);
        targetHover = 1;
      };
      const onPointerLeave = () => {
        targetHover = 0;
        targetTilt.x = 0;
        targetTilt.y = 0;
      };
      const onPointerMove = (e: PointerEvent) => {
        setPointerFromEvent(e);
        const r = canvas.getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width) * 2 - 1;
        const py = ((e.clientY - r.top) / r.height) * 2 - 1;
        targetTilt.x = py * 0.18;
        targetTilt.y = px * 0.25;
      };

      if (!reduceMotion) {
        canvas.style.cursor = "pointer";
        canvas.style.touchAction = "none";
        canvas.addEventListener("pointerenter", onPointerEnter);
        canvas.addEventListener("pointerleave", onPointerLeave);
        canvas.addEventListener("pointermove", onPointerMove);
      }

      const onResize = () => {
        width = parent.clientWidth;
        height = parent.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        if (reduceMotion) renderFrame();
      };
      window.addEventListener("resize", onResize);

      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
        { threshold: 0 }
      );
      observer.observe(canvas);

      renderFrame(); // initial / reduced-motion static word

      cleanup = () => {
        stop();
        observer.disconnect();
        window.removeEventListener("resize", onResize);
        canvas.removeEventListener("pointerenter", onPointerEnter);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        canvas.removeEventListener("pointermove", onPointerMove);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
      if (!mounted) cleanup();
    })();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} aria-label="BAAS" role="img" className={cn("size-full", className)} />;
}
