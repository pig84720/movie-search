/**
 * Created by jerryhuang on 15/8/10.
 */
define(function(require) {
    var check = require('Check');
    return {
        renderDateControl: function(row, cellvalue, editor, cellText, width, height, gridId, dataField, calendar) {
            var targetId = editor.parent().find('input').attr('id'),
                $targetId = $('#' + targetId),
                clickShowFlg = 'N',
                base = this;

            if (calendar) {
                var calendarImg = document.createElement('img');
                calendarImg.id = targetId + 'Img';
                calendarImg.src = SS.app.baseUrl + 'app/base/components/resources/images/icon-calendar.png';
                calendarImg.align = 'top';

                setTimeout(function() {
                    $targetId.after(calendarImg);
                    $('#' + calendarImg.id).css({
                        'width': '25px',
                        'margin-top': '-3px',
                        'cursor': 'pointer'
                    }).click(function(e) {
                        if ($("#jqxCalendarGridUIDate").css('display') != 'none') {
                            $("#jqxCalendarGridUIDate").css({
                                display: 'none'
                            });

                        }
                        else {
                            var position = $targetId.offset();
                            clickShowFlg = 'Y';
                            $('#jqxCalendarGridUIDate ').jqxCalendar('setDate', $.trim($targetId.val()) == '' ? new Date() : moment($targetId.val(), 'YYYY/MM/DD').toDate());
                            clickShowFlg = 'N';

                            $("#jqxCalendarGridUIDate").css({
                                position: 'absolute',
                                'z-index': 99999999,
                                top: position.top + 28,
                                left: position.left,
                                display: ''
                            }).attr('targetId', e.currentTarget.id);
                        }
                    });
                }, 0);

                if (!$(".jqxCalendarGridUIDate")[0]) {
                    var calendarDiv = document.createElement('div');
                    calendarDiv.id = "jqxCalendarGridUIDate";
                    //calendarDiv.class = "jqxCalendarGridUIDate";
                    $('body').append(calendarDiv);
                    $("#jqxCalendarGridUIDate").css({
                        width: '220px',
                        height: '220px',
                        display: 'none'
                    }).addClass('jqxCalendarGridUIDate');
                }
                if (!$("#jqxCalendarGridUIDate").attr('jqxCalendar')) {
                    $("#jqxCalendarGridUIDate").jqxCalendar({
                        width: '220px',
                        height: '220px',
                        culture: 'ZH-TW'
                    });

                    $('#jqxCalendarGridUIDate').on('change viewChange', function(event) {
                        var date = event.args.date;
                        var calendarImgId = $('#jqxCalendarGridUIDate').attr('targetId');

                        // $('#' + calendarImg.id).prev().val(moment(date).format('YYYYMMDD'));
                        $('#' + calendarImgId).prev().val(moment(date).format('YYYYMMDD'));

                        //console.log(clickShowFlg);
                        if (clickShowFlg == 'N') {
                            $("#jqxCalendarGridUIDate").css({
                                display: 'none'
                            });
                            // $('#' + calendarImg.id).prev().select();
                            $('#' + calendarImgId).prev().select();
                        }
                        else {
                            setTimeout(function() {
                                // $('#' + calendarImg.id).prev().select();
                                $('#' + calendarImgId).prev().select();
                            }, 100);
                        }
                    });
                    $("#jqxCalendarGridUIDate").attr('jqxCalendar', true);
                }
            }

            $targetId.css({
                    'ime-mode': 'disabled',
                    'display': '',
                    'width': (parseInt($targetId.css('width').replace('px', '')) - (calendar ? 27 : 0)) + 'px'
                }).attr('maxlength', '8')
                .on('keypress', check.OnlyNumPress);

            setTimeout(function() {
                $targetId.css('display', '');
            }, 10);

            if ($targetId.attr('addEvent') == null) {
                $targetId.attr('addEvent', '1');
                $targetId.focus(function() {
                    $(this).val($(this).val().replace(/\//g, ''));
                });
                $targetId.blur(function() {
                    if ($(this).val() == '' || $(this).val() == null) return;
                    var dateStr = $(this).val();
                    if (dateStr.length == 6) {
                        dateStr = (parseInt(dateStr.substr(0, 2)) + 1911) + dateStr.substr(2, 4);
                    }
                    if (dateStr.length == 7) {
                        dateStr = (parseInt(dateStr.substr(0, 3)) + 1911) + dateStr.substr(3, 4);
                    }
                    var dateString = moment(dateStr, 'YYYYMMDD').format('YYYY/MM/DD');
                    if (dateString == 'Invalid date') {
                        alert('日期格式輸入錯誤，請重新輸入！');
                        $(this).val('');
                        //$(this).focus()
                        setTimeout(function() {
                            $('#' + gridId).jqxGrid('begincelledit', row, dataField);
                        }, 50);
                    }
                    else {
                        $(this).val(dateString);
                        $("#jqxCalendarGridUIDate").css({
                            display: 'none'
                        });
                    }
                });
            }
            $targetId.focus();
        },
        renderMonthControl: function(row, cellvalue, editor, cellText, width, height, gridId, dataField) {
            var targetId = editor.parent().find('input').attr('id'),
                $targetId = $('#' + targetId);

            $targetId.css({
                    'ime-mode': 'disabled',
                    'display': ''
                }).attr('maxlength', '6')
                .on('keypress', check.OnlyNumPress);

            setTimeout(function() {
                $targetId.css('display', '');
            }, 10);

            $targetId.focus(function() {
                $(this).val($(this).val().replace(/\//g, ''));
            });
            $targetId.change(function() {
                if ($(this).val() == '' || $(this).val() == null) return;
                var dateStr = $(this).val() + '01';
                if (dateStr.length == 6) {
                    dateStr = (parseInt(dateStr.substr(0, 2)) + 1911) + dateStr.substr(2, 4);
                }
                if (dateStr.length == 7) {
                    dateStr = (parseInt(dateStr.substr(0, 3)) + 1911) + dateStr.substr(3, 4);
                }
                var dateString = moment(dateStr, 'YYYYMMDD').format('YYYY/MM/DD');
                if (dateString == 'Invalid date') {
                    alert('日期格式輸入錯誤，請重新輸入！');
                    $(this).val('');
                    //$(this).focus()
                    setTimeout(function() {
                        $('#' + gridId).jqxGrid('begincelledit', row, dataField);
                    }, 50);
                }
                else {
                    $(this).val(dateString.substr(0, 7));
                    $("#jqxCalendarGridUIDate").css({
                        display: 'none'
                    });
                }
            });
            $targetId.focus();
        }
    };
});