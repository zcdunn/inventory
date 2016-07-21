myApp.controller('InventoryController', function($scope, $location, inventoryService) {
        inventoryService.loadInventories()
            .then(function(inventories) {
                console.log("Loaded stored inventories: ", inventories);
                $scope.inventories = inventories;
            });
        $scope.inventory = inventoryService.getCurrentInventory();

        $scope.goBack = function() {
            window.history.go(-1);
        };

        $scope.newInventory = function() {
            $scope.inventory = { items: [] };
            $location.path('/new');
        };

        $scope.viewInventory = function(inv) {
            console.log("Inventory:", inv);
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
