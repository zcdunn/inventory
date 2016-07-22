myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, inventoryService) {
    $scope.inventories = inventoryService.loadInventories();
    $scope.inventory = inventoryService.getInventory($routeParams.id);

    $scope.goBack = function() {
        $window.history.go(-1);
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
});
