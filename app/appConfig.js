/**
 * Created by jerryhuang on 2015/10/8.
 */

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

//設定Service連結位置v
SS.namespace("SS.service.baseUrl");
SS.namespace("SS.app.baseUrl");
SS.namespace("SS.ssapi.url");
SS.namespace("SS.signalR.url");
SS.namespace("SS.portal.serverInfo");

SS.service.baseUrl = "https://ap.searching-service.com/SSService/";
// if (location.host == '') {
//     SS.app.baseUrl = location.href.replace('file://', '').substr(0, location.href.replace('file://', '').indexOf('/www/') + 5);
// } else {
//     var baseUrlArray = location.href.split(location.hostname + (location.port != '' ? ':' + location.port : '') + '/');
//     SS.app.baseUrl = '/' + (baseUrlArray.length > 1 ? (baseUrlArray[1].indexOf('/') > -1 ? baseUrlArray[1].split('/')[0] + '/' : baseUrlArray[1]) : '');
// }
SS.app.baseUrl = "/movie-search/";
SS.portal.serverInfo = [
    'SSSQYHFC02',
    'PP',
    '',
    '',
    'S'
];
SS.ssapi.token='VfaU+LJXyYZp7Nr3mFhCQtBfZ/rL2AQmOjkOW4W1uZVumEKn0wIHcD/RsdkmgB8di2Y9HFgUS/7HFxHm4m9eACLvfBCTdBEGoGqcd6RDUeZNSwlOrVeFarS9bEalGyz6';
