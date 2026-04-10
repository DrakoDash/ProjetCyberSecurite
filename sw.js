const CACHE_NAME = "cyberquiz-v3";
const ASSETS = [
  "/ProjetCyberSecurite/",
  "/ProjetCyberSecurite/index.html",
  "/ProjetCyberSecurite/accueil.html",
  "/ProjetCyberSecurite/style.css",
  "/ProjetCyberSecurite/manifest.webmanifest",
  "/ProjetCyberSecurite/icons/icon-192.png",
  "/ProjetCyberSecurite/icons/icon-512.png"
];


// Installation
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activation + nettoyage anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
