require.config({
    paths: {
        appSetting: 'appSetting',
        config: '../config',
        Common: '../base/utils/Common'
    },
    shim: {
        config: ['appSetting'],
        app: ['config'],
        'viewmodels/index': ['app']
    }
});
require(['appSetting', 'config', 'app', 'viewmodels/index', 'Common'], function (appSetting, config, app, viewModel, common) {
    app.init({
        programId: 'index',    //程式代號-必要參數
        serviceUrl: SS.service.baseUrl,    //服務網址-必要參數
        viewModel: viewModel,    //ViewModel-必要參數
        initVar: {}
    });
});
