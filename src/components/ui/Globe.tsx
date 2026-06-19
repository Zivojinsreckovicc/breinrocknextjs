"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/cn";

export type GlobeMarker = {
  /** [latitude, longitude] */
  location: [number, number];
  size: number;
};

export type GlobeArc = {
  /** [latitude, longitude] */
  from: [number, number];
  /** [latitude, longitude] */
  to: [number, number];
};

type GlobeProps = {
  markers: GlobeMarker[];
  /** Great-circle arcs connecting locations. */
  arcs?: GlobeArc[];
  /** [latitude, longitude] to spin the globe toward; null resumes auto-spin. */
  focus?: [number, number] | null;
  className?: string;
};

const GLOBE_RADIUS = 1.5;
/** Latitude bands sampled when scattering the land dots. */
const DOT_ROWS = 80;
/** Working resolution the land mask is sampled at. */
const SAMPLE_SIZE = 256;
/** Equirectangular world map — blue land on a white/transparent ocean. */
const LAND_MASK = "/imgs/world-blue.webp";
/** Brand accent used for pins, pulses and arcs. */
const ACCENT = "#3e74d6";
/** Solid ocean fill — matches midnight-frame (rgb 12, 13, 41). */
const OCEAN = "#0c0d29";
/** Resting forward tilt so the globe is viewed slightly from above. */
const DEFAULT_TILT = 0.38;
const TWO_PI = Math.PI * 2;

/** Equirectangular lat/long → a point on a sphere of the given radius. */
function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Scatters dots across the landmasses by sampling the world map: a pixel is
 * land when blue clearly dominates red (the map paints land blue, ocean white).
 */
function sampleLandDots(image: HTMLImageElement): Float32Array {
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE / 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new Float32Array();
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const verts: number[] = [];
  for (let row = 0; row < DOT_ROWS; row++) {
    const lat = 90 - (row / DOT_ROWS) * 180;
    const phi = (row / DOT_ROWS) * Math.PI;
    // Fewer dots near the poles so spacing stays even across the sphere.
    const cols = Math.max(6, Math.floor(DOT_ROWS * 2 * Math.sin(phi)));

    for (let col = 0; col < cols; col++) {
      const lng = (col / cols) * 360 - 180;
      const px = Math.floor(((lng + 180) / 360) * canvas.width);
      const py = Math.floor(((90 - lat) / 180) * canvas.height);
      const idx = (py * canvas.width + px) * 4;
      const isLand = data[idx + 2] - data[idx] > 25;

      if (isLand) {
        const v = latLngToVec3(lat, lng, GLOBE_RADIUS);
        verts.push(v.x, v.y, v.z);
      }
    }
  }
  return new Float32Array(verts);
}

/**
 * On-brand WebGL globe (three.js). Dotted landmasses sit on a slightly
 * translucent midnight ocean sphere ringed by a faint atmosphere, with pulsing pins and arcs marking the
 * offices. It auto-rotates, and eases toward a focused location when `focus`
 * is set (hover a city to spin the globe to it). Auto-spin is paused under
 * `prefers-reduced-motion`; focus still works.
 */
export function Globe({ markers, arcs = [], focus, className }: GlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<[number, number] | null>(null);

  // Keep the focus target in a ref so the render loop sees the latest value.
  useEffect(() => {
    focusRef.current = focus ?? null;
  }, [focus]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return; // No WebGL support — leave the container empty.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 1s ease";
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const group = new THREE.Group();
    scene.add(group);

    const disposables: { dispose(): void }[] = [];
    const track = <T extends { dispose(): void }>(o: T): T => {
      disposables.push(o);
      return o;
    };

    // — Ocean body (midnight-frame) behind the land dots —
    group.add(
      new THREE.Mesh(
        track(new THREE.SphereGeometry(GLOBE_RADIUS * 0.997, 40, 40)),
        track(
          new THREE.MeshBasicMaterial({
            color: OCEAN,
            transparent: true,
            opacity: 0.8,
          })
        )
      )
    );

    // — Atmosphere rim glow —
    group.add(
      new THREE.Mesh(
        track(new THREE.SphereGeometry(GLOBE_RADIUS * 0.998, 40, 40)),
        track(
          new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {},
            vertexShader: `
              varying vec3 vNormal;
              void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying vec3 vNormal;
              void main() {
                float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
                float edge = smoothstep(0.55, 1.0, rim);
                gl_FragColor = vec4(0.24, 0.46, 0.84, edge * 0.25);
              }
            `,
          })
        )
      )
    );

    // — Land dots (added once the mask image has loaded & been sampled) —
    const dotMat = track(
      new THREE.PointsMaterial({
        color: "#ffffff",
        size: 0.028,
        sizeAttenuation: true,
        opacity: 1,
        depthWrite: true,
      })
    );
    let disposed = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (disposed) return;
      const geo = track(new THREE.BufferGeometry());
      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(sampleLandDots(img), 3)
      );
      group.add(new THREE.Points(geo, dotMat));
    };
    img.src = LAND_MASK;

    // — Arcs between locations —
    const arcMat = track(
      new THREE.LineBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: 0.55,
      })
    );
    arcs.forEach(({ from, to }) => {
      const a = latLngToVec3(from[0], from[1], GLOBE_RADIUS * 1.004);
      const b = latLngToVec3(to[0], to[1], GLOBE_RADIUS * 1.004);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(GLOBE_RADIUS + a.distanceTo(b) * 0.6);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      group.add(
        new THREE.Line(
          track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(32))),
          arcMat
        )
      );
    });

    // — Office pins: a dot, a static ring, and an animated pulse ring —
    const pinGeo = track(new THREE.SphereGeometry(0.014, 10, 10));
    const ringGeo = track(new THREE.RingGeometry(0.028, 0.035, 28));
    const pulseGeo = track(new THREE.RingGeometry(0.015, 0.02, 28));
    const pinMat = track(new THREE.MeshBasicMaterial({ color: ACCENT }));
    const ringMat = track(
      new THREE.MeshBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
      })
    );
    const pulses: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial }[] = [];
    const upZ = new THREE.Vector3(0, 0, 1);

    markers.forEach((marker) => {
      const [lat, lng] = marker.location;
      const normal = latLngToVec3(lat, lng, 1).normalize();
      const orient = new THREE.Quaternion().setFromUnitVectors(upZ, normal);

      const pin = new THREE.Group();
      pin.position.copy(latLngToVec3(lat, lng, GLOBE_RADIUS * 1.004));
      pin.scale.setScalar(marker.size / 0.04);

      pin.add(new THREE.Mesh(pinGeo, pinMat));

      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.quaternion.copy(orient);
      pin.add(ring);

      const pulseMat = track(
        new THREE.MeshBasicMaterial({
          color: ACCENT,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
        })
      );
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.quaternion.copy(orient);
      pin.add(pulse);
      pulses.push({ mesh: pulse, mat: pulseMat });

      group.add(pin);
    });

    // — Rotation state. We compose Rx(tilt) · Ry(spin) as quaternions so the
    //   north pole stays up (no roll) when easing toward a focused point. —
    let rotY = 0;
    let rotX = DEFAULT_TILT;
    const qX = new THREE.Quaternion();
    const qY = new THREE.Quaternion();
    const axisX = new THREE.Vector3(1, 0, 0);
    const axisY = new THREE.Vector3(0, 1, 0);

    // — Pause the loop while the globe is scrolled off-screen —
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const resize = () => {
      const w = Math.max(1, mount.clientWidth);
      renderer.setSize(w, w, false); // square draw buffer
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let revealed = false;
    let raf = requestAnimationFrame(function render() {
      raf = requestAnimationFrame(render);
      const delta = clock.getDelta();
      if (!visible) return;

      const target = focusRef.current;
      if (target) {
        // Bring the focused office to the front (facing the camera).
        const p = latLngToVec3(target[0], target[1], 1);
        const rotYTarget = Math.atan2(-p.x, p.z);
        const rotXTarget = Math.atan2(p.y, Math.hypot(p.x, p.z));
        // Shortest-path ease for the longitude spin.
        const d =
          ((rotYTarget - rotY + Math.PI) % TWO_PI + TWO_PI) % TWO_PI - Math.PI;
        rotY += d * 0.08;
        rotX += (rotXTarget - rotX) * 0.08;
      } else {
        if (!reduceMotion) rotY += delta * 0.12;
        rotX += (DEFAULT_TILT - rotX) * 0.05;
      }

      qY.setFromAxisAngle(axisY, rotY);
      qX.setFromAxisAngle(axisX, rotX);
      group.quaternion.copy(qX).multiply(qY);

      const t = clock.elapsedTime;
      pulses.forEach(({ mesh, mat }, i) => {
        const progress = ((t + i * 0.8) % 2) / 2;
        const scale = 1 + progress * 3;
        mesh.scale.set(scale, scale, 1);
        mat.opacity = 0.5 * (1 - progress);
      });

      renderer.render(scene, camera);

      if (!revealed) {
        revealed = true;
        canvas.style.opacity = "0.95";
      }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      canvas.remove();
    };
  }, [markers, arcs]);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Interactive globe showing Breinrock office locations"
      className={cn(
        "relative aspect-square w-full [contain:layout_paint_size]",
        className
      )}
    />
  );
}
