self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static6")
        .then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './posts/estam-digital-marketing.html',
                './westsunset.html',
                './css/style.css',
                './img/logo.png'
            ])
        })
    )
    console.log("Installed!");
})

self.addEventListener("fetch", e => { 
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            return response || fetch(e.request);
        })
    )
    //console.log(`Intercepting fetch for ${e.request.url}`);
})