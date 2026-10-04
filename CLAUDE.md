# Back of the Fridge — notes for Claude

Back of the Fridge, by Shreya. (Tagline "Sunday meal prep, tested in my kitchen." is used only in page descriptions, not shown on the page.)
Static Astro site at https://backofthefridgeprep.com (GitHub Pages, repo backofthefridgeprep/backofthefridgeprep.github.io), deployed by GitHub Actions on push to `main`.

## The one rule
Nothing is published until Shreya has cooked it. The schema enforces this: a recipe with `draft: false` must have a `tested:` block with the date she cooked it. Never add or change a `tested` date on her behalf; ask her. AI can suggest ideas and drafts; she cooks, fixes, photographs, then publishes.
Exception she chose: `testing: true` puts a recipe or prep live before she's cooked it, so she can cook from the site. It's labeled "Testing — not cooked yet", gets no Tested stamp, and is `noindex` with no recipe structured data. When she's cooked it, replace `testing: true` with a `tested:` block (date from her).

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
- Recipe page is built for cooking and shopping: no description or diet tags up top; ingredients grouped by shopping aisle (veggies, protein, grains, spices, pantry, frozen — auto-guessed in `src/lib/aisles.ts`, override with `aisle:` on an ingredient); tap an item or step to cross it off (no checkboxes); "For little ones" sits at the top of the steps; keep-screen-on button. Keep it simple.
- Storing and reheating is a standard labeled table (`src/components/StorageTable.astro`) built from `storage` + `reheat`. Keep `reheat` and `storage.notes` short phrases, not paragraphs.
- Recipe list: photos first; filters are cuisine, total time, storage (freezes / fridge only), and "Who it's for" (shown only when a baby recipe exists; `/recipes/?for=baby` opens it pre-filtered). Cards show no description or diet chips.
- Baby food: set `babyAge: 9 months+` on the recipe. That labels it "Baby food", puts it under the Baby filter, and adds a short safety box above the steps. No salt/sugar/honey in these recipes. Slugs start with `baby-`.
- Sunday preps: pop-color "Cook one day. Eat all week." banner. No day-by-day menu. `dishes` lists what the week holds with servings, split into "Eat first (within 3 days)" vs "Freezer-friendly" (derived from `recipes` if omitted). `plan` is sections (e.g. Afternoon, Evening) of steps; use `together:` for things that happen at the same time; `recipe:` on a step adds a chip that opens that recipe's ingredients and steps in a pop-up. Keep preps generic (no guest/festival framing).
- Tips: `src/content/articles/<slug>.md` → /tips/. Shreya's personal experience and advice, in her voice. Don't invent experiences for her.
- YAML: in `{ item: ..., note: ... }` flow style, quote any value containing a comma, or it silently splits.
- `draft: true` keeps a file off the live site. `testing: true` shows it live, labeled as not yet cooked.
- Nutrition is always labeled "estimated" (USDA FoodData Central). No health claims; use careful wording like "lower in saturated fat". Footer has a "not medical advice" note.
- Rewrite recipes adapted from others in her own words and credit them via `source`.
- Tag cuisine on every recipe.

## Brand
- Voice: first person, plain, warm, unfussy. Audience: busy working parents who prep once a week.
- Look: warm and bright (warm off-white #fffcf7 background, espresso brown text and bands), red #cd4b4b as the one pop color, saffron for the tested stamp. Fonts: Fraunces (display, italic "script" accents), Newsreader (body), Instrument Sans (labels).
- Logo: text only — "BotF" monogram with a red B, stacked "Back of / the Fridge" wordmark (weight 600). Byline: "by Shreya". Favicon: red B on off-white.
- Email: backofthefridge.prep@gmail.com. Pinterest: https://www.pinterest.com/backofthefridgeprep/
- Instagram is out of scope for now; Pinterest + LinkedIn build-in-public.

## Plan
- Week 1–2: schema, PDF conversion, Astro setup, deploy.
- Week 3: photos, Python nutrition script, more recipes.
- Week 4: polish, real email signup (set `PUBLIC_SIGNUP_ACTION`), launch post.
- Drafts waiting for amounts: Ganesh Chaturthi week prep, yogurt-marinated chicken.
- Live as `testing: true`, waiting to be cooked: baby week prep (`baby-week-prep`) and its five `baby-*` recipes, from Shreya's baby meal prep PDF.
- About page is a placeholder; Shreya will rewrite it.

## Workflow
- Shreya edits in VS Code with the Claude Code extension and pushes to GitHub; GitHub Actions builds and deploys. No zip files.
- Before pushing: `npm run build` must pass.
- Domain: backofthefridgeprep.com (DNS points at GitHub Pages; set in repo Settings → Pages).
