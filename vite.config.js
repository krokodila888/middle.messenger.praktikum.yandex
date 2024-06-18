import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'build'),
    rollupOptions: {
      input: resolve(__dirname, './index.html'),
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
  plugins: [handlebars({
    partialDirectory: resolve(__dirname, 'src/partials'),
  })],
});
