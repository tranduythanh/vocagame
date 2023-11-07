if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then((reg) => {
        console.log('Service Worker registration successful with scope: ', reg.scope);
    })
    .catch((error) => {
        console.log('Registration failed with ' + error);
    });
}