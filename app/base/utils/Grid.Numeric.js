/**
 * Created by jerryhuang on 15/8/11.
 */
define(function (require) {
    var check = require('Check');
    return {
        renderNumericControl: function (target, maxlength, digit, cellvalue, gridId, dataField) {
            // console.log(check.getNumVal(cellvalue, digit));
            $('#' + target)
                .css({
                    'text-align': 'right',
                    'ime-mode': 'disabled'
                })
                .attr('inputNum', 0)
                .attr('maxlength', maxlength)
                .attr('digit', digit)
                .focus(function () {
                    var val = check.getNumVal($(this).val().replace(/\,/ig, ''), $(this).attr('digit'));
                    $(this).val(val.replace(/\,/g, ''));
                    if (window.attachEvent) {
                        setTimeout("$('#" + $(this).attr('id') + "').select();", 100);
                    }
                })
                .keypress(digit > 0 ? check.OnlyNumDotPress : check.OnlyNumPress);
                // .blur(function () {
                //     var val = "0";
                //     if ($(this).attr('digit') == '0' || $(this).attr('digit') == null) {
                //         val = $(this).val().replace(/\,/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                //         // console.log(val);
                //     } else {
                //         val = check.getNumVal($(this).val().replace(/\,/g, ''), $(this).attr('digit'));
                //     }
                //     // console.log(val);
                //     $(this).val(val);
                // });
            //.val(check.getNumVal(cellvalue, digit).replace(/\,/ig, ''));
        }
    }
});