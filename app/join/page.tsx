import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Join the Biomedical Data Science Lab at the Technion.",
};

export default function JoinPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-lab-text mb-2">
          Join Our Team
        </h1>
        <p className="text-lab-muted mb-12">
          We&apos;re always looking for talented and motivated researchers
        </p>

        <div className="space-y-8">
          {/* Positions */}
          <div className="p-8 rounded-2xl border border-lab-border bg-white">
            <h2 className="text-xl font-serif font-bold text-lab-text mb-4">
              Open Positions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lab-text mb-2">
                  PhD Students
                </h3>
                <p className="text-sm text-lab-muted leading-relaxed">
                  We are looking for PhD students with strong backgrounds in
                  bioinformatics, computational biology, computer science, or
                  related fields. Research topics include single-cell
                  transcriptomics, tumor microenvironment analysis, and machine
                  learning for healthcare.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lab-text mb-2">
                  MSc Students
                </h3>
                <p className="text-sm text-lab-muted leading-relaxed">
                  Master&apos;s students from Biology, Computer Science, Data
                  Science, Electrical Engineering, or Applied Mathematics are
                  welcome to apply. Projects can be tailored to your interests
                  and background.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lab-text mb-2">
                  Postdoctoral Researchers
                </h3>
                <p className="text-sm text-lab-muted leading-relaxed">
                  We seek postdoctoral researchers with a track record in
                  bioinformatics, computational biology, or clinical informatics.
                  Experience with single-cell genomics, machine learning, or
                  real-world data analysis is a plus.
                </p>
              </div>
            </div>
          </div>

          {/* What we look for */}
          <div className="p-8 rounded-2xl border border-lab-border bg-white">
            <h2 className="text-xl font-serif font-bold text-lab-text mb-4">
              What We Look For
            </h2>
            <ul className="space-y-3 text-sm text-lab-muted">
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-lab-teal" />
                Strong problem-solving skills and passion for research
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-lab-teal" />
                Programming proficiency (R, Python, or similar)
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-lab-teal" />
                Background in computational biology, bioinformatics, biostatistics, or genomics
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-lab-teal" />
                Fluency in English
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-lab-teal" />
                Independent thinking and collaborative spirit
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="p-8 rounded-2xl border border-lab-teal/20 bg-lab-teal/5">
            <h2 className="text-xl font-serif font-bold text-lab-text mb-4">
              How to Apply
            </h2>
            <p className="text-sm text-lab-muted leading-relaxed mb-4">
              If you&apos;re interested in joining the lab, please send an email
              to{" "}
              <a
                href="mailto:aran.lab.technion@gmail.com"
                className="text-lab-blue hover:underline font-medium"
              >
                aran.lab.technion@gmail.com
              </a>{" "}
              with the following:
            </p>
            <ul className="space-y-2 text-sm text-lab-muted">
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-mono text-lab-teal">1.</span>
                Your CV
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-mono text-lab-teal">2.</span>
                A brief description of your research interests
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-mono text-lab-teal">3.</span>
                Relevant publications or projects (if any)
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-mono text-lab-teal">4.</span>
                Contact information for 2-3 references
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
