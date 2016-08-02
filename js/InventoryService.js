myApp.service('inventoryService', function() {
    this.inventories = this.getInventories();

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
            if(err instanceof TypeError) {
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
        var inventory = this.inventories[id];

        try {
            inventory.removeItem(itemId);
        }
        catch(err) {
            if(err instanceof TypeError) {
                var upgradedInventory = this.upgradeInventory(inventory);
                upgradedInventory.removeItem(itemId);
            }
        }

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
        var item;

        try {
            var inventory = this.inventories[id];
            item = inventory.getItem(itemId);
        }
        catch(err) {
            if(err instanceof TypeError) {
                var upgradedInventory = this.upgradeInventory(this.inventories[id]);
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

    this.upgradeInventory = function(inventory) {
        return Inventory.create(inventory.name, inventory.coin, inventory.items, inventory.id);
    };

    this.getDefaults = function() {
        var one = Inventory.create('Lionshead Coster', { gp: 500, sp: 0, cp: 0 }, {}, '76ee1ec6-b9db-a9c6-48ae-4f452273cfb8');
        var two = Inventory.create('Phandalin Smithy', { gp: 250, sp: 0, cp: 0 }, {}, 'd03204e1-8f7c-4905-4d9f-de161c7b4f14');
        var three = Inventory.create("Phandalin Miner's Exchange", { gp: 450, sp: 325, cp: 750 }, {}, '9ef00a86-f484-5a00-b000-56dbfbb37664');

        var inv = {};
        inv[one.id] = one;
        inv[two.id] = two;
        inv[three.id] = three;

        return inv;
    };
});

