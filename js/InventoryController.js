myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, inventoryService, breadCrumbService) {
    $scope.inventories = inventoryService.loadInventories();
    $scope.inventory = inventoryService.getInventory($routeParams.id);
    $scope.item = $scope.inventory[$routeParams.itemId];
    $scope.breadCrumbs = breadCrumbService;

    $scope.$on('$routeChangeSuccess', function (e, curr, prev) {
        var breadCrumb = curr.locals.breadCrumb;
        breadCrumb.path = $location.path().substring(1);
        breadCrumbService.update(breadCrumb);
    });

    $scope.goBack = function() {
        $window.history.go(-1);
    };

    $scope.editInventory = function(inv) {
        $location.path(`/edit/${inv.id}`);
    };

    $scope.newInventory = function() {
        var inventory = inventoryService.newInventory();
        $location.path(`/new/${inventory.id}`);
    };

    $scope.addInventory = function() {
        var id = $routeParams.id;
        $scope.inventories[id] = $scope.inventory;
        inventoryService.storeInventories();
        $location.path(`/view/${id}`);
    };

    $scope.newItem = function() {
        var id = $scope.inventory.id;
        var item = inventoryService.newItem();
        $location.path(`/edit/${id}/item/new/${item.id}`);
    };

    $scope.addItem = function() {
        var { id, itemId } = $routeParams;
        var inventory = $scope.inventories[id];

        inventory.items[itemId] = $scope.item;
        inventoryService.storeInventories();
        $location.path(`/view/${id}`);
    };

    $scope.removeItem = function() {
    };
});
