myApp.controller('InventoryController', function($scope, $location, inventoryService) {
        $scope.inventories = inventoryService.getInventories();
        /*
        inventoryService.loadInventories()
            .then(function(inventories) {
                $scope.inventories = inventories;
            });
        */

        $scope.newInventory = function() {
            $scope.inventory = { items: [] };
            $location.path('/inventory/new');
        };

        $scope.addInventory = function() {
            $scope.inventories.push($scope.inventory);
            inventoryService.putInventories($scope.inventories);
        };

        $scope.editInventory = function(inv) {
            $scope.inventory = inv;
            $location.path('/inventory/edit');
        };

        $scope.newItem = function() {
            $scope.item = {};
            $location.path('/item/new');
        };

        $scope.addItem = function() {
            $scope.inventory.items.push(item);
            $scope.item = {};
            inventoryService.putInventories($scope.inventories);
        };
    });
