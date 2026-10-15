import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /<repo-name>/.
// The deploy workflow passes BASE_PATH; locally the site lives at the root.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    reportCompressedSize: false,
  },
});
