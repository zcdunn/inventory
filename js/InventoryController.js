myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, inventoryService) {
    inventoryService.loadInventories()
        .then(function(inventories) {
            console.log("Loaded stored inventories: ", inventories);
            $scope.inventories = inventories;
            $scope.apply();
        });
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
        $scope.inventories.push($scope.inventory);
        inventoryService.putInventories($scope.inventories);
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
