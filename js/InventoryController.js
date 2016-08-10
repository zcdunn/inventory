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
        var incomingInv = $scope.inventory;
        var inv = id ? inventoryService.updateInventory(id, incomingInv)
                     : inventoryService.newInventory(incomingInv.name, incomingInv.coin);

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
        $location.path(`/new/${id}/item`);
    };

    $scope.addItem = function(id, itemId) {
        var incomingItem = $scope.item;
        var item = itemId ? inventoryService.updateItem(id, itemId, incomingItem)
                          : inventoryService.newItem(id, incomingItem.name, incomingItem.value, incomingItem.desc);

        $location.path(`/view/${id}`);
    };

    $scope.removeItem = function(id, itemId) {
        var item = inventoryService.removeItem(id, itemId);
        $location.path(`/view/${id}`);
    };

    $scope.sellItem = function(id, itemId) {
        var coin = $scope.coin;
        var soldItem = inventoryService.sellItemFromInventory(id, itemId, coin);

        var buyer = $scope.buyer;
        if(buyer) inventoryService.buyItemForInventory(buyer.id, soldItem, coin);

        $location.path(`/view/${id}`);
    };

    $scope.cancelRemoveItem = function(id) {
        $location.path(`/view/${id}`);
    };
});
