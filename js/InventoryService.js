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
        var inventoryPromise;
        if(!this.inventories) {
            var invStr = localStorage.getItem('inventories'), inventories;
            if(invStr) {
                this.inventories = JSON.parse(invStr);
                inventoryPromise = new Promise(function(resolve) {
                    resolve(this.inventories);
                });
            }
            else {
                var self = this;
                inventoryPromise = $http.get('inventories.json')
                                        .then(function(res) {
                                            self.inventories = res.data;
                                            return self.inventories;
                                        });
            }
        }
        else {
            inventoryPromise = new Promise(function(resolve) {
                resolve(this.inventories);
            });
        }

        return inventoryPromise;
    };

    this.putInventories = function(inventories) {
        localStorage.setItem('inventories', JSON.stringify(inventories));
    };
});

