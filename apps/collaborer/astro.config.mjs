// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import node from '@astrojs/node';
import react from '@astrojs/react';

// Server output (not static): every page's actual content is fetched
// client-side from the API regardless, but dynamic routes like tasks/[id]
// and password-reset/[token] resolve arbitrary runtime IDs that can't be
// enumerated at build time the way static output requires.
//
// "middleware" (not "standalone"): production deploys mount this build's
// handler inside the same Express process as the API (see
// server/src/prod.ts), rather than Astro running its own HTTP server — the
// deploy target expects one process on one port, not two.
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  integrations: [react()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Lato',
      cssVariable: '--font-lato',
      weights: [400, 700]
    },
    {
      // Self-hosted rather than fetched from Google: Hack isn't a Google Fonts
      // family. Files come from the `hack-font` npm package (MIT-licensed; see
      // src/assets/fonts/HACK-LICENSE.md) — see the command-line-chic design
      // skill's approved type stack (Hack-ZeroSlash for code/mono content).
      provider: fontProviders.local(),
      name: 'Hack',
      cssVariable: '--font-hack',
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/hack-regular.woff2']
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./src/assets/fonts/hack-bold.woff2']
          }
        ]
      }
    }
  ],
  prefetch: {
    // 'viewport' is quite an aggressive strategy.  'hover' could suffice, but we need to experiment.
    defaultStrategy: 'viewport',
    prefetchAll: true
  }
});
