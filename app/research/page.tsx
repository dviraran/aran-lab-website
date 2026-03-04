import { Metadata } from "next";
import { getResearchAreas } from "@/lib/data";

export const metadata: Metadata = {
  title: "Research",
  description: "Research areas of the Aran Lab at the Technion.",
};

export default function ResearchPage() {
  const areas = getResearchAreas();

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-lab-text mb-2">
          Research
        </h1>
        <p className="text-lab-muted mb-12">
          Our research integrates multidimensional biomedical data &mdash;
          including genomics, single-cell transcriptomics, and clinical records
          &mdash; to advance precision medicine.
        </p>

        <div className="space-y-12">
          {areas.map((area, i) => (
            <div
              key={area.slug}
              id={area.slug}
              className="scroll-mt-24 p-8 rounded-2xl border border-lab-border bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-lab-teal/10 flex items-center justify-center">
                  <span className="text-lab-teal font-bold">{i + 1}</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-lab-text">
                  {area.title}
                </h2>
              </div>
              <p className="text-sm text-lab-muted leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
