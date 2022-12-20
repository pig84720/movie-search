define(function (require) {
    var baseUrl = '',
        postMessage = require('PostMessage'),
        count = 0,
        checkAlive = {},
        SSApiBaseUrl = '',
        SSApiToken = '',
        SVRNM = [],
        guid = (new Date()).getTime();
    postMessage.init();
    window.SS = window.SS || {};
    window.SS.SecureData = window.SS.SecureData || {};

    //產出iFrame來進行postMessage的作業
    var generateFrame = function (frameId) {
            if ($('#' + frameId)[0] == null) {
                $('<iframe>', {
                    // src: 'about:blank',
                    id: frameId,
                    name: frameId,
                    frameborder: 0,
                    scrolling: 'no',
                    width: 0,
                    height: 0
                }).appendTo('body');
            }
        },
        //確認postMessage的iFrame是否載入完成
        postCheckAlive = function (i) {
            //alert('postCheckAlive');
            //if (document.getElementById(i.frameId).contentWindow == null) {
            //    setTimeout(function () {
            //        if (checkAlive[i.frameId] == false) {
            //            postCheckAlive(i);
            //        }
            //    }, 300);
            //    return;
            //}
            postMessage.sendMessage({
                type: 'iframe',
                frameId: i.frameId,
                triggerFunction: 'checkAlive',
                messageContent: '',
                callback: function (data) {
                    if (data.messageContent.result == true) {
                        //alert('postCheckAlive callback');
                        checkAlive[i.postId] = true;
                        postAjaxData(i);
                    }
                }
            });
            //console.log(typeof(checkAlive[i.frameId]));
            //console.log(i.params.PARMS);
            if (checkAlive[i.postId] == false) {
                setTimeout(function () {
                    //alert('postCheckAlive fail');
                    //console.log(i.params.PARMS);
                    if (checkAlive[i.postId] == false) {
                        postCheckAlive(i);
                    }
                }, 300);
            }
        },
        //執行postMessage作業至iFrame中進行ajax呼叫WebApi
        postAjaxData = function (i) {
            postMessage.sendMessage({
                type: 'iframe',
                frameId: i.frameId,
                triggerFunction: i.uploadFlg == true ? 'uploadData' : 'doAjaxCallWithOutBaseUrl',
                messageContent: {
                    url: i.url,
                    connectType: i.connectType,
                    params: i.params,
                    dataType: i.dataType == null ? 'json' : i.dataType
                },
                callback: function (data) {
                    SS.mask.hide();
                    //console.log(data);
                    if (data.messageContent.result == true) {
                        i.dfd1.resolve(data.messageContent.data);
                    } else {
                        i.dfd1.reject();
                    }
                    //$('#' + i.frameId).remove();
                }
            });
        },
        setCookie = function (name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        getCookie = function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        deleteCookie = function (name) {
            setCookie(name, "", -1);
        };

    return {
        //設定WebApi網址
        setBsaeUrl: function (url) {
            baseUrl = url;
        },
        setBaseUrl: function (url) {
            baseUrl = url;
        },
        setSSApiToken: function (token) {
            SSApiToken = token;
        },
        setSSApiBsaeUrl: function (url) {
            SSApiBaseUrl = url;
        },
        setServerInfo: function (serverInfo) {
            SVRNM = serverInfo;
        },
        doAjaxCall: function (i) {
            var dfd1 = $.Deferred(),
                url = baseUrl + i.url,
                postId = 'doAjaxCall' + (count++),
                frameId = 'doAjaxCall' + guid;
            if ($('#' + frameId)[0]) {
                if (SS.mask != null) SS.mask.show();
                checkAlive[postId] = false;
                postCheckAlive({
                    frameId: frameId,
                    postId: postId,
                    url: url,
                    connectType: i.connectType,
                    dataType: i.dataType,
                    params: i.params,
                    dfd1: dfd1
                });
            } else {
                generateFrame(frameId);
                if (SS.mask != null) SS.mask.show();
                $('#' + frameId).load(function () {
                    checkAlive[postId] = false;
                    setTimeout(function () {
                        postCheckAlive({
                            frameId: frameId,
                            postId: postId,
                            url: url,
                            connectType: i.connectType,
                            dataType: i.dataType,
                            params: i.params,
                            dfd1: dfd1
                        });
                    }, 300);
                });
                $('#' + frameId).attr('src', baseUrl + 'proxyPage/proxyPage.html');
            }
            return dfd1.promise();
        },
        doSSApiAjaxCall: function (i) {
            var token = SSApiToken != '' ? SSApiToken : ($.trim(getCookie('Token')) == '' ? SS.ssapi.token : $.trim(getCookie('Token')));
            var dfd1 = $.Deferred(),
                url = SSApiBaseUrl + i.url + '?Token=' + encodeURIComponent(token),
                postId = 'doSSAPIAjaxCall' + (count++),
                frameId = 'doSSAPIAjaxCall' + guid;

            if (token == null && url != SSApiBaseUrl + "API/Login") {
                alert("請重新登入取得認證!");
                var result = {
                    readyState: 4,
                    responseText: "請重新登入取得認證!",
                    status: -1,
                    statusText: "InvalidToken"

                };
                dfd1.reject(result);
                return;
            }

            if ($('#' + frameId)[0]) {
                if (SS.mask != null) SS.mask.show();
                checkAlive[postId] = false;
                postCheckAlive({
                    frameId: frameId,
                    postId: postId,
                    url: url,
                    connectType: i.connectType,
                    dataType: i.dataType,
                    params: i.params,
                    dfd1: dfd1
                });
            } else {
                generateFrame(frameId);

                var $frame = $('#' + frameId);

                if (SS.mask != null) SS.mask.show();
                $frame.load(function () {
                    checkAlive[postId] = false;
                    setTimeout(function () {
                        postCheckAlive({
                            frameId: frameId,
                            postId: postId,
                            url: url,
                            connectType: i.connectType,
                            dataType: i.dataType,
                            params: i.params,
                            dfd1: dfd1
                        });
                    }, 300);
                });
                $frame.attr('src', SSApiBaseUrl + 'proxyPage/proxyPage.html');
            }
            return dfd1.promise();
        },
        doAjaxCallWithOutBaseUrl: function (i) {
            var dfd1 = $.Deferred(),
                postId = 'doAjaxCallWithOutBaseUrl' + (count++),
                frameId = 'doAjaxCallWithOutBaseUrl' + guid;
            if ($('#' + frameId)[0]) {
                if (SS.mask != null) SS.mask.show();
                checkAlive[postId] = false;
                postCheckAlive({
                    frameId: frameId,
                    postId: postId,
                    url: i.url,
                    connectType: i.connectType,
                    dataType: i.dataType,
                    params: i.params,
                    dfd1: dfd1
                });
            } else {
                generateFrame(frameId);
                if (SS.mask != null) SS.mask.show();
                $('#' + frameId).load(function () {
                    checkAlive[postId] = false;
                    setTimeout(function () {
                        postCheckAlive({
                            frameId: frameId,
                            postId: postId,
                            url: i.url,
                            connectType: i.connectType,
                            dataType: i.dataType,
                            params: i.params,
                            dfd1: dfd1
                        });
                    }, 300);
                });
                $('#' + frameId).attr('src', baseUrl + 'proxyPage/proxyPage.html');
            }
            return dfd1.promise();
        },
        getSpToExcel: function (PARMS) {
            this.doAjaxCall({
                url: 'api/Excel/SpToExcel',
                connectType: 'POST',
                params: PARMS
            }).done(function (data) {
                if (data.ReturnCode == false) {
                    alert('匯出資料發生錯誤！' + data.Message);
                    return;
                } else {
                    alert('匯出資料成功！');
                    window.open(data.Data, '_self', '');
                }
            }).fail(function () {
                alert('網路連線異常，請重新執行!');
            });
        },
        jsonToExcel: function (PARMS) {
            var DataList = [];
            for (var i = 0; i < PARMS.dataList.length; i++) {
                DataList.push(JSON.stringify(PARMS.dataList[i]));
            }
            //var params = {
            //    ColumnName: PARMS.columnName,
            //    DataList: DataList,
            //    FileName: PARMS.fileName//,
            //    //csvEnable: PARMS.csvEnable,
            //    //csvMark: PARMS.csvMark == null ? ',' : PARMS.csvMark
            //};
            var params = {};
            for (var key in PARMS) {
                var execKey = key;
                switch (execKey) {
                    case 'columnName':
                        execKey = 'ColumnName';
                        break;
                    case 'fileName':
                        execKey = 'FileName';
                        break;
                    case 'dataList':
                        execKey = 'DataList';
                        break;
                }
                if (key == 'dataList') {
                    params[execKey] = DataList;
                } else {
                    params[execKey] = PARMS[key];
                }
            }
            // console.log(params);
            this.doAjaxCall({
                url: 'api/Excel/JsonToExcel',
                connectType: 'POST',
                params: params
            }).done(function (data) {
                if (data.Result == false) {
                    alert('匯出資料發生錯誤！' + data.Message);
                    return;
                } else {
                    alert('匯出資料成功！');
                    window.open(PARMS.zipFile ? data.ZipUri : data.ExcelUri, '_self', '');
                }
            }).fail(function () {
                alert('網路連線異常，請重新執行!');
            })
        },
        getClientIp: function () {
            return this.doSSApiAjaxCall({
                url: 'API/ClientInfo',
                connectType: 'GET',
                params: '',
                dataType: 'text'
            });
        },
        exeLogin: function (i) {
            var PARMS = {
                LANGRSCD: i.LANGRSCD,
                USRID: i.USRID,
                PSWD: i.PSWD,
                TokenTimeout: 0
            };
            return this.doSSApiAjaxCall({
                url: 'API/Login',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeSPRetB: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SVRNM: i.SVRNM ? i.SVRNM : SVRNM,
                PARMS: i.PARMS
            };
            return this.doSSApiAjaxCall({
                url: 'API/SPRetB',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeSP: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                PARMS: i.PARMS
            };
            return this.doSSApiAjaxCall({
                url: 'API/ExeSP',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeBatchSP: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                PARMS: i.PARMS
            };
            return this.doSSApiAjaxCall({
                url: 'API/ExeBatchSP',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeSPB2: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SPNM1: i.SPNM1,
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                PARMS: i.PARMS,
                PARMS1: i.PARMS1
            };
            return this.doSSApiAjaxCall({
                url: 'API/ExeSPB2',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeSPT2: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SPNM1: i.SPNM1,
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                PARMS: i.PARMS,
                PARMS1: i.PARMS1
            };
            return this.doSSApiAjaxCall({
                url: 'API/ExeSPT2',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeSPT3: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SPNM1: i.SPNM1,
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                PARMS: i.PARMS,
                PARMS1: i.PARMS1
            };
            return this.doSSApiAjaxCall({
                url: 'API/ExeSPT3',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeSPSS: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SPNM1: i.SPNM1,
                SPNM2: i.SPNM2,
                SPNM3: i.SPNM3,
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                PARMS: i.PARMS,
                PARMS1: i.PARMS1,
                PARMS2: i.PARMS2,
                PARMS3: i.PARMS3
            };
            return this.doSSApiAjaxCall({
                url: 'API/ExeSPSS',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeMultiArr: function (i) {
            var PARMS = {
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                SPNM: i.SPNM,
                PARMARR: i.PARMS,
                SP_ParmArr: i.PARMARR
            };
            return this.doSSApiAjaxCall({
                url: 'API/ExeMultiArr',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeMultiAppend: function (i) {
            var PARMS = {
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                SPNM: i.SPNM,
                PARMARR: i.PARMS,
                SP_ParmArr: i.PARMARR
            };
            return this.doSSApiAjaxCall({
                url: 'API/ExeMultiAppend',
                connectType: 'POST',
                params: PARMS
            });
        },
        exeBatchArr: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                PARMS: i.PARMS
            };
            return this.doSSApiAjaxCall({
                url: 'API/ExeBatchArr',
                connectType: 'POST',
                params: PARMS
            });
        },
        spExeBatchMultiArr: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                PARMS: i.PARMS,
                IsTransaction: i.isTransaction
            };
            return this.doSSApiAjaxCall({
                url: 'API/SPExeBatchMultiArr',
                connectType: 'POST',
                params: PARMS
            });
        },
        spExeBatchMultiArr2: function (i) {
            var PARMS = {
                SPNM: i.SPNM,
                SVRNM: i.SVRNM == null ? SVRNM : i.SVRNM,
                PARMS: i.PARMS,
                IsTransaction: i.isTransaction
            };
            return this.doSSApiAjaxCall({
                url: 'API/SPExeBatchMultiArr2',
                connectType: 'POST',
                params: PARMS
            });
        },
        uploadFileData: function (i) {
            var dfd1 = $.Deferred(),
                url = baseUrl + i.url,
                postId = 'doAjaxCall' + (count++),
                frameId = 'doAjaxCall' + guid;
            if ($('#' + frameId)[0]) {
                if (SS.mask != null) SS.mask.show();
                checkAlive[postId] = false;
                postCheckAlive({
                    frameId: frameId,
                    postId: postId,
                    url: url,
                    connectType: i.connectType,
                    dataType: i.dataType,
                    params: i.photoData,
                    dfd1: dfd1,
                    uploadFlg: true
                });
            } else {
                generateFrame(frameId);
                if (SS.mask != null) SS.mask.show();
                $('#' + frameId).load(function () {
                    checkAlive[postId] = false;
                    setTimeout(function () {
                        postCheckAlive({
                            frameId: frameId,
                            postId: postId,
                            url: url,
                            connectType: i.connectType,
                            dataType: i.dataType,
                            params: i.photoData,
                            dfd1: dfd1,
                            uploadFlg: true
                        });
                    }, 300);
                });
                $('#' + frameId).attr('src', baseUrl + 'proxyPage/proxyPage.html');
            }
            return dfd1.promise();
        }
    };
});