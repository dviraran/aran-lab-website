import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get member info for the logged-in user
  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const isAdmin = member?.group_type === "pi";

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-serif font-bold text-lab-text">
              Dashboard
            </h1>
            <p className="text-sm text-lab-muted">
              Welcome, {member?.name || user.email}
            </p>
          </div>
          <DashboardNav isAdmin={isAdmin} />
        </div>
        {children}
      </div>
    </div>
  );
}
