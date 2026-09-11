import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: "node-server",
  compatibilityDate: "2026-09-11",
  serveStatic: true,
  output: {
    dir: ".output",
    serverDir: ".output/server",
    publicDir: ".output/public",
  },
});
