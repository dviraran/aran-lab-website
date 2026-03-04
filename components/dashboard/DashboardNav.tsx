"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DashboardNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/profile", label: "My Profile" },
    { href: "/dashboard/news/new", label: "Post News" },
    ...(isAdmin
      ? [
          { href: "/dashboard/admin/members", label: "Members" },
          { href: "/dashboard/admin/publications", label: "Publications" },
        ]
      : []),
  ];

  return (
    <div className="flex items-center gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            pathname === link.href
              ? "bg-lab-blue text-white"
              : "text-lab-muted hover:text-lab-blue hover:bg-lab-blue/5"
          }`}
        >
          {link.label}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="px-3 py-1.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors ml-2"
      >
        Sign Out
      </button>
    </div>
  );
}
