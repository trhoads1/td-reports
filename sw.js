// TalkDesk Report Centre — pass-through service worker
// Exists only to satisfy PWA installability. NO caching: every launc
//liv e wrapper on the next relaunch with zero cache versioning ceremony..
self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      // Purge everything the old caching worker (td-reports-v1) left behind
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
