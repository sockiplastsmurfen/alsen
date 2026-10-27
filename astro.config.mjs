import { defineConfig } from 'astro/config';

// SITE and BASE are set by the GitHub Actions workflow.
// Locally they default to a root-served site; with a custom domain, BASE is '/'.
export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
});
