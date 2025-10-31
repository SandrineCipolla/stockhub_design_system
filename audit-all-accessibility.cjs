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

// Liste COMPLÈTE de tous les composants et leurs stories principales
// Format: title--storyName en kebab-case
const stories = [
  // === ORGANISMS (6 composants) ===
  // StockItemCard
  'components-organisms-stockitemcard--optimal',
  'components-organisms-stockitemcard--low-stock',
  'components-organisms-stockitemcard--critical-stock',

  // StockCard
  'components-organisms-stockcard--optimal',
  'components-organisms-stockcard--critical',

  // Footer
  'components-organisms-footer--default',

  // Header
  'components-organisms-header--default',

  // IA Alert Banner
  'components-organisms-ia-alert-banner--default',

  // Page Header
  'components-organisms-page-header--default',

  // === MOLECULES (6 composants) ===
  // Button
  'components-molecules-button--primary',
  'components-molecules-button--all-variants',

  // Card
  'components-molecules-card--basic',
  'components-molecules-card--with-slots',

  // MetricCard
  'components-molecules-metriccard--default',
  'components-molecules-metriccard--dashboard-example',

  // QuantityInput
  'components-molecules-quantityinput--default',

  // SearchInput
  'components-molecules-searchinput--default',

  // StatusBadge
  'components-molecules-statusbadge--default',

  // === ATOMS (5 composants) ===
  // Badge
  'components-atoms-badge--all-variants',
  'components-atoms-badge--pill-shape',

  // Icon
  'components-atoms-icon--default',

  // Input
  'components-atoms-input--default',

  // Logo
  'components-atoms-logo--default',

  // Text
  'components-atoms-text--playground'
];

// Scores agrégés
let totalAccessibility = 0;
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
  console.log(`\n🔍 Audit Lighthouse de ${stories.length} composants...\n`);
  console.log(`📊 URL utilisée: http://localhost:6006/iframe.html (composants isolés)\n`);

  for (let index = 0; index < stories.length; index++) {
    const storyId = stories[index];
    // IMPORTANT: Utiliser /iframe.html pour isoler le composant
    const url = `http://localhost:6006/iframe.html?id=${storyId}`;
    const reportPath = `./storybook-static/lighthouse-${storyId}.json`;

    console.log(`[${index + 1}/${stories.length}] ${storyId}...`);

    try {
      // Flags Chrome améliorés pour stabilité sur Windows
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
          timeout: 120000 // 2 minutes max par audit
        }
      );

      // Lire le score
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      const accessibility = Math.round(report.categories.accessibility.score * 100);

      results.push({ storyId, accessibility });
      totalAccessibility += accessibility;

      console.log(`  ✅ A11y: ${accessibility}%`);

      // Pause de 2 secondes entre chaque audit pour éviter les crashs
      if (index < stories.length - 1) {
        await sleep(2000);
      }
    } catch (error) {
      console.error(`  ❌ Erreur: ${error.message || 'Audit échoué'}`);
      errors.push(storyId);
      // Continuer même en cas d'erreur
    }
  }

  // Calculer moyenne
  const avgAccessibility = Math.round(totalAccessibility / results.length);

  // Générer rapport HTML consolidé
  const htmlReport = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport Lighthouse - StockHub Design System</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 1200px;
      margin: 40px auto;
      padding: 20px;
      background: linear-gradient(to bottom right, #0f172a, #1e1b4b);
      color: #f8fafc;
      line-height: 1.6;
    }

    h1 {
      color: #8b5cf6;
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }

    .subtitle {
      color: #94a3b8;
      margin-bottom: 2rem;
    }

    .summary {
      background: rgba(255,255,255,0.05);
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      border: 1px solid rgba(139, 92, 246, 0.3);
    }

    .scores {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .score-card {
      background: rgba(255,255,255,0.03);
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .score-label {
      font-size: 0.875rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .score-value {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1;
    }

    .score-value.good { color: #22c55e; }
    .score-value.warning { color: #f59e0b; }
    .score-value.bad { color: #ef4444; }

    table {
      width: 100%;
      border-collapse: collapse;
      background: rgba(255,255,255,0.03);
      border-radius: 12px;
      overflow: hidden;
    }

    th {
      background: rgba(139, 92, 246, 0.2);
      color: #e9d5ff;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.875rem;
      letter-spacing: 0.05em;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover {
      background: rgba(139, 92, 246, 0.05);
    }

    .component-name {
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.875rem;
      color: #c4b5fd;
    }

    .good { color: #22c55e; font-weight: 600; }
    .warning { color: #f59e0b; font-weight: 600; }
    .bad { color: #ef4444; font-weight: 600; }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.excellent {
      background: rgba(34, 197, 94, 0.2);
      color: #86efac;
    }

    .status-badge.improve {
      background: rgba(245, 158, 11, 0.2);
      color: #fcd34d;
    }

    .footer-box {
      margin-top: 2rem;
      padding: 1.5rem;
      background: rgba(34, 197, 94, 0.1);
      border-left: 4px solid #22c55e;
      border-radius: 8px;
    }

    .footer-box h3 {
      color: #86efac;
      margin-bottom: 0.75rem;
    }

    .footer-box p {
      color: #d1fae5;
      margin: 0.25rem 0;
    }

    .meta {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: #64748b;
      font-size: 0.875rem;
    }

    .error-list {
      background: rgba(239, 68, 68, 0.1);
      border-left: 4px solid #ef4444;
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 4px;
    }

    .error-list h4 {
      color: #fca5a5;
      margin-bottom: 0.5rem;
    }

    .error-list ul {
      list-style: none;
      padding-left: 0;
    }

    .error-list li {
      color: #fecaca;
      padding: 0.25rem 0;
      font-family: 'Monaco', monospace;
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <h1>📊 Rapport Lighthouse - StockHub Design System</h1>
  <p class="subtitle">Audit d'accessibilité et performance des composants Web Components</p>

  <div class="summary">
    <h2 style="margin-bottom: 1rem; color: #e9d5ff;">📈 Résultats de l'Audit</h2>
    <div class="scores">
      <div class="score-card">
        <div class="score-label">Accessibilité Moyenne</div>
        <div class="score-value ${avgAccessibility >= 90 ? 'good' : avgAccessibility >= 70 ? 'warning' : 'bad'}">
          ${avgAccessibility}%
        </div>
      </div>
      <div class="score-card">
        <div class="score-label">Composants Testés</div>
        <div class="score-value good">${results.length}</div>
      </div>
      <div class="score-card">
        <div class="score-label">Objectif WCAG 2.1 AA</div>
        <div class="score-value ${avgAccessibility >= 90 ? 'good' : 'warning'}">
          ${avgAccessibility >= 90 ? '✓ Atteint' : '✗ Non atteint'}
        </div>
      </div>
    </div>
  </div>

  <h2 style="margin: 2rem 0 1rem 0; color: #e9d5ff;">🔍 Détails par Composant</h2>
  <table>
    <thead>
      <tr>
        <th>Composant</th>
        <th style="text-align: center;">Accessibilité</th>
        <th style="text-align: center;">Statut</th>
      </tr>
    </thead>
    <tbody>
      ${results.map(r => `
        <tr>
          <td class="component-name">${r.storyId}</td>
          <td style="text-align: center;" class="${r.accessibility >= 90 ? 'good' : r.accessibility >= 70 ? 'warning' : 'bad'}">
            ${r.accessibility}%
          </td>
          <td style="text-align: center;">
            <span class="status-badge ${r.accessibility >= 90 ? 'excellent' : 'improve'}">
              ${r.accessibility >= 90 ? '✅ Conforme WCAG' : '⚠️ À améliorer'}
            </span>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  ${errors.length > 0 ? `
    <div class="error-list">
      <h4>❌ Erreurs lors de l'audit (${errors.length})</h4>
      <ul>
        ${errors.map(e => `<li>• ${e}</li>`).join('')}
      </ul>
    </div>
  ` : ''}

  <div class="footer-box">
    <h3>🎉 Résumé</h3>
    <p><strong>Score Accessibilité Moyen:</strong> ${avgAccessibility}%</p>
    <p><strong>Objectif WCAG 2.1 AA:</strong> ${avgAccessibility >= 90 ? '✅ Atteint' : '⚠️ Non atteint (minimum 90%)'}</p>
    <p><strong>Composants conformes:</strong> ${results.filter(r => r.accessibility >= 90).length}/${results.length}</p>
    <p><strong>Composants à améliorer:</strong> ${results.filter(r => r.accessibility < 90).length}</p>
  </div>

  <div class="meta">
    <p>📅 Date: ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <p>⏰ Heure: ${new Date().toLocaleTimeString('fr-FR')}</p>
    <p>🔧 Outil: Lighthouse ${process.env.npm_package_devDependencies_lighthouse || 'latest'}</p>
    <p>🎯 Mode: iframe isolé (composants seuls, sans UI Storybook)</p>
  </div>
</body>
</html>
`;

  fs.writeFileSync('./storybook-static/lighthouse-report.html', htmlReport);

  // Affichage final
  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Rapport consolidé généré: ./storybook-static/lighthouse-report.html`);
  console.log(`📊 Composants audités: ${results.length}/${stories.length}`);
  console.log(`🎯 Accessibilité moyenne: ${avgAccessibility}%`);
  console.log(`✅ Composants conformes WCAG 2.1 AA: ${results.filter(r => r.accessibility >= 90).length}/${results.length}`);
  if (errors.length > 0) {
    console.log(`⚠️  Erreurs: ${errors.length} composants non audités`);
  }
  console.log(`${'='.repeat(60)}\n`);

  // Exit code basé sur le score d'accessibilité
  process.exit(avgAccessibility >= 90 ? 0 : 1);
})().catch(error => {
  console.error('❌ Erreur fatale:', error.message);
  process.exit(1);
});
