import fs from "node:fs";
import path from "node:path";

export type SubjectMeta = {
  slug: string;
  title: string;
};

const contentRoot = path.join(process.cwd(), "content");

function isPublishedDir(dirName: string) {
  return !dirName.startsWith("_") && !dirName.startsWith(".");
}

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getSubjects(): SubjectMeta[] {
  if (!fs.existsSync(contentRoot)) {
    return [];
  }

  const entries = fs.readdirSync(contentRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter(isPublishedDir)
    .map((slug) => ({
      slug,
      title: formatTitle(slug),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function subjectExists(slug: string): boolean {
  const subjectPath = path.join(contentRoot, slug);
  return fs.existsSync(subjectPath) && fs.statSync(subjectPath).isDirectory();
}
