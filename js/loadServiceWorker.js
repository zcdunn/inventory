window.addEventListener('load', function() {
    function updateOnlineStatus(event) {
        var message = navigator.onLine ? "You are online" : "You are offline";
        var notification = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar({
            message,
            actionText: 'Dismiss',
            actionHandler: function() {
                notification.classList.remove("mdl-snackbar--active");
            },
            timeout: 5000
        });
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('worker.js')
        .then(reg => {
            console.log('Registration succeeded. Scope is ' + reg.scope);
            // Let the user know once the app is available offline
            var newWorker = reg.installing;
            newWorker.onstatechange = event => {
                if(newWorker.state == 'activated' && !navigator.serviceWorker.controller) {
                    var notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar({
                        message: 'Ready to work offline',
                        actionText: 'Dismiss',
                        actionHandler: function() {
                            notification.classList.remove("mdl-snackbar--active");
                        },
                        timeout: 5000
                    });
                }
            };
        })
        .catch(error => console.log('Registration failed with ' + error));
}
