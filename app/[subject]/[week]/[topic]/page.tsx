import { notFound } from "next/navigation";
import { getSubjects } from "@/lib/subjects";
import { getWeeks, getTopics, getTopicContent } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "error";

export function generateStaticParams() {
  const params: { subject: string; week: string; topic: string }[] = [];
  const subjects = getSubjects();

  for (const subject of subjects) {
    const weeks = getWeeks(subject.slug);
    for (const week of weeks) {
      const topics = getTopics(subject.slug, week.slug);
      for (const topic of topics) {
        params.push({
          subject: subject.slug,
          week: week.slug,
          topic: topic.slug,
        });
      }
    }
  }

  return params;
}

export default async function TopicPage({
  params,
}: {
  params: { subject: string; week: string; topic: string };
}) {
  let content;
  try {
    content = getTopicContent(params.subject, params.week, params.topic);
  } catch (error) {
    return notFound();
  }

  const { html, toc } = await renderMarkdown(content.markdown);

  return (
    <div className="page-grid">
      <article className="prose">
        <h1>{content.meta.title}</h1>
        {content.meta.description ? <p>{content.meta.description}</p> : null}
        <div dangerouslySetInnerHTML={{ __html: html }} />
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
