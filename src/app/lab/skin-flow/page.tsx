import type { Metadata } from "next";
import SkinFlow from "@/components/SkinFlow";
export const metadata: Metadata = { title: "Lab · Skin Flow", robots: { index: false } };
export default function Page() {
  return (
    <main className="grain relative h-[100svh] overflow-hidden bg-forest-950 text-sand-100">
      <SkinFlow />
      <p className="eyebrow absolute bottom-8 left-8 text-champagne-500">Skin Flow · mova o cursor ou toque</p>
    </main>
  );
}
