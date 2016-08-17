myApp.service('inventoryService', function() {
    this.newInventory = function(name, coin, items, id) {
        var inv = Inventory.create(name, coin, items, id);
        this.inventories[inv.id] = inv;

        this.store();
        return inv;
    };

    this.newItem = function(id, name, value, desc) {
        var inventory = this.inventories[id], item;

        try {
            item = inventory.newItem(name, value, desc);
        }
        catch(err) {
            if(err instanceof TypeError && inventory) {
                var upgradedInventory = this.upgradeInventory(inventory);
                item = upgradedInventory.newItem(name, value, desc);
            }
        }

        this.store();
        return item;
    };

    this.removeInventory = function(id) {
        delete this.inventories[id];
        this.store();
    };

    this.removeItem = function(id, itemId) {
        var inventory = this.inventories[id], item;

        try {
            item = inventory.removeItem(itemId);
        }
        catch(err) {
            if(err instanceof TypeError && inventory) {
                var upgradedInventory = this.upgradeInventory(inventory);
                item = upgradedInventory.removeItem(itemId);
            }
        }

        this.store();
        return item;
    };

    this.updateInventory = function(id, invUpdate) {
        var inventory = this.inventories[id];

        try {
            inventory.update(invUpdate);
        }
        catch(err) {
            if(err instanceof TypeError && inventory) {
                var upgradedInventory = this.upgradeInventory(inventory);
                upgradedInventory.update(invUpdate);
            }
        }

        this.store();
        return inventory;
    };

    this.updateItem = function(id, itemId, itemUpdate) {
        var inventory = this.inventories[id], item;

        try {
            item = inventory.updateItem(itemId, itemUpdate);
        }
        catch(err) {
            if(err instanceof TypeError && inventory) {
                var upgradedInventory = this.upgradeInventory(inventory);
                item = upgradedInventory.updateItem(itemId, itemUpdate);
            }
        }

        this.store();
        return item;
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
        var inventory = this.inventories[id], item;

        try {
            item = inventory.getItem(itemId);
        }
        catch(err) {
            if(err instanceof TypeError && inventory) {
                var upgradedInventory = this.upgradeInventory(inventory);
                item = upgradedInventory.getItem(itemId);
            }
        }

        return item;
    };

    this.getInventories = function() {
        if(!this.inventories) {
            var invStr = localStorage.inventories;
            this.inventories = invStr ? JSON.parse(invStr) : this.getDefaults();
        }

        var values = [];
        for(var key in this.inventories) {
            if(this.inventories.hasOwnProperty(key))
                values.push(this.inventories[key]);
        }

        return values;
    };

    this.sellItemFromInventory = function(id, itemId, coin) {
        var inventory = this.inventories[id], item;

        try {
            item = inventory.sellItem(itemId, coin);
        }
        catch(err) {
            if(err instanceof TypeError && inventory) {
                var upgradedInventory = this.upgradeInventory(inventory);
                item = upgradedInventory.sellItem(itemId, coin);
            }
        }

        this.store();
        return item;
    };

    this.buyItemForInventory = function(id, item, coin) {
        var inventory = this.inventories[id];

        try {
            item = inventory.buyItem(item, coin);
        }
        catch(err) {
            if(err instanceof TypeError && inventory) {
                var upgradedInventory = this.upgradeInventory(inventory);
                item = upgradedInventory.buyItem(item, coin);
            }
        }

        this.store();
    };

    this.store = function() {
        var inventories = this.inventories;
        return new Promise(function(resolve, reject) {
            var json = JSON.stringify(inventories);
            localStorage.inventories = json;
            resolve(json);
        });
    };

    this.upgradeInventory = function(inventory) {
        return Inventory.create(inventory.name, inventory.coin, inventory.items, inventory.id);
    };

    this.getDefaults = function() {
        var one = Inventory.create('Lionshield Coster', { gp: 500, sp: 0, cp: 0 }, {}, '76ee1ec6-b9db-a9c6-48ae-4f452273cfb8');
        var two = Inventory.create('Phandalin Smithy', { gp: 250, sp: 0, cp: 0 }, {}, 'd03204e1-8f7c-4905-4d9f-de161c7b4f14');
        var three = Inventory.create("Phandalin Miner's Exchange", { gp: 450, sp: 325, cp: 750 }, {}, '9ef00a86-f484-5a00-b000-56dbfbb37664');
        var four = Inventory.create("Barthen's Provisions", { gp: 300, sp: 200, cp: 500 }, {}, '3d5b9c57-879a-0009-e686-9dac27e6b0f5');

        var inv = {};
        inv[one.id] = one;
        inv[two.id] = two;
        inv[three.id] = three;
        inv[four.id] = four;

        return inv;
    };
});
