// Beach Soccer Manager PWA V2.1: rede prioritária nas navegações; sem armazenar HTML obsoleto.
const CACHE_NAME = 'beach-manager-pwa-v2-1-20261020';
const SHELL = ['./index.html', './manifest.json', './tailwind.css', './fontawesome.css', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then(cache => cache.addAll(SHELL))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('beach-manager-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if (request.mode === 'navigate') {
    // Rede primeiro para não usar um motor desatualizado quando houver conexão.
    event.respondWith(fetch(request, {cache:'no-store'})
      .then(response => response.ok ? response : caches.match('./index.html').then(cached => cached || response))
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Recursos do app: cache com fallback para rede.
  event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
});
