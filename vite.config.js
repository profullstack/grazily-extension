import { defineConfig } from "vite";
import { join } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",
          dest: ".",
        },
        {
          src: "./assets",
          dest: ".",
        },
        {
          src: "./src/*",
          dest: ".",
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "",
    rollupOptions: {
      input: {
        popup: join(__dirname, "popup.html"),
      },
    },
  },
});
