import type { MetadataRoute } from "next";
import { PRESITE } from "@/data/clinica";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return PRESITE ? { rules: { userAgent: "*", disallow: "/" } } : { rules: { userAgent: "*", allow: "/" }, sitemap: "https://drleonardoxavier.com.br/sitemap.xml" };
}
