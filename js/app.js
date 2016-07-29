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
                    breadCrumb: function($routeParams) {
                        var { id, itemId } = $routeParams;
                        return {
                            display: "Edit Item",
                            path: `/edit/${id}/item/${itemId}`
                        };
                    }
                }
            })
            .when('/edit/:id', {
                templateUrl: 'views/editInventory.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($routeParams) {
                        var id = $routeParams.id;
                        return {
                            display: "Edit Inventory",
                            path: `/edit/${id}`
                        };
                    }
                }
            })
            .when('/edit/:id/item/new/:itemId', {
                templateUrl: 'views/editItem.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($routeParams) {
                        var { id, itemId } = $routeParams;
                        return {
                            display: "New Item",
                            path: `/edit/${id}/item/new/${itemId}`
                        };
                    }
                }
            })
            .when('/new/:id', {
                templateUrl: 'views/editInventory.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($routeParams) {
                        var id = $routeParams.id;
                        return {
                            display: "Edit Inventory",
                            path: `/new/${id}`
                        };
                    }
                }
            })
            .when('/view/:id', {
                templateUrl: 'views/viewInventory.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function($routeParams) {
                        var id = $routeParams.id;
                        return {
                            display: "View Inventory",
                            path: `/view/${id}`
                        };
                    }
                }
            })
            .when('/view/:id/item/:itemId', {
                templateUrl: 'views/viewItem.html',
                controller: 'InventoryController',
                resolve: {
                    breadCrumb: function() {
                        return {
                            display: "View Item"
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
