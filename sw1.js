// Install Event
self.oninstall = function() {
    caches.open('tc-v1')
    .then(function(cache) {
        cache.addAll([
            '/',
            'index.html',
            'westsunset.html',
            'posts/estam-digital-marketing.html',
            'css/style.css',
            'boxicons/css/animations.css',
            'boxicons/css/boxicons.min.css',
            'boxicons/css/transformations.css',
            'boxicons/font/boxicons.eot',
            'boxicons/font/boxicons.svg',
            'boxicons/font/boxicons.ttf',
            'boxicons/font/boxicons.woff',
            'boxicons/font/boxicons.woff2',
        ])
        .then(function() {
            console.log('Cached!');
        })
        .catch(function() {
            console.log('Error', err);
        })
    }) 
}

// Activate Event
self.onactivate = function() {
    console.log('Acivated!');
}

// Fetch Event
self.onfetch = function(e) {
    e.respondWith(
        caches.match(e.req)
        .then(function(res) {
            if(res) {
                return res
            } else {
                return fetch(e.req)
            }
        }) 
    )
}