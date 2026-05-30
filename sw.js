const CACHE = "orm-cache-v1";
const urlsToCache = [
  "/",
  "/css/styles.css?v=2",
  "/js/supabase-config.js?v=2",
  "/js/database.js?v=2",
  "/js/translations.js?v=2",
  "/js/chatbot.js?v=2",
  "/js/admin.js?v=2",
  "/js/app.js?v=2",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
});
