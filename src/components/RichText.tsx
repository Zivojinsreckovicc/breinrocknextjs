import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-relaxed text-steel-neutral/80">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-bold tracking-tight text-arctic-white sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl font-bold tracking-tight text-arctic-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 text-lg font-semibold text-arctic-white">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-action-blue pl-5 text-lg italic text-arctic-white/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-base text-steel-neutral/80 marker:text-action-blue">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-base text-steel-neutral/80 marker:text-action-blue">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-arctic-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-action-blue">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const blank = value?.blank;
      return (
        <a
          href={value?.href}
          {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-action-blue underline underline-offset-2 transition-colors hover:text-arctic-white"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const source = value as SanityImageSource & { alt?: string; caption?: string };
      return (
        <figure className="mt-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-arctic-white/10">
            <Image
              src={urlForImage(source).width(1400).height(788).fit("crop").auto("format").url()}
              alt={source.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {source.caption && (
            <figcaption className="mt-2 text-center text-sm text-steel-neutral/50">
              {source.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
