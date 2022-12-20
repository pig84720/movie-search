/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var common = require('Common'),
        ajaxLoader = require('ajaxLoader');

    SS.namespace("SS.mask.init");
    SS.namespace("SS.mask.show");
    SS.namespace("SS.mask.hide");
    SS.namespace("SS.mask.options");

    common.loadCss([
        {
            iid: 'SSCss',
            uri: SS.app.baseUrl + 'app/base/resources/css/SS.css'
        }
    ]);

    //初始化Mask Loading功能
    SS.mask.init = function () {
        var options = {
            bgColor: '#E4E5E4',
            duration: 100,
            opacity: 0.7,
            classOveride: false
        }
        SS.mask = ajaxLoader.ajaxLoader;
        SS.mask.options = options;
        SS.mask.count = 0;
        SS.mask.show = function () {
            if(SS.mask.progressBar==null){
                SS.mask.progressBar = new SS.mask('html', SS.mask.options);
            }else{
                $('.ajax_overlay').css('display','');
            }
            SS.mask.count++;
        };
        SS.mask.hide = function () {
            SS.mask.count--;
            if (SS.mask.count < 0) SS.mask.count = 0;
            if (SS.mask.progressBar != null && SS.mask.count == 0) {
            //if (SS.mask.progressBar != null) {
            //    SS.mask.progressBar.remove();
                $('.ajax_overlay').css('display','none');
                SS.mask.progressBar = null;
            }
        };
        SS.mask.show();
    };

    return {
        init: SS.mask.init
    };
});