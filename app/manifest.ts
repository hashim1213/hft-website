import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bytesavy Digital Solutions",
    short_name: "Bytesavy",
    description: "Product design and software engineering for essential industries.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10130f",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  }
}
