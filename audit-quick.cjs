const { execSync } = require('child_process');
const fs = require('fs');
const http = require('http');

// Vérifier que Storybook tourne
function checkStorybook() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:6006', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Fonction sleep pour pauses entre audits
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Quelques composants pour test rapide
const stories = [
  'components-atoms-badge--all-variants',
  'components-molecules-button--primary',
  'components-organisms-stockitemcard--optimal',
];

const results = [];
const errors = [];

(async () => {
  // Vérifier que Storybook est démarré
  console.log('🔍 Vérification de Storybook...');
  const isStorybookRunning = await checkStorybook();

  if (!isStorybookRunning) {
    console.error('\n❌ ERREUR: Storybook ne répond pas sur http://localhost:6006');
    console.error('👉 Lancez d\'abord Storybook avec: npm run storybook\n');
    process.exit(1);
  }

  console.log('✅ Storybook détecté!\n');
  console.log(`\n🔍 Audit RAPIDE de ${stories.length} composants...\n`);

  for (let index = 0; index < stories.length; index++) {
    const storyId = stories[index];
    const url = `http://localhost:6006/iframe.html?id=${storyId}`;
    const reportPath = `./storybook-static/lighthouse-${storyId}.json`;

    console.log(`[${index + 1}/${stories.length}] ${storyId}...`);

    try {
      const chromeFlags = [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--disable-extensions'
      ].join(' ');

      execSync(
        `npx lighthouse "${url}" --output json --output-path "${reportPath}" --chrome-flags="${chromeFlags}" --quiet --only-categories=accessibility --max-wait-for-load=90000`,
        {
          stdio: 'pipe',
          timeout: 120000
        }
      );

      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      const accessibility = Math.round(report.categories.accessibility.score * 100);

      results.push({ storyId, accessibility });

      console.log(`  ✅ A11y: ${accessibility}%`);

      // Pause de 2 secondes entre audits
      if (index < stories.length - 1) {
        await sleep(2000);
      }
    } catch (error) {
      console.error(`  ❌ Erreur: ${error.message || 'Audit échoué'}`);
      errors.push(storyId);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Audit rapide terminé!`);
  console.log(`📊 Composants audités: ${results.length}/${stories.length}`);
  if (errors.length > 0) {
    console.log(`⚠️  Erreurs: ${errors.length} composants non audités`);
    errors.forEach(e => console.log(`   - ${e}`));
  }
  console.log(`${'='.repeat(60)}\n`);

  process.exit(errors.length > 0 ? 1 : 0);
})().catch(error => {
  console.error('❌ Erreur fatale:', error.message);
  process.exit(1);
});
