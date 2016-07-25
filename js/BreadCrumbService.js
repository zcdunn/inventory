myApp.service('breadCrumbService', function($location) {

    this.crumbs = [
        {
            path: '/',
            display:'Inventories'
        }
    ];

    this.push = function(path) {
        this.crumbs.push(path);
    };

    this.get = function(i) {
        if(!i) i = 0;
        return this.crumbs[i];
    };
});
