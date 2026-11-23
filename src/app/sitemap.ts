import type { MetadataRoute } from "next";
import { tratamentos } from "@/data/tratamentos";
export const dynamic = "force-static";
const base = "https://drleonardoxavier.com.br"; // TODO domínio
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/dermatologia/", "/sobre/", "/privacidade/", ...tratamentos.map((t) => `/tratamentos/${t.slug}/`)].map((p) => ({ url: base + p }));
}
