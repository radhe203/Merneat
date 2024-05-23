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
  // // server:{
  // //   proxy:{
  // //     '/api':{
  // //       target: "https://merneat.netlify.app
  // //       secure: false,
  // //     }
  // //   }
  // }
})
// "https://merneat.netlify.app