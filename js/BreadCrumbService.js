myApp.service('breadCrumbService', function($location) {

    this.pathQueue = [
        {
            path: '/',
            display:'Inventories'
        }
    ];

    this.push = function(path) {
        this.pathQueue.push(path);
    };

    this.get = function(i) {
        if(!i) i = 0;
        return this.pathQueue[i];
    };
});
