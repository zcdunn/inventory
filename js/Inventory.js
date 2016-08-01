function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var Inventory = {
    create: function(name, coin, items) {
        var self = Object.create(this);
        self.name = name;
        self.coin = coin || { gp: 0, sp: 0, cp: 0};
        self.items = items || {};
        self.id = guid();

        return self;
    },

    newItem: function(name, val, desc) {
        var value = val || 10;
        var item = { name, value, desc };
        item.id = guid();

        this.items[item.id] = item;
        return item;
    },

    removeItem: function(id) {
        delete this.items[id];
    },

    getItem: function(id) {
        return this.items[id];
    }
};
