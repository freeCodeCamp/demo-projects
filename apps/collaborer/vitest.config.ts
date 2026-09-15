/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-utils/setup.ts'],
    // server/ is a separate package with its own vitest.config.ts (node
    // environment, different setup) — exclude it here to avoid running its
    // tests a second time under the frontend's jsdom environment.
    exclude: ['**/node_modules/**', 'server/**']
  }
});
