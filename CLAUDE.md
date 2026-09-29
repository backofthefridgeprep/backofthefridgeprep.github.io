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
- Photos: her own only, in `src/assets/photos/`, with `imageAlt`. No AI-generated food images.
- YAML: in `{ item: ..., note: ... }` flow style, quote any value containing a comma, or it silently splits.
- `draft: true` keeps a file off the live site.
- Nutrition is always labeled "estimated" (USDA FoodData Central). No health claims; use careful wording like "lower in saturated fat". Footer has a "not medical advice" note.
- Rewrite recipes adapted from others in her own words and credit them via `source`.
- Tag cuisine on every recipe.

## Brand
- Voice: first person, plain, warm, unfussy. Audience: busy working parents who prep once a week.
- Look: warm and bright (warm off-white #fffcf7 background, espresso brown text and bands), paprika red as the one pop color, saffron for the tested stamp. Fonts: Fraunces (display, italic "script" accents), Newsreader (body), Instrument Sans (labels).
- Logo: text only — "BotF" monogram, stacked "Back of / the Fridge" wordmark.
- Email: backofthefridge.prep@gmail.com. Pinterest: https://www.pinterest.com/backofthefridgeprep/
- Instagram is out of scope for now; Pinterest + LinkedIn build-in-public.

## Plan
- Week 1–2: schema, PDF conversion, Astro setup, deploy.
- Week 3: photos, Python nutrition script, more recipes.
- Week 4: polish, real email signup (set `PUBLIC_SIGNUP_ACTION`), launch post.
- Drafts waiting for amounts: Ganesh Chaturthi week prep, cauliflower chickpea tacos, yogurt-marinated chicken.
- About page is a placeholder; Shreya will rewrite it.
