function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var Inventory = {
    create: function(name, coin, items, id) {
        var self = Object.create(this);
        self.name = name;
        self.coin = coin || { gp: 0, sp: 0, cp: 0};
        self.items = items || {};
        self.id = id || guid();

        return self;
    },

    newItem: function(name, val, desc, id) {
        var value = Object.assign({}, { gp: 0, sp: 0, cp: 0 }, val);
        var item = { name, value, desc };
        item.id = id || guid();

        this.items[item.id] = item;
        return item;
    },

    removeItem: function(id) {
        var item = this.items[id];
        delete this.items[id];
        return item;
    },

    getItem: function(id) {
        return this.items[id];
    },

    update: function(invUpdate) {
        var patchItems = Object.assign(this.items, invUpdate.items);
        var patchCoin = Object.assign(this.coin, invUpdate.coin);
        Object.assign(this, invUpdate);
        this.items = patchItems;
        this.coin = patchCoin;
    },

    updateItem: function(id, itemUpdate) {
        var item = this.items[id];
        var patchValue = Object.assign(item.value, itemUpdate.value);
        Object.assign(item, itemUpdate);
        item.value = patchValue;
        return item;
    },

    sellItem: function(id, coin) {
        var item = this.removeItem(id);
        var transaction = Object.assign({}, { gp: 0, sp: 0, cp: 0 }, coin);

        this.coin.gp += transaction.gp;
        this.coin.sp += transaction.sp;
        this.coin.cp += transaction.cp;

        return item;
    },

    buyItem: function(item, coin) {
        this.items[item.id] = item;
        var transaction = Object.assign({}, { gp: 0, sp: 0, cp: 0 }, coin);

        this.coin.gp -= transaction.gp;
        this.coin.sp -= transaction.sp;
        this.coin.cp -= transaction.cp;
    }
};
