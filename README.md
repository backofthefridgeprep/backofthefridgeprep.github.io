# Fridge First

Weekly meal prep from what you already have. Live at https://fridgefirstprep.github.io

Built with [Astro](https://astro.build), deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321 — drafts are visible here
npm run build      # type-check + build to dist/ (drafts are left out)
```

## Adding content

Everything lives in `src/content/`. The schema is in `src/content.config.ts`; the build fails loudly if a file doesn't match it.

**A recipe** — `src/content/recipes/<slug>.md`. Structured data goes in the frontmatter (ingredients, times, storage, diet, tags); the method goes in the Markdown body. Copy an existing file as a starting point.

**A Sunday prep** — `src/content/preps/<slug>.md`. The week's menu, the cooking timeline, and a list of the recipe slugs it uses.

YAML gotcha: in the `{ item: ..., note: ... }` style, any value containing a comma must be in quotes, e.g. `note: "stems trimmed, halved if large"`.

Set `draft: true` to keep something off the live site while you finish it.

## Settings

- **Email signup:** with no setup, the button opens an email to fridgefirst.prep@gmail.com. To use a newsletter service, add a repo variable `PUBLIC_SIGNUP_ACTION` (Settings → Secrets and variables → Actions → Variables) set to the service's form URL. The form posts a field named `email`.
- **Custom domain:** change `site` in `astro.config.mjs` and add `public/CNAME`.

## First-time GitHub Pages setup

Repo → Settings → Pages → Source: **GitHub Actions**.
