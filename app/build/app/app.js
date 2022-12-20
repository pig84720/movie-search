define(function (require) {
    'use strict';
    var data = require('Data'),
        mask = require('Mask'),
        koCustomLoader = require('KoCustomLoader'),
        koValidation = require('KoValidation'),
        koCustomBinding = require('KoCustomBinding');
    require('jstorage');

    mask.init();    //initialize Mask
    koCustomLoader.init();    //initialize knockout custom loader & register components to ko
    koValidation.init();   //initialize knockout li tag click binding function
    koCustomBinding.init();    //initialize knockout validation setting

    return {
        init: function (i) {
            if (!i.programId) {
                SS.log('[app-init]', 'no "programId" parameter found!!')
                return;
            }
            if (!i.serviceUrl) {
                SS.log('[app-init]', 'no "serviceUrl" parameter found!!')
                return;
            }
            if (!i.viewModel) {
                SS.log('[app-init]', 'no "viewModel" parameter found!!')
                return;
            }
            if (!i.initVar) {
                SS.log('[app-init]', 'no "initVar" parameter found!!')
                return;
            }

            if (i.serviceUrl != null && i.serviceUrl != '') {
                data.setBsaeUrl(i.serviceUrl);
            }
            //console.log((i.base ? 'base\/' : '') + 'viewmodels\/' + i.viewModel);
            // 載入後,啟動所有模組
            if (window.attachEvent) {
                setTimeout(function () {
                    if(window.respond!=null) respond.update();
                }, 3000);
            }
            //require([(i.base ? 'base\/' : '') + 'viewmodels\/' + i.viewModel], function (viewModel) {
            //console.log(viewModel);
            i.viewModel.init(i.programId, i.initVar, function () {
                SS.mask.hide();
            });
            ko.applyBindings(i.viewModel);
            setTimeout(function () {
                $('body').css('display', '');
            }, 500);
        }
    };
});