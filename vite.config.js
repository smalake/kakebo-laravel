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
        VitePWA({
            includeAssets: ["offline.html", "favicon.ico", "robots.txt"],
            manifest: {
                theme_color: "#35d1f6",
                background_color: "#35d1f6",
                display: "standalone",
                scope: "/",
                start_url: "/",
                name: "\u4f7f\u3044\u3084\u3059\u3044\u5bb6\u8a08\u7c3f",
                short_name: "\u4f7f\u3044\u3084\u3059\u3044\u5bb6\u8a08\u7c3f",
                icons: [
                    {
                        src: "/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icon-256x256.png",
                        sizes: "256x256",
                        type: "image/png",
                    },
                    {
                        src: "/icon-384x384.png",
                        sizes: "384x384",
                        type: "image/png",
                    },
                    {
                        src: "/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
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
