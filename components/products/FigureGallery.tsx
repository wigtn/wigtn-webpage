"use client";

import Image from "next/image";

interface FigureImage {
  src: string;
  alt: string;
  caption?: string;
}

interface FigureGalleryProps {
  images: FigureImage[];
  layout?: "single" | "grid";
}

export function FigureGallery({ images, layout = "single" }: FigureGalleryProps) {
  const isGrid = layout === "grid" && images.length > 1;

  return (
    <div className={`my-6 ${isGrid ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}`}>
      {images.map((img, i) => (
        <figure key={i} className="rounded-xl overflow-hidden border border-gray-200">
          <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain bg-white p-2"
              unoptimized
            />
          </div>
          {img.caption && (
            <figcaption className="px-4 py-3 text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
