var myApp = angular
    .module('inventory', [ 'ngRoute' ])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/allInventories.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function() {
                        return {
                            display: "Inventories",
                            path: "./"
                        };
                    }
                }
            })
            .when('/edit/:id/item/:itemId', {
                templateUrl: 'views/editItem.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($location) {
                        var path = $location.path().substring(1);

                        return {
                            display: "Edit Item",
                            path
                        };
                    }
                }
            })
            .when('/edit/:id', {
                templateUrl: 'views/editInventory.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($location) {
                        var path = $location.path().substring(1);

                        return {
                            display: "Edit Inventory",
                            path
                        };
                    }
                }
            })
            .when('/edit/:id/item/new/:itemId', {
                templateUrl: 'views/editItem.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($location) {
                        var path = $location.path().substring(1);

                        return {
                            display: "New Item",
                            path
                        };
                    }
                }
            })
            .when('/new', {
                templateUrl: 'views/editInventory.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($location) {
                        var path = $location.path().substring(1);

                        return {
                            display: "New Inventory",
                            path
                        };
                    }
                }
            })
            .when('/view/:id', {
                templateUrl: 'views/viewInventory.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($location) {
                        var path = $location.path().substring(1);

                        return {
                            display: "View Inventory",
                            path
                        };
                    }
                }
            })
            .when('/view/:id/item/:itemId', {
                templateUrl: 'views/viewItem.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($location) {
                        var path = $location.path().substring(1);

                        return {
                            display: "View Item",
                            path
                        };
                    }
                }
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
