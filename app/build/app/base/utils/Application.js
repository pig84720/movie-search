/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    window.console = window.console || {};
    console.log = console.log || function () {};
    console.dir = console.dir || function () {};
    window.SS = window.SS || {};

    // 用來建立命名空稱的泛用function
    SS.namespace = function (namespace, value) {
        var parts = namespace.split('.');
        var parent = SS;

        if (parts[0] === "SS") {
            parts = parts.slice(1);
        }
        for (var i = 0; i < parts.length; i++) {
            if (i == parts.length - 1) {
                parent[parts[i]] = value;
            } else {
                if (typeof parent[parts[i]] === "undefined") {
                    parent[parts[i]] = {};
                }
            }
            parent = parent[parts[i]];
        }
        return parent;
    };

    SS.log = function (functionName, message) {
        console.log('[SS] "' + functionName + '" occurs a error, ' + message);
    };

    SS.getViewModel = function (viewModelName, subName) {
        var viewModel;
        if (subName) {
            if (SS.viewModel[viewModelName][subName] == null) {
                SS.log('[SS.getViewModel]', 'can\'t viewmodel ==> viewModelName:' + viewModelName + ',subName:' + subName);
            }
            viewModel = SS.viewModel[viewModelName][subName];
        } else {
            if (SS.viewModel[viewModelName] == null) {
                SS.log('[SS.getViewModel]', 'can\'t viewmodel ==> viewModelName:' + viewModelName);
            }
            viewModel = SS.viewModel[viewModelName];
        }
        return viewModel;
    };

    return {
        log: SS.log,
        getViewModel: SS.getViewModel,
        namespace: SS.namespace
    };
});