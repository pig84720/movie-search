/**
 * Created by jerryhuang on 15/9/24.
 */

define(function (require) {
    var jstorage = require('jstorage'),
        secureData = require('SecureData'),
        serverInfo = [];

    return {
        setSsapiUrl: function (url) {
            secureData.setSSApiBsaeUrl(url);
        },
        setServerInfo: function (inVar) {
            serverInfo = inVar;
        },
        getCode: function (i) {
            var dtd1 = new $.Deferred();
            try {
                secureData.setServerInfo(serverInfo);
                //由暫存檔取出資料
                if (i.cacheKey != null) {
                    if ($.jStorage.get(i.cacheKey) != null) {
                        setTimeout(function () {
                            dtd1.resolve($.jStorage.get(i.cacheKey));
                        }, 50);
                        return;
                    }
                }
                secureData.exeSPRetB({
                    SPNM: 'SP_SET_CODEMFALL',
                    PARMS: [
                        i.SYSCD == null ? '' : i.SYSCD,
                        i.DATAID == null ? '' : i.DATAID,
                        i.MCODE == null ? '' : i.MCODE
                    ]
                })
                    .done(function (data) {
                        if (data.MESSAGE != '') {
                            dtd1.reject('查詢代碼資料發生錯誤！！錯誤訊息：' + data.MESSAGE);
                        } else if (data.DATA.Table1 == null) {
                            dtd1.reject('查無代碼資料！！');
                        } else {
                            //有定義暫存的處理時，將資料暫存在前端
                            if (i.cacheKey != null) {
                                $.jStorage.set(
                                    i.cacheKey,
                                    data.DATA,
                                    {
                                        TTL: (i.cacheTTL == null ? 24 * 60 * 60 * 1000 : i.cacheTTL)
                                    }
                                );
                            }
                            dtd1.resolve(data.DATA);
                        }
                    })
                    .fail(function () {
                        dtd1.reject('執行『getCode』發生異常！異常原因：目前網路連線異常，請稍候再進行查詢！');
                    });
            } catch (e) {
                dtd1.reject('執行『getCode』發生異常！異常原因：' + e.Message);
            }
            return dtd1.promise();
        },
        getCompany: function (i) {
            var dtd1 = new $.Deferred();
            try {
                secureData.setServerInfo(serverInfo);
                //由暫存檔取出資料
                if (i.cacheKey != null) {
                    if ($.jStorage.get(i.cacheKey) != null) {
                        setTimeout(function () {
                            dtd1.resolve($.jStorage.get(i.cacheKey));
                        }, 50);
                        return;
                    }
                }
                secureData.exeSPRetB({
                    SPNM: 'SP_SET_LCCOMPMF',
                    PARMS: [
                        i.ISOVER == null ? '' : i.ISOVER,   //"空白"表全部  ; "其他"加當日之日期
                        i.LTYPE == null ? '' : i.LTYPE,     //"空白"用LIKE  ; "其他"用"="
                        i.DLRCD == null ? '' : i.DLRCD      //公司代碼
                    ]
                })
                    .done(function (data) {
                        if (data.MESSAGE != '') {
                            dtd1.reject('查詢公司資料發生錯誤！！錯誤訊息：' + data.MESSAGE);
                        } else if (data.DATA.Table1 == null) {
                            dtd1.reject('查無公司資料！！');
                        } else {
                            //有定義暫存的處理時，將資料暫存在前端
                            if (i.cacheKey != null) {
                                $.jStorage.set(
                                    i.cacheKey,
                                    data.DATA,
                                    {
                                        TTL: (i.cacheTTL == null ? 24 * 60 * 60 * 1000 : i.cacheTTL)
                                    }
                                );
                            }
                            dtd1.resolve(data.DATA);
                        }
                    })
                    .fail(function () {
                        dtd1.reject('執行『getCompany』發生異常！異常原因：目前網路連線異常，請稍候再進行查詢！');
                    });
            } catch (e) {
                dtd1.reject('執行『getCompany』發生異常！異常原因：' + e.Message);
            }
            return dtd1.promise();
        },
        getBranch: function (i) {
            var dtd1 = new $.Deferred();
            try {
                secureData.setServerInfo(serverInfo);
                //由暫存檔取出資料
                if (i.cacheKey != null) {
                    if ($.jStorage.get(i.cacheKey) != null) {
                        setTimeout(function () {
                            dtd1.resolve($.jStorage.get(i.cacheKey));
                        }, 50);
                        return;
                    }
                }
                secureData.exeSPRetB({
                    SPNM: 'SP_SET_LCSABRMF',
                    PARMS: [
                        i.SYSCD == null ? '' : i.SYSCD,   //"空白"表全部  ; "其他"加當日之日期
                        i.ISOVER == null ? '' : i.ISOVER,   //"空白"表全部  ; "其他"加當日之日期
                        i.ISEQUAL == null ? '' : i.ISEQUAL,     //"空白"用LIKE  ; "其他"用"="
                        i.BRNHCD == null ? '' : i.BRNHCD      //公司代碼
                    ]
                })
                    .done(function (data) {
                        if (data.MESSAGE != '') {
                            dtd1.reject('查詢據點資料發生錯誤！！錯誤訊息：' + data.MESSAGE);
                        } else if (data.DATA.Table1 == null) {
                            dtd1.reject('查無據點資料！！');
                        } else {
                            //有定義暫存的處理時，將資料暫存在前端
                            if (i.cacheKey != null) {
                                $.jStorage.set(
                                    i.cacheKey,
                                    data.DATA,
                                    {
                                        TTL: (i.cacheTTL == null ? 24 * 60 * 60 * 1000 : i.cacheTTL)
                                    }
                                );
                            }
                            dtd1.resolve(data.DATA);
                        }
                    })
                    .fail(function () {
                        dtd1.reject('執行『getBranch』發生異常！異常原因：目前網路連線異常，請稍候再進行查詢！');
                    });
            } catch (e) {
                dtd1.reject('執行『getBranch』發生異常！異常原因：' + e.Message);
            }
            return dtd1.promise();
        },
        getDepartment: function (i) {
            var dtd1 = new $.Deferred();
            try {
                secureData.setServerInfo(serverInfo);
                //由暫存檔取出資料
                if (i.cacheKey != null) {
                    if ($.jStorage.get(i.cacheKey) != null) {
                        setTimeout(function () {
                            dtd1.resolve($.jStorage.get(i.cacheKey));
                        }, 50);
                        return;
                    }
                }
                secureData.exeSPRetB({
                    SPNM: 'SP_SET_LCDEPTMF',
                    PARMS: [
                        i.ISOVER == null ? '' : i.ISOVER,
                        i.LTYPE == null ? '' : i.LTYPE,
                        i.DLRCD == null ? '' : i.DLRCD,
                        i.DEPTID == null ? '' : i.DEPTID
                    ]
                })
                    .done(function (data) {
                        if (data.MESSAGE != '') {
                            dtd1.reject('查詢部門資料發生錯誤！！錯誤訊息：' + data.MESSAGE);
                        } else if (data.DATA.Table1 == null) {
                            dtd1.reject('查無部門資料！！');
                        } else {
                            //有定義暫存的處理時，將資料暫存在前端
                            if (i.cacheKey != null) {
                                $.jStorage.set(
                                    i.cacheKey,
                                    data.DATA,
                                    {
                                        TTL: (i.cacheTTL == null ? 24 * 60 * 60 * 1000 : i.cacheTTL)
                                    }
                                );
                            }
                            dtd1.resolve(data.DATA);
                        }
                    })
                    .fail(function () {
                        dtd1.reject('執行『getDepartment』發生異常！異常原因：目前網路連線異常，請稍候再進行查詢！');
                    });
            } catch (e) {
                dtd1.reject('執行『getDepartment』發生異常！異常原因：' + e.Message);
            }
            return dtd1.promise();
        },
        getEmployee: function (i) {
            var dtd1 = new $.Deferred();
            try {
                secureData.setServerInfo(serverInfo);
                //由暫存檔取出資料
                if (i.cacheKey != null) {
                    if ($.jStorage.get(i.cacheKey) != null) {
                        setTimeout(function () {
                            dtd1.resolve($.jStorage.get(i.cacheKey));
                        }, 50);
                        return;
                    }
                }
                secureData.exeSPRetB({
                    SPNM: 'SP_SET_LCEMPLMF',
                    PARMS: [
                        i.SYSCD == null ? '' : i.SYSCD,
                        i.ISOVER == null ? '' : i.ISOVER,
                        i.ISEQUAL == null ? '' : i.ISEQUAL,
                        i.EMPLID == null ? '' : i.EMPLID,
                        i.BRNHCD == null ? '' : i.BRNHCD
                    ]
                })
                    .done(function (data) {
                        if (data.MESSAGE != '') {
                            dtd1.reject('查詢員工資料發生錯誤！！錯誤訊息：' + data.MESSAGE);
                        } else if (data.DATA.Table1 == null) {
                            dtd1.reject('查無員工資料！！');
                        } else {
                            //有定義暫存的處理時，將資料暫存在前端
                            if (i.cacheKey != null) {
                                $.jStorage.set(
                                    i.cacheKey,
                                    data.DATA,
                                    {
                                        TTL: (i.cacheTTL == null ? 24 * 60 * 60 * 1000 : i.cacheTTL)
                                    }
                                );
                            }
                            dtd1.resolve(data.DATA);
                        }
                    })
                    .fail(function () {
                        dtd1.reject('執行『getEmployee』發生異常！異常原因：目前網路連線異常，請稍候再進行查詢！');
                    });
            } catch (e) {
                dtd1.reject('執行『getEmployee』發生異常！異常原因：' + e.Message);
            }
            return dtd1.promise();
        }
    };
});