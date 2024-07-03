import { resolve } from 'path';
import { defineConfig } from 'vite';
// import handlebars from 'vite-plugin-handlebars';
// import checker from 'vite-plugin-checker'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'build'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.ts'),
    },
    /*rollupOptions: {
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
    },*/
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [/*handlebars({
    partialDirectory: resolve(__dirname, 'src/partials'),
  }),
  checker({
    // e.g. use TypeScript check
    typescript: true,
  })*/],
});
