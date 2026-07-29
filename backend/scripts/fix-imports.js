import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..', 'src');
const modulesDir = path.join(root, 'modules');
const middlewareDir = path.join(root, 'middleware');
const rolesFile = path.join(root, 'shared', 'constants', 'roles.js');

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.isFile() && p.endsWith('.js')) processFile(p);
  }
}

function processFile(filePath) {
  const orig = fs.readFileSync(filePath, 'utf8');
  let updated = orig;

  // middleware imports
  updated = updated.replace(/from \"(\.\.\/)+middleware\/(\w[\w.-]*\.js)\"/g, (m, ups, file) => {
    const target = path.join(middlewareDir, file);
    const rel = path.relative(path.dirname(filePath), target).replace(/\\/g, '/');
    const final = rel.startsWith('.') ? rel : './' + rel;
    return `from "${final}"`;
  });

  // ROLES import
  updated = updated.replace(/from \"(\.\.\/)+shared\/constants\/roles\.js\"/g, () => {
    const rel = path.relative(path.dirname(filePath), rolesFile).replace(/\\/g, '/');
    const final = rel.startsWith('.') ? rel : './' + rel;
    return `from "${final}"`;
  });

  if (updated !== orig) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log('Fixed', path.relative(process.cwd(), filePath));
  }
}

walk(modulesDir);
console.log('Done.');
