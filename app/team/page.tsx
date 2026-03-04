import { Metadata } from "next";
import Image from "next/image";
import { getMembers, getMembersByGroup, type Member } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the Biomedical Data Science Lab team at the Technion.",
};

function SocialLinks({ member }: { member: Member }) {
  const links = [
    { url: member.email, label: "Email", prefix: "mailto:" },
    { url: member.scholar_url, label: "Scholar" },
    { url: member.github_url, label: "GitHub" },
    { url: member.twitter_url, label: "Twitter" },
    { url: member.linkedin_url, label: "LinkedIn" },
    { url: member.website_url, label: "Web" },
  ].filter((l) => l.url);

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.prefix ? `${link.prefix}${link.url}` : link.url!}
          target={link.prefix ? undefined : "_blank"}
          rel={link.prefix ? undefined : "noopener noreferrer"}
          className="text-xs px-2 py-1 rounded bg-lab-blue/5 text-lab-blue hover:bg-lab-blue/10 transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="p-5 rounded-xl border border-lab-border bg-white hover:shadow-md transition-shadow">
      <div className="w-20 h-20 rounded-full bg-lab-blue/10 flex items-center justify-center mb-4 overflow-hidden">
        {member.photo_url ? (
          <Image
            src={member.photo_url}
            alt={member.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-lab-blue/40">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-lab-text">{member.name}</h3>
      <p className="text-sm text-lab-teal font-medium">{member.role}</p>
      {member.research_focus && (
        <p className="text-xs text-lab-muted mt-2">{member.research_focus}</p>
      )}
      <SocialLinks member={member} />
    </div>
  );
}

export default function TeamPage() {
  const pi = getMembersByGroup("pi");
  const current = getMembersByGroup("current");
  const alumni = getMembersByGroup("alumni");
  const labManager = current.filter((m) =>
    m.role.toLowerCase().includes("manager")
  );
  const postdocs = current.filter((m) =>
    m.role.toLowerCase().includes("postdoc")
  );
  const phd = current.filter(
    (m) =>
      m.role.toLowerCase().includes("phd") &&
      !m.role.toLowerCase().includes("postdoc")
  );
  const msc = current.filter((m) => m.role.toLowerCase().includes("msc") || m.role.toLowerCase().includes("ms"));

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-lab-text mb-2">
          Our Team
        </h1>
        <p className="text-lab-muted mb-12">
          The people behind the research
        </p>

        {/* PI */}
        {pi.map((member) => (
          <div
            key={member.slug}
            className="mb-16 p-8 rounded-2xl border border-lab-border bg-white"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="shrink-0">
                <div className="w-32 h-32 rounded-full bg-lab-blue/10 flex items-center justify-center overflow-hidden">
                  {member.photo_url ? (
                    <Image
                      src={member.photo_url}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-lab-blue/40">
                      DA
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold text-lab-text">
                  {member.name}
                </h2>
                <p className="text-lab-teal font-medium mb-4">{member.role}</p>
                <p className="text-sm text-lab-muted leading-relaxed mb-4">
                  {member.bio}
                </p>
                <SocialLinks member={member} />
              </div>
            </div>
          </div>
        ))}

        {/* Current Members by Role */}
        {[
          { title: "Lab Manager", members: labManager },
          { title: "Postdoctoral Fellows", members: postdocs },
          { title: "PhD Students", members: phd },
          { title: "MSc Students", members: msc },
        ]
          .filter((g) => g.members.length > 0)
          .map((group) => (
            <div key={group.title} className="mb-12">
              <h2 className="text-xl font-serif font-bold text-lab-text mb-6">
                {group.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.members.map((member) => (
                  <MemberCard key={member.slug} member={member} />
                ))}
              </div>
            </div>
          ))}

        {/* Alumni */}
        <div className="mb-12">
          <h2 className="text-xl font-serif font-bold text-lab-text mb-6">
            Alumni
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-lab-border text-left">
                  <th className="py-3 pr-4 font-medium text-lab-muted">Name</th>
                  <th className="py-3 pr-4 font-medium text-lab-muted">Degree</th>
                  <th className="py-3 font-medium text-lab-muted">
                    Current Position
                  </th>
                </tr>
              </thead>
              <tbody>
                {alumni.map((member) => (
                  <tr
                    key={member.slug}
                    className="border-b border-lab-border/50"
                  >
                    <td className="py-3 pr-4 font-medium text-lab-text">
                      {member.name}
                    </td>
                    <td className="py-3 pr-4 text-lab-muted">{member.role}</td>
                    <td className="py-3 text-lab-muted">
                      {member.current_position || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
