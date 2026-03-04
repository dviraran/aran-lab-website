"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const categories = [
  { value: "publication", label: "Publication" },
  { value: "presentation", label: "Presentation" },
  { value: "prize", label: "Prize / Award" },
  { value: "media", label: "Media" },
  { value: "grant", label: "Grant" },
  { value: "general", label: "General" },
];

export default function NewNewsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("publication");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Error: Not logged in");
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("news").insert({
      title,
      content: content || null,
      url: url || null,
      category,
      date,
      author_id: user.id,
      is_published: true,
    });

    setSaving(false);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("News posted successfully!");
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  };

  return (
    <div className="p-6 rounded-xl border border-lab-border bg-white">
      <h2 className="text-lg font-semibold text-lab-text mb-6">Post News</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-lab-text mb-1">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            placeholder="e.g., New paper published in Nature..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-lab-text mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            placeholder="Brief description of the news item..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-lab-text mb-1">
            Link (optional)
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            placeholder="https://doi.org/..."
          />
        </div>

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

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 text-sm font-medium text-white bg-lab-blue rounded-lg hover:bg-lab-blue-light transition-colors disabled:opacity-50"
        >
          {saving ? "Posting..." : "Post News"}
        </button>
      </form>
    </div>
  );
}
