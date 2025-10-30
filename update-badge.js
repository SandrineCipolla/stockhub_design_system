import fs from 'fs';

const reportPath = './storybook-static/lighthouse-report.json';
const readmePath = './README.md';

// Lecture du score d'accessibilité dans le rapport JSON
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const score = Math.round((report.categories.accessibility.score || 0) * 100);

// Génération du badge Markdown
const badge = `![Accessibilité Lighthouse](https://img.shields.io/badge/accessibility-${score}%2F100-brightgreen?logo=lighthouse)`;

// Lecture du README
let readme = fs.readFileSync(readmePath, 'utf8');

// Remplacement du badge existant
readme = readme.replace(/!\[Accessibilité Lighthouse\]\(https:\/\/img\.shields\.io\/badge\/accessibility-\d+%2F100-brightgreen\?logo=lighthouse\)/,
  badge);

// Écriture du README mis à jour
fs.writeFileSync(readmePath, readme);

console.log(`Badge d'accessibilité mis à jour : ${score}/100`);

