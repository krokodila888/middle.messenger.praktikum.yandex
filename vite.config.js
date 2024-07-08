import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: "../public",
  build: {
    outDir: resolve(__dirname, 'build'),
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        nested: resolve(__dirname, 'src/index.ts'),
      },
    },
    output: {
      chunkFileNames: 'assets/[name]-[hash].png',
      entryFileNames: 'assets/[name]-[hash].png',
      
      assetFileNames: ({name}) => {
        if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
            return 'assets/images/[name]-[hash][extname]';
        }
        
        if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';   
        }
        return 'assets/[name]-[hash][extname]';
      },
    },
  },
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [],
});
