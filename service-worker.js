'use strict';

const cacheName = 'v0.22';
const offlineUrl = '/offline.html';

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
        offlineUrl
      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        return caches.match(offlineUrl);
      })
    );
  } else {
    event.respondWith(caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
      })
    );
  }
});