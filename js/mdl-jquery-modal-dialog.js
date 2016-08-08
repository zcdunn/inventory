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
        negative: {
            selector: '#negative',
            onClick: undefined
        },
        positive: {
            selectory: '#positive',
            onClick: undefined
        },
        cancelable: true,
        onLoaded: false
    }, options);

    $(document).unbind("keyup.dialog");
    var dialog = $(opts.selector).remove();
    var content = dialog.find('.mdl-card');
    var negButton = dialog.find(opts.negative.selector);
    var posButton = dialog.find(opts.positive.selector);

    if(negButton.length >= 1) {
        negButton.click(function(e) {
            e.preventDefault();
            e.data = $.extend({ dialog }, e.data);
            if(!opts.negative.onClick)
                hideDialog(dialog);
            else
                opts.negative.onClick(e);
        });
    }
    if(posButton.length >= 1) {
        posButton.click(function(e) {
            e.preventDefault();
            e.data = $.extend({ dialog }, e.data);
            if(!opts.positive.onClick)
                hideDialog(dialog);
            else
                opts.positive.onClick(e);
        });
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
        // dialog.css({opacity: 1});
        dialog.removeClass('not-in-use');
        if(opts.onLoaded)
            opts.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.addClass('not-in-use');
    // dialog.css({opacity: 0});
    /*
    setTimeout(function() {
        dialog.remove();
    }, 400);
    */
}