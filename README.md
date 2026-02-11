# Teaching Notes (Static)

Minimalistische Next.js (App Router) Seite für wöchentliche Notizen zu verschiedenen Themen.

## Content Workflow

### Struktur

```
content/
├── real-analysis/
│   ├── week-2/
│   │   ├── index.md          # Wochen-Zusammenfassung
│   │   └── topics/
│   │       └── supremum.md   # Themen-Seite
│   └── _drafts/              # Entwürfe (nicht publiziert)
└── linear-algebra/           # Weitere Fächer (Zukunft)
```

- **Fach-Ordner**: `content/<fach>/` (z.B. `real-analysis`, `linear-algebra`)
- **Wochen-Übersicht (Summary)**: `content/<fach>/week-<n>/index.md`
- **Themen-Seiten**: `content/<fach>/week-<n>/topics/<slug>.md`
- **Entwürfe (nicht publiziert)**: `content/<fach>/_drafts/week-<n>/...`

Alles unter `_drafts/` wird beim Build ignoriert.

### Frontmatter für Wochen

```md
---
title: "Woche 5"
week: 5
date: "2026-02-11"
description: "Kurzbeschreibung."
---
```

Die Sortierung der Wochen erfolgt nach `week` (absteigend).

### Frontmatter für Themen

```md
---
title: "Supremum und Infimum"
order: 1
description: "Kernideen, Beispiele, Gegenbeispiele."
---
```

Die Sortierung innerhalb einer Woche erfolgt nach `order` (aufsteigend).

## Bilder / Assets

- Lege Bilder unter `public/<fach>/week-<n>/...` ab.
- Verlinke Bilder im Markdown so:

```md
![](/real-analysis/week-5/differentiability/intuition.png)
```

**Wichtig**: Das `basePath: "/teaching"` in der Next.js-Konfiguration fügt automatisch `/teaching` vor allen URLs hinzu. Die Bilder müssen aber den vollen Pfad mit Fach-Name enthalten (z.B. `/real-analysis/...`), da mehrere Fächer unterstützt werden.

## Callouts / Admonitions

Blockquotes mit Prefix werden automatisch als Callouts gerendert:

```md
> [!DEFINITION]
> Text...

> [!THEOREM]
> Text...

> [!LEMMA]
> Text...

> [!PROOF]
> Text...

> [!NOTE]
> Text...

> [!WARNING]
> Text...
```

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Build (statischer Export):

```bash
npm run build
```

## Deployment (GitHub Pages)

Die GitHub Actions Pipeline baut und deployed den statischen Export nach
GitHub Pages (Project Site, Base Path `/teaching`). Workflow-Datei:
`.github/workflows/deploy.yml`.

**Wichtig**: Repo-Name sollte `teaching` sein für die URL `https://<user>.github.io/teaching/`.

## Seitenstruktur

- `/teaching/` → Landing Page (Fächerliste)
- `/teaching/<fach>/` → Wochenübersicht für ein Fach
- `/teaching/<fach>/week-<n>/` → Wochen-Summary + Themenliste
- `/teaching/<fach>/week-<n>/<topic>/` → Themen-Seite

## Neues Fach hinzufügen

1. Erstelle Ordner: `content/<fach-slug>/`
2. Füge Wochen hinzu: `content/<fach-slug>/week-1/index.md`
3. Füge Themen hinzu: `content/<fach-slug>/week-1/topics/intro.md`
4. Bilder: `public/<fach-slug>/week-1/...`

Das Fach wird automatisch auf der Startseite aufgelistet. Der Fach-Titel wird aus dem Ordner-Namen generiert (z.B. `real-analysis` → "Real Analysis").
