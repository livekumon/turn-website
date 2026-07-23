/**
 * Production static file server for DigitalOcean App Platform.
 * Serves build output from ./dist (falls back to ./public for local smoke tests).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = existsSync(join(__dirname, 'dist'))
  ? join(__dirname, 'dist')
  : join(__dirname, 'public');
const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json',
};

function safePath(urlPath) {
  const clean = decodeURIComponent((urlPath || '/').split('?')[0].split('#')[0] || '/');
  const resolved = normalize(join(DIST, clean === '/' ? 'index.html' : clean));
  if (!resolved.startsWith(DIST)) return null;
  return resolved;
}

async function sendFile(res, filePath) {
  const body = await readFile(filePath);
  const type = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control':
      extname(filePath) === '.html'
        ? 'no-cache'
        : 'public, max-age=31536000, immutable',
  });
  res.end(body);
}

const server = createServer(async (req, res) => {
  try {
    let filePath = safePath(req.url);
    if (!filePath) {
      res.writeHead(400).end('Bad request');
      return;
    }

    try {
      const st = await stat(filePath);
      if (st.isDirectory()) filePath = join(filePath, 'index.html');
      await sendFile(res, filePath);
      return;
    } catch {
      // Single-page marketing site — always fall back to index.html
    }

    await sendFile(res, join(DIST, 'index.html'));
  } catch (err) {
    console.error(err);
    res.writeHead(500).end('Server error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Pammi website listening on http://${HOST}:${PORT} (root: ${DIST})`);
});
