import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const production = true

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    proxy:{
      '/api':{
        target: production ? "https://merneat.onrender.com":"http://localhost:3000",
        secure: false,
      }
    }
  }
})
