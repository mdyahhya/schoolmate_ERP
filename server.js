const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

function handler(req, res) {
  let parsedUrl = (req.url || '/').split('?')[0];
  if (parsedUrl === '/' || parsedUrl === '') {
    parsedUrl = '/index.html';
  }

  // Candidate paths to check
  const candidates = [
    path.join(ROOT_DIR, parsedUrl),
    path.join(process.cwd(), parsedUrl),
    path.join(ROOT_DIR, parsedUrl + '.html'),
    path.join(process.cwd(), parsedUrl + '.html'),
    path.join(ROOT_DIR, 'dist', parsedUrl),
    path.join(ROOT_DIR, 'dist', parsedUrl + '.html'),
  ];

  let targetPath = null;
  for (const cand of candidates) {
    try {
      if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
        targetPath = cand;
        break;
      }
    } catch (_) {}
  }

  if (!targetPath) {
    const dirIndex = path.join(ROOT_DIR, parsedUrl, 'index.html');
    try {
      if (fs.existsSync(dirIndex)) {
        targetPath = dirIndex;
      }
    } catch (_) {}
  }

  if (targetPath) {
    serveFile(targetPath, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html><html><head><title>404 Not Found</title><link rel="stylesheet" href="/assets/css/style.css"></head><body style="font-family:sans-serif; text-align:center; padding:50px;"><h1>404 Not Found</h1><p>Resource ${parsedUrl} was not found on this server.</p><p><a href="/" style="color:#1e40af; font-weight:600;">Return to Login</a></p></body></html>`);
  }
}

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Internal Server Error');
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
}

// Export for Vercel Serverless Function
module.exports = handler;

// Local execution server
if (require.main === module) {
  const server = http.createServer(handler);
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Schoolmate ERP running at http://localhost:${PORT}`);
  });
}
