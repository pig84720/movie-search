/**
 * Created by jerryhuang on 15/7/29.
 */
//define(function (require) {
//    var baseComponentList = require('baseComponentList'),
//        componentList = require('componentList');
var componentListPath = 'componentList';
define(['baseComponentList', componentListPath], function (baseComponentList, componentList) {
    SS.components = componentList.list;
    var init = function () {
        for (var i = 0; i < baseComponentList.list.length; i++) {
            var checkArray = $.grep(SS.components, function (item, index) {
                return (item.id == baseComponentList.list[i].id);
            });
            if (checkArray.length == 0) {
                SS.components.push(baseComponentList.list[i]);
            }
        }
    };

    return {
        init: init
    };
});