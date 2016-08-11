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
    'css/mdl-icons.css',
    'css/material.red-amber.min.css',
    'css/style.css',
    'fonts/icons.woff2',
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
