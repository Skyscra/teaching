import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubjects } from "@/lib/subjects";
import { getWeeks } from "@/lib/content";

export const dynamic = "error";

export function generateStaticParams() {
  return getSubjects().map((subject) => ({ subject: subject.slug }));
}

export default function SubjectIndexPage({
  params,
}: {
  params: { subject: string };
}) {
  const subjects = getSubjects();
  const currentSubject = subjects.find((s) => s.slug === params.subject);

  if (!currentSubject) {
    return notFound();
  }

  const weeks = getWeeks(params.subject);

  return (
    <div className="prose">
      <h1>{currentSubject.title}</h1>
      <p>Wöchentliche Notizen in absteigender Reihenfolge.</p>
      {weeks.length === 0 ? (
        <p>Noch keine veröffentlichten Wochen.</p>
      ) : (
        <ul>
          {weeks.map((week) => (
            <li key={week.slug}>
              <Link href={`/${params.subject}/${week.slug}/`}>
                {week.title}
              </Link>
              {week.description ? ` – ${week.description}` : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
