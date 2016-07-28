myApp.service('breadCrumbService', function($location) {

    this.crumbs = [
    ];

    this.current = {
        path: './',
        display:'Inventories'
    };

    this.update = function(crumb) {
        console.log("Updating crumbs:", crumb);
        var index = this.crumbs.findIndex(function(c) {
            return c.path === crumb.path;
        });

        if(index == -1) {
            this.crumbs.push(this.current);
            this.current = crumb;
        }
        else {
            this.current = this.crumbs[index];
            this.crumbs = this.crumbs.slice(0, index);
        }
    };

    this.get = function(i) {
        var index = i || 0;
        return this.crumbs[index];
    };
});
