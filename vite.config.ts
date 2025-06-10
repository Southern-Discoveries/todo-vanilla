import { dirname, resolve } from "path";
import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import { readdirSync } from "fs";
import utilsConstants from "./utils/utils.constants";

export default defineConfig(({ command }) => {
  return {
    plugins: [tailwindcss()],

    build: {
      rollupOptions: (function () {
        const parseHTML = (function () {
          const files = readdirSync("./");

          const pages = files.filter((meta) => meta.endsWith(".html"));

          return Object.fromEntries(
            pages
              .map((meta) => {
                const [name] = meta.split(".");

                return [name, resolve(dirname("./"), meta)];
              })
              .map(([page, path]) => [page, path])
          );
        })();

        return {
          input: {
            ...parseHTML,
          },
        };
      })(),
    },

    base: command === "build" ? `${utilsConstants.BASE_PATH}/` : "/",
  };
});
