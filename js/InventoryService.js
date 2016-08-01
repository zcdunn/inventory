myApp.service('inventoryService', function() {
    this.newInventory = function(name, coin, items) {
        var inv = Inventory.create(name, coin, items);
        this.inventories[inv.id] = inv;

        this.store();
        return inv;
    };

    this.newItem = function(id, name, value, desc) {
        var inventory = this.inventories[id];
        var item = inventory.newItem(name, value, desc);

        this.store();
        return item;
    };

    this.removeInventory = function(id) {
        delete this.inventories[id];
        this.store();
    };

    this.removeItem = function(id, itemId) {
        this.inventories[id].removeItem(itemId);
        this.store();
    };

    this.getInventory = function(id) {
        try {
            return this.inventories[id];
        }
        catch(err) {
            return undefined;
        }
    };

    this.getItem = function(id, itemId) {
        var inventory = this.inventories[id] || {};
        var item = inventory.getItem(itemId);
        return item;
    };

    this.getInventories = function() {
        if(!this.inventories) {
            var invStr = localStorage.inventories;
            this.inventories = invStr ? JSON.parse(invStr) : this.defaultJson;
        }

        return this.inventories;
    };

    this.storeInventories = function() {
        localStorage.inventories = JSON.stringify(this.inventories);
    };

    this.store = function() {
        var inventories = this.inventories;
        return new Promise(function(resolve, reject) {
            var json = JSON.stringify(inventories);
            localStorage.inventories = json;
            resolve(json);
        });
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

