myApp.service('inventoryService', function($http) {
    this.setCurrentInventory = function(inv) {
        this.inventory = inv;
    };

    this.getCurrentInventory = function() {
        return this.inventory;
    };

    this.loadInventories = function($http) {
        var invStr = localStorage.getItem('inventories'), ret;
        if(invStr) {
            ret = new Promise(function(resolve, reject) {
                resolve(JSON.parse(invStr));
            });
        }
        else {
            ret = $http.get('inventories.json');
        }

        return ret;
    };

    this.putInventories = function(inventories) {
        localStorage.setItem('inventories', JSON.stringify(inventories));
    };
});

