const CACHE_NAME = 'beach-manager-pwa-e2b86e314cbe';
const APP_SHELL = ["./", "./index.html", "./manifest.json", "./assets/tailwind.css", "./assets/fontawesome.css", "./icons/icon-192.png", "./icons/icon-512.png", "./assets/webfonts/fa-solid-900.woff2", "./assets/webfonts/fa-brands-400.woff2", "./assets/webfonts/fa-regular-400.woff2", "./assets/webfonts/fa-v4compatibility.woff2"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('beach-manager-pwa-') && key !== CACHE_NAME).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => response.ok ? response : (caches.match('./index.html').then(cached => cached || response))).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
});
