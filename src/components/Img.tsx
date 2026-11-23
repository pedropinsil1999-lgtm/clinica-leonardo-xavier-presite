// Imagem responsiva AVIF + WebP com dimensões explícitas (sem CLS)
export default function Img({ name, alt, className = "", w = 900, h = 1125, priority = false }: { name: string; alt: string; className?: string; w?: number; h?: number; priority?: boolean }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`/midia/arte/${name}.avif`} />
      <img src={`/midia/arte/${name}.webp`} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} decoding="async" className={`h-full w-full object-cover ${className}`} />
    </picture>
  );
}
