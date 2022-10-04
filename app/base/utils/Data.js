define(function (require) {
    var baseUrl = '',
        setBsaeUrl = function (url) {
            baseUrl = url;
        },
        doAjaxCall = function (i) {
            $.support.cors = true;
            var dfd1 = $.Deferred(),
                url = baseUrl + i.url;
            $.ajax({
                url: url,
                type: i.connectType,
                crossDomain: true,
                data: JSON.stringify(i.params),
                dataType: i.dataType != null ? i.dataType : "json",
                contentType: "application/json;charset=utf-8",
                cache: false,
                statusCode: {
                    401: function (jqXHR, tranStatus, errorThrown) {
                        //if (failure) {
                        //    failure(jqXHR, tranStatus, errorThrown);
                        //}
                        //return $.Deferred().resolve();
                        dfd1.reject(jqXHR, tranStatus, errorThrown);
                    }
                },
                success: function (data, tranStatus, jqXHR) {
                    //if (success) {
                    //    success(data);
                    //}
                    dfd1.resolve(data);
                },
                error: function (jqXHR, tranStatus, errorThrown) {
                    //if (failure) {
                    //    failure(jqXHR, tranStatus, errorThrown);
                    //}
                    //return $.Deferred().resolve();
                    dfd1.reject(jqXHR, tranStatus, errorThrown);
                }
            });
            return dfd1.promise();
        },
        doAjaxCallWithOutBaseUrl = function (i) {
            $.support.cors = true;
            // console.log(i);
            var dfd1 = $.Deferred();
            if (window.attachEvent == null) {
                $.ajax({
                    url: i.url,
                    type: i.connectType,
                    crossDomain: true,
                    data: JSON.stringify(i.params),
                    dataType: (i.dataType != null ? i.dataType : "json"),
                    contentType: i.dataType == 'text' ? 'text/plain' : "application/json;charset=utf-8",
                    cache: false,
                    statusCode: {
                        401: function (jqXHR, tranStatus, errorThrown) {
                            dfd1.reject(jqXHR, tranStatus, errorThrown);
                        }
                    },
                    success: function (data, tranStatus, jqXHR) {
                        dfd1.resolve(data, true, {statu: 200});
                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                        dfd1.reject(jqXHR, tranStatus, errorThrown);
                    }
                });
            } else {
                $.ajax({
                    url: i.url,
                    type: i.connectType,
                    data: JSON.stringify(i.params),
                    // dataType: (i.dataType != null ? i.dataType : "json"),
                    contentType: i.dataType == 'text' ? 'text/plain' : "application/json",
                    cache: false,
                    statusCode: {
                        401: function (jqXHR, tranStatus, errorThrown) {
                            dfd1.reject(jqXHR, tranStatus, errorThrown);
                        }
                    },
                    success: function (data, tranStatus, jqXHR) {
                        dfd1.resolve(data, true, {statu: 200});
                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                        dfd1.reject(jqXHR, tranStatus, errorThrown);
                    }
                });
            }
            return dfd1.promise();
        },
        getSpToExcel = function (PARMS) {
            var success = function (data) {
                if (data.ReturnCode == false) {
                    alert('匯出資料發生錯誤！' + data.Message);
                    return;
                } else {
                    alert('匯出資料成功！');
                    window.open(data.Data, '_self', '');
                }
            };

            var falure = function (jqXHR, tranStatus, errorThrown) {
                alert('網路連線異常，請重新執行!');
                dfd1.resolve();
            };

            SS.mask.show();
            doAjaxCall('api/Excel/SpToExcel', 'POST', PARMS, success, falure)
                .done(function () {
                    SS.mask.hide();
                });
        };

    var Data = {
        setBsaeUrl: setBsaeUrl,
        getSpToExcel: getSpToExcel,
        doAjaxCall: doAjaxCall,
        doAjaxCallWithOutBaseUrl: doAjaxCallWithOutBaseUrl
    };

    SS.namespace("SS.Data");
    SS.Data = Data;
    return Data;
});