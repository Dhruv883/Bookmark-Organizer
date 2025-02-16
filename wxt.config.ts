import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    side_panel: {
      default_path: "src/entrypoints/sidepanel/index.html",
    },
    name: "Bookmark Organizer",
    description: "Chrome Extension to Re-Organize Bookmarks using AI",
    version: "1.0.0",
    permissions: ["storage", "bookmarks", "sidePanel"],
  },
});
