var myApp = angular
    .module('inventory', [ 'ngRoute' ])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/allInventories.html',
                controller: 'InventoryController'
            })
            .when('/edit/:id', {
                templateUrl: 'views/editInventory.html',
                controller: 'InventoryController'
            })
            .when('/edit/:id/item/new/:itemId', {
                templateUrl: 'views/editItem.html',
                controller: 'InventoryController'
            })
            .when('/new/:id', {
                templateUrl: 'views/editInventory.html',
                controller: 'InventoryController'
            })
            .when('/view/:id', {
                templateUrl: 'views/viewInventory.html',
                controller: 'InventoryController'
            })
            .when('/view/:id/item/:itemId', {
                templateUrl: 'views/viewItem.html',
                controller: 'InventoryController'
            })
            .otherwise({
                redirectTo: '/'
            });
        // user HTML5 History API
        $locationProvider.html5Mode(true);
    })
    .run(function() {
        var mdlUpgradeDom = false;
        setInterval(function() {
            if(mdlUpgradeDom) {
                componentHandler.upgradeDom();
                mdlUpgradeDom = false;
            }
        }, 200);

        var observer = new MutationObserver(function() {
            mdlUpgradeDom = true;
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
