//設定載入順序，先載入config(載入必要的script)，再載入app(初始化程式)
require.config({
    paths: {appSetting: 'appSetting', config: '../../config'},
    shim: {config: ['appSetting'], app: ['config']}
});
require(['appSetting', 'config', 'app'], function (appSetting, config, app) {
    //Session解析
    //var sessJson=$.parseJSON($('#ctl00_ContentPlaceHolder1_sessJson').val());
    //console.log('UIUploadPage');
    app.init({
        programId: 'UIUploadPage',    //程式代號-必要參數
        serviceUrl: SS.service.baseUrl,    //服務網址-必要參數
        viewModel: 'UIUploadPage',    //ViewModel-必要參數
        base: true,
        initVar: {
            userId: '99998',
            userName: '上擎測試帳號',        //titleInfo必要參數，可以為空白
            compId: '01',
            compName: '上擎科技',        //titleInfo必要參數，可以為空白
            deptId: 'XD00',
            deptName: '專案開發部',        //titleInfo必要參數，可以為空白
            pgmId: 'LSD010',        //titleInfo必要參數，可以為空白
            pgmNm: '預約作業',        //titleInfo必要參數，可以為空白
            loginTime: moment().format('YYYY/MM/DD HH:mm:ss')        //titleInfo必要參數，可以為空白
        }
    });
});