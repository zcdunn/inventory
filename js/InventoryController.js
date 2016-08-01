myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, inventoryService, breadCrumbService) {
    $scope.inventories = inventoryService.getInventories();
    $scope.inventory = inventoryService.getInventory($routeParams.id);
    if($scope.inventory && $routeParams.itemId) {
        $scope.item = inventoryService.getItem($routeParams.id, $routeParams.itemId);
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
        var inventory = $scope.inventory;
        var inv = inventoryService.newInventory(inventory.name, inventory.coin);

        console.log("Input:", inventory);
        console.log("Inventory:", inv);
        $location.path(`/view/${inv.id}`);
    };

    $scope.removeInventory = function(id) {
        inventoryService.removeInventory(id);
    };

    $scope.newItem = function(id) {
        $location.path(`/edit/${id}/item/new`);
    };

    $scope.addItem = function(id) {
        var item = $scope.item;

        inventoryService.newItem(id, item.name, item.value, item.desc);
        $location.path(`/view/${id}`);
    };

    $scope.removeItem = function(inv, item) {
        inventoryService.removeItem(inv.id, item.id);
        $location.path(`/view/${inv.id}`);
    };
});
