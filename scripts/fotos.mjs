import sharp from 'sharp';
const src = '../entrada/stock/', out = 'public/midia/arte/';
// destino <- arquivo de origem (alguns trocados para combinar com o sentido da seção)
const map = { 'porta-saude':'porta-saude','porta-estetica':'aprenda-3','consulta':'consulta','toxina':'toxina','bioestimulador':'tecnologia','tecnologia':'bioestimulador',
  'limpeza':'limpeza','laser':'laser','corporais':'corporais','cirurgia':'cirurgia','espaco-2':'espaco-2','espaco-3':'espaco-3','espaco-4':'espaco-4','espaco-5':'espaco-5',
  'aprenda-1':'aprenda-1','aprenda-2':'aprenda-2','aprenda-3':'porta-estetica','aprenda-4':'aprenda-4' };
for (const [dst, s] of Object.entries(map)) {
  const m = await sharp(src + s + '.jpg').metadata();
  let img = sharp(src + s + '.jpg');
  // limpeza: o topo mostra frascos de produto; recorta só o rosto
  if (s === 'limpeza') img = img.extract({ left: 0, top: Math.round(m.height * 0.38), width: m.width, height: Math.round(m.height * 0.62) });
  const buf = await img.resize(900, 1125, { fit: 'cover', position: s === 'limpeza' ? 'centre' : s === 'porta-estetica' ? 'south' : sharp.strategy.attention }).toBuffer();
  await sharp(buf).avif({ quality: 52, effort: 5 }).toFile(`${out}${dst}.avif`);
  await sharp(buf).webp({ quality: 74 }).toFile(`${out}${dst}.webp`);
  const sm = await sharp(buf).resize(480).toBuffer();
  await sharp(sm).avif({ quality: 50, effort: 5 }).toFile(`${out}${dst}-sm.avif`);
  await sharp(sm).webp({ quality: 70 }).toFile(`${out}${dst}-sm.webp`);
}
console.log('ok');
