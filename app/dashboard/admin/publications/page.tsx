"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminPublicationsPage() {
  const [doi, setDoi] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<any>(null);

  const fetchFromDOI = async () => {
    if (!doi) return;
    setLoading(true);
    setMessage("");
    setPreview(null);

    try {
      const cleanDoi = doi.replace("https://doi.org/", "").trim();
      const res = await fetch(
        `https://api.crossref.org/works/${encodeURIComponent(cleanDoi)}`
      );
      if (!res.ok) throw new Error("DOI not found");

      const data = await res.json();
      const work = data.message;

      setPreview({
        title: work.title?.[0] || "",
        authors: (work.author || []).map(
          (a: any) => `${a.given || ""} ${a.family || ""}`.trim()
        ),
        journal: work["container-title"]?.[0] || "",
        year: work.published?.["date-parts"]?.[0]?.[0] || new Date().getFullYear(),
        doi: cleanDoi,
        pub_type: work.type === "journal-article" ? "journal" : work.type,
      });
    } catch (err: any) {
      setMessage("Error fetching DOI: " + err.message);
    }
    setLoading(false);
  };

  const savePublication = async () => {
    if (!preview) return;
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.from("publications").insert({
      title: preview.title,
      authors: preview.authors,
      journal: preview.journal,
      year: preview.year,
      doi: preview.doi,
      pub_type: preview.pub_type || "journal",
      featured: false,
      tags: [],
    });

    setLoading(false);
    if (error) {
      setMessage("Error saving: " + error.message);
    } else {
      setMessage("Publication saved successfully!");
      setPreview(null);
      setDoi("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl border border-lab-border bg-white">
        <h2 className="text-lg font-semibold text-lab-text mb-4">
          Add Publication by DOI
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            placeholder="Paste DOI (e.g., 10.1038/s41590-018-0276-y)"
            className="flex-1 px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
          />
          <button
            onClick={fetchFromDOI}
            disabled={loading || !doi}
            className="px-4 py-2 text-sm font-medium text-white bg-lab-blue rounded-lg hover:bg-lab-blue-light transition-colors disabled:opacity-50"
          >
            {loading ? "Fetching..." : "Fetch"}
          </button>
        </div>
      </div>

      {preview && (
        <div className="p-6 rounded-xl border border-lab-teal/20 bg-lab-teal/5">
          <h3 className="font-semibold text-lab-text mb-4">Preview</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-lab-muted">Title:</span>{" "}
              <span className="text-lab-text">{preview.title}</span>
            </p>
            <p>
              <span className="text-lab-muted">Authors:</span>{" "}
              <span className="text-lab-text">
                {preview.authors.join(", ")}
              </span>
            </p>
            <p>
              <span className="text-lab-muted">Journal:</span>{" "}
              <span className="text-lab-text">{preview.journal}</span>
            </p>
            <p>
              <span className="text-lab-muted">Year:</span>{" "}
              <span className="text-lab-text">{preview.year}</span>
            </p>
            <p>
              <span className="text-lab-muted">DOI:</span>{" "}
              <span className="text-lab-text">{preview.doi}</span>
            </p>
          </div>
          <button
            onClick={savePublication}
            disabled={loading}
            className="mt-4 px-6 py-2.5 text-sm font-medium text-white bg-lab-teal rounded-lg hover:bg-lab-teal-light transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save to Database"}
          </button>
        </div>
      )}

      {message && (
        <div
          className={`p-3 text-sm rounded-lg ${
            message.includes("Error")
              ? "text-red-700 bg-red-50"
              : "text-green-700 bg-green-50"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
