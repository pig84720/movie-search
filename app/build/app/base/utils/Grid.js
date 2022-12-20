define(function (require) {
    var gridDropDownList = require('Grid.DropDownList');
    var gridDate = require('Grid.Date');
    var gridNumeric = require('Grid.Numeric');
    var check = require('Check');
    var columnAttrib = {
            serial: {
                text: '',
                columntype: 'textbox',
                width: 60,
                cellsalign: 'center',
                align: 'center',
                cellbeginedit: function (row, datafield, columntype, value) {
                    return false;
                },
                cellsrenderer: this.sysGridRowNo
            },
            text: {
                text: '',
                columntype: 'textbox',
                datafield: '',
                width: 100,
                cellsalign: 'center',
                align: 'center',
                cellbeginedit: function (row, datafield, columntype, value) {
                    return true;
                },
                cellsrenderer: function (row, datafield, value, defaultHtml) {
                    return defaultHtml;
                }
            },
            button: {
                text: '',
                columntype: 'button',
                width: 80,
                cellsalign: 'center',
                align: 'center',
                cellbeginedit: function (row, datafield, columntype, value) {
                    return true;
                },
                cellsrenderer: function (row, datafield, value, defaultHtml) {
                    return defaultHtml;
                },
                buttonclick: function (index) {
                    alert('未設定buttonclick事件，目前點選第' + (index + 1) + '列！');
                }
            },
            dropdownlist: {
                text: '',
                datafield: '',
                columntype: 'dropdownlist',
                width: 100,
                cellsalign: 'center',
                align: 'center',
                cellbeginedit: function (row, datafield, columntype, value) {
                    return true;
                },
                cellsrenderer: function (row, datafield, value, defaultHtml) {
                    return defaultHtml;
                },
                itemData: ko.observableArray([{
                    text: '選項一',
                    value: 'item01'
                }, {
                    text: '選項二',
                    value: 'item02'
                }, {
                    text: '選項三',
                    value: 'item03'
                }, {
                    text: '選項四',
                    value: 'item04'
                }, {
                    text: '選項五',
                    value: 'item05'
                }]),
                displayMember: 'text',
                valueMember: 'value',
                placeHolder: '請選擇',
                callback: function () {
                }
            }
        },
        initGridWithArray = function (iniVar) {
            try {
                // 查詢結果Grid
                var gridSource = {
                    datatype: "array",
                    updaterow: function (rowid, rowdata, commit) {
                        // synchronize with the server - send update command
                        // call commit with parameter true if the synchronization with the server is successful
                        // and with parameter false if the synchronization failed.
                        commit(true);
                    },
                    localdata: iniVar.localdata,
                    datafields: iniVar.datafield
                };
                // setTimeout(function () {
                var gridAdapter = new $.jqx.dataAdapter(gridSource, {
                    autoBind: true
                });
                //var timestemp;
                iniVar.targetGrid.jqxGrid({
                    width: iniVar.width,
                    height: iniVar.height,
                    source: gridAdapter,
                    theme: iniVar.theme,
                    selectionmode: iniVar.selectionmode,
                    //selectionmode: 'multiplecellsadvanced',
                    autoheight: iniVar.autoheight,
                    sortable: iniVar.sortable != null ? iniVar.sortable : true,
                    editable: iniVar.editable,
                    //ready: function()
                    //{
                    //    iniVar.targetGrid.jqxGrid('focus');
                    //},
                    editmode: 'click',
                    pageable: iniVar.pageable,
                    localization: iniVar.localization,
                    showstatusbar: iniVar.showstatusbar,
                    showaggregates: iniVar.showaggregates,
                    statusbarheight: iniVar.statusbarheight,
                    enablebrowserselection: true,
                    columnsresize: true,
                    columns: iniVar.columns,
                    handlekeyboardnavigation: function (event) {
                        //console.log(arguments);
                        var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                        if (key == 13) {
                            //alert('Pressed Enter Key.');
                            return true;
                        }
                        //else if (key == 27) {
                        //    alert('Pressed Esc Key.');
                        //    return true;
                        //}
                    }
                }).on("bindingcomplete", function (e) {
                    // grid 載入的資料中,含有knockout的data-bind,所以要在載入後重新對該grid做一次applyBindings()
                    // 注意: 僅需對有改變的DOM node做applyBindings,不要(也不可)對root node做
                    //    ko.applyBindings(LC_MVC.hpa020ViewModel, $jgrdResult[0]);
                }).on("cellclick", function (event) {
                    //console.log((new Date()).getTime().toString());
                    //console.log(event.timeStamp.toString());
                    if ($.jStorage.get(event.timeStamp) == null) {
                        $.jStorage.set(event.timeStamp, true, {
                            TTL: 10
                        });
                        //timestemp = event.timeStamp;
                        //console.log(timestemp);
                        //console.log(event);
                        //console.log($(this).jqxGrid('editable'));
                        var thisArgs = args,
                            base = this;

                        setTimeout(function () {
                            //console.log($(base).jqxGrid[thisArgs.rowindex + '_' + thisArgs.datafield + '_enabled']);
                            //console.log(thisArgs);
                            if ($(base).jqxGrid[thisArgs.rowindex + '_' + thisArgs.datafield + '_enabled'] == true && thisArgs.column.columntype == 'checkbox') {
                                $(base).jqxGrid('setcellvalue', thisArgs.rowindex, thisArgs.datafield, !(thisArgs.value));
                                //console.dir(event.args);
                                var cellvaluechanging = $(base).jqxGrid('getcolumnproperty', event.args.datafield, 'cellvaluechanging');
                                if (cellvaluechanging) {
                                    cellvaluechanging(
                                        event.args.rowindex,
                                        event.args.datafield,
                                        event.args.column.columntype,
                                        event.args.value,
                                        event.args.value == true ? false : true
                                    );
                                }

                            }
                        }, 50);

                    }

                });
                // }, $.jqx != null ? 0 : 300);

            } catch (e) {
                setTimeout(function () {
                    initGridWithArray(iniVar);
                }, 300);
            }
        },
        getDataFieldsFromColumns = function (columns, data) {
            var datafields = [];
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].dataField != null) {
                    datafields.push({
                        name: columns[i].dataField,
                        type: function () {
                            switch (columns[i].type) {
                                case 'number':
                                    return 'number'
                                    break;
                                case 'checkbox':
                                    return 'bool'
                                    break;
                                default:
                                    return 'string'
                                    break;
                            }
                        }()
                    });
                }
            }
            if (data != null) {
                if (data.length > 0) {
                    for (var key in data[0]) {
                        var checkArray = $.grep(datafields, function (item, index) {
                            return (item.name == key);
                        });
                        if (checkArray.length == 0) {
                            datafields.push({
                                name: key,
                                type: 'string'
                            });
                            //datafields.push({
                            //    name: key + 'isEnable',
                            //    type: 'boolean'
                            //});
                            //datafields.push({
                            //    name: key + 'isValid',
                            //    type: 'boolean'
                            //});
                            //datafields.push({
                            //    name: key + 'isValidMessage',
                            //    type: 'string'
                            //});
                        }
                    }
                }
            }
            return datafields;
        },
        getColumns = function (columns, gridSetting) {
            var columnOutput = [];
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i],
                    cellbeginedit = column.cellbeginedit == null ? gridSetting.cellbeginedit : column.cellbeginedit,
                    cellsrenderer = column.cellsrenderer == null ? gridSetting.cellsrenderer : column.cellsrenderer;
                var cellsRenderer = function (row, datafield, value, defaultHtml) {
                        var base = this.cellsrenderer;
                        $('#' + base.gridId).jqxGrid('hidevalidationpopups');
                        if (base.type == 'numeric') {
                            try {
                                $defaultHtml = $(defaultHtml);
                                if (base.digits == null || base.digits == 0) {
                                    $defaultHtml.html(value.replace(/\,/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                                } else {
                                    $defaultHtml.html(check.getNumVal(value, (base.digits == null ? 0 : base.digits).toString()));
                                }
                                defaultHtml = $defaultHtml[0].outerHTML;
                            } catch (e) {
                            }
                        }
                        if (base.editable) {
                            return base.cellsRenderer(row, datafield, value, defaultHtml);
                        }
                        else {
                            var element = $(defaultHtml);
                            element.css('color', '#999');
                            return base.cellsRenderer(row, datafield, value, element[0].outerHTML);
                        }
                    },
                    cellBeginEdit = function (row, datafield, columntype, value) {
                        var base = this.cellbeginedit,
                            // var base = this.cellBeginEdit,
                            returnValue = false;
                        if (base.cellBeginEdit) {
                            var returnValue = base.cellBeginEdit(row, datafield, columntype, value);
                        }

                        var jqxGrid = $('#' + base.gridId).jqxGrid;
                        jqxGrid[row + '_' + datafield + '_enabled'] = (returnValue == false ? returnValue : base.editable);

                        if (!returnValue) {
                            return returnValue;
                        }
                        else {
                            if (base.editable) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                    };


                cellsRenderer['editable'] = column.editable == null ? gridSetting.editable : column.editable;
                cellsRenderer['cellsRenderer'] = cellsrenderer;
                cellsRenderer['gridId'] = gridSetting.id;
                cellsRenderer['digits'] = column.digits;
                cellsRenderer['type'] = column.type;

                cellBeginEdit['editable'] = column.editable == null ? gridSetting.editable : column.editable;
                cellBeginEdit['cellBeginEdit'] = cellbeginedit;
                cellBeginEdit['gridId'] = gridSetting.id;

                var columnSetting = {};
                switch (column.type) {
                    case 'serial':
                        columnSetting = {
                            text: column.text,
                            columntype: 'textbox',
                            width: column.width,
                            cellsalign: 'center',
                            align: 'center',
                            hidden: column.hidden,
                            cellbeginedit: columnAttrib['serial']['cellbeginedit'],
                            cellsrenderer: this.sysGridRowNo,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned
                        };
                        break;

                    case 'text':
                        var initeditor = function (row, value, editor, celltext, cellwidth, cellheight) {
                            var base = this.initeditor;
                            if (base.maxlength != null) {
                                $('#' + editor.attr('id')).attr('maxlength', base.maxlength);
                            }
                        };
                        initeditor['maxlength'] = column.maxlength;

                        columnSetting = {
                            text: column.text,
                            columntype: 'textbox',
                            datafield: column.dataField,
                            width: column.width,
                            cellsalign: column.cellsalign,
                            align: column.align,
                            hidden: column.hidden,
                            aggregates: column.aggregates,
                            initeditor: initeditor,
                            cellbeginedit: cellBeginEdit,
                            cellsrenderer: cellsRenderer,
                            cellendedit: column.cellendedit,
                            cellvaluechanging: column.cellvaluechanging,
                            aggregatesrenderer: column.aggregatesrenderer,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned
                        };
                        break;

                    case 'button':
                        var cellsrenderer = function (row, datafield, value, defaultHtml) {
                            var element = $(defaultHtml);
                            var base = this.cellsrenderer;
                            var cellsrenderer = base.cellsrenderer;
                            if (base.editable) {
                                //return column.text;
                                if (base.buttonText == 'value' || base.buttonText == '*' || base.buttonText == '-') {
                                    return value;
                                }
                                else {
                                    return base.buttonText;
                                }
                            }
                            else {
                                element.css({
                                    'color': '#999',
                                    'border': '1px solid',
                                    'border-radius': '3px',
                                    'margin': '2px'
                                });
                                element.html(base.buttonText);
                                return cellsrenderer(row, datafield, value, element[0].outerHTML);
                            }
                            //return cellsrenderer(row, datafield, value, element[0].outerHTML);
                        };
                        cellsrenderer['editable'] = column.editable == null ? gridSetting.editable : column.editable;
                        cellsrenderer['cellsrenderer'] = column.cellsrenderer == null ? gridSetting.cellsrenderer : column.cellsrenderer;
                        cellsrenderer['text'] = column.text;
                        cellsrenderer['buttonText'] = column.buttonText == null ? column.text : column.buttonText;

                        columnSetting = {
                            text: column.text,
                            columntype: cellsrenderer['editable'] ? 'button' : 'textbox',
                            datafield: columns[i].dataField,
                            width: column.width,
                            cellsalign: column.cellsalign,
                            align: column.align,
                            hidden: column.hidden,
                            cellbeginedit: cellBeginEdit,
                            cellsrenderer: cellsrenderer,
                            buttonclick: column.buttonclick,
                            cellendedit: column.cellendedit,
                            cellvaluechanging: column.cellvaluechanging,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned
                        };
                        break;

                    case 'dropdownlist':
                        var initeditor = function (row, value, editor, celltext, cellwidth, cellheight) {
                            // console.log('initeditor');
                            var base = this.initeditor;
                            if (base.setItemData) {
                                base.setItemData(row, value, function (data) {
                                    var datafields = [];
                                    if (data.length == 0) {
                                        datafields = [
                                            {name: base.displayMember, type: 'string'},
                                            {name: base.valueMember, type: 'string'}
                                        ];
                                    } else {
                                        for (var columnName in data[0]) {
                                            datafields.push({
                                                name: columnName,
                                                type: 'string'
                                            });
                                        }
                                    }
                                    var columnDataAdapter = new $.jqx.dataAdapter({
                                        datatype: "json",
                                        datafields: datafields,
                                        localdata: data
                                    });
                                    gridDropDownList.renderDropDownloadList({
                                        editor: editor, //转送编辑器
                                        value: value, //转送资料
                                        data: columnDataAdapter, //资料
                                        displayMember: base.displayMember, //显示栏位
                                        valueMember: base.valueMember, //值栏位
                                        placeHolder: base.placeHolder //下拉提示字眼
                                    });
                                });
                            } else {
                                var dataAdapter = new $.jqx.dataAdapter({
                                    datatype: "observablearray",
                                    localdata: base.itemData,
                                    datafields: [{
                                        name: base.valueMember,
                                        type: 'string'
                                    }, {
                                        name: base.displayMember,
                                        type: 'string'
                                    }],
                                    id: base.valueMember
                                }, {
                                    autoBind: true
                                });

                                gridDropDownList.renderDropDownloadList({
                                    editor: editor, //转送编辑器
                                    value: value, //转送资料
                                    data: dataAdapter, //资料
                                    displayMember: base.displayMember, //显示栏位
                                    valueMember: base.valueMember, //值栏位
                                    placeHolder: base.placeHolder //下拉提示字眼
                                });
                            }
                        };
                        initeditor['displayMember'] = column.displayMember;
                        initeditor['valueMember'] = column.valueMember;
                        initeditor['placeHolder'] = column.placeHolder;
                        // initeditor['dataAdapter'] = dataAdapter;
                        initeditor['setItemData'] = column.setItemData;
                        initeditor['itemData'] = column.itemData;

                        var cellsrenderer = function (row, datafield, value, defaultHtml) {

                            var element = $(defaultHtml);
                            var base = this.cellsrenderer;
                            var cellsrenderer = base.cellsrenderer;
                            $('#' + base.gridId).jqxGrid('hidevalidationpopups');

                            if (base.setItemData) {
                                base.setItemData(row, value, function (data) {
                                    gridDropDownList.showDropDownloadListText({
                                        data: data, //资料
                                        value: value, //转送资料
                                        displayMember: base.displayMember, //显示栏位
                                        valueMember: base.valueMember, //值栏位
                                        element: element,
                                        dataType: 'json'
                                    });
                                });
                            } else {
                                var dataAdapter = new $.jqx.dataAdapter({
                                    datatype: "observablearray",
                                    localdata: base.itemData,
                                    datafields: [{
                                        name: base.valueMember,
                                        type: 'string'
                                    }, {
                                        name: base.displayMember,
                                        type: 'string'
                                    }],
                                    id: base.valueMember
                                }, {
                                    autoBind: true
                                });
                                gridDropDownList.showDropDownloadListText({
                                    data: dataAdapter, //资料
                                    value: value, //转送资料
                                    displayMember: base.displayMember, //显示栏位
                                    valueMember: base.valueMember, //值栏位
                                    element: element
                                });
                            }
                            if (base.editable) {
                                return cellsrenderer(row, datafield, value, element[0].outerHTML);
                            }
                            else {
                                element.css('color', '#999');
                                return cellsrenderer(row, datafield, value, element[0].outerHTML);
                            }
                        };
                        cellsrenderer['gridId'] = gridSetting.id;
                        cellsrenderer['displayMember'] = column.displayMember;
                        cellsrenderer['valueMember'] = column.valueMember;
                        // cellsrenderer['dataAdapter'] = dataAdapter;
                        cellsrenderer['dataField'] = column.dataField;
                        cellsrenderer['editable'] = column.editable == null ? gridSetting.editable : column.editable;
                        cellsrenderer['cellsrenderer'] = column.cellsrenderer == null ? gridSetting.cellsrenderer : column.cellsrenderer;
                        cellsrenderer['setItemData'] = column.setItemData;
                        cellsrenderer['itemData'] = column.itemData;

                        var geteditorvalue = function (row, cellvalue, editor) {
                            var base = this.geteditorvalue;
                            return gridDropDownList.getDropDownloadListEditorValue({
                                editor: editor, //转送编辑器
                                row: row, //转送列号
                                displayMember: base.displayMember, //显示栏位
                                valueMember: base.valueMember, //值栏位
                                targetField: base.dataField, //目标栏位
                                callback: base.callback //Callback Function

                            });
                        };
                        geteditorvalue['displayMember'] = column.displayMember;
                        geteditorvalue['valueMember'] = column.valueMember;
                        geteditorvalue['dataField'] = column.dataField;
                        geteditorvalue['callback'] = column.callback;

                        columnSetting = {
                            text: column.text,
                            columntype: 'dropdownlist',
                            datafield: columns[i].dataField,
                            width: column.width,
                            cellsalign: column.cellsalign,
                            align: column.align,
                            hidden: column.hidden,
                            aggregates: column.aggregates,
                            initeditor: initeditor,
                            geteditorvalue: geteditorvalue,
                            cellbeginedit: cellBeginEdit,
                            cellsrenderer: cellsrenderer,
                            cellendedit: column.cellendedit,
                            cellvaluechanging: column.cellvaluechanging,
                            aggregatesrenderer: column.aggregatesrenderer,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned
                        };
                        break;

                    case 'date':
                        var initeditor = function (row, value, editor, celltext, cellwidth, cellheight) {
                            var base = this.initeditor;
                            gridDate.renderDateControl(
                                row, cellvalue, editor, celltext, cellwidth, cellheight, base.gridId, base.dataField, base.calendar
                            );
                            //$('#' + editor.attr('id')).val(cellvalue.replace(/\//ig, ''));
                        };
                        initeditor['calendar'] = column.calendar == null ? true : column.calendar;
                        initeditor['dataField'] = column.dataField;
                        initeditor['gridId'] = gridSetting.id;
                        var geteditorvalue = function (row, cellvalue, editor) {
                            var dateStr = $('#' + editor.attr('id')).val();
                            if (dateStr.length == 6) {
                                dateStr = (parseInt(dateStr.substr(0, 2)) + 1911) + dateStr.substr(2, 4);
                            }
                            if (dateStr.length == 7) {
                                dateStr = (parseInt(dateStr.substr(0, 3)) + 1911) + dateStr.substr(3, 4);
                            }
                            var returnValue = moment(dateStr, 'YYYYMMDD').format('YYYY/MM/DD');
                            if (returnValue == 'Invalid date' || $.trim($('#' + editor.attr('id')).val()) == '' || dateStr.length < 6) {
                                return '';
                            }
                            else {
                                return returnValue;
                            }
                        };
                        var cellendedit = function (row, datafield, columntype, oldvalue, newvalue) {
                            var base = this.cellendedit;
                            $("#jqxCalendarGridUIDate").css({
                                display: 'none'
                            });

                            if (base.cellendedit) {
                                //console.log('cellendedit');
                                base.cellendedit(row, datafield, columntype, oldvalue, newvalue);
                                return true;
                                // return base.cellendedit(row, datafield, columntype, oldvalue, newvalue);
                            }
                            else {
                                return true;
                            }
                        };
                        cellendedit['cellendedit'] = column.cellendedit;

                        columnSetting = {
                            text: column.text,
                            columntype: 'textbox',
                            dataField: column.dataField,
                            width: column.width,
                            hidden: column.hidden,
                            cellsalign: column.cellsalign,
                            align: column.align,
                            aggregates: column.aggregates,
                            initeditor: initeditor,
                            geteditorvalue: geteditorvalue,
                            cellbeginedit: cellBeginEdit,
                            cellendedit: cellendedit,
                            cellsrenderer: cellsRenderer,
                            cellvaluechanging: column.cellvaluechanging,
                            aggregatesrenderer: column.aggregatesrenderer,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned
                        };
                        break;

                    case 'month':
                        var initeditor = function (row, value, editor, celltext, cellwidth, cellheight) {
                            var base = this.initeditor;
                            gridDate.renderMonthControl(
                                row, cellvalue, editor, celltext, cellwidth, cellheight, base.gridId, base.dataField
                            );
                        };
                        initeditor['dataField'] = column.dataField;
                        initeditor['gridId'] = gridSetting.id;
                        var geteditorvalue = function (row, cellvalue, editor) {
                            var dateStr = $('#' + editor.attr('id')).val() + '01';
                            if (dateStr.length == 6) {
                                dateStr = (parseInt(dateStr.substr(0, 2)) + 1911) + dateStr.substr(2, 4);
                            }
                            if (dateStr.length == 7) {
                                dateStr = (parseInt(dateStr.substr(0, 3)) + 1911) + dateStr.substr(3, 4);
                            }

                            var returnValue = moment(dateStr, 'YYYYMMDD').format('YYYY/MM/DD');
                            if (returnValue == 'Invalid date' || $.trim($('#' + editor.attr('id')).val()) == '') {
                                return '';
                            }
                            else {
                                return returnValue.substr(0, 7);
                            }
                        };
                        columnSetting = {
                            text: column.text,
                            columntype: 'textbox',
                            dataField: column.dataField,
                            width: column.width,
                            hidden: column.hidden,
                            cellsalign: column.cellsalign,
                            align: column.align,
                            aggregates: column.aggregates,
                            initeditor: initeditor,
                            geteditorvalue: geteditorvalue,
                            cellbeginedit: cellBeginEdit,
                            cellsrenderer: cellsRenderer,
                            cellendedit: column.cellendedit,
                            cellvaluechanging: column.cellvaluechanging,
                            aggregatesrenderer: column.aggregatesrenderer,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned
                        };
                        break;

                    case 'numeric':
                        var initeditor = function (row, value, editor, celltext, cellwidth, cellheight) {
                            var base = this.initeditor;
                            gridNumeric.renderNumericControl(
                                editor.attr('id'), base.maxlength, base.digits, value, base.gridId, base.dataField
                            );
                        };
                        initeditor['dataField'] = column.dataField;
                        initeditor['gridId'] = gridSetting.id;
                        initeditor['digits'] = column.digits;
                        initeditor['maxlength'] = column.maxlength;

                        var geteditorvalue = function (row, cellvalue, editor) {
                            var base = this.geteditorvalue;
                            var returnValue = $('#' + editor.attr('id')).val();
                            // console.log(returnValue);
                            // console.log(check.getNumVal(returnValue, base.digit));
                            // return returnValue.replace(/\,/g, '');
                            if (base.digits == null || base.digits == 0) {
                                returnValue = returnValue.replace(/\,/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                            } else {
                                returnValue = check.getNumVal(returnValue, base.digits);
                            }
                            console.log(returnValue);
                            return returnValue;
                        };
                        geteditorvalue['digits'] = column.digits;


                        var cellendedit = function (row, datafield, columntype, oldvalue, newvalue) {
                            // console.log(newvalue);
                            var base = this.cellendedit,
                                val = newvalue.toString();
                            // if (base.digit == '0' || base.digit == null) {
                            //     val = val.replace(/\,/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                            //     // console.log(val);
                            // } else {
                            //     val = check.getNumVal(val.replace(/\,/g, ''), base.digit);
                            // }
                            setTimeout(function () {
                                // console.log(val);
                                $("#" + base.gridId).jqxGrid('setcellvalue', row, datafield, val.replace(/\,/g, ''));
                            }, 50);
                            if (base.cellendedit) {
                                base.cellendedit(row, datafield, columntype, oldvalue, val);
                            }
                            return true;
                        };
                        cellendedit['gridId'] = gridSetting.id;
                        cellendedit['digits'] = column.digits;
                        cellendedit['cellendedit'] = column.cellendedit;

                        columnSetting = {
                            text: column.text,
                            columntype: 'textbox',
                            datafield: column.dataField,
                            width: column.width,
                            cellsalign: column.cellsalign,
                            align: column.align,
                            hidden: column.hidden,
                            aggregates: column.aggregates,
                            cellsformat: (column.digits == null || column.digits == 0 ? 'n' : 'd' + column.digits),
                            initeditor: initeditor,
                            geteditorvalue: geteditorvalue,
                            cellbeginedit: cellBeginEdit,
                            cellsrenderer: cellsRenderer,
                            // cellendedit: column.cellendedit,
                            cellendedit: cellendedit,
                            cellvaluechanging: column.cellvaluechanging,
                            aggregatesrenderer: column.aggregatesrenderer,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned
                        };
                        break;

                    case 'checkbox':
                        var renderer = function () {
                            var base = this.renderer;
                            return '<div style="margin-left: 10px; margin-top: 5px;">' + base.text + '</div>';
                        };
                        renderer['text'] = column.text;
                        var rendered = function (element) {
                            var base = this.rendered;
                            $(element).jqxCheckBox({
                                theme: base.theme,
                                width: base.width,
                                height: 16,
                                animationShowDelay: 0,
                                animationHideDelay: 0
                            });

                            $(element).bind('change', function (event) {
                                var checked = event.args.checked,
                                    $grid = $("#" + base.gridId);
                                if (checked == null) return;
                                var rowscount = $grid.jqxGrid('getdatainformation').rowscount;
                                $grid.jqxGrid('beginupdate');
                                for (var i = 0; i < rowscount; i++) {
                                    if (base.cellBeginEdit) {
                                        var returnValue = base.cellBeginEdit(i, base.dataField, 'checkbox', $grid.jqxGrid('getcellvalue', i, base.dataField));
                                    }
                                    //console.log(returnValue == true ? base.editable : returnValue);
                                    if ((returnValue == true ? base.editable : returnValue) == true) {
                                        $grid.jqxGrid('setcellvalue', i, base.dataField, event.args.checked);
                                    }
                                }
                                $grid.jqxGrid('endupdate');
                                if (base.allCheckCallback) {
                                    base.allCheckCallback(checked);
                                }
                            });
                        };
                        rendered['dataField'] = column.dataField;
                        rendered['width'] = column.width;
                        rendered['gridId'] = gridSetting.id;
                        rendered['theme'] = gridSetting.theme;
                        rendered['editable'] = column.editable == null ? gridSetting.editable : column.editable;
                        rendered['cellBeginEdit'] = cellbeginedit;
                        rendered['allCheckCallback'] = column.allCheckCallback;


                        columnSetting = {
                            text: column.text,
                            columntype: 'checkbox',
                            datafield: column.dataField,
                            width: column.width,
                            hidden: column.hidden,
                            cellsalign: column.cellsalign,
                            align: column.align,
                            aggregates: column.aggregates,
                            renderer: column.editable == false || gridSetting.editable == false || (column.allCheck == null ? true : column.allCheck) == false ? null : renderer,
                            rendered: column.editable == false || gridSetting.editable == false || (column.allCheck == null ? true : column.allCheck) == false ? null : rendered,
                            cellbeginedit: cellBeginEdit,
                            cellendedit: column.cellendedit,
                            cellvaluechanging: column.cellvaluechanging,
                            aggregatesrenderer: column.aggregatesrenderer,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned
                        };
                        break;

                    case 'time':
                        var createeditor = function (row, column, editor) {
                            var base = this.createeditor;
                            editor.jqxDateTimeInput({
                                formatString: base.cellsformat,
                                showTimeButton: false,
                                showCalendarButton: false
                            });
                        };
                        createeditor['cellsformat'] = column.cellsformat;


                        columnSetting = {
                            text: column.text,
                            columntype: 'datetimeinput',
                            datafield: column.dataField,
                            width: column.width,
                            hidden: column.hidden,
                            cellsalign: column.cellsalign,
                            align: column.align,
                            aggregates: column.aggregates,
                            cellbeginedit: cellBeginEdit,
                            cellsrenderer: cellsRenderer,
                            cellendedit: column.cellendedit,
                            cellvaluechanging: column.cellvaluechanging,
                            aggregatesrenderer: column.aggregatesrenderer,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned,
                            createeditor: createeditor
                        };
                        break;

                    default:
                        columnSetting = {
                            text: column.text,
                            columntype: column.type,
                            datafield: column.dataField,
                            width: column.width,
                            hidden: column.hidden,
                            cellsalign: column.cellsalign,
                            align: column.align,
                            aggregates: column.aggregates,
                            cellbeginedit: cellBeginEdit,
                            cellsrenderer: cellsRenderer,
                            cellendedit: column.cellendedit,
                            cellvaluechanging: column.cellvaluechanging,
                            aggregatesrenderer: column.aggregatesrenderer,
                            classname: column.classname,
                            cellclassname: column.cellclassname,
                            sortable: column.sortable == null ? gridSetting.sortable : column.sortable,
                            pinned: column.pinned
                        };
                        break;
                }
                // console.log('columnSetting');
                // console.log(columnSetting);
                for (var key in column) {
                    if (key != 'type') {
                        if (columnSetting[key.toString().toLowerCase()] == null) {
                            columnSetting[key.toString().toLowerCase()] = column[key];
                        }
                    }
                }
                columnOutput.push(columnSetting);
            }
            return columnOutput;
        },
        sysGridRowNo = function (row, column, value) {
            return '<div style="text-align: center; margin-top: 5px;">' + (1 + row) + '</div>';
        },
        //Grid功能==>將資料庫日期顯示為yyyy/MM/dd
        sysGridConvDate = function (row, column, value) {
            return '<div style="text-align: center; margin-top: 5px;">' + value.substring(0, 10).replace("-", "/").replace("-", "/").replace("1900/01/01", "") + '</div>';
        },
        getGridSelectedData = function ($jgrdResult) {
            var getselectedrowindexes = $jgrdResult.jqxGrid('getselectedrowindexes');
            //console.log(getselectedrowindexes);
            var selectedData = [];
            if (getselectedrowindexes.length > 0) {
                $.map(getselectedrowindexes, function (item, index) {
                    selectedData.push($jgrdResult.jqxGrid('getrowdata', item));
                });
            }
            return selectedData;
        },
        setGridActionWithJSON = function (i) {
            // console.log(i);
            var t = {
                //addEnable: i.addEnable || true,
                //delEnable: i.delEnable || true,
                addEnable: i.addEnable,
                delEnable: i.delEnable,
                addCallback: i.addCallback,
                delCallback: i.delCallback,
                targetId: i.targetId,
                defaultData: i.defaultData,
                enterAddColumn: i.enterAddColumn,
                focusColumn: i.focusColumn,
                procdColumn: i.procdColumn,
                enable: i.enable || true,
                columns: i.columns
            };
            var $grid = $('#' + t.targetId);

            if (t.targetId == null || t.targetId == '') console.log('GridLib.setGridAction:缺少『targetId』的定義');
            if (t.addEnable) {
                if (t.defaultData == null) console.log('GridLib.setGridAction:缺少『defaultData』的定義');
                if (t.enterAddColumn == null) console.log('GridLib.setGridAction:缺少『enterAddColumn』的定義');
                if (t.focusColumn == null) console.log('GridLib.setGridAction:缺少『focusColumn』的定義');
                //if (t.gridVm == null) console.log('GridLib.setGridAction:缺少『gridVm』的定義');
            }
            if (t.addEnable) {
                if (t.procdColumn == null) console.log('GridLib.setGridAction:缺少『procdColumn』的定義');
            }

            var NowColumn = '',
                rowindex;
            $grid.on('cellbeginedit', function (event) {
                NowColumn = event.args.datafield;
                rowindex = event.args.rowindex;
            }).on('cellselect', function (event) {
                NowColumn = event.args.datafield;
                rowindex = event.args.rowindex;
            }).on('cellendedit', function (event) {
                //NowColumn = '';
            }).on('keydown', function (event) {
                if (rowindex == null) rowindex = $(this).jqxGrid('getselectedrowindex');

                //Enter to Tab 功能處理
                var focusColumns = $.grep(i.columns, function (item, index) {
                    return (item.dataField != null);
                });

                if (event.which == "13" && ((t.enterAddColumn != '' && rowindex != $grid.jqxGrid('getrows').length) || t.enterAddColumn == '' || t.enterAddColumn == null)) {
                    var row = rowindex;
                    var focusColumn = NowColumn;
                    for (var x = 0; x < focusColumns.length; x++) {
                        if (focusColumns[x].dataField == NowColumn) {
                            if (focusColumns[x + 1] && NowColumn != t.enterAddColumn) {
                                var nextColumn = '';
                                for (var y = x + 1; y < focusColumns.length; y++) {
                                    if (focusColumns[y]) {
                                        if (focusColumns[y].editable) {
                                            nextColumn = focusColumns[y].dataField;
                                            break;
                                        }
                                    }
                                }
                                if ($.trim(nextColumn) != '') {
                                    focusColumn = nextColumn;
                                }
                                else {
                                    if (row + 1 < $grid.jqxGrid('getrows').length) {
                                        row++;
                                        focusColumn = focusColumns[0].dataField;
                                    }
                                }
                            }
                            else {
                                if (row + 1 < $grid.jqxGrid('getrows').length) {
                                    row++;
                                    //focusColumn = focusColumns[0].dataField;
                                    focusColumn = t.focusColumn
                                }
                            }
                        }
                    }
                    setTimeout(function () {
                        if (focusColumn == '0') {
                            focusColumn = focusColumns[0].dataField;
                        }
                        $grid.jqxGrid('endcelledit', rowindex, NowColumn, false);
                        $grid.jqxGrid('unselectcell', rowindex, NowColumn);
                        $grid.jqxGrid('begincelledit', row, focusColumn);
                        $grid.jqxGrid('selectcell', row, focusColumn);
                        $grid.jqxGrid('selectrow', row);
                    }, 50);
                }
                if (
                    (event.which == "119" || //F8增加一列
                    (event.which == "40") || //最後一列，向下增加一列
                    (event.which == "13" && NowColumn == t.enterAddColumn && rowindex == $grid.jqxGrid('getrows').length - 1)) //最後一個欄位按下Enter增加一列
                ) {
                    //最後一列，向下增加一列
                    if (event.which == "40" && rowindex != $grid.jqxGrid('getrows').length - 1) {
                        focusColumn = NowColumn;
                        $grid.jqxGrid('endcelledit', rowindex, NowColumn, false);
                        $grid.jqxGrid('begincelledit', rowindex + 1, focusColumn);
                        return;
                    }
                    if (t.enable != null) {
                        if (t.enable == false) {
                            return;
                        }
                    }
                    if (t.addEnable) {
                        $grid.jqxGrid('endcelledit', rowindex, NowColumn, false);
                        var defaultData = $.extend({}, t.defaultData);

                        $grid.jqxGrid('addrow', null, defaultData);

                        var addSelectRow = $grid.jqxGrid('getrows').length - 1;
                        if (t.addCallback) {
                            t.addCallback(defaultData, addSelectRow);
                        }

                        if (t.focusColumn != null) {
                            //自動Focus在新增的資料
                            setTimeout(function () {
                                $grid.jqxGrid('unselectcell', rowindex, NowColumn);
                                $grid.jqxGrid('begincelledit', addSelectRow, t.focusColumn);
                                $grid.jqxGrid('selectcell', addSelectRow, t.focusColumn);
                                $grid.jqxGrid('selectrow', addSelectRow);
                            }, 5);
                        }
                    }
                }
                else if (
                    event.which == "120" || //F9刪除一列
                    event.which == "38" //向上刪除一列
                //(event.which == "38" && rowindex == $grid.jqxGrid('getrows').length-1)                      //最後一列向上刪除一列
                ) {
                    //最後一列向上刪除一列
                    if (event.which == "38" && rowindex != $grid.jqxGrid('getrows').length - 1) {
                        focusColumn = NowColumn;
                        $grid.jqxGrid('endcelledit', rowindex, NowColumn, false);
                        $grid.jqxGrid('begincelledit', rowindex == 0 ? rowindex : rowindex - 1, focusColumn);
                        //$grid.jqxGrid('selectcell', rowindex == 0 ? rowindex : rowindex - 1, focusColumn);
                        return;
                    }
                    if (t.enable != null) {
                        if (t.enable == false) {
                            return;
                        }
                    }
                    if (t.delEnable) {

                        var totalRow = $grid.jqxGrid('getboundrows').length;
                        if (rowindex == -1) {
                            //rowindex = t.gridVm().length - 1;
                            rowindex = totalRow - 1;
                        }
                        //if (t.gridVm()[rowindex][t.procdColumn]() == 'A') {
                        if (t.procdColumn == null || t.procdColumn == '' || $grid.jqxGrid('getcellvalue', rowindex, t.procdColumn) == 'A' || $grid.jqxGrid('getcellvalue', rowindex, t.procdColumn) == '' || $grid.jqxGrid('getcellvalue', rowindex, t.procdColumn) == '0') {
                            var deleteData = $grid.jqxGrid('getrowdata', rowindex);
                            var commit = $grid.jqxGrid('deleterow', $grid.jqxGrid('getrowid', rowindex));
                            if (t.delCallback) {
                                t.delCallback(deleteData, rowindex);
                            }
                            setTimeout(function () {
                                //$grid.jqxGrid('unselectcell', rowindex, NowColumn);
                                if (rowindex > 0) {
                                    //if (rowindex = totalRow - 1) {
                                    //$grid.jqxGrid('selectrow', $grid.jqxGrid('getboundrows').length - 1);
                                    //$grid.jqxGrid('begincelledit', $grid.jqxGrid('getrows').length - 1, focusColumns[0].dataField);
                                    // console.log($grid.jqxGrid('getboundrows').length);
                                    $grid.jqxGrid('begincelledit', $grid.jqxGrid('getboundrows').length - 1, NowColumn);
                                    $grid.jqxGrid('selectcell', $grid.jqxGrid('getboundrows').length - 1, NowColumn);
                                    //} else {
                                    //$grid.jqxGrid('selectrow', rowindex);
                                    //$grid.jqxGrid('begincelledit', rowindex, focusColumns[0].dataField);
                                    //$grid.jqxGrid('selectcell', rowindex, focusColumns[0].dataField);
                                    //}
                                }
                            }, 10);
                        }
                        else {
                            //console.log(rowindex);
                            focusColumn = NowColumn;
                            var nowIndex = rowindex;
                            $grid.jqxGrid('endcelledit', rowindex, NowColumn, false);
                            //$grid.jqxGrid('uselectcell', rowindex, focusColumn);
                            $grid.jqxGrid('begincelledit', nowIndex == 0 ? nowIndex : nowIndex - 1, focusColumn);
                            //console.log(nowIndex == 0 ? nowIndex : nowIndex - 1);
                            //setTimeout(function () {
                            //$grid.jqxGrid('selectcell', nowIndex == 0 ? nowIndex : nowIndex - 1, focusColumn);
                            //}, 500);
                        }
                    }
                }
            });
        };

    var Grid = {
        sysGridRowNo: sysGridRowNo,
        sysGridConvDate: sysGridConvDate,
        getGridSelectedData: getGridSelectedData,
        getDataFieldsFromColumns: getDataFieldsFromColumns,
        initGridWithArray: initGridWithArray,
        getColumns: getColumns,
        setGridActionWithJSON: setGridActionWithJSON
    };

    SS.namespace("SS.Grid");
    SS.Grid = Grid;

    return Grid;
});