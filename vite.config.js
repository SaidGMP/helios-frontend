import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({

  plugins: [

    react(),

    tailwindcss(),

    VitePWA({

      registerType: "autoUpdate",

      devOptions: {
        enabled: true,
      },

      manifest: {

        name: "HELIOS",

        short_name: "HELIOS",

        description:
          "Sistema operativo personal inteligente",

        theme_color: "#09090b",

        background_color: "#09090b",

        display: "standalone",

        start_url: "/",

        icons: [

          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },

        ],
      },
    }),
  ],
});