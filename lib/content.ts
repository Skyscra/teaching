import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type WeekMeta = {
  slug: string;
  title: string;
  week: number;
  date?: string;
  description?: string;
};

export type TopicMeta = {
  slug: string;
  title: string;
  order: number;
  description?: string;
};

const contentRoot = path.join(process.cwd(), "content");

const weekSlugPattern = /^week-(\d+)$/;

function isPublishedDir(dirName: string) {
  return weekSlugPattern.test(dirName);
}

function readWeekMeta(subject: string, slug: string): WeekMeta {
  const filePath = path.join(contentRoot, subject, slug, "index.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  const weekMatch = slug.match(weekSlugPattern);
  const weekNumber = Number(data.week ?? weekMatch?.[1]);
  const title =
    typeof data.title === "string" ? data.title : `Week ${weekNumber}`;

  return {
    slug,
    title,
    week: weekNumber,
    date: typeof data.date === "string" ? data.date : undefined,
    description:
      typeof data.description === "string" ? data.description : undefined,
  };
}

export function getWeeks(subject: string): WeekMeta[] {
  const subjectRoot = path.join(contentRoot, subject);
  if (!fs.existsSync(subjectRoot)) {
    return [];
  }

  const entries = fs.readdirSync(subjectRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter(isPublishedDir)
    .map((slug) => readWeekMeta(subject, slug))
    .sort((a, b) => b.week - a.week);
}

export function getWeekContent(
  subject: string,
  slug: string
): {
  meta: WeekMeta;
  markdown: string;
} {
  const filePath = path.join(contentRoot, subject, slug, "index.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const weekMatch = slug.match(weekSlugPattern);
  const weekNumber = Number(data.week ?? weekMatch?.[1]);
  const title =
    typeof data.title === "string" ? data.title : `Week ${weekNumber}`;

  return {
    meta: {
      slug,
      title,
      week: weekNumber,
      date: typeof data.date === "string" ? data.date : undefined,
      description:
        typeof data.description === "string" ? data.description : undefined,
    },
    markdown: content,
  };
}

function readTopicMeta(
  subject: string,
  weekSlug: string,
  fileName: string
): TopicMeta {
  const topicSlug = fileName.replace(/\.md$/, "");
  const filePath = path.join(
    contentRoot,
    subject,
    weekSlug,
    "topics",
    fileName
  );
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);

  const title =
    typeof data.title === "string"
      ? data.title
      : topicSlug
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  const order = typeof data.order === "number" ? data.order : 999;

  return {
    slug: topicSlug,
    title,
    order,
    description:
      typeof data.description === "string" ? data.description : undefined,
  };
}

export function getTopics(subject: string, weekSlug: string): TopicMeta[] {
  const topicsDir = path.join(contentRoot, subject, weekSlug, "topics");
  if (!fs.existsSync(topicsDir)) {
    return [];
  }

  const entries = fs.readdirSync(topicsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => readTopicMeta(subject, weekSlug, entry.name))
    .sort((a, b) => a.order - b.order);
}

export function getTopicContent(
  subject: string,
  weekSlug: string,
  topicSlug: string
): {
  meta: TopicMeta;
  markdown: string;
} {
  const filePath = path.join(
    contentRoot,
    subject,
    weekSlug,
    "topics",
    `${topicSlug}.md`
  );
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const title =
    typeof data.title === "string"
      ? data.title
      : topicSlug
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  const order = typeof data.order === "number" ? data.order : 999;

  return {
    meta: {
      slug: topicSlug,
      title,
      order,
      description:
        typeof data.description === "string" ? data.description : undefined,
    },
    markdown: content,
  };
}
