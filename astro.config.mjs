// @ts-check
import { defineConfig } from 'astro/config';

// backofthefridgeprep.github.io is a user/org site, so it's served from the root (no `base`).
// When the custom domain arrives (backofthefridge.com), change `site` and add public/CNAME.
export default defineConfig({
  site: 'https://backofthefridgeprep.github.io',
  trailingSlash: 'always',
});
