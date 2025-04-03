/// <reference lib="WebWorker" />


const CACHE_NAME = `__CACHE_NAME__`;
const PRIORITY_IMAGES: string[] = [
  //'/api/image?image=images/logo.png',
  //'/api/image?image=images/hero-banner.jpg',
  // Add other high-priority images here
];

(self as unknown as ServiceWorkerGlobalScope).addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('cache opened', )
      return cache.addAll(PRIORITY_IMAGES);
    })
  );

  (self as unknown as ServiceWorkerGlobalScope).skipWaiting();
});

(self as unknown as ServiceWorkerGlobalScope).addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service worker activated');
  event.waitUntil((self as unknown as ServiceWorkerGlobalScope).clients.claim());
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

(self as unknown as ServiceWorkerGlobalScope).addEventListener('fetch', (event: FetchEvent) => {
  const request = event.request;
  const url = new URL(request.url);

  if (url.pathname === '/api/image' && url.searchParams.has('image')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(request).then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
          })
        );
      })
    );
  }
});
