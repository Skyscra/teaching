import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubjects } from "@/lib/subjects";
import { getWeeks, getWeekContent, getTopics } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "error";

export function generateStaticParams() {
  const params: { subject: string; week: string }[] = [];
  const subjects = getSubjects();

  for (const subject of subjects) {
    const weeks = getWeeks(subject.slug);
    for (const week of weeks) {
      params.push({ subject: subject.slug, week: week.slug });
    }
  }

  return params;
}

export default async function WeekPage({
  params,
}: {
  params: { subject: string; week: string };
}) {
  let content;
  try {
    content = getWeekContent(params.subject, params.week);
  } catch (error) {
    return notFound();
  }

  const topics = getTopics(params.subject, params.week);
  const { html, toc } = await renderMarkdown(content.markdown);

  return (
    <div className="page-grid">
      <article className="prose">
        <h1>{content.meta.title}</h1>
        {content.meta.description ? <p>{content.meta.description}</p> : null}
        <div dangerouslySetInnerHTML={{ __html: html }} />

        {topics.length > 0 && (
          <>
            <h2>Themen dieser Woche</h2>
            <ul>
              {topics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/${params.subject}/${params.week}/${topic.slug}/`}
                  >
                    {topic.title}
                  </Link>
                  {topic.description ? `: ${topic.description}` : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
      <aside className="toc">
        <h3>Inhalt</h3>
        {toc.length === 0 ? (
          <p>Keine Abschnitte.</p>
        ) : (
          <ul>
            {toc.map((item) => (
              <li key={item.id} className={`depth-${item.depth}`}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
