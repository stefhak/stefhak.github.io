'use strict';

if (navigator.serviceWorker) {

    navigator.serviceWorker.register('./service_worker.js').then(reg => {
        log(`Registration succeeded for ${reg.scope}`);
        const channel = new MessageChannel();
        channel.port1.onmessage = evt => {
            log(evt.data);
        };
        const serviceWorker = navigator.serviceWorker.controller;

        serviceWorker.postMessage('ping', [channel.port2]);


    })
    .catch(error => {
        log(`Registration failed: ${error}`);
    });
}

function log(msg) {
    const logdiv = document.getElementById("log_div");
    logdiv.appendChild(document.createTextNode(msg));
    logdiv.appendChild(document.createElement("br"));
}

document.addEventListener('DOMContentLoaded', () => {
    log('DOMContentLoaded');
    console.info(`controller: ${navigator.serviceWorker.controller}`);

});
