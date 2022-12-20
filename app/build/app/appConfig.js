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

//設定Service連結位置
SS.namespace("SS.service.baseUrl");
SS.namespace("SS.app.baseUrl");
SS.namespace("SS.ssapi.url");
SS.namespace("SS.image.baseUrl");
SS.namespace("SS.apiKey");

// SS.service.baseUrl = "https://api.themoviedb.org/3/movie/";
SS.service.baseUrl = "https://jekxk71547.execute-api.ap-northeast-1.amazonaws.com/SIT/movies/";
// SS.app.baseUrl = "/movie-search/";
SS.app.baseUrl = "/";
SS.image.baseUrl = "https://image.tmdb.org/t/p/w500";
SS.apiKey = "2b6190c7ca4e58aac8a43283286cbce7";
SS.ssapi.token = 'VfaU+LJXyYZp7Nr3mFhCQtBfZ/rL2AQmOjkOW4W1uZVumEKn0wIHcD/RsdkmgB8di2Y9HFgUS/7HFxHm4m9eACLvfBCTdBEGoGqcd6RDUeZNSwlOrVeFarS9bEalGyz6';
