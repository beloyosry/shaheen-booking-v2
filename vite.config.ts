import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    const apiTarget = env.VITE_PRODUCTION_API_BASE_URL;

    console.log(`[VITE] API Target: ${apiTarget}`);

    return {
        plugins: [react(), tailwindcss()],
        server: {
            proxy: {
                "/api": {
                    target: apiTarget,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        optimizeDeps: {
            exclude: ["lucide-react"],
        },
    };
});
