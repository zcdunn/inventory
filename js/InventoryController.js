myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, inventoryService) {
    inventoryService.loadInventories()
        .then(function(inventories) {
            console.log("Loaded stored inventories: ", inventories);
            $scope.inventories = inventories;
        });
    if($location.path().includes('new')) {
        $scope.inventory = inventoryService.newInventory();
    }
    else {
        $scope.inventory = inventoryService.getInventory($routeParams.id);
    }

    $scope.goBack = function() {
        $window.history.go(-1);
    };

    $scope.newInventory = function() {
        $scope.inventory = inventoryService.newInventory();
        $location.path('/new');
    };

    $scope.viewInventory = function(inv) {
        inventoryService.setCurrentInventory(inv);
        $location.path('/view');
    };

    $scope.addInventory = function() {
        $scope.inventories.push($scope.inventory);
        inventoryService.putInventories($scope.inventories);
    };

    $scope.editInventory = function(inv) {
        inventoryService.setCurrentInventory(inv);
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
