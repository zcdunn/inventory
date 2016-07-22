myApp.service('inventoryService', function($http) {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    function guid() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    this.setCurrentInventory = function(inv) {
        this.inventory = inv;
    };

    this.getCurrentInventory = function() {
        return this.inventory;
    };

    this.newInventory = function() {
        var id = guid();
        while(this.inventories[id]) {
            id = guid();
        }

        var inv = { id, items: [] };
        this.inventories[id] = inv;
        return inv;
    };

    this.getInventory = function(id) {
        try {
            return this.inventories[id];
        }
        catch(err) {
            return undefined;
        }
    };

    this.loadInventories = function() {
        var invStr = localStorage.getItem('inventories'), ret;
        if(invStr) {
            this.inventories = JSON.parse(invStr);
            ret = new Promise(function(resolve, reject) {
                resolve(this.inventories);
            });
        }
        else {
            ret = $http.get('inventories.json')
                    .then(function(res) {
                        this.inventories = res.data;
                        return this.inventories;
                    });
        }

        return ret;
    };

    this.putInventories = function(inventories) {
        localStorage.setItem('inventories', JSON.stringify(inventories));
    };
});

