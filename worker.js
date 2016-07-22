importScripts('js/sw-toolbox.js');

const version = '0.0.1';
const CACHE_NAME = 'inventory' + version;
var urlsToCache = [
    'index.html',
    'views/allInventories.html',
    'views/editInventory.html',
    'views/editItem.html',
    'views/viewInventory.html',
    'views/viewItem.html',
    'images/favicon.ico',
    'css/mdl-icons.css',
    'css/material.red-amber.min.css',
    'css/style.css',
    'js/angular.min.js',
    'js/angular-route.min.js',
    'js/sw-toolbox.js',
    'js/material.min.js',
    'js/app.js',
    'js/InventoryController.js',
    'js/InventoryService.js'
];

toolbox.options.debug = true;
toolbox.precache(urlsToCache);
toolbox.router.get('*', toolbox.cacheFirst);

self.addEventListener('push', event => console.log('Received push notification: ', event));

self.addEventListener('sync', event => {
    console.log('Syncing:', event);
    if(event.tag === 'update') {
        event.waitUntil(new Promise(function(resolve, reject) {
            console.log('Sync update.');
            return resolve();
        }));
    }
});
