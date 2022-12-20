define([
    'jQuery.i18n'
], function ($i18n) {
    //console.log('i18n');
    var i18n = $.i18n.prop;
    var i18nHP = $.i18n.prop;
//    var lang = $.jStorage.get("LANGRSCD");
    var lang = $.jStorage == null ? 'ZH-CN' : $.jStorage.get("LANGRSCD");
    if (!lang) {
        lang = 'ZH-CN';
    }
    i18n.selectedLanguage = lang;
    // 客制化多國語言的部份(給jqxGrid使用)
    i18n.getLocalization = function () {
        var localizationobj = {};
        localizationobj.pagergotopagestring = "跳到頁次:";
        localizationobj.pagershowrowsstring = "每頁筆數:";
        localizationobj.pagerrangestring = " 之 ";
        localizationobj.pagernextbuttonstring = "下一頁";
        localizationobj.pagerpreviousbuttonstring = "上一頁";
        localizationobj.sortascendingstring = "正向排序";
        localizationobj.sortdescendingstring = "反向排序";
        localizationobj.sortremovestring = "不排序";
        var days = {
            names: ["日", "一", "二", "三", "四", "五", "六"],
            namesAbbr: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
            namesShort: ["日", "一", "二", "三", "四", "五", "六"]
        };
        localizationobj.days = days;
        var months = {
            names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],
            namesAbbr: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""]
        };
        localizationobj.months = months;
        return localizationobj;
    };


    // 先載入多國語言
//    $.i18n.properties({
//        name: 'FIN',
//        path: '../app/resources/langs/',
//        mode: 'both',
//        language: lang,
//        callback: function (e) {
//            //console.log(e);
//            startup();
//        }
//    });

    function startup() {
        //console.log(i18n('AMT'));
        // 轉換HTML中靜態的多國文字
        // 1. 要轉換的多國文字,請用<span>包覆
        // 2. span中的class name的前置名請加'res'
        // 3. span中的class name(除了前置名)請與多國資源檔中的key name相同
        // 4. html裡的span可放置預設的文字內容(可選擇)
        // 5. 若有例外,請自行另外處理!
        $('span[class^="res"],td[class^="res"]').map(function (index, item) {
            var resName = item.className.substring(3);
            var resValue = i18n(resName);
            if ('[' + resName + ']' != resValue)
                $(item).text(resValue);
        });
        // 轉換HTML中靜態的多國圖片
        // 1. 要轉換的多國圖,請用<img>包覆
        // 2. img中的class name的前置名請加'res'
        // 3. img中的class name(除了前置名)請與多國資源檔中的key name相同
        // 4. 資料中若是以~符號開頭,將會被去除,而以根路徑代之
        // 5. 若有例外,請自行另外處理!
        $('img[class^="res"]').map(function (index, item) {
            var resName = item.className.substring(3);
            var resValue = i18n(resName);
            if (resValue.charAt(0) == '~') resValue = resValue.substring(1);
            if ('[' + resName + ']' != resValue)
                $(item).attr("src", resValue);
        });
    }

    /*
     // 先載入多國語言
     $.i18nHP.properties({
     name: 'HP',
     path: '/app/resources/langs/',
     mode: 'both',
     language: lang,
     callback: function () {
     startup();
     }
     });

     function startupHP(){
     //console.log(i18n('AMT'));
     // 轉換HTML中靜態的多國文字
     // 1. 要轉換的多國文字,請用<span>包覆
     // 2. span中的class name的前置名請加'res'
     // 3. span中的class name(除了前置名)請與多國資源檔中的key name相同
     // 4. html裡的span可放置預設的文字內容(可選擇)
     // 5. 若有例外,請自行另外處理!
     $('span[class^="res"]').map(function (index, item) {
     var resName = item.className.substring(3);
     var resValue = i18n(resName);
     if ('[' + resName + ']' != resValue)
     $(item).text(resValue);
     });
     // 轉換HTML中靜態的多國圖片
     // 1. 要轉換的多國圖,請用<img>包覆
     // 2. img中的class name的前置名請加'res'
     // 3. img中的class name(除了前置名)請與多國資源檔中的key name相同
     // 4. 資料中若是以~符號開頭,將會被去除,而以根路徑代之
     // 5. 若有例外,請自行另外處理!
     $('img[class^="res"]').map(function (index, item) {
     var resName = item.className.substring(3);
     var resValue = i18n(resName);
     if (resValue.charAt(0) == '~') resValue = resValue.substring(1);
     if ('[' + resName + ']' != resValue)
     $(item).attr("src", resValue);
     });
     }

     */
    var i18nSetting = {
        i18n: i18n
    }
    return i18nSetting;
});