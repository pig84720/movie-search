/**
 * Created by jerryhuang on 15/8/31.
 */
define(function (require) {
    var platform = '';
    SS.namespace("SS.postMessage.callback");
    SS.postMessage.callback = SS.postMessage.callback || {};

    var receiveMessage = function (e) {
        //if (e.origin != iframeHost) return;
        var data;
        //ie8只能傳遞文字，無法傳遞物件
        if (platform == 'ie8') {
            data = JSON.parse(e.data);
        } else {
            data = e.data;
        }
        if (SS.postMessage.callback[data.callbackId] != null) {
            SS.postMessage.callback[data.callbackId](data);
            SS.postMessage.callback[data.callbackId] = null;
        } else if (callbackFunction != null) {
            callbackFunction(data);
        }
    };
    var count = 0;
    var callbackFunction;
    return {
        init: function (callback) {
            //註冊接收訊息事件
            if (window.addEventListener) {
                window.addEventListener('message', receiveMessage);
                platform = '';
            } else if (window.attachEvent) {
                window.attachEvent('onmessage', receiveMessage);
                platform = 'ie8';
            }
            if (callback != null) {
                callbackFunction = callback;
            } else {
                callbackFunction = null;
            }
        },
        sendMessage: function (inVar) {
            if (inVar.type == 'iframe' && document.getElementById(inVar.frameId) == null) return;
            var framePage = (inVar.type == 'iframe' ? document.getElementById(inVar.frameId).contentWindow : (inVar.type == 'parent' ? window.parent : (inVar.type == 'opener' ? window.opener : null)));
            var callbackId = inVar.callbackId != null ? inVar.callbackId : inVar.triggerFunction + (count++);
            if (framePage) {
                var postData = (platform == 'ie8' ? JSON.stringify({
                    callbackId: callbackId,
                    triggerFunction: inVar.triggerFunction,
                    messageContent: inVar.messageContent
                }) : {
                    callbackId: callbackId,
                    triggerFunction: inVar.triggerFunction,
                    messageContent: inVar.messageContent
                });
                //ie8只能傳遞文字，無法傳遞物件
                //if (platform == 'ie8') {
                //    framePage.postMessage(postData, '*');
                //} else {
                    framePage.postMessage(postData, '*');
                //}
                SS.postMessage.callback[callbackId] = inVar.callback;
            } else {
                console.log('post message can\'t find post target page!!');
            }
        },
        getPlatform: function () {
            return platform;
        }
    };
});