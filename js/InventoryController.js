myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, inventoryService, breadCrumbService) {
    $scope.inventories = inventoryService.loadInventories();
    $scope.inventory = inventoryService.getInventory($routeParams.id);
    $scope.headerIcon = $scope.inventory ? "arrow_back" : "";
    updateCrumbs();
    $scope.breadCrumbs = breadCrumbService.crumbs;

    function updateCrumbs() {
        var crumb = {
            path: $location.path()
        };

        if($routeParams.itemId) {
            var item = $scope.inventory.items[$routeParams.itemId];
            crumb.display = item ? item.name : 'New Item';
        }
        else crumb.display = $scope.inventory ? $scope.inventory.name : "New Inventory";
        console.log("Crumb: ", crumb);
        breadCrumbService.push(crumb);
    }

    $scope.goBack = function() {
        $window.history.go(-1);
    };

    $scope.newInventory = function() {
        var inventory = inventoryService.newInventory();
        $location.path(`/new/${inventory.id}`);
    };

    $scope.editInventory = function(inv) {
        $location.path(`/edit/${inv.id}`);
    };

    $scope.addInventory = function() {
        var id = $routeParams.id;
        $scope.inventories[id] = $scope.inventory;
        inventoryService.storeInventories();
        $location.path(`/view/${id}`);
    };

    $scope.newItem = function() {
        var id = $scope.inventory.id;
        var item = inventoryService.newItem();
        $location.path(`/edit/${id}/item/new/${item.id}`);
    };

    $scope.addItem = function() {
        var { id, itemId } = $routeParams;
        var inventory = $scope.inventories[id];

        inventory.items[itemId] = $scope.item;
        inventoryService.storeInventories();
        $location.path(`/view/${id}`);
    };

    $scope.removeItem = function() {
    };
});
