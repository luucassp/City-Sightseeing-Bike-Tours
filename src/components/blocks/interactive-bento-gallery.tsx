"use client";

import { useEffect, useState } from "react";

export interface MediaItem {
  id: number | string;
  type: "image" | "video";
  title: string;
  desc: string;
  /** Longer text shown in the expanded lightbox view; falls back to `desc`. */
  longDesc?: string;
  url: string;
  /** Tailwind grid span classes controlling this tile's size in the bento grid. */
  span?: string;
}

interface InteractiveBentoGalleryProps {
  mediaItems: MediaItem[];
  title?: string;
  description?: string;
}

export default function InteractiveBentoGallery({
  mediaItems,
  title,
  description,
}: InteractiveBentoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + mediaItems.length) % mediaItems.length));
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : (i + 1) % mediaItems.length));
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, mediaItems.length]);

  const active = openIndex !== null ? mediaItems[openIndex] : null;

  return (
    <div>
      {(title || description) && (
        <div className="mx-auto max-w-2xl px-4 text-center">
          {title && (
            <h2 className="text-3xl font-bold text-brand-dark">{title}</h2>
          )}
          {description && (
            <p className="mt-3 text-gray-600">{description}</p>
          )}
        </div>
      )}

      <div className="mx-auto mt-10 grid max-w-6xl auto-rows-[140px] grid-flow-row-dense grid-cols-2 gap-4 px-4 sm:auto-rows-[160px] md:grid-cols-4">
        {mediaItems.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`group relative overflow-hidden rounded-2xl text-left shadow-sm transition hover:shadow-lg ${
              item.span || "col-span-1 row-span-1"
            }`}
          >
            {item.type === "video" ? (
              <video
                src={item.url}
                muted
                loop
                playsInline
                autoPlay
                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-3 text-white">
              <h3 className="text-sm font-bold sm:text-base">{item.title}</h3>
              <p className="mt-0.5 line-clamp-1 text-xs opacity-80">
                {item.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) =>
                i === null ? i : (i - 1 + mediaItems.length) % mediaItems.length
              );
            }}
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % mediaItems.length));
            }}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:right-6"
          >
            ›
          </button>

          <div
            className="max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {active.type === "video" ? (
              <video
                src={active.url}
                controls
                autoPlay
                className="max-h-[70vh] w-full rounded-xl object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.url}
                alt={active.title}
                className="max-h-[70vh] w-full rounded-xl object-contain"
              />
            )}
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold">{active.title}</h3>
              <p className="mx-auto mt-2 max-w-xl text-white/80">
                {active.longDesc || active.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
