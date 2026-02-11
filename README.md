# Teaching Notes (Static)

Minimalist Next.js (App Router) site for weekly notes on various topics.

## Content Workflow

### Structure

```
content/
├── real-analysis/
│   ├── week-2/
│   │   ├── index.md          # Weekly Summary
│   │   └── topics/
│   │       └── supremum.md   # Topic Page
│   └── _drafts/              # Drafts (unpublished)
└── linear-algebra/           # Other subjects (future)
```

- **Subject Folder**: `content/<subject>/` (e.g., `real-analysis`, `linear-algebra`)
- **Week Overview (Summary)**: `content/<subject>/week-<n>/index.md`
- **Topic Pages**: `content/<subject>/week-<n>/topics/<slug>.md`
- **Drafts (unpublished)**: `content/<subject>/_drafts/week-<n>/...`

Everything under `_drafts/` is ignored during the build.

### Frontmatter for Weeks

```md
---
title: "Week 5"
week: 5
date: "2026-02-11"
description: "Short description."
---
```

Weeks are sorted by `week` (descending).

### Frontmatter for Topics

```md
---
title: "Supremum and Infimum"
order: 1
description: "Core ideas, examples, counterexamples."
---
```

Topics within a week are sorted by `order` (ascending).

## Images / Assets

- Place images under `public/<subject>/week-<n>/...`.
- Link images in Markdown like this:

```md
![](/real-analysis/week-5/differentiability/intuition.png)
```

**Important**: The `basePath: "/teaching"` in the Next.js configuration automatically adds `/teaching` before all URLs. However, images must include the full path with the subject name (e.g., `/real-analysis/...`) because multiple subjects are supported.

## Callouts / Admonitions

Blockquotes with a prefix are automatically rendered as callouts:

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

## Local Development

```bash
npm install
npm run dev
```

Build (static export):

```bash
npm run build
```

## Deployment (GitHub Pages)

The GitHub Actions pipeline builds and deploys the static export to GitHub Pages (Project Site, Base Path `/teaching`). Workflow file:
`.github/workflows/deploy.yml`.

**Important**: Repo name should be `teaching` for the URL `https://<user>.github.io/teaching/`.

## Page Structure

- `/teaching/` → Landing Page (Subject List)
- `/teaching/<subject>/` → Weekly overview for a subject
- `/teaching/<subject>/week-<n>/` → Weekly Summary + Topic List
- `/teaching/<subject>/week-<n>/<topic>/` → Topic Page

## Add New Subject

1. Create folder: `content/<subject-slug>/`
2. Add weeks: `content/<subject-slug>/week-1/index.md`
3. Add topics: `content/<subject-slug>/week-1/topics/intro.md`
4. Images: `public/<subject-slug>/week-1/...`

The subject is automatically listed on the home page. The subject title is generated from the folder name (e.g., `real-analysis` → "Real Analysis").
