const fs = require('fs');
const path = require('path');
const root = path.resolve('src');
const exts = ['.js', '.jsx'];
const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (exts.includes(path.extname(full))) files.push(path.relative(root, full).replace(/\\/g, '/'));
  }
}
walk(root);
const fileSet = new Set(files);
const importMap = new Map(files.map((file) => [file, new Set()]));
const alias = '@';
for (const file of files) {
  const full = path.join(root, file);
  const text = fs.readFileSync(full, 'utf8');
  const regex = /import\s+[^'"\n]+['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(text))) {
    let dep = m[1];
    if (dep.startsWith('http') || dep.startsWith('https') || dep.startsWith('data:')) continue;
    if (dep.startsWith(alias + '/')) {
      dep = path.relative(path.dirname(full), path.join(root, dep.slice(alias.length + 1))).replace(/\\/g, '/');
    }
    let depPath = dep;
    if (!path.extname(depPath)) {
      let found = false;
      for (const ext of exts) {
        const candidate = path.join(path.dirname(full), depPath + ext);
        if (fs.existsSync(candidate)) {
          depPath = depPath + ext;
          found = true;
          break;
        }
      }
      if (!found) {
        for (const ext of exts) {
          const candidate = path.join(path.dirname(full), depPath, 'index' + ext);
          if (fs.existsSync(candidate)) {
            depPath = path.join(depPath, 'index' + ext).replace(/\\/g, '/');
            found = true;
            break;
          }
        }
      }
    }
    const rel = path.normalize(path.isAbsolute(depPath) ? path.relative(root, depPath) : path.relative(root, path.resolve(path.dirname(full), depPath))).replace(/\\/g, '/');
    if (fileSet.has(rel)) {
      importMap.get(file).add(rel);
    }
  }
}
const entryPoints = ['main.jsx', 'app/App.jsx', 'app/Router.jsx', 'routes/AppRoutes.jsx'];
const reachable = new Set();
const queue = [];
for (const ep of entryPoints) {
  if (fileSet.has(ep)) {
    reachable.add(ep);
    queue.push(ep);
  }
}
while (queue.length) {
  const f = queue.shift();
  for (const dep of importMap.get(f) || []) {
    if (!reachable.has(dep)) {
      reachable.add(dep);
      queue.push(dep);
    }
  }
}
const unreachable = files.filter((f) => !reachable.has(f));
const output = [];
output.push(`TOTAL_FILES:${files.length}`);
output.push(`REACHABLE:${reachable.size}`);
output.push(`UNREACHABLE:${unreachable.length}`);
if (unreachable.length > 0) {
  output.push('UNREACHABLE_LIST:');
  for (const f of unreachable) output.push(f);
}
fs.writeFileSync('connectivity-report.txt', output.join('\n'), 'utf8');
console.log('Report written to connectivity-report.txt');
