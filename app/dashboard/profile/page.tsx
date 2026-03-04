"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("members")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) setMember(data);
      setLoading(false);
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("members")
      .update({
        bio: member.bio,
        research_focus: member.research_focus,
        email: member.email,
        linkedin_url: member.linkedin_url,
        twitter_url: member.twitter_url,
        github_url: member.github_url,
        scholar_url: member.scholar_url,
        website_url: member.website_url,
      })
      .eq("id", member.id);

    setSaving(false);
    if (error) {
      setMessage("Error saving: " + error.message);
    } else {
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) {
    return <div className="text-lab-muted">Loading profile...</div>;
  }

  if (!member) {
    return (
      <div className="p-6 rounded-xl border border-lab-border bg-white">
        <p className="text-lab-muted">
          Your account is not linked to a lab member profile. Contact{" "}
          <a
            href="mailto:dviraran@technion.ac.il"
            className="text-lab-blue hover:underline"
          >
            dviraran@technion.ac.il
          </a>{" "}
          to get set up.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-lab-border bg-white">
      <h2 className="text-lg font-semibold text-lab-text mb-6">
        Edit Profile
      </h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-lab-text mb-1">
            Name
          </label>
          <input
            type="text"
            value={member.name}
            disabled
            className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg bg-gray-50 text-lab-muted"
          />
          <p className="text-xs text-lab-muted mt-1">
            Contact admin to change your name
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-lab-text mb-1">
            Bio
          </label>
          <textarea
            value={member.bio || ""}
            onChange={(e) => setMember({ ...member, bio: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            placeholder="Tell us about yourself and your research..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-lab-text mb-1">
            Research Focus
          </label>
          <input
            type="text"
            value={member.research_focus || ""}
            onChange={(e) =>
              setMember({ ...member, research_focus: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            placeholder="One-line summary of your research"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">
              Email
            </label>
            <input
              type="email"
              value={member.email || ""}
              onChange={(e) => setMember({ ...member, email: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={member.linkedin_url || ""}
              onChange={(e) =>
                setMember({ ...member, linkedin_url: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">
              Twitter URL
            </label>
            <input
              type="url"
              value={member.twitter_url || ""}
              onChange={(e) =>
                setMember({ ...member, twitter_url: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
              placeholder="https://twitter.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={member.github_url || ""}
              onChange={(e) =>
                setMember({ ...member, github_url: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">
              Google Scholar URL
            </label>
            <input
              type="url"
              value={member.scholar_url || ""}
              onChange={(e) =>
                setMember({ ...member, scholar_url: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">
              Personal Website
            </label>
            <input
              type="url"
              value={member.website_url || ""}
              onChange={(e) =>
                setMember({ ...member, website_url: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-lab-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lab-blue/20"
            />
          </div>
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
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
