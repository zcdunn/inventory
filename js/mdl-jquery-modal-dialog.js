function showLoading() {
    // remove existing loaders
    $('.loading-container').remove();
    $('<div id="orrsLoader" class="loading-container"><div><div class="mdl-spinner mdl-js-spinner is-active"></div></div></div>').appendTo("body");

    componentHandler.upgradeElements($('.mdl-spinner').get());
    setTimeout(function () {
        $('#orrsLoader').css({opacity: 1});
    }, 1);
}

function hideLoading() {
    $('#orrsLoader').css({opacity: 0});
    setTimeout(function () {
        $('#orrsLoader').remove();
    }, 400);
}

function showDialog(options) {
    var opts = $.extend({
        selector: '.dialog-container',
        negative: false,
        positive: false,
        cancelable: true,
        onLoaded: false
    }, options);

    $(document).unbind("keyup.dialog");
    var dialog = $(opts.selector).remove();
    var content = dialog.find('.mdl-card');

    if(opts.negative || opts.positive) {
        if(opts.negative) {
            opt.negative = $.extend({
                selector: '#negative',
                title: 'Cancel',
                onClick: undefined
            }, opts.negative);
            var negButton = buttonBar.find(opts.negative.selector);
            negButton.click(function(e) {
                e.preventDefault();
                if(!opts.negative.onClick)
                    hideDialog(dialog);
                else
                    opts.negative.onClick(e);
            });
        }
        if(opts.positive) {
            opts.positive = $.extend({
                selector: '#positive',
                title: 'OK',
                onClick: undefined
            }, opts.positive);
            var posButton = buttonBar.find(opts.positive.selector);
            posButton.click(function(e) {
                e.preventDefault();
                if(!opts.positive.onClick)
                    hideDialog(dialog);
                else
                    opts.positive.onClick(e);
            });
        }
    }
    $('body').append(dialog);
    componentHandler.upgradeDom();
    if(opts.cancelable) {
        dialog.click(function() {
            hideDialog(dialog);
        });
        $(document).bind("keyup.dialog", function(e) {
            if(e.which == 27)
                hideDialog(dialog);
        });
        content.click(function(e) {
            e.stopPropagation();
        });
    }
    setTimeout(function() {
        dialog.css({opacity: 1});
        if(opts.onLoaded)
            opts.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({opacity: 0});
    /*
    setTimeout(function() {
        dialog.remove();
    }, 400);
    */
}