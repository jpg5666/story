const CACHE_NAME = "story-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Cache static assets saat service worker diinstall
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Gagal caching saat install:", error);
      })
  );
});

// Fetch handler untuk semua request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          // Simpan hanya gambar dari Dicoding API ke cache
          if (event.request.url.includes("https://story-api.dicoding.dev/images/")) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }

          // Untuk resource lain, langsung balikan
          return networkResponse;
        })
        .catch(() => {
          // Tangani jika fetch gagal (misalnya karena offline)
          console.warn("Fetch gagal (offline?):", event.request.url);
          return new Response("", { status: 200 });
        });
    })
  );
});
