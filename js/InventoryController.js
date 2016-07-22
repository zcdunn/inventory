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

    $scope.viewInventory = function(inv) {
        // TODO: remove old setCurrentInventory method
        // inventoryService.setCurrentInventory(inv);
        $location.path('/view');
    };

    $scope.addInventory = function() {
        var id = $routeParams.id;
        $scope.inventories[id] = $scope.inventory;
        inventoryService.storeInventories();
        $location.path(`/view/${id}`);
    };

    $scope.editInventory = function(inv) {
        // TODO: remove old setCurrentInventory method
        // inventoryService.setCurrentInventory(inv);
        $location.path('/edit');
    };

    $scope.newItem = function() {
        $location.path('/item/new');
    };

    $scope.addItem = function() {
        $scope.inventory.items.push(item);
        inventoryService.putInventories($scope.inventories);
    };
});
