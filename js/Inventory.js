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
        var value = val || 10;
        var item = { name, value, desc };
        item.id = id || guid();

        this.items[item.id] = item;
        return item;
    },

    removeItem: function(id) {
        delete this.items[id];
    },

    getItem: function(id) {
        return this.items[id];
    },

    update: function(invUpdate) {
        this.name = invUpdate.name || this.name;
        if(invUpdate.coin !== undefined) {
            if(invUpdate.coin.gp !== undefined) this.coin.gp = invUpdate.coin.gp;
            if(invUpdate.coin.sp !== undefined) this.coin.sp = invUpdate.coin.sp;
            if(invUpdate.coin.cp !== undefined) this.coin.cp = invUpdate.coin.cp;
        }
        if(invUpdate.items !== undefined) this.items = invUpdate.items;
    },

    updateItem: function(id, itemUpdate) {
        var item = this.items[id];

        item.name = itemUpdate.name || item.name;
        if(itemUpdate.value !== undefined) item.value = itemUpdate.value;
        item.desc = itemUpdate.desc || item.desc;
        if(itemUpdate.weight !== undefined) item.weight = itemUpdate.weight;
        return item;
    }
};
