// Imagem responsiva AVIF + WebP, versões 480w e 900w, dimensões explícitas (sem CLS)
export default function Img({ name, alt, className = "", w = 900, h = 1125, priority = false, sizes = "(min-width: 900px) 30vw, 80vw" }: { name: string; alt: string; className?: string; w?: number; h?: number; priority?: boolean; sizes?: string }) {
  const set = (ext: string) => `/midia/arte/${name}-sm.${ext} 480w, /midia/arte/${name}.${ext} 900w`;
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img src={`/midia/arte/${name}.webp`} srcSet={set("webp")} sizes={sizes} alt={alt} width={w} height={h} loading={priority ? "eager" : "lazy"} decoding="async" className={`h-full w-full object-cover ${className}`} />
    </picture>
  );
}
