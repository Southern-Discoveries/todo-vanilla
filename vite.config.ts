import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],

  build: {
    manifest: true,
  },

  base: "southern-discoveries.github.io/todo-vanilla/",
  // publicDir: "assets",
});
