myApp.controller('InventoryController', function($scope, $location, inventoryService) {
        $scope.inventories = inventoryService.getInventories();
        inventoryService.loadInventories()
            .then(function(inventories) {
                console.log("Loaded stored inventories: ", inventories);
                $scope.inventories = inventories;
            });

        $scope.goBack = function() {
            window.history.go(-1);
        };

        $scope.newInventory = function() {
            $scope.inventory = { items: [] };
            $location.path('/new');
        };

        $scope.viewInventory = function(inv) {
            console.log("Inventory:", inv);
            $location.path('/view');
            $scope.inventory = inv;
        };

        $scope.addInventory = function() {
            $scope.inventories.push($scope.inventory);
            inventoryService.putInventories($scope.inventories);
        };

        $scope.editInventory = function(inv) {
            $scope.inventory = inv;
            $location.path('/edit');
        };

        $scope.newItem = function() {
            $location.path('/item/new');
            $scope.item = {};
        };

        $scope.addItem = function() {
            $scope.inventory.items.push(item);
            $scope.item = {};
            inventoryService.putInventories($scope.inventories);
        };
    });
