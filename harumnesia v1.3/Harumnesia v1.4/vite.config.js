import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/ml": {
        target: "https://ml.harumnesia.web.id",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ml/, ""),
        secure: true,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("🔄 Proxying ML API request:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log("✅ ML API response:", proxyRes.statusCode);
          });
          proxy.on("error", (err, req, res) => {
            console.error("❌ Proxy error:", err);
          });
        },
      },
    },
  },
});
