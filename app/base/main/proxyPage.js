/**
 * Created by jerryhuang on 15/9/1.
 */
require.config({
    paths: {proxyPageAppSetting: 'proxyPageAppSetting', config: '../../config'},
    shim: {config: ['proxyPageAppSetting'], app: ['config']}
});
require(['proxyPageAppSetting', 'config', 'app'], function (appSetting, config, app) {
    //Session解析
    //var sessJson=$.parseJSON($('#ctl00_ContentPlaceHolder1_sessJson').val());
    //console.log('UIUploadPage');
    app.init({
        programId: 'proxyPage',    //程式代號-必要參數
        serviceUrl: SS.service.baseUrl,    //服務網址-必要參數
        viewModel: 'proxyPage',    //ViewModel-必要參數
        base: true,
        initVar: {
            userId: '99998',
            userName: '',        //titleInfo必要參數，可以為空白
            compId: '01',
            compName: '',        //titleInfo必要參數，可以為空白
            deptId: 'XD00',
            deptName: '',        //titleInfo必要參數，可以為空白
            pgmId: 'proxyPage',        //titleInfo必要參數，可以為空白
            pgmNm: '',        //titleInfo必要參數，可以為空白
            loginTime: moment().format('YYYY/MM/DD HH:mm:ss')        //titleInfo必要參數，可以為空白
        }
    });
});