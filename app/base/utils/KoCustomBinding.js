/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {

    //First make KO able to disable clicks on Anchors
    //增加li物件 Ko Binding Enable的屬性
    var init=function(){
        var orgClickInit = ko.bindingHandlers.click.init;
        ko.bindingHandlers.click.init = function (element, valueAccessor, allBindingsAccessor, viewModel) {
            //console.log(element.tagName);
            //console.log(allBindingsAccessor().enable);
            if (element.tagName === "LI" && allBindingsAccessor().enable != null) {
                var disabled = ko.computed({
                    read: function () {
                        return ko.utils.unwrapObservable(allBindingsAccessor().enable) === false;
                    },
                    disposeWhenNodeIsRemoved: element
                });
                ko.applyBindingsToNode(element, {css: {disabled: disabled}});
                var handler = valueAccessor();
                valueAccessor = function () {
                    return function () {
                        if (ko.utils.unwrapObservable(allBindingsAccessor().enable)) {
                            handler.apply(this, arguments);
                        }
                    }
                };
            }
            orgClickInit.apply(this, arguments);
        };
    };

    return {
        init: init
    };
});
