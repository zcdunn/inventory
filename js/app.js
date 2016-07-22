var myApp = angular.module('inventory', [ 'ngRoute' ]);
myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/allInventories.html',
            controller: 'InventoryController'
        })
        .when('/edit/:id', {
            templateUrl: 'views/editInventory.html',
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
        .when('/item/new', {
            templateUrl: 'views/newItem.html',
            controller: 'InventoryController'
        })
        .otherwise({
            redirectTo: '/'
        });
    // user HTML5 History API
    $locationProvider.html5Mode(true);
});
