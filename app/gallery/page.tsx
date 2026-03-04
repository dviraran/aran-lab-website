import { Metadata } from "next";
import Image from "next/image";
import { getGalleryPhotos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from lab retreats, presentations, and events at the Biomedical Data Science Lab.",
};

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

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-lab-text mb-2">
          Gallery
        </h1>
        <p className="text-lab-muted mb-12 max-w-2xl">
          Moments from lab retreats, student presentations, and life in the lab.
        </p>

        {photos.length === 0 ? (
          <p className="text-lab-muted text-center py-20">
            Photos coming soon!
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-xl overflow-hidden border border-lab-border bg-white"
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
        )}
      </div>
    </div>
  );
}
