(function ($) {
    $.fn.timeSchedule = function (options) {
        var base = this;
        var defaults = {
            rows: {},
            startTime: "07:00",
            endTime: "19:30",
            widthTimeX: 15,		// 1cell的寬度(px)
            widthTime: 300,		// 大標題時間區塊的時間(秒)
            timeLineY: 50,		// timeline height(px)
            timeLineBorder: 1,	// timeline height border
            timeBorder: 0,		// border width
            timeLinePaddingTop: 0,
            timeLinePaddingBottom: 0,
            headTimeBorder: 0,	// time border width
            dataWidth: 160,		// data width
            verticalScrollbar: 0,	// vertical scrollbar width
            // event
            init_data: null,
            change: null,
            click: null,
            append: null,
            time_click: null,
            disableDrag: false,
            //20180418 Add By Jerry 增加休息時間
            restStartTime: '12:00',
            restEndTime: '13:00',
            debug: ""			// debug selecter
        };
        this.calcStringTime = function (string) {
            var slice = string.split(':');
            var h = Number(slice[0]) * 60 * 60;
            var i = Number(slice[1]) * 60;
            var min = h + i;
            return min;
        };
        this.formatTime = function (min) {
            var h = "" + (min / 36000 | 0) + (min / 3600 % 10 | 0);
            var i = "" + (min % 3600 / 600 | 0) + (min % 3600 / 60 % 10 | 0);
            var string = h + ":" + i;
            return string;
        };

        var setting = $.extend(defaults, options);
        this.setting = setting;
        var scheduleData = new Array();
        var timelineData = new Array();
        var $element = $(this);
        var element = (this);
        var tableStartTime = element.calcStringTime(setting.startTime);
        var tableEndTime = element.calcStringTime(setting.endTime);

        //20180418 Add By Jerry 增加休息時間
        var restStartTime = element.calcStringTime(setting.restStartTime);
        var restEndTime = element.calcStringTime(setting.restEndTime);

        var currentNode = null;
        tableStartTime -= (tableStartTime % setting.widthTime);
        tableEndTime -= (tableEndTime % setting.widthTime);

        this.getScheduleData = function () {
            return scheduleData;
        };
        this.getTimelineData = function () {
            return timelineData;
        };
        // 獲取當前的時間線號碼
        this.getTimeLineNumber = function (top) {
            var num = 0;
            var n = 0;
            var tn = Math.ceil(top / (setting.timeLineY + setting.timeLinePaddingTop + setting.timeLinePaddingBottom));
            for (var i in setting.rows) {
                var r = setting.rows[i];
                var tr = 0;
                if (typeof r["schedule"] == Object) {
                    tr = r["schedule"].length;
                }
                if (currentNode && currentNode["timeline"]) {
                    tr++;
                }
                n += Math.max(tr, 1);
                if (n >= tn) {
                    break;
                }
                num++;
            }
            return num;
        };
        // 添加背景數據
        this.addScheduleBgData = function (data) {
            var st = Math.ceil((data["start"] - tableStartTime) / setting.widthTime);
            var et = Math.floor((data["end"] - tableStartTime) / setting.widthTime);
            var $bar = jQuery('<div class="sc_bgBar"><span class="text"></span></div>');
            var stext = element.formatTime(data["start"]);
            var etext = element.formatTime(data["end"]);
            var snum = element.getScheduleCount(data["timeline"]);
            $bar.css({
                left: (st * setting.widthTimeX),
                top: 0,
                width: ((et - st) * setting.widthTimeX),
                height: $element.find('.sc_main .timeline').eq(data["timeline"]).height()
            });
            if (data["text"]) {
                $bar.find(".text").text(data["text"]);
            }
            if (data["class"]) {
                $bar.addClass(data["class"]);
            }
            //$element.find('.sc_main').append($bar);
            $element.find('.sc_main .timeline').eq(data["timeline"]).append($bar);
        };
        // 添加時程
        this.addScheduleData = function (data) {
            // console.log(data);
            // var st = Math.ceil((data["start"] - tableStartTime) / setting.widthTime);
            // var et = Math.floor((data["end"] - tableStartTime) / setting.widthTime);
            //避免狀態不顯示或是重疊的問題，滿一格才填滿
            var st = Math.floor((data["start"] - tableStartTime) / setting.widthTime);
            var et = Math.floor((data["end"] - tableStartTime) / setting.widthTime);
            // var $bar = jQuery('<div class="sc_Bar"><span class="head"><span class="time"></span></span><span class="text"></span></div>');
            //增加自定義css
            var $bar = jQuery('<div class="sc_Bar ' + $.trim(data["css"]) + '" ' +
                ($.trim(data["tooltip"]) != '' ? ' data-toggle="tooltip" data-placement="right" title="' + $.trim(data["tooltip"]) + '"' : '') +
                '><span class="head"><span class="time"></span></span><span class="text"></span></div>');
            var stext = element.formatTime(data["start"]);
            var etext = element.formatTime(data["end"]);
            var snum = element.getScheduleCount(data["timeline"]);


            $bar.css({
                left: (st * setting.widthTimeX),
                top: ((snum * setting.timeLineY) + setting.timeLinePaddingTop),
                // width: ((et - st) * setting.widthTimeX),
                //最小寬度顯示
                width: (((et - st) <= 0 ? 1 : (et - st)) * setting.widthTimeX),
                height: (setting.timeLineY)
            });
            $bar.find(".time").text(stext + "-" + etext);
            if (data["text"]) {
                //$bar.find(".text").text(data["text"]);
                $bar.find(".text").html(data["text"]);
            }
            if (data["class"]) {
                $bar.addClass(data["class"]);
            }
            //$element.find('.sc_main').append($bar);
            $element.find('.sc_main .timeline').eq(data["timeline"]).append($bar);
            // 增加數據
            scheduleData.push(data);
            // key
            var key = scheduleData.length - 1;
            $bar.data("sc_key", key);

                $bar.bind("mouseup", function () {
                    // コールバックがセットされていたら呼出
                    if (setting.click) {
                        if (jQuery(this).data("dragCheck") !== true && jQuery(this).data("resizeCheck") !== true) {
                            var node = jQuery(this);
                            var sc_key = node.data("sc_key");
                            setting.click(node, scheduleData[sc_key]);
                        }
                    }
                });

            if (setting.disableDrag != true) {
                var $node = $element.find(".sc_Bar");
                // move node.
                $node.draggable({
                    grid: [setting.widthTimeX, 1],
                    containment: ".sc_main",
                    helper: 'original',
                    start: function (event, ui) {
                        var node = {};
                        node["node"] = this;
                        node["offsetTop"] = ui.position.top;
                        node["offsetLeft"] = ui.position.left;
                        node["currentTop"] = ui.position.top;
                        node["currentLeft"] = ui.position.left;
                        node["timeline"] = element.getTimeLineNumber(ui.position.top);
                        node["nowTimeline"] = node["timeline"];
                        currentNode = node;
                    },
                    drag: function (event, ui) {
                        jQuery(this).data("dragCheck", true);
                        if (!currentNode) {
                            return false;
                        }
                        var $moveNode = jQuery(this);
                        var sc_key = $moveNode.data("sc_key");
                        var originalTop = ui.originalPosition.top;
                        var originalLeft = ui.originalPosition.left;
                        var positionTop = ui.position.top;
                        var positionLeft = ui.position.left;
                        var timelineNum = element.getTimeLineNumber(ui.position.top);
                        // 位置修正
                        //ui.position.top = Math.floor(ui.position.top / setting.timeLineY) * setting.timeLineY;
                        //ui.position.top = element.getScheduleCount(timelineNum) * setting.timeLineY;
                        ui.position.left = Math.floor(ui.position.left / setting.widthTimeX) * setting.widthTimeX;

                        $('#pos_y').val(positionTop);
                        $('#pos_x').val(positionLeft);
                        //$moveNode.find(".text").text(timelineNum+" "+(element.getScheduleCount(timelineNum) + 1));
                        if (currentNode["nowTimeline"] != timelineNum) {
                            // 高度調整
                            //element.resizeRow(currentNode["nowTimeline"],element.getScheduleCount(currentNode["nowTimeline"]));
                            //element.resizeRow(timelineNum,element.getScheduleCount(timelineNum) + 1);
                            // 目前的時間軸
                            currentNode["nowTimeline"] = timelineNum;
                        } else {
                            //ui.position.top = currentNode["currentTop"];
                        }
                        currentNode["currentTop"] = ui.position.top;
                        currentNode["currentLeft"] = ui.position.left;
                        // 文字內容變更
                        element.rewriteBarText($moveNode, scheduleData[sc_key]);
                        return true;
                    },
                    // 物件移動之後的處理結束
                    stop: function (event, ui) {
                        jQuery(this).data("dragCheck", false);
                        currentNode = null;

                        var node = jQuery(this);
                        var sc_key = node.data("sc_key");
                        var x = node.position().left;
                        var w = node.width();
                        var start = tableStartTime + (Math.floor(x / setting.widthTimeX) * setting.widthTime);
                        //var end = tableStartTime + (Math.floor((x + w) / setting.widthTimeX) * setting.widthTime);
                        var end = start + ((scheduleData[sc_key]["end"] - scheduleData[sc_key]["start"]));
                        var timelineNum = element.getTimeLineNumber(ui.position.top);

                        // console.log(scheduleData[sc_key]);
                        // 20180418 Add By Jerry
                        var dataStart = element.calcStringTime(scheduleData[sc_key].data.startTimeString),
                            dataEnd = element.calcStringTime(scheduleData[sc_key].data.endTimeString),
                            timeSpan = dataEnd - dataStart;

                        switch (scheduleData[sc_key].type) {
                            case 'reception':
                                dataStart = element.calcStringTime(scheduleData[sc_key].data.receptionStartTimeStr);
                                dataEnd = element.calcStringTime(scheduleData[sc_key].data.receptionEndTimeStr);
                                break;
                            case 'service':
                                dataStart = element.calcStringTime(scheduleData[sc_key].data.productionStartTimeStr);
                                dataEnd = element.calcStringTime(scheduleData[sc_key].data.productionEndTimeStr);
                                break;
                            case 'support':
                                dataStart = element.calcStringTime(scheduleData[sc_key].data.supportStartTimeStr);
                                dataEnd = element.calcStringTime(scheduleData[sc_key].data.supportEndTimeStr);
                                break;
                            case 'wash':
                                dataStart = element.calcStringTime(scheduleData[sc_key].data.washStartTimeStr);
                                dataEnd = element.calcStringTime(scheduleData[sc_key].data.washEndTimeStr);
                                break;
                            case 'delivery':
                                dataStart = element.calcStringTime(scheduleData[sc_key].data.deliveryStartTimeStr);
                                dataEnd = element.calcStringTime(scheduleData[sc_key].data.deliveryEndTimeStr);
                                break;
                        }
                        timeSpan = dataEnd - dataStart;

                        if (start + timeSpan != end) {
                            end = start + timeSpan;
                        }
                        if (start >= restStartTime && end < restEndTime) {
                            end = timeSpan + restEndTime;
                            start = restEndTime;
                        } else if (start < restStartTime && end > restEndTime) {
                            end = end + restEndTime - restStartTime;
                        } else if (start >= restStartTime && start < restEndTime && end > restEndTime) {
                            var extendTime = restEndTime - start;
                            start += extendTime;
                            end += extendTime;
                        } else if (start < restStartTime && end > restStartTime && end <= restEndTime) {
                            end = end - restStartTime + restEndTime;
                        }
                        // var stNum = Math.ceil((start - tableStartTime) / setting.widthTime);
                        // var etNum = Math.floor((end - tableStartTime) / setting.widthTime);
                        //避免狀態不顯示或是重疊的問題，滿一格才填滿
                        var stNum = Math.floor((start - tableStartTime) / setting.widthTime);
                        var etNum = Math.floor((end - tableStartTime) / setting.widthTime);
                        node.animate({
                            left: (stNum * setting.widthTimeX),
                            width: ((etNum - stNum) * setting.widthTimeX)
                        });

                        scheduleData[sc_key]["start"] = start;
                        scheduleData[sc_key]["end"] = end;

                        // 20180418 Add By Jerry
                        // 高度調整
                        element.resetBarPosition(timelineNum);
                        // 文字變更
                        element.rewriteBarText(node, scheduleData[sc_key]);

                        // 如果有設定callback功能就進行觸發
                        if (setting.change) {
                            setting.change(node, scheduleData[sc_key]);
                        }
                    }
                });
                $node.resizable({
                    handles: 'e',
                    grid: [setting.widthTimeX, setting.timeLineY],
                    minWidth: setting.widthTimeX,
                    start: function (event, ui) {
                        var node = jQuery(this);
                        node.data("resizeCheck", true);
                    },
                    // 物件移動之後的處理結束
                    stop: function (event, ui) {
                        var node = jQuery(this);
                        var sc_key = node.data("sc_key");
                        var x = node.position().left;
                        var w = node.width();
                        var start = tableStartTime + (Math.floor(x / setting.widthTimeX) * setting.widthTime);
                        var end = tableStartTime + (Math.floor((x + w) / setting.widthTimeX) * setting.widthTime);
                        var timelineNum = scheduleData[sc_key]["timeline"];

                        scheduleData[sc_key]["start"] = start;
                        scheduleData[sc_key]["end"] = end;

                        // 高度調整
                        element.resetBarPosition(timelineNum);
                        // 文字變更
                        element.rewriteBarText(node, scheduleData[sc_key]);

                        node.data("resizeCheck", false);
                        // コールバックがセットされていたら呼出
                        if (setting.change) {
                            setting.change(node, scheduleData[sc_key]);
                        }
                    }
                });
            }
            return key;
        };
        // スケジュール数の取得
        this.getScheduleCount = function (n) {
            var num = 0;
            for (var i in scheduleData) {
                if (scheduleData[i]["timeline"] == n) {
                    num++;
                }
            }
            return num;
        };
        // add
        this.addRow = function (timeline, row) {
            var title = row["title"];
            var id = $element.find('.sc_main .timeline').length;

            var html;

            html = '';
            html += '<div class="timeline ' + $.trim(row.css) + '"><span>' + title + '</span></div>';
            var $data = jQuery(html);
            // event call
            if (setting.init_data) {
                setting.init_data($data, row);
            }
            $element.find('.sc_data_scroll').append($data);

            html = '';
            html += '<div class="timeline ' + ($.trim(row["scheduleType"]) != '' ? 'timeline' + $.trim(row["scheduleType"]) : '') + '"></div>';
            var $timeline = jQuery(html);
            for (var t = tableStartTime; t < tableEndTime; t += setting.widthTime) {
                var $tl = jQuery('<div class="tl"></div>');
                $tl.width(setting.widthTimeX - setting.timeBorder);

                $tl.data("time", element.formatTime(t));
                $tl.data("timeline", timeline);

                //20180418 UPD
                if (element.formatTime(t).substr(3, 2) == '55') {
                    $tl.css('border-right', 'black 2px solid');
                }
                //20180418 Add By Jerry
                if (t >= restStartTime && t < restEndTime) {
                    $tl.css('background-color', 'darkgrey');
                }

                $timeline.append($tl);
            }
            // クリックイベント
            if (setting.time_click) {
                $timeline.find(".tl").click(function () {
                    setting.time_click(this, jQuery(this).data("time"), jQuery(this).data("timeline"), timelineData[jQuery(this).data("timeline")]);
                });
            }
            $element.find('.sc_main').append($timeline);
            timelineData[timeline] = row;

            if (row["class"] && (row["class"] != "")) {
                $element.find('.sc_data .timeline').eq(id).addClass(row["class"]);
                $element.find('.sc_main .timeline').eq(id).addClass(row["class"]);
            }
            // スケジュールタイムライン
            if (row["schedule"]) {
                for (var i in row["schedule"]) {
                    var bdata = row["schedule"][i];
                    var s = element.calcStringTime(bdata["start"]);
                    var e = element.calcStringTime(bdata["end"]);

                    var data = {};
                    data["timeline"] = id;
                    data["start"] = s;
                    data["end"] = e;
                    //增加自定義css
                    data["css"] = bdata["css"];
                    //增加tooltip
                    data["tooltip"] = bdata["tooltip"];
                    data["type"] = bdata["type"];
                    if (bdata["text"]) {
                        data["text"] = bdata["text"];
                    }
                    data["data"] = {};
                    if (bdata["data"]) {
                        data["data"] = bdata["data"];
                    }
                    element.addScheduleData(data);
                }
            }
            // 高さの調整
            element.resetBarPosition(id);
            $element.find('.sc_main .timeline').eq(id).droppable({
                accept: ".sc_Bar",
                drop: function (ev, ui) {
                    var node = ui.draggable;
                    var sc_key = node.data("sc_key");
                    var nowTimelineNum = scheduleData[sc_key]["timeline"];
                    var timelineNum = $element.find('.sc_main .timeline').index(this);
                    // タイムラインの変更
                    scheduleData[sc_key]["timeline"] = timelineNum;
                    node.appendTo(this);
                    // 高さ調整
                    element.resetBarPosition(nowTimelineNum);
                    element.resetBarPosition(timelineNum);
                }
            });
            // コールバックがセットされていたら呼出
            if (setting.append) {
                $element.find('.sc_main .timeline').eq(id).find(".sc_Bar").each(function () {
                    var node = jQuery(this);
                    var sc_key = node.data("sc_key");
                    setting.append(node, scheduleData[sc_key]);
                });
            }

        };

        this.getScheduleData = function () {
            var data = new Array();

            for (var i in timelineData) {
                if (typeof timelineData[i] == "undefined") continue;
                var timeline = jQuery.extend(true, {}, timelineData[i]);
                timeline.schedule = new Array();
                data.push(timeline);
            }

            for (var i in scheduleData) {
                if (typeof scheduleData[i] == "undefined") continue;
                var schedule = jQuery.extend(true, {}, scheduleData[i]);
                schedule.start = this.formatTime(schedule.start);
                schedule.end = this.formatTime(schedule.end);
                var timelineIndex = schedule.timeline;
                delete schedule.timeline;
                data[timelineIndex].schedule.push(schedule);
            }

            return data;
        };
        // テキストの変更
        this.rewriteBarText = function (node, data) {
            var x = node.position().left;
            var w = node.width();
            var start = tableStartTime + (Math.floor(x / setting.widthTimeX) * setting.widthTime);
            //var end = tableStartTime + (Math.floor((x + w) / setting.widthTimeX) * setting.widthTime);
            var end = start + (data["end"] - data["start"]);
            var html = element.formatTime(start) + "-" + element.formatTime(end);
            jQuery(node).find(".time").html(html);
        };
        this.resetBarPosition = function (n) {
            // 要素の並び替え
            var $bar_list = $element.find('.sc_main .timeline').eq(n).find(".sc_Bar");
            var codes = [];
            for (var i = 0; i < $bar_list.length; i++) {
                codes[i] = {code: i, x: jQuery($bar_list[i]).position().left};
            }
            // ソート
            codes.sort(function (a, b) {
                if (a["x"] < b["x"]) {
                    return -1;
                } else if (a["x"] > b["x"]) {
                    return 1;
                }
                return 0;
            });
            var check = [];
            var h = 0;
            var $e1, $e2;
            var c1, c2;
            var s1, e1, s2, e2;
            for (var i = 0; i < codes.length; i++) {
                c1 = codes[i]["code"];
                $e1 = jQuery($bar_list[c1]);
                for (h = 0; h < check.length; h++) {
                    var next = false;
                    L: for (var j = 0; j < check[h].length; j++) {
                        c2 = check[h][j];
                        $e2 = jQuery($bar_list[c2]);

                        s1 = $e1.position().left;
                        // e1 = $e1.position().left + $e1.width();
                        //避免時間重疊
                        e1 = $e1.position().left + $e1.width() - 1;
                        s2 = $e2.position().left;
                        // e2 = $e2.position().left + $e2.width();
                        //避免時間重疊
                        e2 = $e2.position().left + $e2.width() - 1;
                        if (s1 < e2 && e1 > s2) {
                            next = true;
                            continue L;
                        }
                    }
                    if (!next) {
                        break;
                    }
                }
                if (!check[h]) {
                    check[h] = [];
                }
                $e1.css({top: ((h * setting.timeLineY) + setting.timeLinePaddingTop)});
                check[h][check[h].length] = c1;
            }
            // 高さの調整
            this.resizeRow(n, check.length);
        };
        this.resizeRow = function (n, height) {
            //var h = Math.max(element.getScheduleCount(n),1);
            var h = Math.max(height, 1);
            $element.find('.sc_data .timeline').eq(n).height((h * setting.timeLineY) - setting.timeLineBorder + setting.timeLinePaddingTop + setting.timeLinePaddingBottom);
            $element.find('.sc_main .timeline').eq(n).height((h * setting.timeLineY) - setting.timeLineBorder + setting.timeLinePaddingTop + setting.timeLinePaddingBottom);

            $element.find('.sc_main .timeline').eq(n).find(".sc_bgBar").each(function () {
                jQuery(this).height(jQuery(this).closest(".timeline").height());
            });

            $element.find(".sc_data").height($element.find(".sc_main_box").height());
        }
        // resizeWindow
        this.resizeWindow = function () {
            var sc_width = $element.width();
            var sc_main_width = sc_width - setting.dataWidth - (setting.verticalScrollbar);
            var cell_num = Math.floor((tableEndTime - tableStartTime) / setting.widthTime);
            $element.find(".sc_header_cell").width(setting.dataWidth);
            $element.find(".sc_data,.sc_data_scroll").width(setting.dataWidth);
            $element.find(".sc_header").width(sc_main_width);
            $element.find(".sc_main_box").width(sc_main_width);
            $element.find(".sc_header_scroll").width(setting.widthTimeX * cell_num);
            $element.find(".sc_main_scroll").width(setting.widthTimeX * cell_num);

        };
        // init
        this.init = function () {
            var html = '';
            html += '<div class="sc_menu">' + "\n";
            html += '<div class="sc_header_cell"><span>&nbsp;</span></div>' + "\n";
            html += '<div class="sc_header">' + "\n";
            html += '<div class="sc_header_scroll">' + "\n";
            html += '</div>' + "\n";
            html += '</div>' + "\n";
            html += '<br class="clear" />' + "\n";
            html += '</div>' + "\n";
            html += '<div class="sc_wrapper">' + "\n";
            html += '<div class="sc_data">' + "\n";
            html += '<div class="sc_data_scroll">' + "\n";
            html += '</div>' + "\n";
            html += '</div>' + "\n";
            html += '<div class="sc_main_box">' + "\n";
            html += '<div class="sc_main_scroll">' + "\n";
            html += '<div class="sc_main">' + "\n";
            html += '</div>' + "\n";
            html += '</div>' + "\n";
            html += '</div>' + "\n";
            html += '<br class="clear" />' + "\n";
            html += '</div>' + "\n";

            // $element.append(html);
            $element.html(html);

            $element.find(".sc_main_box").scroll(function () {
                $element.find(".sc_data_scroll").css("top", $(this).scrollTop() * -1);
                $element.find(".sc_header_scroll").css("left", $(this).scrollLeft() * -1);

            });
            // add time cell
            var cell_num = Math.floor((tableEndTime - tableStartTime) / setting.widthTime);
            var before_time = -1;
            for (var t = tableStartTime; t < tableEndTime; t += setting.widthTime) {

                if ((before_time < 0) ||
                    (Math.floor(before_time / 3600) != Math.floor(t / 3600))) {
                    var html = '';
                    html += '<div class="sc_time">' + element.formatTime(t) + '</div>';
                    var $time = jQuery(html);
                    var cell_num = Math.floor(Number(Math.min((Math.ceil((t + setting.widthTime) / 3600) * 3600), tableEndTime) - t) / setting.widthTime);
                    $time.width((cell_num * setting.widthTimeX) - setting.headTimeBorder);
                    $element.find(".sc_header_scroll").append($time);

                    before_time = t;
                }
            }

            jQuery(window).resize(function () {
                element.resizeWindow();
            }).trigger("resize");

            // addrow
            for (var i in setting.rows) {
                this.addRow(i, setting.rows[i]);
            }
            // add tooltip
            // $('.sc_Bar').tooltip({
            //     html: false
            // });
        };

        this.reBind = function () {
            // console.log(setting);
            scheduleData = new Array();
            timelineData = new Array();
            this.init();
        }
        ;
        // 初期化
        this.init();

        this.debug = function () {
            var html = '';
            for (var i in scheduleData) {
                html += '<div>';

                html += i + " : ";
                var d = scheduleData[i];
                for (var n in d) {
                    var dd = d[n];
                    html += n + " " + dd;
                }

                html += '</div>';
            }
            jQuery(setting.debug).html(html);
        };
        if (setting.debug && setting.debug != "") {
            setInterval(function () {
                element.debug();
            }, 10);
        }

        return (this);
    };
})(jQuery);
