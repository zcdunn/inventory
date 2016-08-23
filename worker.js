importScripts('js/sw-toolbox.js');

const version = '0.0.1';
const CACHE_NAME = 'inventory' + version;
var urlsToCache = [
    'index.html',
    'views/allInventories.html',
    'views/editInventory.html',
    'views/editItem.html',
    'views/removeItem.html',
    'views/viewInventory.html',
    'views/viewItem.html',
    'images/favicon.ico',
    'images/dnd-logo.png',
    'images/logo-36x36.png',
    'images/logo-48x48.png',
    'images/logo-128x128.png',
    'images/logo-144x144.png',
    'images/logo-192x192.png',
    'images/logo-256x256.png',
    'images/logo-384x384.png',
    'images/logo-512x512.png',
    'css/mdl-icons.css',
    'css/material.red-amber.min.css',
    'css/style.css',
    'fonts/icons.woff2',
    'js/angular-animate.min.js',
    'js/angular-route.min.js',
    'js/angular.min.js',
    'js/app.js',
    'js/BreadCrumbService.js',
    'js/Inventory.js',
    'js/InventoryController.js',
    'js/InventoryService.js',
    'js/material.min.js',
    'js/sw-toolbox.js'
];

toolbox.options.debug = true;
toolbox.precache(urlsToCache);
toolbox.router.get('*', toolbox.networkFirst);

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
