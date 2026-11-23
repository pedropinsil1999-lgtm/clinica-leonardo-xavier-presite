import Link from "next/link";
import { Monogram } from "@/components/Logo";
export default function NotFound() {
  return (
    <main data-theme="dark" className="grain grid min-h-[100svh] place-items-center bg-forest-950 px-5 text-center text-sand-100">
      <div>
        <Monogram className="mx-auto h-20 w-20 text-champagne-500" />
        <h1 className="display h-xl mt-8">Página <em className="text-champagne-500">não encontrada.</em></h1>
        <p className="lead mt-4 text-sand-100/75">O endereço pode ter mudado. Que tal começar pela página inicial?</p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link href="/" className="ulink">Página inicial</Link>
          <Link href="/?agendar=1" className="ulink text-champagne-300">Agendar avaliação</Link>
        </div>
      </div>
    </main>
  );
}
