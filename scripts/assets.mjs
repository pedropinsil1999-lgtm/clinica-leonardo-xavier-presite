import sharp from 'sharp';
const src='../entrada/dr-leonardo-recorte.webp', out='public/midia/';
const meta=await sharp(src).metadata(); console.log(meta.width,meta.height);
// alpha erode 1px to kill halo
const base = sharp(src).ensureAlpha();
for (const w of [640,960,1400]) {
  await sharp(src).resize({width:w}).avif({quality:62,effort:6}).toFile(`${out}dr-leonardo-${w}.avif`);
  await sharp(src).resize({width:w}).webp({quality:82,alphaQuality:90}).toFile(`${out}dr-leonardo-${w}.webp`);
}
// OG image 1200x630
const doc = await sharp(src).resize({height:600}).toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="g" cx="72%" cy="35%" r="45%"><stop offset="0" stop-color="#C8B08A" stop-opacity=".28"/><stop offset="1" stop-color="#08211D" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="#08211D"/><rect width="1200" height="630" fill="url(#g)"/><text x="70" y="250" font-family="Georgia,serif" font-size="64" fill="#EFE7DB">Dermatologia que cuida,</text><text x="70" y="330" font-family="Georgia,serif" font-style="italic" font-size="64" fill="#C8B08A">com segurança.</text><text x="70" y="430" font-family="Helvetica,Arial" letter-spacing="8" font-size="20" fill="#E3D5BF">DR. LEONARDO XAVIER · RESENDE/RJ</text></svg>`;
await sharp(Buffer.from(svg)).composite([{input:doc,left:760,top:30}]).jpeg({quality:85}).toFile(`${out}og.jpg`);
