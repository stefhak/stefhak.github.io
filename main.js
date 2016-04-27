'use strict';

if (navigator.serviceWorker) {
    log('navigator has SW');
    navigator.serviceWorker.register('./service_worker.js').then(reg => {
        log(`Registration succeeded for ${reg.scope}`);
        const channel = new MessageChannel();
        channel.port1.onmessage = evt => {
            log(evt.data);
        };
        serviceWorker.postMessage('ping', [channel.port2]);


    })
    .catch(error => {
        log(`Registration failed: ${error}`);
    });
}

function log(msg) {
    document.getElementById("log_div");
    log.div.appendChild(document.createTextNode(msg));
    log.div.appendChild(document.createElement("br"));
}

document.addEventListener('DOMContentLoaded', () => {
    log('DOMContentLoaded');
    console.info(`controller: ${navigator.serviceWorker.controller}`);

    image = document.querySelector('#image');

    fetch('/resources/resource-map.json', {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
    }).then(response => response.json())
    .then(resourceMap => {
        buildResourceList(resourceMap);
    })
    .catch(error => {
        console.error(`Fetch error: ${error}`);
    });
});
