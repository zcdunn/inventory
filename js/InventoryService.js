myApp.service('inventoryService', function($http) {
    this.newInventory = function() {
        var inv = Inventory.create();
        return inv;
    };

    this.newItem = function(inv) {
        var id = guid();

        var item = { id };
        inv.items[id] = item;
        return item;
    };

    this.removeInventory = function(id) {
        delete this.inventories[id];
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
        if(!this.inventories) {
            var invStr = localStorage.inventories, inventories;
            this.inventories = invStr ? JSON.parse(invStr) : this.defaultJson;
        }

        return this.inventories;
    };

    this.storeInventories = function() {
        localStorage.inventories = JSON.stringify(this.inventories);
    };

    this.defaultJson = {
        "76ee1ec6-b9db-a9c6-48ae-4f452273cfb8": {
            id: "76ee1ec6-b9db-a9c6-48ae-4f452273cfb8",
            name: "Lionshead Coster",
            type: "shop",
            coin: {
                "gp": 500,
                "sp": 0,
                "cp": 0
            },
            items: {}
        },

        "d03204e1-8f7c-4905-4d9f-de161c7b4f14": {
            id: "d03204e1-8f7c-4905-4d9f-de161c7b4f14",
            name: "Phandalin Smithy",
            type: "shop",
            coin: {
                "gp": 250,
                "sp": 0,
                "cp": 0
            },
            items: {}
        },

        "9ef00a86-f484-5a00-b000-56dbfbb37664": {
            id: "9ef00a86-f484-5a00-b000-56dbfbb37664",
            name: "Phandalin Miner's Exchange",
            type: "shop",
            coin: {
                "gp": 450,
                "sp": 325,
                "cp": 750
            },
            items: {}
        }
    };
});

