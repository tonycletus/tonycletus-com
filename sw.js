const currentDate = new Date().toISOString().split('T')[0];
const CACHE_NAME = `static-${currentDate}`;

const urlsToCache = [
  './',
  './index.html',
  './posts/estam-digital-marketing.html',
  './westsunset.html',
  './css/style.css',
  './img/logo.png',
  'https://fonts.googleapis.com/icon?family=Syne',
  './img/portfolio1.jpeg',
  './img/portfolio2.png',
  './img/portfolio3.jpeg',
  './img/portfolio4.png',
  './img/portfolio6.jpeg',
  './img/portfolio7.png',
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', // Cache the boxicons CSS
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
