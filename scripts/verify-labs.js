const fs = require('fs');
const path = require('path');

// Read frontend/data/experiments.ts to see what files are imported and concatenated
const expContent = fs.readFileSync(path.join(__dirname, '../frontend/data/experiments.ts'), 'utf8');

// Match all imported arrays in EXPERIMENTS_DATA
const arrayMatch = expContent.match(/export const EXPERIMENTS_DATA:\s*Experiment\[\]\s*=\s*\[([\s\S]*?)\];/);
if (!arrayMatch) {
  console.error("Could not find EXPERIMENTS_DATA");
  process.exit(1);
}

const lines = arrayMatch[1].split('\n')
  .map(l => l.trim().replace(/^\.\.\./, '').replace(/,$/, ''))
  .filter(l => l && !l.startsWith('//'));

console.log('Arrays in EXPERIMENTS_DATA:', lines);

// Find which files export these arrays
const importMatches = [...expContent.matchAll(/import\s*\{\s*([A-Za-z0-9_]+)\s*\}\s*from\s*["']([^"']+)["']/g)];
const arrayToFile = {};
for (const m of importMatches) {
  arrayToFile[m[1]] = m[2];
}

const counts = {};
const labDetails = {};

for (const arrName of lines) {
  const relPath = arrayToFile[arrName];
  if (!relPath) {
    console.log('No file for array:', arrName);
    continue;
  }
  const fullPath = path.resolve(__dirname, '../frontend/data', relPath + '.ts');
  if (!fs.existsSync(fullPath)) {
    console.log('Missing file:', fullPath);
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const labIdMatches = [...content.matchAll(/["']?labId["']?\s*:\s*["']([^"']+)["']/g)];
  for (const lm of labIdMatches) {
    const labId = lm[1];
    counts[labId] = (counts[labId] || 0) + 1;
    if (!labDetails[labId]) labDetails[labId] = [];
  }
}

console.log('\n--- ACTIVE EXPERIMENTS IN EXPERIMENTS_DATA ---');
console.table(counts);

// Compare against LABS_DATA in labs.ts
const labsContent = fs.readFileSync(path.join(__dirname, '../frontend/data/labs.ts'), 'utf8');
const labBlocks = [...labsContent.matchAll(/id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?experimentsCount:\s*(\d+)/g)];

console.log('\n--- LABS_DATA EXPERIMENTS COUNT vs EXPERIMENTS_DATA ---');
let allMatch = true;
for (const b of labBlocks) {
  const labId = b[1];
  const name = b[2];
  const expected = parseInt(b[3], 10);
  const actual = counts[labId] || 0;
  const status = (expected === actual) ? '✅ MATCH' : `❌ MISMATCH (expected ${expected}, got ${actual})`;
  if (expected !== actual) allMatch = false;
  console.log(`${status.padEnd(35)} | ${labId.padEnd(25)} | ${name}`);
}

if (allMatch) {
  console.log('\n🎉 ALL EXPERIMENT COUNTS PERFECTLY MATCH LAB CONFIGS!');
} else {
  console.log('\n⚠️ Some mismatches exist.');
}
