/**
 * Created by jerryhuang on 15/8/9.
 */
define(function (require) {
    return {
        renderDropDownloadList: function (invar) {
            var t = {
                editor: invar.editor,
                data: invar.data,
                displayMember: invar.displayMember,
                valueMember: invar.valueMember,
                placeHolder: invar.placeHolder,
                value: invar.value
            };
            //console.log(t);
            t.editor.jqxDropDownList({
                source: t.data,
                displayMember: t.displayMember,
                valueMember: t.valueMember,
                autoOpen: true,
                placeHolder: t.placeHolder
            });

            var valArray = [];
            // var textArray = [];
            $.map(t.data.records, function (item, index) {
                valArray.push($.trim(item[t.valueMember]));
            });
            var index = valArray.indexOf($.trim(t.value));
            t.editor.jqxDropDownList('selectIndex', index);
            t.editor.jqxDropDownList('ensureVisible', index);

        },
        showDropDownloadListText: function (t) {
            // var t = {
            //     data: invar.data,
            //     displayMember: invar.displayMember,
            //     valueMember: invar.valueMember,
            //     value: invar.value,
            //     element: invar.element
            // };
            // var valArray = [];
            // var textArray = [];
            // $.map(t.data.records, function (item, index) {
            //     valArray.push($.trim(item[t.valueMember]));
            //     textArray.push($.trim(item[t.displayMember]));
            // });
            // var index = valArray.indexOf($.trim(t.value));
            // t.element.text(textArray[index]);
            var result = $.grep(t.dataType == 'json' ? t.data : t.data.records, function (row, i) {
                return $.trim(row[t.valueMember]) == $.trim(t.value);
            });
            t.element.text(result.length == 0 ? null : result[0][t.displayMember]);
        },
        getDropDownloadListEditorValue: function (invar) {
            var t = {
                editor: invar.editor,
                displayMember: invar.displayMember,
                valueMember: invar.valueMember,
                targetField: invar.targetField,
                callback: invar.callback,
                row: invar.row
            };
            try {
                var selectItem = t.editor.jqxDropDownList('getSelectedItem').originalItem;
                //var result = t.vm()[t.row];
                //result[t.targetField](selectItem[t.valueMember]);

                if (t.callback != null) t.callback(selectItem, t.row);
                return selectItem[t.valueMember];
            } catch (ex) {
                return null;
            }
        }

    };
});