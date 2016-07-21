myApp.service('inventoryService', function() {
    this.getInventories = function() {
        var invStr = localStorage.getItem('inventories');
        var inv = invStr ? JSON.parse(invStr) : this.defaultJson;
        return inv;
    };

    this.loadInventories = function() {
        var invStr = localStorage.getItem('inventories'), ret;
        if(invStr) {
            ret = new Promise(function(resolve, reject) {
                resolve(JSON.parse(invStr));
            });
        }
        else {
            ret = $http.get('inventories.json');
        }

        return ret;
    };

    this.putInventories = function(inventories) {
        localStorage.setItem('inventories', JSON.stringify(inventories));
    };

    this.defaultJson = [
        {
            name: "Lionshead Coster",
            coin: {
                gp: 500,
                sp: 0,
                cp: 0
            },
            items: [ { name: "Cool Longsword", value: 250, desc: "A really cool longsword" } ]
        },
        {
            name: "Phandalin Smithy",
            coin: {
                gp: 250,
                sp: 0,
                cp: 0
            },
            items: []
        },
        {
            name: "Phandalin Miner's Exchange",
            coin: {
                gp: 450,
                sp: 325,
                cp: 750
            },
            items: []
        }
    ];
});

