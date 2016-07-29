myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, inventoryService, breadCrumbService) {
    $scope.inventories = inventoryService.loadInventories();
    $scope.inventory = inventoryService.getInventory($routeParams.id);
    if($scope.inventory && $routeParams.itemId) {
        $scope.item = $scope.inventory[$routeParams.itemId];
        console.log("Item: ", $scope.item);
    }
    $scope.breadCrumbs = breadCrumbService;

    $scope.$on('$routeChangeSuccess', function (e, curr, prev) {
        var breadCrumb = curr.locals.breadCrumb;
        breadCrumb.path = $location.path().substring(1);
        breadCrumbService.update(breadCrumb);
    });

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
        inv.items[item.id] = undefined;
        $location.path(`/view/${id}`);
    };
});
