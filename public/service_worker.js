const CACHE_NAME = "useful-kakebo-v1";
const urlsToCache = ["./offline.html", "./assets/google_logo.png"];

// Install SW
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// Listen for requests
self.addEventListener("fetch", function (event) {
    if (
        event.request.cache === "only-if-cached" &&
        event.request.mode !== "same-origin"
    )
        return;
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

// Activate the SW
self.addEventListener("activate", (event) => {
    const casheWhitelist = [];
    casheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((casheNames) =>
            Promise.all(
                casheNames.map((casheName) => {
                    if (!casheWhitelist.includes(casheName)) {
                        return cashes.delete(casheName);
                    }
                })
            )
        )
    );
});
