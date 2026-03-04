import membersData from "@/data/members.json";
import publicationsData from "@/data/publications.json";
import newsData from "@/data/news.json";
import researchData from "@/data/research-areas.json";
import softwareData from "@/data/software.json";

export type Member = {
  slug: string;
  name: string;
  role: string;
  group_type: "pi" | "current" | "alumni" | "collaborator";
  bio?: string;
  photo_url?: string;
  email?: string;
  twitter_url?: string;
  scholar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
  orcid?: string;
  research_focus?: string;
  current_position?: string;
  display_order: number;
};

export type Publication = {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string | null;
  pub_type: "journal" | "review" | "preprint" | "conference" | "book_chapter";
  featured: boolean;
  tags: string[];
};

export type NewsItem = {
  title: string;
  date: string;
  category: string;
  url: string | null;
  content?: string;
};

export type ResearchArea = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
};

export type Software = {
  slug: string;
  name: string;
  description: string;
  long_description?: string;
  url?: string;
  github_url?: string;
  paper_doi?: string;
  users_count?: string;
  journal?: string;
  display_order: number;
};

export function getMembers(): Member[] {
  return (membersData as Member[]).sort(
    (a, b) => a.display_order - b.display_order
  );
}

export function getMembersByGroup(
  group: Member["group_type"]
): Member[] {
  return getMembers().filter((m) => m.group_type === group);
}

export function getPublications(): Publication[] {
  return (publicationsData as Publication[]).sort(
    (a, b) => b.year - a.year
  );
}

export function getFeaturedPublications(): Publication[] {
  return getPublications().filter((p) => p.featured);
}

export function getNews(): NewsItem[] {
  return (newsData as NewsItem[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getResearchAreas(): ResearchArea[] {
  return (researchData as ResearchArea[]).sort(
    (a, b) => a.display_order - b.display_order
  );
}

export function getSoftware(): Software[] {
  return (softwareData as Software[]).sort(
    (a, b) => a.display_order - b.display_order
  );
}
