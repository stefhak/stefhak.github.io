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

    if (navigator.storage) {
        navigator.storage.estimate().then(info => {
            evt.ports[0].postMessage('SW got storage quota ' + info.quota);
            evt.ports[0].postMessage('SW uses storage ' + info.usage);
            navigator.storage.persisted().then(persi => {
                if (persi)
                    evt.ports[0].postMessage('SWs box is persisted')
                else
                    evt.ports[0].postMessage('SWs box is not persisted');

            }).catch(error => {
                console.error('Storage persisted error');
            });
            if (navigator.storage.persist)
                navigator.storage.persist().then(persis => {
                    if (persis)
                        evt.ports[0].postMessage('SWs box was allowed to be persisted')
                    else
                        evt.ports[0].postMessage('SWs box was not allowed to be persisted');

                }).catch(error => {
                    console.error('Storage persist error');
                });
            } else 
                console.error('no navigator.storage.persist() methong avialable in SW');
        }).catch(error => {
            console.error('Storage error');
        });

    }
    /*if (evt.data.prefetch) {
        const prefetchMap = evt.data.prefetch;
        prefetcher.fetch(prefetchMap, resource => {
            evt.ports[0].postMessage(resource);
        });
    }*/
});
