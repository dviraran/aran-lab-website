"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("members")
        .select("*")
        .order("display_order");
      if (data) setMembers(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="text-lab-muted">Loading members...</div>;

  const groups = {
    pi: members.filter((m) => m.group_type === "pi"),
    current: members.filter((m) => m.group_type === "current"),
    alumni: members.filter((m) => m.group_type === "alumni"),
    collaborator: members.filter((m) => m.group_type === "collaborator"),
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl border border-lab-border bg-white">
        <h2 className="text-lg font-semibold text-lab-text mb-4">
          All Members ({members.length})
        </h2>
        <p className="text-sm text-lab-muted mb-6">
          Manage lab members. Edit individual members by clicking on their row.
          To add or remove members, use the Supabase dashboard directly.
        </p>

        {Object.entries(groups).map(([group, groupMembers]) => (
          <div key={group} className="mb-8">
            <h3 className="text-sm font-semibold text-lab-muted uppercase tracking-wider mb-3">
              {group === "pi"
                ? "Principal Investigator"
                : group.charAt(0).toUpperCase() + group.slice(1)}{" "}
              ({groupMembers.length})
            </h3>
            <div className="space-y-2">
              {groupMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-lab-border hover:bg-lab-blue/5 transition-colors"
                >
                  <div>
                    <span className="font-medium text-sm text-lab-text">
                      {member.name}
                    </span>
                    <span className="text-sm text-lab-muted ml-2">
                      {member.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {member.user_id ? (
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        Has login
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        No login
                      </span>
                    )}
                    <span className="text-lab-muted">
                      #{member.display_order}
                    </span>
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
