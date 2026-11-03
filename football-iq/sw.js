/* FOOTBALL IQ: funciona sem internet.
   Na instalação guarda a app e todos os dados (os jogos saem da lista em data/index.json).
   A página vem da rede quando há ligação (3 s no máximo); o resto vem da cache e
   actualiza-se em segundo plano, por isso dados novos aparecem na abertura seguinte. */
const VERSION = 'fiq-v1';
const SHELL = [
  './',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
  'fonts/barlow-latin-400-normal.woff2',
  'fonts/barlow-latin-500-normal.woff2',
  'fonts/barlow-latin-600-normal.woff2',
  'fonts/barlow-latin-700-normal.woff2',
  'fonts/barlow-latin-400-italic.woff2',
  'fonts/barlow-condensed-latin-500-normal.woff2',
  'fonts/barlow-condensed-latin-600-normal.woff2',
  'fonts/barlow-condensed-latin-700-normal.woff2',
  'data/index.json',
  'data/players.json'
];
const SCOPE = new URL('./', self.location).pathname;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(SHELL);
    try {
      const ix = await (await c.match('data/index.json')).json();
      await Promise.allSettled(ix.matches.map(m => c.add('data/m/' + m.id + '.json')));
    } catch (err) { }
  }).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('fiq-') && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin || !url.pathname.startsWith(SCOPE)) return;
  if (req.mode === 'navigate') { e.respondWith(page(e)); return; }
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; });
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
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
