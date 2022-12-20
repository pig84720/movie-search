/**
 * Created by jerryhuang on 15/9/1.
 */
/**
 * Created by jerryhuang on 15/7/28.
 */
define(function (require) {
    'use strict';
    var postMessage = require('PostMessage'),
        upload = require('Upload'),
        commonData = require('Data'),
        modelToViewModel = require('ModelToViewModel');

    var receiveMessage = function (data) {
        //console.log(data);
        try{
            viewModel[data.triggerFunction](data);
        }catch(e){
            console.log(e.message);
        }
    };

    var model = {
        id: '',
        init: function (programId, initVar, callback) {
            viewModel.id(programId);
            callback();
            postMessage.init(receiveMessage);
        },
        checkAlive:function(postData){
            if(window.attachEvent){
                setTimeout(function () {
                    postMessage.sendMessage({
                        type: 'parent',
                        callbackId: postData.callbackId,
                        messageContent: {
                            result: true
                        }
                    });
                }, 10);
            }else{
                postMessage.sendMessage({
                    type: 'parent',
                    callbackId: postData.callbackId,
                    messageContent: {
                        result: true
                    }
                });
            }
        },
        excelToJson: function (postData) {
            if ($('#uploadFile').val().toLowerCase().indexOf(".xlsx") == -1) {
                alert('匯入的檔案格式有問題，請匯入附檔名為xlsx的Excel檔案！！');
                $('#uploadFile').val('');
                $('#uploadFile').focus();
                postMessage.sendMessage({
                    type: 'parent',
                    callbackId: postData.callbackId,
                    messageContent: {
                        result: false,
                        data: 'errorInput'
                    }
                });
                return;
            }
            upload.setBsaeUrl(postData.messageContent.baseUrl);
            upload.doUploadiFrame('uploadExcelToJsonForm')
                .done(function (data) {
                    //base.callback(data);
                    //console.log(data);
                    //console.log(postData);
                    postMessage.sendMessage({
                        type: 'parent',
                        callbackId: postData.callbackId,
                        messageContent: {
                            result: true,
                            data: data
                        }
                    });
                    $('#uploadFile').val('');
                }).fail(function (e) {
                    //console.log(e);
                    //alert('上傳檔案發生異常！');
                    postMessage.sendMessage({
                        type: 'parent',
                        callbackId: postData.callbackId,
                        messageContent: {
                            result: false,
                            data: null
                        }
                    });
                    $('#uploadFile').val('');
                });
        },
        uploadFile: function (postData) {
            upload.setBsaeUrl(postData.messageContent.baseUrl);
            upload.uploadFile({
                uploadFormId: 'uploadExcelToJsonForm',
                uploadFileParams: postData.messageContent.uploadFileParams
            }).done(function (data) {
                postMessage.sendMessage({
                    type: 'parent',
                    callbackId: postData.callbackId,
                    messageContent: {
                        result: true,
                        data: data
                    }
                });
                $('#uploadFile').val('');
            }).fail(function (e) {
                console.log(e);
                //alert('上傳檔案發生異常！');
                postMessage.sendMessage({
                    type: 'parent',
                    callbackId: postData.callbackId,
                    messageContent: {
                        result: false,
                        data: null
                    }
                });
                $('#uploadFile').val('');
            });
        },
        doAjaxCallWithOutBaseUrl: function (postData) {
            //console.log(postData);
            commonData.doAjaxCallWithOutBaseUrl({
                url: postData.messageContent.url,
                connectType: postData.messageContent.connectType,
                params: postData.messageContent.params,
                dataType: postData.messageContent.dataType
            }).done(function (data) {
                postMessage.sendMessage({
                    type: 'parent',
                    callbackId: postData.callbackId,
                    messageContent: {
                        result: true,
                        data: data
                    }
                });
            }).fail(function (jqXHR, tranStatus, errorThrown) {
                postMessage.sendMessage({
                    type: 'parent',
                    callbackId: postData.callbackId,
                    messageContent: {
                        result: false,
                        data: null
                    }
                });
            });
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    console.dir(viewModel);
    //alert(JSON.stringify(viewModel.editSection));
    return viewModel;
});