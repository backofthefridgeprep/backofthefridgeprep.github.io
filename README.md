# Back of the Fridge

Sunday meal prep, tested in my kitchen. By Shreya. Live at https://backofthefridgeprep.github.io

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

Set `draft: true` to keep something off the live site while you finish it. A recipe can only be published once it has a `tested:` block (the date you cooked it) — the build fails otherwise.

**Photos** go in `src/assets/photos/`. Reference them from a recipe with `image: ../../assets/photos/<file>.jpg` plus an `imageAlt`. Astro resizes and compresses them at build time.

**Brand strings** (name, byline, tagline, email, Pinterest) live in `src/lib/site.ts`.

## Settings

- **Email signup:** with no setup, the button opens an email to backofthefridge.prep@gmail.com. To use a newsletter service, add a repo variable `PUBLIC_SIGNUP_ACTION` (Settings → Secrets and variables → Actions → Variables) set to the service's form URL. The form posts a field named `email`.
- **Custom domain:** change `site` in `astro.config.mjs` and add `public/CNAME`.

## First-time GitHub Pages setup

Repo → Settings → Pages → Source: **GitHub Actions**.
