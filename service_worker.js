'use strict';

let daPort;

self.addEventListener('install', () => {
    console.info('install event!');
});

self.addEventListener('activate', evt => {
    console.info('activte event!');

    if (self.clients && self.clients.claim) {
        self.clients.claim();
    }


/*    evt.waitUntil(
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
    );*/
});

self.addEventListener('message', evt => {
    daPort = evt.ports[0];
    evt.ports[0].postMessage('pong');
    if (navigator.connection) {
        evt.ports[0].postMessage('pangpangpngpang');
        navigator.connection.addEventListener('change', () => {
            evt.ports[0].postMessage('network change event fired');
        });
    } else {
        evt.ports[0].postMessage('no pangpang');
    }
    if (navigator.webkitPersistentStorage) {
        evt.ports[0].postMessage('SW got webkitPersistentStorage');
    } else {
        evt.ports[0].postMessage('SW hasnt got webkitPersistentStorage');     
    }
    /*if (evt.data.prefetch) {
        const prefetchMap = evt.data.prefetch;
        prefetcher.fetch(prefetchMap, resource => {
            evt.ports[0].postMessage(resource);
        });
    }*/
});
