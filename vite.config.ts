import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pace calculator',
        short_name: 'Pace calculator',
        background_color: '#3730a3',
        theme_color: '#3730a3',
        display: 'fullscreen',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
