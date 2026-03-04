"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/lib/data";

const categoryLabels: Record<string, string> = {
  retreat: "Lab Retreat",
  presentation: "Presentation",
  lab: "Lab Life",
  event: "Event",
};

const categoryColors: Record<string, string> = {
  retreat: "bg-emerald-100 text-emerald-700",
  presentation: "bg-blue-100 text-blue-700",
  lab: "bg-amber-100 text-amber-700",
  event: "bg-purple-100 text-purple-700",
};

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(
    () =>
      setSelectedIndex((i) =>
        i !== null ? (i - 1 + photos.length) % photos.length : null
      ),
    [photos.length]
  );
  const next = useCallback(
    () =>
      setSelectedIndex((i) =>
        i !== null ? (i + 1) % photos.length : null
      ),
    [photos.length]
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIndex, close, prev, next]);

  const selected = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="break-inside-avoid rounded-xl overflow-hidden border border-lab-border bg-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedIndex(i)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <div className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    categoryColors[photo.category] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {categoryLabels[photo.category] || photo.category}
                </span>
                <span className="text-xs text-lab-muted">
                  {new Date(photo.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              {photo.caption && (
                <p className="text-sm text-lab-muted">{photo.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl leading-none z-10"
            onClick={close}
          >
            &times;
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            &#8249;
          </button>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            &#8250;
          </button>

          {/* Image + caption */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1600}
              height={1200}
              className="max-h-[80vh] w-auto object-contain rounded-lg"
            />
            {selected.caption && (
              <p className="text-white/90 text-sm mt-3 text-center max-w-xl">
                {selected.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
