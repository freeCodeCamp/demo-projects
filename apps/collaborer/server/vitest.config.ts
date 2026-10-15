import { defineConfig } from 'vitest/config';

// A plain Node config, not `getViteConfig` from `astro/config` — this is a
// separate package (server/) with no relationship to the Astro frontend, and
// inheriting Astro's Vite context here just produces unrelated warnings.
export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./src/test-utils/setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**']
  }
});
