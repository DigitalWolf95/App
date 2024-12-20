/// <reference lib="WebWorker" />

import { sortArray } from '@digital-wolf/fns';
self.addEventListener('install', (event) => {
  console.log(sortArray([{ va: 2 }, { va: 1 }, { va: 3 }], 'va'));
  console.log('Service worker installed');
});
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
});
// console.log(sortArray([{ va: 2 }, { va: 1 }, { va: 3 }], 'va'));
// // service-worker.ts
//
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('my-cache').then((cache) => {
//       return cache.addAll([
//         '/',
//         '/index.html',
//         '/app.js',
//         '/styles.css',
//         // Add any other static assets you want to cache
//       ]);
//     })
//   );
// });
//
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
