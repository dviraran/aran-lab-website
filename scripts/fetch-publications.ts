/**
 * Auto-fetch publications from OpenAlex using ORCID
 *
 * Usage:
 *   npx tsx scripts/fetch-publications.ts
 *
 * This script fetches all publications associated with Dvir Aran's ORCID
 * from the OpenAlex API and updates data/publications.json with any new ones.
 *
 * OpenAlex is free, no API key needed, and covers most academic publications.
 */

import * as fs from "fs";
import * as path from "path";

const ORCID = "0000-0001-6334-5039";
const OPENALEX_AUTHOR_URL = `https://api.openalex.org/authors/orcid:${ORCID}`;
const PUBLICATIONS_FILE = path.join(
  __dirname,
  "..",
  "data",
  "publications.json"
);

interface OpenAlexWork {
  id: string;
  title: string;
  publication_year: number;
  doi: string | null;
  primary_location?: {
    source?: {
      display_name: string;
    };
  };
  authorships: Array<{
    author: {
      display_name: string;
    };
    author_position: string;
  }>;
  type: string;
  cited_by_count: number;
}

interface Publication {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string | null;
  pub_type: string;
  featured: boolean;
  tags: string[];
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function mapOpenAlexType(type: string): string {
  const typeMap: Record<string, string> = {
    "journal-article": "journal",
    article: "journal",
    review: "review",
    "book-chapter": "book_chapter",
    "proceedings-article": "conference",
    preprint: "preprint",
    posted_content: "preprint",
  };
  return typeMap[type] || "journal";
}

async function fetchAllWorks(authorId: string): Promise<OpenAlexWork[]> {
  const works: OpenAlexWork[] = [];
  let cursor = "*";
  let page = 0;

  while (true) {
    const url = `https://api.openalex.org/works?filter=author.id:${authorId}&per-page=100&cursor=${cursor}&sort=publication_year:desc&mailto=dviraran@technion.ac.il`;
    console.log(`Fetching page ${++page}...`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OpenAlex API error: ${response.status}`);
    }

    const data = await response.json();
    works.push(...data.results);

    if (!data.meta.next_cursor || data.results.length === 0) break;
    cursor = data.meta.next_cursor;
  }

  return works;
}

async function main() {
  console.log("Fetching author info from OpenAlex...");

  // Get author ID
  const authorResponse = await fetch(
    `${OPENALEX_AUTHOR_URL}?mailto=dviraran@technion.ac.il`
  );
  if (!authorResponse.ok) {
    throw new Error(`Failed to fetch author: ${authorResponse.status}`);
  }
  const authorData = await authorResponse.json();
  const authorId = authorData.id;
  console.log(
    `Found author: ${authorData.display_name} (${authorData.works_count} works)`
  );

  // Fetch all works
  const works = await fetchAllWorks(authorId);
  console.log(`Fetched ${works.length} works from OpenAlex`);

  // Load existing publications
  const existing: Publication[] = JSON.parse(
    fs.readFileSync(PUBLICATIONS_FILE, "utf-8")
  );
  const existingTitles = new Set(existing.map((p) => normalizeTitle(p.title)));

  // Find new publications
  const newPubs: Publication[] = [];
  for (const work of works) {
    if (!work.title) continue;
    if (existingTitles.has(normalizeTitle(work.title))) continue;

    const pub: Publication = {
      title: work.title,
      authors: work.authorships.map((a) => a.author.display_name),
      journal:
        work.primary_location?.source?.display_name || "Unknown",
      year: work.publication_year,
      doi: work.doi ? work.doi.replace("https://doi.org/", "") : null,
      pub_type: mapOpenAlexType(work.type),
      featured: false,
      tags: [],
    };

    newPubs.push(pub);
  }

  if (newPubs.length === 0) {
    console.log("No new publications found. Everything is up to date!");
    return;
  }

  console.log(`\nFound ${newPubs.length} new publications:`);
  for (const pub of newPubs) {
    console.log(`  - [${pub.year}] ${pub.title.substring(0, 80)}...`);
    console.log(`    ${pub.journal}`);
  }

  // Merge and save
  const merged = [...existing, ...newPubs].sort((a, b) => b.year - a.year);
  fs.writeFileSync(PUBLICATIONS_FILE, JSON.stringify(merged, null, 2) + "\n");
  console.log(
    `\nUpdated ${PUBLICATIONS_FILE} with ${newPubs.length} new publications (${merged.length} total)`
  );
}

main().catch(console.error);
