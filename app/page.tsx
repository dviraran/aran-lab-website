import Image from "next/image";
import Link from "next/link";
import {
  getFeaturedPublications,
  getNews,
  getResearchAreas,
  getSoftware,
  getPublications,
} from "@/lib/data";

function ResearchIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    cell: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    hospital: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    network: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  };
  return icons[icon] || icons.cell;
}

function categoryBadge(category: string) {
  const colors: Record<string, string> = {
    publication: "bg-lab-blue/10 text-lab-blue",
    presentation: "bg-purple-100 text-purple-700",
    prize: "bg-lab-sand/30 text-amber-700",
    media: "bg-green-100 text-green-700",
    grant: "bg-lab-teal/10 text-lab-teal",
    welcome: "bg-pink-100 text-pink-700",
    general: "bg-gray-100 text-gray-700",
  };
  return colors[category] || colors.general;
}

export default function Home() {
  const researchAreas = getResearchAreas();
  const featured = getFeaturedPublications().slice(0, 3);
  const news = getNews().slice(0, 5);
  const software = getSoftware();
  const allPubs = getPublications();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-lab-blue-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lab-blue-dark via-lab-blue to-lab-blue-dark opacity-90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Biomedical Data Science Lab
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-4">
                Computational Biology &amp; Precision Medicine
              </p>
              <p className="text-base text-white/60 max-w-2xl mb-8">
                We develop computational methods for biomedical data analysis &mdash;
                from single-cell transcriptomics and tumor microenvironment
                characterization to machine learning for clinical decision-making.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/research"
                  className="inline-flex items-center px-6 py-3 bg-white text-lab-blue font-medium rounded-lg hover:bg-white/90 transition-colors"
                >
                  Our Research
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Meet the Team
                </Link>
              </div>
              <div className="mt-8 text-sm text-white/40">
                Faculty of Biology &middot; Technion &ndash;
                Israel Institute of Technology
              </div>
            </div>
            <div className="shrink-0 hidden md:block">
              <Image
                src="/images/lab-group.jpg"
                alt="Aran Lab group photo"
                width={520}
                height={350}
                className="rounded-xl shadow-2xl border-2 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-lab-text mb-2">
            Research Areas
          </h2>
          <p className="text-lab-muted mb-10">
            Our work spans computational biology, immunology, and clinical AI
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/research#${area.slug}`}
                className="group p-6 rounded-xl border border-lab-border hover:border-lab-teal/30 hover:shadow-lg transition-all bg-white"
              >
                <div className="text-lab-teal mb-4">
                  <ResearchIcon icon={area.icon} />
                </div>
                <h3 className="font-semibold text-lab-text mb-2 group-hover:text-lab-teal transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-lab-muted line-clamp-3">
                  {area.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Software Impact */}
      <section className="py-12 bg-lab-blue/5 border-y border-lab-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {software.slice(0, 3).map((sw) => (
              <div key={sw.slug} className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-lab-blue/10 flex items-center justify-center">
                  <span className="text-lab-blue font-bold text-sm">
                    {sw.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lab-text">{sw.name}</h3>
                  <p className="text-sm text-lab-muted">{sw.description}</p>
                  {sw.users_count && (
                    <p className="text-xs text-lab-teal font-medium mt-1">
                      {sw.users_count} users worldwide
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/software"
              className="text-sm text-lab-blue hover:underline"
            >
              View all software &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-lab-text mb-2">
                Featured Publications
              </h2>
              <p className="text-lab-muted">
                Highlights from our {allPubs.length}+ published papers
              </p>
            </div>
            <Link
              href="/publications"
              className="hidden sm:inline-flex items-center text-sm text-lab-blue hover:underline"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((pub, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-lab-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-lab-sand/20 text-amber-700">
                    {pub.journal}
                  </span>
                  <span className="text-xs text-lab-muted">{pub.year}</span>
                </div>
                <h3 className="font-medium text-lab-text text-sm leading-snug mb-3 line-clamp-3">
                  {pub.title}
                </h3>
                <p className="text-xs text-lab-muted line-clamp-1">
                  {pub.authors.slice(0, 3).join(", ")}
                  {pub.authors.length > 3 && " et al."}
                </p>
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs text-lab-blue hover:underline"
                  >
                    View paper &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/publications"
              className="text-sm text-lab-blue hover:underline"
            >
              View all publications &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-20 bg-lab-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-lab-text mb-2">
                Recent News
              </h2>
              <p className="text-lab-muted">Latest updates from the lab</p>
            </div>
            <Link
              href="/news"
              className="text-sm text-lab-blue hover:underline"
            >
              All news &rarr;
            </Link>
          </div>
          <div className="space-y-4">
            {news.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-lg bg-white border border-lab-border hover:shadow-sm transition-shadow"
              >
                <div className="shrink-0 text-sm text-lab-muted w-24">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryBadge(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sm text-lab-text hover:text-lab-blue transition-colors"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <p className="font-medium text-sm text-lab-text">
                      {item.title}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-gradient-to-r from-lab-blue to-lab-teal text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Join Our Team
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            We&apos;re looking for motivated PhD students, MSc students, and
            postdoctoral researchers with backgrounds in bioinformatics,
            computational biology, or machine learning.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center px-8 py-3 bg-white text-lab-blue font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </>
  );
}
