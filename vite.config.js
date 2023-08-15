import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/ts/app.tsx"],
            refresh: true,
        }),
        react(),
        VitePWA(),
    ],
    server: {
        host: true,
        hmr: {
            host: "localhost",
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./resources/ts"),
        },
    },
});
