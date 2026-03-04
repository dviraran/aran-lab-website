import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  const { data: myNews } = await supabase
    .from("news")
    .select("*")
    .eq("author_id", user?.id)
    .order("date", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/profile"
          className="p-6 rounded-xl border border-lab-border bg-white hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lab-text mb-1">Edit Profile</h3>
          <p className="text-sm text-lab-muted">
            Update your bio, photo, and links
          </p>
        </Link>
        <Link
          href="/dashboard/news/new"
          className="p-6 rounded-xl border border-lab-border bg-white hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lab-text mb-1">Post News</h3>
          <p className="text-sm text-lab-muted">
            Share a publication, presentation, or achievement
          </p>
        </Link>
      </div>

      {/* My profile summary */}
      {member && (
        <div className="p-6 rounded-xl border border-lab-border bg-white">
          <h2 className="font-semibold text-lab-text mb-4">My Profile</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-lab-muted">Name:</span>{" "}
              <span className="text-lab-text">{member.name}</span>
            </div>
            <div>
              <span className="text-lab-muted">Role:</span>{" "}
              <span className="text-lab-text">{member.role}</span>
            </div>
            <div className="col-span-2">
              <span className="text-lab-muted">Bio:</span>{" "}
              <span className="text-lab-text">
                {member.bio ? member.bio.substring(0, 100) + "..." : "Not set"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Recent news by me */}
      {myNews && myNews.length > 0 && (
        <div className="p-6 rounded-xl border border-lab-border bg-white">
          <h2 className="font-semibold text-lab-text mb-4">My Recent News</h2>
          <div className="space-y-3">
            {myNews.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-lab-text">{item.title}</span>
                <span className="text-lab-muted">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
