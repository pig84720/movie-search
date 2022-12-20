define(function () {
    var loadCss = function (url) {
            $.map(url, function (item, index) {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = item.uri;
                link.id = item.id;
                if (item.noscript) {
                    var noscript = document.createElement("noscript");
                    noscript.appendChild(link);
                    document.getElementsByTagName("head")[0].appendChild(noscript);
                } else {
                    document.getElementsByTagName("head")[0].appendChild(link);
                }
                //console.log(link);
            });
        },
        loadScript = function (url) {
            $.map(url, function (uri, index) {
                var scriptblock = document.createElement("script");
                scriptblock.type = "text/javascript";
                scriptblock.src = uri.uri;
                scriptblock.id = uri.id;
                document.getElementsByTagName("head")[0].appendChild(scriptblock);
            });
        },
        dateStringToDate = function (dateString) {
            try {
                var scheduledDateArray = dateString.split('T')[0].split('-');
                var scheduledTimeArray = dateString.split('T')[1].split(':');
                //console.log(scheduledDateArray);
                //console.log(scheduledTimeArray);
                var scheduledTime = new Date(
                    parseInt(scheduledDateArray[0]),
                    parseInt(scheduledDateArray[1]) - 1,
                    parseInt(scheduledDateArray[2]),
                    parseInt(scheduledTimeArray[0]),
                    parseInt(scheduledTimeArray[1])
                );
                return scheduledTime;
            } catch (e) {
                return null;
            }
        },
        getDateTimeSTR = function (now) {
            if (now == null) {
                return '';
            } else {
                year = "" + now.getFullYear();
                month = "" + (now.getMonth() + 1);
                if (month.length == 1) {
                    month = "0" + month;
                }
                day = "" + now.getDate();
                if (day.length == 1) {
                    day = "0" + day;
                }
                hour = "" + now.getHours();
                if (hour.length == 1) {
                    hour = "0" + hour;
                }
                minute = "" + now.getMinutes();
                if (minute.length == 1) {
                    minute = "0" + minute;
                }
                second = "" + now.getSeconds();
                if (second.length == 1) {
                    second = "0" + second;
                }
                return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            }
        },
    //取得傳入日期物件的字串格式
        getDateSTR = function (now, ReplaceStr) {
            return getDateTimeSTR(now).substr(0, 10).replace('-', ReplaceStr).replace('-', ReplaceStr);
        },
        getRequest = function (name) {
            try {
                if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
                    return decodeURIComponent(name[1]);
            } catch (e) {
                return null;
            }
        },
        getWH = function (unit) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
            if (window.parent) {
                width = (document.body.offsetWidth > 0) ? document.body.offsetWidth : width;
            }
            return {
                width: width + unit,
                height: height + unit
            };
        },
        getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        scrollTop = function (top) {
            var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $body.animate({
                scrollTop: top
            }, 2000);
        },
        genViewModel = function (base) {
            var strVM = '';
            $('[data-bind]').each(function (index, object) {
                //console.log('{'+$(object).attr('data-bind')+'}');
                var attrAry = $(object).attr('data-bind')
                    .replace(/ /ig, '')
                    .replace('jqxInput:', '')
                    .replace('jqxDateTimeInput:', '')
                    .replace('jqxNumberInput:', '')
                    .replace('jqxCheckBox:', '')
                    .replace('jqxRadioButton:', '')
                    .replace('{', '')
                    .replace('}', '')
                    .split(',');
                $.map(attrAry, function (obj, index) {
                    //console.log(obj);
                    var attr = obj.split(':');
                    if (attr[0] == 'value' || attr[0] == 'enable' || attr[0] == 'disabled' || attr[0] == 'click' || attr[0] == 'ddlPromt' || attr[0] == 'checked') {
                        if (attr[0] == 'disabled') {
                            if (strVM.indexOf('"' + attr[1] + '"') == -1) {
                                strVM += ',' + attr[0] + ':"' + attr[1].replace('!', '') + '"';
                            }
                        } else {
                            if (strVM.indexOf('"' + attr[1] + '"') == -1) {
                                strVM += ',' + attr[0] + ':"' + attr[1] + '"';
                            }
                        }
                    }
                });
            });
            strVM = strVM.replace(/"/ig, '');
            //console.log(strVM.substr(1));
            var $Q = {};
            $.map(strVM.substr(1).split(','), function (obj, index) {
                var targetVmObject = obj.split(':');
                //console.log(targetVmObject[0]);
                switch (targetVmObject[0]) {
                    case 'value':
                        if (targetVmObject[1].indexOf('num') > -1) {
                            $Q[targetVmObject[1]] = ko.observable("0");
                        } else {
                            $Q[targetVmObject[1]] = ko.observable("");
                        }
                        break;
                    case 'checked':
                        $Q[targetVmObject[1]] = ko.observable(false);
                        break;
                    case 'enable':
                        $Q[targetVmObject[1]] = ko.observable(true);
                        break;
                    case 'disabled':
                        $Q[targetVmObject[1]] = ko.observable(false);
                        break;
                    case 'click':
                        $Q[targetVmObject[1]] = function () {
                            alert('' + targetVmObject[1]) + ''
                        };
                        break;
                    case 'ddlPromt':
                        $Q[targetVmObject[1]] = ddlPromt;
                        break;
                }
                ;
            });
            for (var Q in $Q) {
                //console.log(Q);
                base[Q] = $Q[Q];
            }
            return $Q;
        },
        bindViewModel = function (viewModel, $vm) {
            for (var vm in $vm) {
                if (viewModel[vm] == null) {
                    viewModel[vm] = $vm[vm];
                }
            }
        };
    return {
        loadCss: loadCss,
        loadScript: loadScript,
        dateStringToDate: dateStringToDate,
        getDateTimeSTR: getDateTimeSTR,
        getDateSTR: getDateSTR,
        getRequest: getRequest,
        getWH: getWH,
        getParameterByName: getParameterByName,
        scrollTop: scrollTop,
        genViewModel: genViewModel,
        bindViewModel: bindViewModel
    };

    //SS.namespace("SS.CommonLib");
    //SS.CommonLib = CommonLib;
    //return CommonLib;
});