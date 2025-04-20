const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../images/verticales/verde.jpg');
const outputDir = path.join(__dirname, '../images/verticales');
const sizes = [360, 720, 1080, 1440];

(async () => {
  try {
    for (const width of sizes) {
      const outputPath = path.join(outputDir, `verde-${width}.jpg`);
      await sharp(inputPath).resize({ width }).toFile(outputPath);
      console.log(`✅ Generada: ${outputPath}`);
    }
    console.log('✅ Todas las versiones de VERDE (otoño mobile) generadas correctamente.');
  } catch (err) {
    console.error('❌ Error al generar imágenes:', err);
  }
})();
