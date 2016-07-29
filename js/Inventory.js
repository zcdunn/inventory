function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var Inventory = {
    create: function(id, name, coin, items) {
        var self = Object.create(this);
        self.id = id || guid();
        self.name = name;
        self.coin = coin || { gp: 0, sp: 0, cp: 0};
        self.items = items || {};

        return self;
    }
};
