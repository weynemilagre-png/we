/* Rotina 2026/27: funciona sem internet.
   A página vem sempre da rede quando há ligação (3 s no máximo) e fica guardada para quando não há.
   Ícones e fontes vêm da cache: se mudarem, sobe a VERSION. */
const VERSION = 'rotina-v1';
const CORE = [
  './',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
  'fonts/barlow-400-latin.woff2',
  'fonts/barlow-500-latin.woff2',
  'fonts/barlow-600-latin.woff2',
  'fonts/barlow-700-latin.woff2',
  'fonts/big-shoulders-display-latin.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') { e.respondWith(page(e)); return; }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});

function page(e) {
  const net = fetch(e.request);
  e.waitUntil(net.then(res => {
    if (!res.ok) return;
    const copy = res.clone();
    return caches.open(VERSION).then(c => c.put('./', copy));
  }).catch(() => {}));
  const slow = new Promise(r => setTimeout(r, 3000));
  return Promise.race([net.catch(() => null), slow.then(() => null)])
    .then(res => res || caches.match('./').then(hit => hit || net));
}
