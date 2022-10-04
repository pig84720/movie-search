/**
 * Created by jerryhuang on 15/9/2.
 */
define(function (require) {
    secureData = require('SecureData');
    secureData.setServerInfo(SS.portal.serverInfo);
    secureData.setSSApiBsaeUrl(SS.ssapi.url);
    return {
        addFavorite: function (i) {
            var dtd1 = new $.Deferred();
            secureData.exeSP({
                SPNM: 'SP_SET_MyFOV',
                PARMS: [
                    i.USERID,
                    i.SYSCD,
                    i.SUBSCD,
                    i.MENU_SER,
                    i.TRCD
                ]
            }).done(function (data) {
                console.log(data);
                if (data.RESULT == false) {
                    dtd1.reject('加入最愛發生錯誤！！錯誤訊息：' + data.MESSAGE);
                } else {
                    dtd1.resolve(data);
                }
            }).fail(function () {
                dtd1.reject('目前網路連線異常，請稍候再進行加入最愛！');
            });
            return dtd1.promise();
        }
    };
});