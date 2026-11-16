const fs = require('node:fs/promises');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'dist');
const staticEntries = ['index.html', 'css', 'js'];

async function build() {
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  for (const entry of staticEntries) {
    await fs.cp(path.join(rootDir, entry), path.join(outputDir, entry), { recursive: true });
  }
}

build().catch(error => {
  console.error('Static site build failed:', error);
  process.exitCode = 1;
});
