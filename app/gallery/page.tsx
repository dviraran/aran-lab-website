import { Metadata } from "next";
import { getGalleryPhotos } from "@/lib/data";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from lab retreats, presentations, and events at the Biomedical Data Science Lab.",
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
          <GalleryGrid photos={photos} />
        )}
      </div>
    </div>
  );
}
