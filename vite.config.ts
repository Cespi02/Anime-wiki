import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Agrega esta configuración para manejar las rutas
    fs: {
      allow: ['..'] // Permite el acceso a archivos fuera de la carpeta raíz (opcional)
    },
    proxy: {
      // Configura los proxies si es necesario para la API
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      }
    }
  }
});