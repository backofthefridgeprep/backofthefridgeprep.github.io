// @ts-check
import { defineConfig } from 'astro/config';

// fridgefirstprep.github.io is a user/org site, so it's served from the root (no `base`).
// When the custom domain arrives, change `site` and add public/CNAME.
export default defineConfig({
  site: 'https://fridgefirstprep.github.io',
  trailingSlash: 'always',
});
