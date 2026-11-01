const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy all HTML files to dist
const files = fs.readdirSync(__dirname);
files.forEach(file => {
  if (file.endsWith('.html')) {
    fs.copyFileSync(path.join(__dirname, file), path.join(distDir, file));
  }
});

// Copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy assets
copyDir(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));

// Copy brand logos at root
['schoolmate_logo.jpg', 'opensoftwares_logo.png'].forEach(f => {
  const p = path.join(__dirname, f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(distDir, f));
  }
});

console.log('Static Schoolmate ERP distribution ready in dist/');
