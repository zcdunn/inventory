myApp.service('breadCrumbService', function($location) {

    this.crumbs = [
        {
            path: './',
            display:'Inventories'
        }
    ];

    this.push = function(crumb) {
        var isAlreadyListed = false;
        for(var i = 0, len = this.crumbs.len; i < len; i++) {
            if(this.crumbs[i].path == crumb.path) isAlreadyListed = true;
        }
        if(!isAlreadyListed) this.crumbs.push(crumb);
    };

    this.get = function(i) {
        if(!i) i = 0;
        return this.crumbs[i];
    };
});
