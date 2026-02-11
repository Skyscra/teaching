import Link from "next/link";
import { getSubjects } from "@/lib/subjects";

export const dynamic = "error";

export default function TeachingIndexPage() {
  const subjects = getSubjects();

  return (
    <div className="prose">
      <h1>Teaching</h1>
      <p>
        Willkommen auf meiner Teaching-Seite. Hier findest du wöchentliche
        Notizen zu verschiedenen Themen aus der Mathematik und verwandten
        Gebieten.
      </p>
      <p>
        Jedes Thema ist in Wochen unterteilt, mit detaillierten Erklärungen,
        Beispielen und Übungen. Die Inhalte werden kontinuierlich erweitert.
      </p>
      <h2>Fächer</h2>
      {subjects.length === 0 ? (
        <p>Noch keine Fächer verfügbar.</p>
      ) : (
        <ul>
          {subjects.map((subject) => (
            <li key={subject.slug}>
              <Link href={`/${subject.slug}/`}>{subject.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
