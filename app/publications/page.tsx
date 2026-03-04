"use client";

import { useState, useMemo } from "react";
import { getPublications, type Publication } from "@/lib/data";

const allPubs = getPublications();
const years = [...new Set(allPubs.map((p) => p.year))].sort((a, b) => b - a);
const types = [...new Set(allPubs.map((p) => p.pub_type))];

function formatAuthors(authors: string[]) {
  if (authors.length <= 6) return authors.join(", ");
  return authors.slice(0, 3).join(", ") + " ... " + authors.slice(-1)[0];
}

export default function PublicationsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");

  const filtered = useMemo(() => {
    return allPubs.filter((pub) => {
      if (filterType !== "all" && pub.pub_type !== filterType) return false;
      if (filterYear !== "all" && pub.year !== parseInt(filterYear))
        return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          pub.title.toLowerCase().includes(q) ||
          pub.authors.some((a) => a.toLowerCase().includes(q)) ||
          pub.journal.toLowerCase().includes(q) ||
          pub.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, filterType, filterYear]);

  const grouped = useMemo(() => {
    const groups: Record<number, Publication[]> = {};
    for (const pub of filtered) {
      if (!groups[pub.year]) groups[pub.year] = [];
      groups[pub.year].push(pub);
    }
    return Object.entries(groups)
      .sort(([a], [b]) => parseInt(b) - parseInt(a))
      .map(([year, pubs]) => ({ year: parseInt(year), pubs }));
  }, [filtered]);

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-lab-text mb-2">
          Publications
        </h1>
        <p className="text-lab-muted mb-8">
          {allPubs.length} publications &middot; 15,000+ citations &middot;
          h-index 30
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <input
            type="text"
            placeholder="Search by title, author, journal, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20 focus:border-lab-blue"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
          >
            <option value="all">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
          >
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-lab-muted mb-6">
          Showing {filtered.length} of {allPubs.length} publications
        </p>

        {/* Publication list */}
        {grouped.map(({ year, pubs }) => (
          <div key={year} className="mb-10">
            <h2 className="text-lg font-serif font-bold text-lab-blue mb-4 sticky top-16 bg-lab-bg py-2 z-10">
              {year}
            </h2>
            <div className="space-y-4">
              {pubs.map((pub, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-lab-border bg-white hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    {pub.featured && (
                      <span className="shrink-0 mt-1 text-lab-sand" title="Featured">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-snug">
                        {pub.doi ? (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lab-text hover:text-lab-blue transition-colors"
                          >
                            {pub.title}
                          </a>
                        ) : (
                          <span className="text-lab-text">{pub.title}</span>
                        )}
                      </h3>
                      <p className="text-xs text-lab-muted mt-1">
                        {formatAuthors(pub.authors)}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-xs font-medium text-lab-teal">
                          {pub.journal}
                        </span>
                        {pub.pub_type !== "journal" && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                            {pub.pub_type}
                          </span>
                        )}
                        {pub.doi && (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-lab-blue hover:underline"
                          >
                            DOI
                          </a>
                        )}
                        {pub.cited_by_count && pub.cited_by_count >= 100 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium border border-amber-200">
                            {pub.cited_by_count.toLocaleString()} citations
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-lab-muted py-12">
            No publications match your search.
          </p>
        )}
      </div>
    </div>
  );
}
