myApp.service('breadCrumbService', function($location) {

    this.crumbs = [
    ];

    this.current = {
        path: './',
        display:'Inventories'
    };

    this.push = function(crumb) {
        this.crumbs.push(this.current);
        this.current = crumb;
    };

    this.go = function(path) {
        var index = this.crumbs.findIndex(function(crumb) {
            return crumb.path === path;
        });
        this.current = this.crumbs[index];
        this.crumbs = this.crumbs.slice(0, index);
    };

    this.update = function(crumb) {
        console.log("Updating crumbs:", crumb);
    };

    this.get = function(i) {
        var index = i || 0;
        return this.crumbs[index];
    };
});
