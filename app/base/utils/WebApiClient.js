/*
封裝版本:
1. 所有async function均會回會jQuery.Promise
*/
window.SSAPI = window.SSAPI || {};
SSAPI.WebApiClient = (function ($) {
    
    var rootUrl = "";
    var setUrl = function (url) {
        rootUrl = url;
    };
    var setToken = function (token) {
        setCookie('Token', token, 1);
    };
    var getClientIp = function (success) {
        return $.get(rootUrl + "API/ClientInfo", success, "text");
    };
    var exeLogin = function (LANGRSCD, USRID, PSWD, success, failure) {
        var json = {
            LANGRSCD: LANGRSCD,
            USRID: USRID,
            PSWD: PSWD,
            TokenTimeout: 0
        };
        return sendPost(rootUrl + "API/Login", json, success, failure);
    };
    var exeSPRetB = function (SVRNM, SPNM, PARMS, success, failure) {
        var json = {
            SPNM: SPNM,
            SVRNM: SVRNM,
            PARMS: PARMS
        };
        return sendPost(rootUrl + "API/SPRetB", json, success, failure);
    };
    var exeSP = function (SVRNM, SPNM, PARMS, success, failure) {
        var json = {
            SPNM: SPNM,
            SVRNM: SVRNM,
            PARMS: PARMS
        };
        return sendPost(rootUrl + "API/ExeSP", json, success, failure);
    };
    var exeBatchSP = function (SVRNM, SPNM, PARMS, success, failure) {
        var json = {
            SPNM: SPNM,
            SVRNM: SVRNM,
            PARMS: PARMS
        };
        return sendPost(rootUrl + "API/ExeBatchSP", json, success, failure);
    };
    var exeSPB2 = function (SVRNM, PARMS, PARMS1, SPNM, SPNM1, success, failure) {
        var json = {
            SPNM: SPNM,
            SPNM1: SPNM1,
            SVRNM: SVRNM,
            PARMS: PARMS,
            PARMS1: PARMS1
        };
        return sendPost(rootUrl + "API/ExeSPB2", json, success, failure);
    };
    var exeSPT2 = function (SVRNM, PARMS, PARMS1, SPNM, SPNM1, success, failure) {
        var json = {
            SPNM: SPNM,
            SPNM1: SPNM1,
            SVRNM: SVRNM,
            PARMS: PARMS,
            PARMS1: PARMS1
        };
        return sendPost(rootUrl + "API/ExeSPT2", json, success, failure);
    };
    var exeSPT3 = function (SVRNM, PARMS, PARMS1, SPNM, SPNM1, success, failure) {
        var json = {
            SPNM: SPNM,
            SPNM1: SPNM1,
            SVRNM: SVRNM,
            PARMS: PARMS,
            PARMS1: PARMS1
        };
        return sendPost(rootUrl + "API/ExeSPT3", json, success, failure);
    };

    var exeSPSS = function (SVRNM, PARMS, PARMS1, PARMS2, PARMS3, SPNM, SPNM1, SPNM2, SPNM3, success, failure) {
        var json = {
            SPNM: SPNM,
            SPNM1: SPNM1,
            SPNM2: SPNM2,
            SPNM3: SPNM3,
            SVRNM: SVRNM,
            PARMS: PARMS,
            PARMS1: PARMS1,
            PARMS2: PARMS2,
            PARMS3: PARMS3
        };

        return sendPost(rootUrl + "API/ExeSPSS", json, success, failure);
    };
    var exeMultiArr = function (SVRNM, SPNM, PARMS, PARMARR, success, failure) {
        var json = {
            SVRNM: SVRNM,
            SPNM: SPNM,
            PARMARR: PARMS,
            SP_ParmArr: PARMARR
        };

        return sendPost(rootUrl + "API/ExeMultiArr", json, success, failure);
    };
    var exeMultiAppend = function (SVRNM, SPNM, PARMS, PARMARR, success, failure) {
        var json = {
            SVRNM: SVRNM,
            SPNM: SPNM,
            //PARMS: PARMS,
            PARMARR: PARMS,
            SP_ParmArr: PARMARR
        };

        return sendPost(rootUrl + "API/ExeMultiAppend", json, success, failure);
    };
    var exeBatchArr = function (SVRNM, SPNM, PARMS, success, failure) {
        var json = {
            SPNM: SPNM,
            SVRNM: SVRNM,
            PARMS: PARMS
        };
        return sendPost(rootUrl + "API/ExeBatchArr", json, success, failure);
    };
    var spExeBatchMultiArr = function (SVRNM, SPNM, PARMS, isTransaction, success, failure) {
        var json = {
            SPNM: SPNM,
            SVRNM: SVRNM,
            PARMS: PARMS,
            IsTransaction: isTransaction
        };
        return sendPost(rootUrl + "API/SPExeBatchMultiArr", json, success, failure);
    };
    var sendPost = function (url, json, success, failure) {
        $.support.cors = true;
        var token = getCookie('Token');
        //var token = $.jStorage.get('SSToken');
        if (debug) {
            alert("JSON String:" + json);
            alert("Token:" + token);
        }
        if (token == null && url != rootUrl + "API/Login") {
            alert("請重新登入取得認證!");
            var result = {
                readyState: 4,
                responseText: "請重新登入取得認證!",
                status: -1,
                statusText: "InvalidToken"

            };
            failure(result);
            return $.Deferred().resolve(result);
        }
        return $.ajax({
            url: url + "?Token=" + encodeURIComponent(token),
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(json),
            //dataType: "json",
            //contentType: "application/json;charset=utf-8",
            contentType: "application/json",
            cache: false,
            statusCode: {
                //                200: function(data) {
                //                    if (success) {
                //                        success(data);
                //                    }
                //                    setCookie('Token', data["Token"], 1);
                //                    if (debug) {
                //                        alert("JSON String:" + JSON.stringify(data));
                //                    }
                //                },
                //
                401: function (jqXHR, tranStatus, errorThrown) {
                    if (failure) {
                        failure(jqXHR, tranStatus, errorThrown);
                    }
                    if (debug) {
                        alert("Error:" + JSON.stringify(errorThrown));
                    }
                }
            },
            success: function (data, tranStatus, jqXHR) {
                //console.log(data);
                //console.log(tranStatus);
                setCookie('Token', data["Token"], 1);
                if (success) {
                    success(data);
                }
            },
            error: function (jqXHR, tranStatus, errorThrown) {
                if (failure) {
                    failure(jqXHR, tranStatus, errorThrown);
                }
                if (debug) {
                    alert("Error:" + JSON.stringify(errorThrown));
                }
            }
        });
    };
    var debug = false;

    var setDebug = function (mode) { debug = mode; };

    return {
        //debug: debug,
        setUrl: setUrl,
        exeLogin: exeLogin,
        exeSPRetB: exeSPRetB,
        exeSP: exeSP,
        exeBatchSP: exeBatchSP,
        exeSPB2: exeSPB2,
        exeSPT2: exeSPT2,
        exeSPT3: exeSPT3,
        exeSPSS: exeSPSS,
        exeMultiArr: exeMultiArr,
        setToken: setToken,
        getClientIp: getClientIp
    };
    function setCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function deleteCookie(name) {
        setCookie(name, "", -1);
    }
})(jQuery);

