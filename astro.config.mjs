// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Pages to keep out of the sitemap: anything marked `draft: true` or `testing: true`.
// Drafts aren't built for the live site anyway; testing pages are live but noindex,
// so listing them here would send Google mixed signals.
function hiddenPages() {
  const hidden = new Set();
  for (const [dir, section] of [['recipes', 'recipes'], ['preps', 'preps'], ['articles', 'tips']]) {
    const base = `./src/content/${dir}`;
    for (const file of readdirSync(base).filter((f) => f.endsWith('.md'))) {
      const frontmatter = readFileSync(`${base}/${file}`, 'utf8').split('---')[1] ?? '';
      if (/^(draft|testing):\s*true\b/m.test(frontmatter)) hidden.add(`/${section}/${file.replace(/\.md$/, '')}/`);
    }
  }
  return hidden;
}
const hidden = hiddenPages();

// Live at the custom domain. GitHub Pages serves it from the root (no `base`).
// The domain itself is set in the repo: Settings → Pages → Custom domain.
export default defineConfig({
  site: 'https://backofthefridgeprep.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !hidden.has(new URL(page).pathname) && !new URL(page).pathname.startsWith('/404'),
    }),
  ],
});
