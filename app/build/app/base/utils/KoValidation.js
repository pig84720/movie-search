/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    require('ko.validation');

    var init=function(){
        ko.validation.init({
            registerExtenders: true,
            messagesOnModified: true,
            insertMessages: false,
            parseInputAttributes: true,
            messageTemplate: null
        }, true);
    };

    return {
        init: init
    };
});
