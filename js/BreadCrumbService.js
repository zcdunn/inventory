myApp.service('breadCrumbService', function($location, $rootScope) {

    var $this = this;
    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        $this.update(curr.locals.breadCrumb);
    });

    this.crumbs = [
    ];

    this.current = {
        path: './',
        display:'Inventories'
    };

    this.update = function(crumb) {
        if(this.current.path === crumb.path || crumb.path === '/')
            return;

        var index = 0;
        if(crumb.path) {
            index = this.crumbs.findIndex(function(c) {
                return c.path === crumb.path;
            });
        }

        if(index == -1) {
            this.crumbs.push(this.current);
            this.current = crumb;
        }
        else {
            this.current = this.crumbs[index] || this.current;
            this.crumbs = this.crumbs.slice(0, index);
        }
    };

    this.get = function(i) {
        var index = i || 0;
        return this.crumbs[index];
    };
});
