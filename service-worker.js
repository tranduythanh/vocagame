const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css', // Your CSS file
  '/js/script.js',  // Your JS file
  '/sounds/correct.mp3',
  '/sounds/wrong.mp3',
  '/sounds/bg.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
