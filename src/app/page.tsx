import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import Reveals from "@/components/Reveals";
import { Marquee, Manifesto, Portas, Tratamentos, Tecnologia, PrimeiraConsulta } from "@/components/Home1";
import { Sobre, Clinica, Aprenda, Duvidas, Avaliacoes, CTAFinal, Footer } from "@/components/Home2";
import { clinica, PRESITE } from "@/data/clinica";

const schema = {
  "@context": "https://schema.org", "@type": ["MedicalBusiness", "Physician"], name: clinica.nome, medicalSpecialty: "Dermatology",
  telephone: "+55 24 99248-2326", address: { "@type": "PostalAddress", streetAddress: "Av. Marcílio Dias, 563, sala 602", addressLocality: "Resende", addressRegion: "RJ", addressCountry: "BR" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: clinica.google.avaliacoes }, sameAs: [clinica.instagram.url],
};

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero /><Marquee /><Manifesto /><Portas /><Tratamentos /><Tecnologia /><PrimeiraConsulta /><Sobre /><Clinica /><Aprenda /><Duvidas /><Avaliacoes /><CTAFinal />
      </main>
      <Footer />
      <Reveals />
      {!PRESITE && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
    </>
  );
}
