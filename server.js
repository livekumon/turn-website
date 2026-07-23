/**
 * Production static file server for DigitalOcean App Platform.
 * Serves build output from ./dist (falls back to ./public for local smoke tests).
 * Maps clean legal URLs (/terms, /privacy, …) to their .html files.
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

const CLEAN_PAGES = new Set([
  'terms',
  'privacy',
  'refunds',
  'shipping',
  'contact',
]);

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

async function resolveFile(urlPath) {
  const clean = decodeURIComponent((urlPath || '/').split('?')[0].split('#')[0] || '/');
  const trimmed = clean.replace(/\/+$/, '') || '/';
  const slug = trimmed.replace(/^\//, '');

  if (CLEAN_PAGES.has(slug)) {
    const htmlPath = join(DIST, `${slug}.html`);
    if (existsSync(htmlPath)) return htmlPath;
  }

  let filePath = safePath(clean);
  if (!filePath) return null;

  try {
    const st = await stat(filePath);
    if (st.isDirectory()) filePath = join(filePath, 'index.html');
    await stat(filePath);
    return filePath;
  } catch {
    // try adding .html for unknown clean paths
    if (!extname(slug) && slug) {
      const htmlPath = join(DIST, `${slug}.html`);
      if (existsSync(htmlPath)) return htmlPath;
    }
    return null;
  }
}

const server = createServer(async (req, res) => {
  try {
    const filePath = await resolveFile(req.url);
    if (!filePath) {
      // Marketing SPA fallback
      await sendFile(res, join(DIST, 'index.html'));
      return;
    }
    await sendFile(res, filePath);
  } catch (err) {
    console.error(err);
    res.writeHead(500).end('Server error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Pammi website listening on http://${HOST}:${PORT} (root: ${DIST})`);
});
