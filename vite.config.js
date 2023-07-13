import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/ts/app.tsx"],
            refresh: true,
        }),
        react(),
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
