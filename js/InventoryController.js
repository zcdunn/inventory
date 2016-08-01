myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, inventoryService, breadCrumbService) {
    var id = $routeParams.id, itemId = $routeParams.itemId;
    $scope.inventories = inventoryService.getInventories();
    $scope.inventory = inventoryService.getInventory(id);
    $scope.item = inventoryService.getItem(id, itemId) || {};
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

    $scope.addItem = function(id, itemId) {
        var item = $scope.item;

        if(itemId) {
            var oldItem = inventoryService.getItem(id, itemId);
            oldItem.name = item.name;
            oldItem.value = item.value;
            oldItem.desc = item.desc;
        }
        else inventoryService.newItem(id, item.name, item.value, item.desc);

        $location.path(`/view/${id}`);
    };

    $scope.removeItem = function(inv, item) {
        inventoryService.removeItem(inv.id, item.id);
        $location.path(`/view/${inv.id}`);
    };
});
