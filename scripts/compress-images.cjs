const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/menu');
const OUTPUT_DIR = path.join(__dirname, '../public/menu');
const MAX_SIZE = 400; // max width/height in px
const WEBP_QUALITY = 82;
const JPEG_QUALITY = 82;

async function compress(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const base = path.basename(filePath, ext);
    const outPath = path.join(OUTPUT_DIR, base + '.webp');

    // Skip if webp already exists and is newer than source
    if (fs.existsSync(outPath)) {
        const srcStat = fs.statSync(filePath);
        const outStat = fs.statSync(outPath);
        if (outStat.mtimeMs > srcStat.mtimeMs) return null;
    }

    await sharp(filePath)
        .resize(MAX_SIZE, MAX_SIZE, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outPath);

    const srcKB = Math.round(fs.statSync(filePath).size / 1024);
    const outKB = Math.round(fs.statSync(outPath).size / 1024);
    return { base, srcKB, outKB };
}

async function run() {
    const files = fs.readdirSync(INPUT_DIR).filter(f =>
        /\.(png|jpg|jpeg)$/i.test(f) && !f.includes('.webp')
    );

    console.log(`Processing ${files.length} images…`);
    let totalSrc = 0, totalOut = 0;

    for (const f of files) {
        const result = await compress(path.join(INPUT_DIR, f));
        if (result) {
            totalSrc += result.srcKB;
            totalOut += result.outKB;
            const saved = Math.round((1 - result.outKB / result.srcKB) * 100);
            console.log(`  ${result.base}: ${result.srcKB}KB → ${result.outKB}KB (${saved}% saved)`);
        } else {
            console.log(`  SKIP ${f} (up to date)`);
        }
    }

    console.log(`\nDone. ${Math.round(totalSrc/1024)}MB → ${Math.round(totalOut/1024)}MB total`);
}

run().catch(console.error);
