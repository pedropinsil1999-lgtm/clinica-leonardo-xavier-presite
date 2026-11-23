import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { PRESITE } from "@/data/clinica";
import Providers from "@/components/Providers";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://drleonardoxavier.com.br"), // TODO: domínio definitivo
  title: { default: "Dermatologista em Resende/RJ | Dr. Leonardo Xavier", template: "%s | Dr. Leonardo Xavier" },
  description: "Clínica Dr. Leonardo Xavier: dermatologia e estética avançada em Resende/RJ. Consultas, procedimentos faciais e corporais, laser. Agende sua avaliação.",
  robots: PRESITE ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { type: "website", locale: "pt_BR", siteName: "Clínica Dr. Leonardo Xavier", images: ["/midia/og.jpg"] },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#08211D", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${hanken.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
