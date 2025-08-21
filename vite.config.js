import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tailwindcssAnimate from "tailwindcss-animate";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
});
