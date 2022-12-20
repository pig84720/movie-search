/*
 * Ajax overlay 1.0
 * Author: Simon Ilett @ aplusdesign.com.au
 * Descrip: Creates and inserts an ajax loader for ajax calls / timed events
 * Date: 03/08/2011
 */
define(['jQuery'], function (jquery) {
    var common = require('Common');
    var ajaxLoader = function (el, options) {
        // Becomes this.options
        var defaults = {
            bgColor: '#fff',
            duration: 800,
            opacity: 0.7,
            classOveride: false
        }
        this.options = jQuery.extend(defaults, options);
        this.container = $(el);

        this.init = function () {
            var container = this.container;
            // Delete any other loaders
            this.remove();
            // Create the overlay
            var overlay = $('<div></div>').css({
                'background-color': this.options.bgColor,
                'opacity': this.options.opacity,
                'width': container.width(),
                'height': container.height(),
                'position': 'fixed',
                'top': '0px',
                'left': '0px',
                'z-index': 99999
            }).addClass('ajax_overlay');
            // add an overiding class name to set new loader style
            if (this.options.classOveride) {
                overlay.addClass(this.options.classOveride);
            }
            // insert overlay and loader into DOM
            container.append(
                overlay.append(
                    $('<div></div>').addClass('ajax_loader')
                ).fadeIn(this.options.duration)
            );
            //如果是ie8就自行註冊忙碌中的圖片
            if (window.attachEvent) {
                var wh = common.getWH('');
                //alert((parseInt(wh.height) / 2 - 128));
                //alert((parseInt(wh.width) / 2 - 64));
                $('<img>', {
                    src: SS.app.baseUrl + 'app/base/resources/images/loading1.gif'
                }).css({
                    position: 'fixed',
                    top: Math.round((parseInt(wh.height) / 2 - 128)) + 'px',
                    left: Math.round((parseInt(wh.width) / 2 - 64)) + 'px'
                }).appendTo('.ajax_overlay');
            }
        };

        this.remove = function () {
            var overlay = this.container.children(".ajax_overlay");
            if (overlay.length) {
                overlay.fadeOut(this.options.classOveride, function () {
                    overlay.remove();
                });
            }
        };

        this.init();
    };
    var vm = {
        ajaxLoader: ajaxLoader
    };
    return vm;
});

	