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

    $scope.addInventory = function(id) {
        var inventory = $scope.inventory, inv;

        if(id) {
            // TODO: move updating into inventoryService
            inv = inventoryService.getInventory(id);
            inv.name = inventory.name;
            inv.coin.gp = inventory.coin.gp;
            inv.coin.sp = inventory.coin.sp;
            inv.coin.cp = inventory.coin.cp;
            inventoryService.storeInventories();
        }
        else inv = inventoryService.newInventory(inventory.name, inventory.coin);

        $location.path(`/view/${inv.id}`);
    };

    $scope.removeInventory = function(id) {
        showDialog({
            title: 'Delete Inventory',
            text: 'Are you sure you want to delete this inventory?',
            cancelable: false,
            negative: {
                title: 'Cancel',
                onClick: function() {
                    hideDialog($('.dialog-container'));
                }
            },
            positive: {
                title: 'Yep',
                onClick: function() {
                    inventoryService.removeInventory(id);
                    $location.path('/');
                }
            }
        });
    };

    $scope.newItem = function(id) {
        $location.path(`/edit/${id}/item/new`);
    };

    $scope.addItem = function(id, itemId) {
        var item = $scope.item;

        if(itemId) {
            // TODO: move updating into inventoryService
            var oldItem = inventoryService.getItem(id, itemId);
            oldItem.name = item.name;
            oldItem.value = item.value;
            oldItem.desc = item.desc;
            inventoryService.storeInventories();
        }
        else inventoryService.newItem(id, item.name, item.value, item.desc);

        $location.path(`/view/${id}`);
    };

    $scope.removeItem = function(inv, item) {
        inventoryService.removeItem(inv.id, item.id);
        $location.path(`/view/${inv.id}`);
    };
});
