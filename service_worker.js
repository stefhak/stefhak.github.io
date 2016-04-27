'use strict';


self.addEventListener('install', () => {
    console.info('install event!');
});

self.addEventListener('activate', evt => {
    console.info('activte event!');

    if (self.clients && self.clients.claim) {
        self.clients.claim();
    }

    const expectedCacheNames = Object.keys(cacheNames).map(name => cacheNames[name]);

    evt.waitUntil(
        caches.keys().then(names =>
            Promise.all(
                names.map(cacheName => {
                    if (expectedCacheNames.indexOf(cacheName) === -1) {
                        console.info(`Deleting outdated cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                    return Promise.resolve();
                })
            )
        )
    );
});

self.addEventListener('message', evt => {
    evt.ports[0].postMessage('pong');
    /*if (evt.data.prefetch) {
        const prefetchMap = evt.data.prefetch;
        prefetcher.fetch(prefetchMap, resource => {
            evt.ports[0].postMessage(resource);
        });
    }*/
});
