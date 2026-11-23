import type { Metadata } from "next";
import { Shell } from "@/components/Interna";
import { Sobre } from "@/components/Home2";
export const metadata: Metadata = { title: "Sobre o Dr. Leonardo Xavier", description: "Conheça o Dr. Leonardo Xavier, médico em Resende/RJ, e a forma de trabalhar da clínica." };
export default function Page() { return <Shell><div data-theme="light" className="bg-ivory pt-16" /><Sobre /></Shell>; }
