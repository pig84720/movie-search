define(function () {
    return {
        ReportPrint: function (cReport, cUrl, cPath, cUserName, cPass, cCompany, cSys, cLog, cQuery) {
            // 把一些參數附加至查詢字串
            var pageUrl = cReport + "?outofband=true&cUrl=" + cUrl
                + "&cPath=" + cPath
                + "&cUserName=" + cUserName
                + "&cPass=" + cPass
                + "&cCompany=" + cCompany
                + "&cSys=" + cSys
                + "&cLog=" + cLog
                + "&cQuery=" + cQuery + "";
            //alert(pageUrl);
            // 初始化 XmlHttpRequest 物件
            var xmlRequest, e;
            try {
                xmlRequest = new XMLHttpRequest();
            }
            catch (e) {
                try {
                    xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                }
            }
            // 準備 POST 同步請求
            xmlRequest.open("POST", pageUrl, false);
            xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlRequest.send(null);
            var LSTR_Return = xmlRequest.responseText;
            if (LSTR_Return.indexOf("http", 0) > -1) {
                //20170919 UPD BY GORDON修正中文亂碼的處理
                LSTR_Return = LSTR_Return.replace(LSTR_Return.substring(LSTR_Return.indexOf('Path=') + 5, LSTR_Return.length), encodeURI(LSTR_Return.substring(LSTR_Return.indexOf('Path=') + 5, LSTR_Return.length)));
                window.open(LSTR_Return, '_blank', "width=700,height=450,resizable=1,scrollbars=1,left=50,top=50");
            } else {
                alert(LSTR_Return);
            }
        }
    };
});