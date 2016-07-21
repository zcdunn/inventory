var myApp = angular.module('inventory', [ 'ngRoute' ]);
myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/inventory', {
            templateUrl: 'views/allInventories.html',
            controller: 'InventoryController'
        })
        .when('/inventory/edit', {
            templateUrl: 'views/editInventory.html',
            controller: 'InventoryController'
        })
        .when('/inventory/new', {
            templateUrl: 'views/editInventory.html',
            controller: 'InventoryController'
        })
        .when('/inventory/view', {
            templateUrl: 'views/viewInventory.html',
            controller: 'InventoryController'
        })
        .when('/item/new', {
            templateUrl: 'views/newItem.html',
            controller: 'InventoryController'
        })
        .otherwise({
            redirectTo: '/inventory'
        });
    // user HTML5 History API
    $locationProvider.html5Mode(true);
});
