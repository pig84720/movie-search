/**
 * Created by jerryhuang on 15/8/15.
 */
define(function (require) {
    var common = require('Common'),
        noTab=false;
    var generateMenu = function ($root, treeViewModel) {
        // console.log(treeViewModel);
        noTab=treeViewModel.noTab();
        if (treeViewModel.treeLevelLeft != null) {
            generateFolder($root, treeViewModel.treeLevelLeft(), 'L');
            menuCount = 0;
            generateFolder($root, treeViewModel.treeLevelRight(), 'R');
        } else {
            generateFolder($root, treeViewModel());
        }
        var nowTab, prevTab,
            openWin = {};
        $('.folderLink').on('click', function () {
            var wh = common.getWH(''),
                programId = $(this).attr('programId');
            var openFlg = 'N';
            if (openWin[programId] != null) {
                if (openWin[programId].closed) {
                    openFlg = 'Y';
                    openWin[programId] = null;
                } else {
                    openWin[programId].focus();
                }
            } else {
                openFlg = 'Y';
            }
            if (openFlg == 'Y' || $(this).attr('noTab') == 'Y') {
                var openWindow = window.open($(this).attr('targetHref'), '_' + $(this).attr('openTarget'), '');
                openWin[$(this).attr('programId')] = openWindow;
            }
            return false;
        });
        $('.programLink').on('click', function () {
            var wh = common.getWH(''),
                programId = $(this).attr('programId');
            if ($('.' + programId)[0] == null || $(this).attr('noTab')=='Y') {
                if ($(this).attr('openTarget') == 'self' && $(this).attr('targetHref') != '#') {
                    // console.log(programId);
                    var openFlg = 'N';
                    if (openWin[programId] != null) {
                        if (openWin[programId].closed) {
                            openFlg = 'Y';
                            openWin[programId] = null;
                        } else {
                            openWin[programId].focus();
                        }
                    } else {
                        openFlg = 'Y';
                    }
                    if (openFlg == 'Y' || $(this).attr('noTab')=='Y') {
                        var openWindow = window.open($(this).attr('targetHref'), '_self', '');
                        openWin[$(this).attr('programId')] = openWindow;
                    }
                    return false;
                } else {
                    if ($(this).attr('openTarget') == 'blank' && $(this).attr('targetHref') != '#') {
                        var openFlg = 'N';
                        if (openWin[programId] != null) {
                            if (openWin[programId].closed) {
                                openFlg = 'Y';
                                openWin[programId] = null;
                            } else {
                                openWin[programId].focus();
                            }
                        } else {
                            openFlg = 'Y';
                        }
                        if (openFlg == 'Y' || $(this).attr('noTab')=='Y') {
                            var openWindow = window.open($(this).attr('targetHref'), '_blank', '');
                            openWin[$(this).attr('programId')] = openWindow;
                        }
                        return false;
                    } else {
                        // create the tab
                        $('<li>' +
                            '<a href="#' + $(this).attr('programId') + '" class="' + $(this).attr('programId') + '" data-toggle="tab" style="padding:5px 8px;">' +
                            $(this).html() + '</a>' +
                            '</li>').appendTo('#tabs');

                        // create the tab content
                        $('<div class="tab-pane" id="' + $(this).attr('programId') + '">' +
                            '<iframe ' +
                            'src="' + ($(this).attr('targetHref') != '#' ? $(this).attr('targetHref') : 'http://www.mobile01.com') + '" ' +
                            'width="100%" ' +
                            'height="' + (parseInt(wh.height) - 87) + '" ' +
                            'scrolling="yes" ' +
                            'frameborder="0">' +
                            '</iframe> ' +
                            '</div>').appendTo('.tab-content');

                        // make the new tab active
                        $('#tabs a:last').tab('show').on('shown.bs.tab', function (e) {
                            nowTab = e.target; // newly activated tab
                            prevTab = e.relatedTarget; // previous active tab
                            nowTab = $('.' + nowTab.hash.replace('#', ''));
                            if (prevTab != null) {
                                prevTab = $('.' + prevTab.hash.replace('#', ''));
                            }
                        });

                        nowTab = $('#tabs a:last');
                        return false;
                    }

                }
            } else {
                $('.' + $(this).attr('programId')).tab('show');
                return false;
            }
            //console.log(($('.navbar-toggle')[0] != null));
            if ($('.navbar-toggle')[0] != null) {
                if ($('.navbar-toggle').css('display') != 'none') {
                    $('.navbar-toggle').click();
                }
            }
        });
        $('.closeTab').on('click', function () {
            if (nowTab) {
                $(nowTab.attr('href')).remove();
                nowTab.remove();
                $('#tabs a:last').tab('show');
            }
            //nowTab = $('#tabs a:last');
        });
    };
    var menuCount = 0;
    var generateFolder = function ($root, rootNode, pos) {
        // console.log($root);
        // console.log(rootNode);
        var ul = $('<ul class="' + (menuCount == 0 ? (pos == 'R' ? 'nav navbar-nav navbar-right' : 'nav navbar-nav') : 'dropdown-menu') + '"></ul>');
        menuCount++;
        for (var i = 0; i < rootNode.length; i++) {
            var node = rootNode[i];
            var li = $('<li></li>');
            li.append(
                '<a ' +
                'class="' + (node.childNodes != null ? 'folderLink' : 'programLink') + (menuCount == 1 && i > 0 ? ' repeaterMenuButton' : '') + (menuCount == 1 ? ' topMenuButton' : '') + '" ' +
                'programId="' + node.id + '" ' +
                'href="#" ' +
                'targetHref="' + node.url + '" ' +
                'noTab="' + (noTab==true?'Y':'N') + '" ' +
                'openTarget="' + node.target + '">' +
                (node.childNodes != null || pos != null ? '' : node.id + ' ') + node.name +
                (node.childNodes != null ? '<span class="caret"></span></a>' : ''));
            if (node.childNodes) {
                generateFolder(li, node.childNodes, pos);
                menuCount = 1;
            }

            ul.append(li);
        }
        $root.append(ul);
    };
    return {
        generateMenu: generateMenu
    };
});