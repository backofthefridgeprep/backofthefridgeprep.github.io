# Back of the Fridge — notes for Claude

"Sunday meal prep, tested in my kitchen." by Shreya — a busy mom.
Static Astro site at https://backofthefridgeprep.github.io, deployed by GitHub Actions on push to `main`.

## The one rule
Nothing is published until Shreya has cooked it. The schema enforces this: a recipe with `draft: false` must have a `tested:` block with the date she cooked it. Never add or change a `tested` date on her behalf; ask her. AI can suggest ideas and drafts; she cooks, fixes, photographs, then publishes.

## About the owner
Shreya is strong in Python/ML and newer to frontend. Explain frontend changes briefly. Keep Python for data pipelines (PDF → recipe files, USDA nutrition estimates) in `scripts/` with its own `.venv`.

## Commands
- `npm run dev` — local site at http://localhost:4321 (drafts visible)
- `npm run build` — type-check + build (drafts excluded). Run before pushing.

## Content rules
- Recipes: `src/content/recipes/<slug>.md`. Preps: `src/content/preps/<slug>.md`. Schema: `src/content.config.ts`. Brand strings: `src/lib/site.ts`.
- Structured data in frontmatter, method in the Markdown body. This data will feed the "reverse recipe" agent later, so keep it consistent.
- `changes:` = "What I changed" notes, in her words. Don't invent them.
- Photos: her own only. Drop the file in `src/assets/photos/` and set `photo: <file name>` plus `imageAlt` on the recipe. A missing file shows a placeholder (warning in the build log), not an error. No AI-generated food images.
- Recipe steps: short, plain sentences, one action per step, and self-contained (no "see the prep page"). Use `## Group` headings only when a recipe has more than one part.
- Recipe page is built for cooking: big ingredient checklist (no inner scroll), tap-to-mark-done steps, keep-screen-on button. Keep it simple.
- Recipe list filters: cuisine and total time only.
- YAML: in `{ item: ..., note: ... }` flow style, quote any value containing a comma, or it silently splits.
- `draft: true` keeps a file off the live site.
- Nutrition is always labeled "estimated" (USDA FoodData Central). No health claims; use careful wording like "lower in saturated fat". Footer has a "not medical advice" note.
- Rewrite recipes adapted from others in her own words and credit them via `source`.
- Tag cuisine on every recipe.

## Brand
- Voice: first person, plain, warm, unfussy. Audience: busy working parents who prep once a week.
- Palette (Sep 30): peach #fadfc8, apricot #f0cdb1, salmon #ef8a7f, white, cocoa #6d4340. **Salmon is the pop color**; brown stays in the background. Salmon fills (buttons, badges, step numbers) carry dark text (`--on-pop`); large salmon text uses `--accent-big` #e56b60; small salmon text/links use `--accent` #bb5047 so it stays readable. White page, cocoa body text, peach home band, softer brown footer (#835c56). Colors live at the top of `src/styles/global.css`. Fonts: Fraunces (display, italic "script" accents), Newsreader (body), Instrument Sans (labels).
- Logo: text only — "BotF" monogram with a salmon B, stacked "Back of / the Fridge" wordmark (weight 600). Favicon: dark B on a salmon circle.
- Email: backofthefridge.prep@gmail.com. Pinterest: https://www.pinterest.com/backofthefridgeprep/
- Instagram is out of scope for now; Pinterest + LinkedIn build-in-public.

## Plan
- Week 1–2: schema, PDF conversion, Astro setup, deploy.
- Week 3: photos, Python nutrition script, more recipes.
- Week 4: polish, real email signup (set `PUBLIC_SIGNUP_ACTION`), launch post.
- Drafts waiting for amounts: Ganesh Chaturthi week prep, cauliflower chickpea tacos, yogurt-marinated chicken.
- About page is a placeholder; Shreya will rewrite it.
