'use strict';

const cacheName = 'v0.21b';

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/index.html',
        '/manifest.json',
        '/css/tips.css',
        '/js/min/tips.min.js',
        '/js/min/vue.min.js',
        '/img/bg-offline.jpg',
        '/offline.html'
      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});