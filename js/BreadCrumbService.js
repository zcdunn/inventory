myApp.service('breadCrumbService', function($location) {

    this.crumbs = [
    ];

    this.currCrumb = {
        path: './',
        display:'Inventories'
    };

    this.push = function(crumb) {
        this.crumbs.push(this.currCrumb);
        this.currCrumb = crumb;
    };

    this.go = function(path) {
        var index = this.crumbs.findIndex(function(crumb) {
            return crumb.path === path;
        });
        this.currCrumb = this.crumbs[index];
        this.crumbs = this.crumbs.slice(0, index);
    };

    this.get = function(i) {
        var index = i || 0;
        return this.crumbs[index];
    };
});
