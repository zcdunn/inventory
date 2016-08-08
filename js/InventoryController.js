myApp.controller('InventoryController', function($scope, $window, $location, $routeParams, $timeout, inventoryService, breadCrumbService) {
    var id = $routeParams.id, itemId = $routeParams.itemId;
    $scope.inventories = inventoryService.getInventories();
    $scope.inventory = inventoryService.getInventory(id);
    $scope.item = inventoryService.getItem(id, itemId) || {};
    $scope.breadCrumbs = breadCrumbService;

    // TODO: can this method be moved into BreadCrumbService.js?
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
        var inventoryUpdate = $scope.inventory;
        var inv = id ? inventoryService.updateInventory(id, inventoryUpdate)
                     : inventoryService.newInventory(inventory.name, inventory.coin);

        $location.path(`/view/${inv.id}`);
    };

    $scope.removeInventory = function(id) {
        var invToDelete = inventoryService.getInventory(id);
        invToDelete.delete = true;

        var deleteTimer = $timeout(function() {
            if(invToDelete.delete)
                inventoryService.removeInventory(id);
        }, 6000);

        var notification = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar({
            message: `Deleted ${invToDelete.name}`,
            actionText: 'Undo',
            actionHandler: function() {
                $timeout.cancel(deleteTimer);
                $scope.$apply(function() {
                    delete invToDelete.delete;
                });
            },
            timeout: 3000
        });
    };

    $scope.newItem = function(id) {
        $location.path(`/edit/${id}/item/new`);
    };

    $scope.addItem = function(id, itemId) {
        var itemUpdate = $scope.item;
        var item = itemId ? inventoryService.updateItem(id, itemId, itemUpdate)
                          : inventoryService.newItem(id, item.name, item.value, item.desc);

        $location.path(`/view/${id}`);
    };

    $scope.removeItem = function(inv, item) {
        /*
        showDialog({
            positive: {
                onClick: function(e) {
                    $scope.$apply(function() {
                        console.log("Sell Price:", $scope.coin);
                        inventoryService.removeItem(inv.id, item.id);
                        hideDialog(e.data.dialog);
                    });
                }
            }
        });
        */
        var coin = $scope.coin;
        var soldItem = inventoryService.sellItemFromInventory(inv.id, item.id, coin);

        /* TODO: Add a destination inventory to removeItem form
            var buyingInventory = $scope.buyingInventory;
            if(buyingInventory)
                inventoryService.buyItemForInventory(buyingInventory.id, soldItem, coin);
        */
        
        $location.path(`/view/${id}`);
    };

    $scope.cancelRemoveItem = function(id) {
        $location.path(`/view/${id}`);
    };
});
