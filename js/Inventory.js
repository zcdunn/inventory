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

    newItem: function(name, value, desc, id) {
        var item = {};
        item.name = name;
        item.value = value || 10;
        item.desc = desc || "";
        item.id = id || guid();
        return item;
    }
};
