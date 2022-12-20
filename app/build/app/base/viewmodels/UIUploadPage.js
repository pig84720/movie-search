/**
 * Created by jerryhuang on 15/7/28.
 */
define(function (require) {
    'use strict';
    require('jquery.browser');
    var modelToViewModel = require('ModelToViewModel'),
        common = require('Common');
    if (!$('#jqueryFileuploadCss')[0]) {
        common.loadCss([
            {
                id: 'blueimpGallery',
                uri: SS.app.baseUrl + 'app/base/resources/css/blueimp-gallery.min.css'
            },
            {
                id: 'jqueryFileuploadCss',
                uri: SS.app.baseUrl + 'app/base/resources/css/jquery.fileupload.css'
            },
            {
                id: 'jqueryFileuploadUiCss',
                uri: SS.app.baseUrl + 'app/base/resources/css/jquery.fileupload-ui.css'
            }//,
            //{
            //    id: 'jqueryFileuploadCssNoscript',
            //    uri: SS.app.baseUrl + 'app/base/resources/css/jquery.fileupload-noscript.css',
            //    noscript: true
            //},
            //{
            //    id: 'jqueryFileuploadUiCssNoscript',
            //    uri: SS.app.baseUrl + 'app/base/resources/css/jquery.fileupload-ui-noscript.css',
            //    noscript: true
            //}
        ]);
    }

    //console.log($.browser.name);
    //console.log($.browser.versionNumber);
    if ($.browser.name == 'ie' && $.browser.versionNumber >= 8 && $.browser.versionNumber <= 10) {
        require(['jquery.xdr-transport'], function () {
        });
    }

    var model = {
        id: '',
        init: function (programId, initVar, callback) {
            viewModel.id(programId);
            callback();
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    console.dir(viewModel);
    //alert(JSON.stringify(viewModel.editSection));
    return viewModel;
});