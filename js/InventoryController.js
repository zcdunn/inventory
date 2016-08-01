myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, inventoryService, breadCrumbService) {
    $scope.inventories = inventoryService.getInventories();
    $scope.inventory = inventoryService.getInventory($routeParams.id);
    if($scope.inventory && $routeParams.itemId) {
        $scope.item = $scope.inventory[$routeParams.itemId];
        console.log("Item: ", $scope.item);
    }
    $scope.breadCrumbs = breadCrumbService;

    $scope.$on('$routeChangeSuccess', function (e, curr, prev) {
        breadCrumbService.update(curr.locals.breadCrumb);
    });

    $scope.editInventory = function(inv) {
        $location.path(`/edit/${inv.id}`);
    };

    $scope.newInventory = function() {
        $location.path('/new');
    };

    $scope.addInventory = function() {
        var input = $scope.inventory;
        var inv = inventoryService.newInventory(inventory.name, inventory.coin);

        console.log("Input:", input);
        console.log("Inventory:", inventory);

        inventoryService.storeInventories();
        $location.path(`/view/${inv.id}`);
    };

    $scope.removeInventory = function(id) {
        inventoryService.removeInventory(id);
        inventoryService.storeInventories();
    };

    $scope.newItem = function() {
        var id = $scope.inventory.id;
        var item = inventoryService.newItem($scope.inventory);
        $location.path(`/edit/${id}/item/new/${item.id}`);
    };

    $scope.addItem = function() {
        console.log("$routeParams:", $routeParams);
        console.log("Here's the item I'm saving:", $scope.item);
        var { id, itemId } = $routeParams;

        $scope.inventory.items[itemId] = $scope.item;
        inventoryService.storeInventories();
        $location.path(`/view/${id}`);
    };

    $scope.removeItem = function(inv, item) {
        console.log("Removing item:", item);
        delete inv.items[item.id];
        $location.path(`/view/${inv.id}`);
    };
});
