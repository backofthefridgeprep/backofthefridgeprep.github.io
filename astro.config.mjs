// @ts-check
import { defineConfig } from 'astro/config';

// Live at the custom domain. GitHub Pages serves it from the root (no `base`).
// The domain itself is set in the repo: Settings → Pages → Custom domain.
export default defineConfig({
  site: 'https://backofthefridgeprep.com',
  trailingSlash: 'always',
});
