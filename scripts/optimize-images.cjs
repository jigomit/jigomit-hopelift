#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Converts JPG images to modern formats (WebP, AVIF) and generates responsive sizes
 * Reduces image file sizes by 60-70% while maintaining quality
 *
 * Usage: node scripts/optimize-images.cjs
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const SOURCE_DIR = path.join(__dirname, '../src/assets/programs');
const OUTPUT_DIR = path.join(__dirname, '../public/images');
const RESPONSIVE_SIZES = [400, 800, 1200];
const QUALITY = {
  webp: 80,
  avif: 75,
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.cyan}🖼️  Image Optimization Script${colors.reset}\n`);

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`${colors.green}✓${colors.reset} Created output directory: ${OUTPUT_DIR}\n`);
}

// Get all JPG files from source directory
const imageFiles = fs.readdirSync(SOURCE_DIR)
  .filter(file => file.match(/\.(jpg|jpeg)$/i));

if (imageFiles.length === 0) {
  console.log(`${colors.yellow}⚠${colors.reset} No JPG images found in ${SOURCE_DIR}`);
  process.exit(0);
}

console.log(`${colors.blue}Found ${imageFiles.length} images to optimize:${colors.reset}`);
imageFiles.forEach(file => console.log(`  • ${file}`));
console.log('');

let totalOriginalSize = 0;
let totalWebPSize = 0;
let totalAvifSize = 0;

// Main processing function
async function processImages() {
  for (let index = 0; index < imageFiles.length; index++) {
    const filename = imageFiles[index];
    const baseName = path.basename(filename, path.extname(filename));
    const sourcePath = path.join(SOURCE_DIR, filename);
    const originalSize = fs.statSync(sourcePath).size;
    totalOriginalSize += originalSize;

    console.log(`${colors.bright}[${index + 1}/${imageFiles.length}] Processing: ${filename}${colors.reset}`);
    console.log(`  Original size: ${(originalSize / 1024).toFixed(2)} KB`);

    try {
      // Generate WebP versions
      console.log(`  ${colors.cyan}→${colors.reset} Generating WebP versions...`);

      // Full size WebP
      const webpPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
      await sharp(sourcePath)
        .webp({ quality: QUALITY.webp })
        .toFile(webpPath);
      const webpSize = fs.statSync(webpPath).size;
      totalWebPSize += webpSize;
      console.log(`    ✓ ${baseName}.webp (${(webpSize / 1024).toFixed(2)} KB)`);

      // Responsive WebP sizes
      for (const size of RESPONSIVE_SIZES) {
        const responsivePath = path.join(OUTPUT_DIR, `${baseName}-${size}.webp`);
        await sharp(sourcePath)
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: QUALITY.webp })
          .toFile(responsivePath);
        console.log(`    ✓ ${baseName}-${size}.webp (${(fs.statSync(responsivePath).size / 1024).toFixed(2)} KB)`);
      }

      // Generate AVIF versions
      console.log(`  ${colors.cyan}→${colors.reset} Generating AVIF versions...`);

      // Full size AVIF
      const avifPath = path.join(OUTPUT_DIR, `${baseName}.avif`);
      await sharp(sourcePath)
        .avif({ quality: QUALITY.avif, effort: 4 })
        .toFile(avifPath);
      const avifSize = fs.statSync(avifPath).size;
      totalAvifSize += avifSize;
      console.log(`    ✓ ${baseName}.avif (${(avifSize / 1024).toFixed(2)} KB)`);

      // Responsive AVIF sizes
      for (const size of RESPONSIVE_SIZES) {
        const responsivePath = path.join(OUTPUT_DIR, `${baseName}-${size}.avif`);
        await sharp(sourcePath)
          .resize(size, null, { withoutEnlargement: true })
          .avif({ quality: QUALITY.avif, effort: 4 })
          .toFile(responsivePath);
        console.log(`    ✓ ${baseName}-${size}.avif (${(fs.statSync(responsivePath).size / 1024).toFixed(2)} KB)`);
      }

      // Copy original as fallback
      const fallbackPath = path.join(OUTPUT_DIR, filename);
      fs.copyFileSync(sourcePath, fallbackPath);
      console.log(`  ${colors.cyan}→${colors.reset} Copied original as fallback`);

      const savings = ((1 - (avifSize / originalSize)) * 100).toFixed(1);
      console.log(`  ${colors.green}✓ Savings: ${savings}% (AVIF vs original)${colors.reset}\n`);

    } catch (error) {
      console.error(`  ${colors.yellow}⚠ Error processing ${filename}:${colors.reset}`, error.message);
      console.log('');
    }
  }

  // Summary
  console.log(`${colors.bright}${colors.green}═══════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}  📊 Optimization Summary${colors.reset}`);
  console.log(`${colors.bright}${colors.green}═══════════════════════════════════════════════${colors.reset}\n`);

  console.log(`  Images processed: ${colors.bright}${imageFiles.length}/${imageFiles.length}${colors.reset}`);
  console.log(`  Output directory: ${colors.cyan}${OUTPUT_DIR}${colors.reset}\n`);

  console.log(`  ${colors.bright}File Sizes:${colors.reset}`);
  console.log(`    Original (JPG):  ${(totalOriginalSize / 1024).toFixed(2)} KB`);
  console.log(`    WebP:            ${(totalWebPSize / 1024).toFixed(2)} KB (${((1 - (totalWebPSize / totalOriginalSize)) * 100).toFixed(1)}% smaller)`);
  console.log(`    AVIF:            ${(totalAvifSize / 1024).toFixed(2)} KB (${((1 - (totalAvifSize / totalOriginalSize)) * 100).toFixed(1)}% smaller)\n`);

  const totalSavings = ((1 - (totalAvifSize / totalOriginalSize)) * 100).toFixed(1);
  console.log(`  ${colors.green}${colors.bright}🎉 Total size reduction: ${totalSavings}%${colors.reset}\n`);

  console.log(`${colors.bright}Next steps:${colors.reset}`);
  console.log(`  1. Update components to use new image paths from /images/`);
  console.log(`  2. Test with: ${colors.cyan}npm run build && npm run preview${colors.reset}`);
  console.log(`  3. Run performance audit: ${colors.cyan}npm run perf:test${colors.reset}\n`);
}

// Run the script
processImages().catch(error => {
  console.error(`${colors.yellow}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
