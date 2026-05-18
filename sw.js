// Service Worker para Ojo Dulce Stock - Modo Offline
const CACHE_NAME = 'ojo-dulce-stock-v3';

const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'icono-192.png',
  'icono-512.png',
  'icono-180.png'
];

// Instalar y guardar todos los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Cache creada correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Responder con caché primero (funciona sin internet)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});