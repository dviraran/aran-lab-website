import { Metadata } from "next";
import { getNews } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news from the Aran Lab.",
};

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

export default function NewsPage() {
  const news = getNews();

  // Group by year
  const grouped: Record<number, typeof news> = {};
  for (const item of news) {
    const year = new Date(item.date).getFullYear();
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(item);
  }
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-lab-text mb-2">
          News
        </h1>
        <p className="text-lab-muted mb-12">Updates from the lab</p>

        {years.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="text-xl font-serif font-bold text-lab-blue mb-6 sticky top-16 bg-lab-bg py-2 z-10">
              {year}
            </h2>
            <div className="space-y-4">
              {grouped[year].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-lg border border-lab-border bg-white hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 text-sm text-lab-muted w-20">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryBadge(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-medium text-lab-text mb-1">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-lab-blue transition-colors"
                          >
                            {item.title} &rarr;
                          </a>
                        ) : (
                          item.title
                        )}
                      </h3>
                      {item.content && (
                        <p className="text-sm text-lab-muted">{item.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
