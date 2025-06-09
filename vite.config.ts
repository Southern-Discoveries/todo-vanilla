import { dirname, resolve } from "path";
import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import { readdirSync } from "fs";

export default defineConfig(({ command }) => {
  return {
    plugins: [tailwindcss()],

    build: {
      rollupOptions: (function () {
        const files = readdirSync("./");

        const pages = files.filter((meta) => meta.endsWith(".html"));

        return {
          input: Object.fromEntries(
            pages
              .map((meta) => {
                const [name] = meta.split(".");

                return [name, resolve(dirname("./"), meta)];
              })
              .map(([page, path]) => [page, path])
          ),
        };
      })(),
    },

    base: command === "build" ? "todo-vanilla/" : "/",
  };
});
