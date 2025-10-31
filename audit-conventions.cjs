const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, 'src', 'components');
const COMPONENT_PATTERN = /^sh-[a-z0-9-]+\.ts$/;
const PROP_REGEX = /@property\(.*?\)\s+(\w+)/g;
const EVENT_REGEX = /@fires\s+(\w[\w-]*)/g;
const SLOT_REGEX = /@slot\s+(-|\w[\w-]*)/g;

function isCamelCase(str) {
  return /^[a-z][a-zA-Z0-9]*$/.test(str);
}
function isKebabCase(str) {
  return /^[a-z]+(-[a-z0-9]+)*$/.test(str);
}
function isShPrefix(str) {
  return str.startsWith('sh-');
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  let errors = [];

  // Vérification du nom de fichier
  if (!COMPONENT_PATTERN.test(fileName)) {
    errors.push(`Nom de fichier non conforme: ${fileName}`);
  }

  // Props
  const propMatches = [...content.matchAll(PROP_REGEX)];
  for (const match of propMatches) {
    const propName = match[1];
    if (!isCamelCase(propName)) {
      errors.push(`Prop non camelCase: ${propName}`);
    }
  }

  // Slots
  const slotMatches = [...content.matchAll(SLOT_REGEX)];
  for (const match of slotMatches) {
    const slotName = match[1];
    if (slotName !== '-' && !isKebabCase(slotName)) {
      errors.push(`Slot non kebab-case: ${slotName}`);
    }
  }

  // Events
  const eventMatches = [...content.matchAll(EVENT_REGEX)];
  for (const match of eventMatches) {
    const eventName = match[1];
    if (!isKebabCase(eventName) || !isShPrefix(eventName)) {
      errors.push(`Événement custom non conforme: ${eventName}`);
    }
  }

  return errors;
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith('.ts') && !file.endsWith('.stories.ts')) {
      results.push(filePath);
    }
  }
  return results;
}

function main() {
  const files = walk(COMPONENTS_DIR).filter((f) => f.includes('sh-') && f.endsWith('.ts'));
  let totalErrors = 0;
  for (const file of files) {
    const errors = auditFile(file);
    if (errors.length > 0) {
      console.log(`\n❌ ${file}`);
      errors.forEach((e) => console.log('   - ' + e));
      totalErrors += errors.length;
    }
  }
  if (totalErrors === 0) {
    console.log('\n✅ Tous les composants respectent les conventions de nommage !');
  } else {
    console.log(`\n${totalErrors} problème(s) de conventions détecté(s).`);
  }
}

main();
