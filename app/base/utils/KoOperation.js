/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var grid = require('Grid');
    var controlAttributes = require('ControlAttributes');
    var koGenerateViewModel = require('KoGenerateViewModel');
    var koExcludeAttributeList = koGenerateViewModel.koExcludeAttributeList;   //不轉換成ko物件的屬性
    var koRejectAttributeList = koGenerateViewModel.koRejectAttributeList;   //不註冊到viewModel的屬性

    return {
        setSectionExpand: function (i) {
            if (!i.section) {
                SS.log('[KoOperation-setSectionExpand]', 'no section found!!')
                return;
            }
            if (!i.pageId) {
                SS.log('[KoOperation-setSectionExpand]', 'no pageId found!!')
                return;
            }
            for (var x = 0; x < i.section.length; x++) {
                if ((i.section[x].expend == true
                        && !$('#' + i.section[x].id + '-' + i.pageId).hasClass('in')) ||
                    (i.section[x].expend == false
                        && $('#' + i.section[x].id + '-' + i.pageId).hasClass('in'))) {
                    $('[sectionId=' + i.section[x].id + '] .panel-heading>button', '.' + i.pageId).click();
                }
            }
        },
        numericAddComma: function (value) {
            try {
                return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            } catch (e) {
                return '0';
            }
        },
        convertDateString: function (value) {
            var returnValue = moment(value, 'YYYYMMDD').format('YYYY/MM/DD');
            if (returnValue == 'Invalid date') {
                return '';
            } else {
                return returnValue;
            }
        },
        convertMonthString: function (value) {
            var returnValue = moment(value + '01', 'YYYYMMDD').format('YYYY/MM/DD');
            if (returnValue == 'Invalid date') {
                return '';
            } else {
                return returnValue.substr(0, 7);
            }
        },
        addBootStrapTab: function (i) {
            //console.log(i);
            // create the tab
            $('<li>' +
                '<a href="#' + i.tabId + '" class="documentIndex" data-toggle="tab" style="padding:5px 8px;">' +
                i.tabName + '</a>' +
                '</li>').appendTo('#' + i.tabsId);

            // create the tab content
            $('<div class="tab-pane" id="' + i.tabId + '" style="padding: 5px;">' +
                i.tabContent +
                '</div>').appendTo($('#' + i.tabsId).next());

            // make the new tab active
            $('#' + i.tabsId + ' a:last').tab('show').on('shown.bs.tab', function (e) {
                if (i.callback) {
                    i.callback(e);
                }
                //nowTab = e.target; // newly activated tab
                //prevTab = e.relatedTarget; // previous active tab
                //nowTab = $('.' + nowTab.hash.replace('#', ''));
                //if (prevTab != null) {
                //    prevTab = $('.' + prevTab.hash.replace('#', ''));
                //}
            });
        },
        closeActiveBootStrapTab: function (tabsId, tabId) {
            if ((tabId == null ? '' : tabId) == '') {
                //if ($('#' + tabsId + ' a').length > 1) {
                $('#' + tabsId + ' a').each(function () {
                    if ($($(this).attr('href')).hasClass('active')) {
                        var base = this;
                        setTimeout(function () {
                            $($(base).attr('href')).remove();
                            $(base).remove();
                            $('#' + tabsId + ' a:last').tab('show');
                        }, 100);
                    }
                });
                //}
            } else {
                $($('#' + tabId, '#' + tabsId).attr('href')).remove();
                $('#' + tabId, '#' + tabsId).remove();
            }
        },

        setControlButtonEnable: function (controlButton, enableSetting) {
            for (var i = 0; i < controlButton.buttons().length; i++) {
                controlButton.buttons()[i].isEnable(enableSetting[controlButton.buttons()[i].id()]);
            }
        },
        getControlButtonEnable: function (controlButton) {
            var returnButtons = {};
            for (var i = 0; i < controlButton.buttons().length; i++) {
                returnButtons[controlButton.buttons()[i].id()] = controlButton.buttons()[i].isEnable();
            }
            return returnButtons;
        },
        setControlButtonVisible: function (controlButton, visibleSetting) {
            var outputArray = [];
            for (var i = 0; i < controlButton.buttons().length; i++) {
                if (visibleSetting[controlButton.buttons()[i].id()]) {
                    outputArray.push(controlButton.buttons()[i]);
                }
            }
            controlButton.buttons(outputArray);
        },

        setAllDisabled: function (i) {
            if (!i.viewModel) {
                SS.log('[KoOperation-setAllDisabled]', 'no viewModel object found!!')
                return;
            }
            for (var key in i.viewModel) {
                //console.log(i.viewModel);
                if (key != 'errors') {
                    if (i.viewModel[key].isEnable != null) {
                        i.viewModel[key].isEnable(i.enable);
                    }
                    if (i.viewModel[key].type == 'templateList') {
                        for (var x = 0; x < i.viewModel[key].list().length; x++) {
                            var rowItem = i.viewModel[key].list()[x];
                            for (var k in rowItem) {
                                if (rowItem[k].isEnable != null) {
                                    rowItem[k].isEnable(i.enable);
                                }
                            }
                        }
                    }
                }
            }

        },
        setAllClear: function (viewModel) {
            if (!viewModel) {
                SS.log('[KoOperation-addControlAttribute]', 'no viewModel object found!!')
                return;
            }
            for (var key in viewModel) {
                if ((key.substr(0, 1) == 'k' || key.substr(0, 2) == 'ka') && viewModel[key].type != 'templateList') {
                    if ($.isArray(viewModel[key]())) {
                        //console.log(key);
                        viewModel[key]([]);
                    } else {
                        viewModel[key]('');
                    }
                }
                if (viewModel[key].type == 'templateList') {
                    viewModel[key].list([]);
                }
            }
        },
        setSectionData: function (section, data) {
            //先設定 templateList， knockout validation 才會生效
            for (var key in data) {
                if (section[key].type == 'templateList') {
                    this.setTemplateListData(section[key], data[key]);
                }
            }
            for (var key in data) {
                if (!(section[key].type == 'templateList')) {
                    section[key](data[key]);
                }
            }
        },
        getSectionData: function (section) {
            var returnValue = {};
            for (var key in section) {
                if (section[key].value != null) {
                    returnValue[key] = section[key]();
                }
                if (section[key].type == 'templateList') {
                    returnValue[key] = this.getTemplateListData(section[key]);
                }
                if (section[key].type == 'jqxGrid') {
                    returnValue[key] = this.getGridData(section[key]);
                }
            }
            return returnValue;
        },
        setTitleInfo: function (titleInfo, initVar) {
            for (var key in initVar) {
                titleInfo[key](initVar[key]);
            }
            //titleInfo.programName(initVar.programName);
            //titleInfo.userId(initVar.userId);
            //titleInfo.userName(initVar.userName);
            //titleInfo.userCompany(initVar.userCompany);
            //titleInfo.userDepartment(initVar.userDepartment);
            //titleInfo.loginTime(initVar.loginTime);
        },


        setTemplateListData: function (templateListVm, data, addFlg) {
            var templateList = [];
            //console.log(templateList);
            //console.log(data);
            for (var n = 0; n < data.length; n++) {
                var row = data[n],
                    rowItems = {};
                for (var dataItem in row) {
                    var ctrl = koGenerateViewModel.objectToViewModel(row[dataItem]),
                        ctrlItem = templateListVm.template[dataItem];
                    if (ctrlItem != null) {
                        var templateItem = controlAttributes[ctrlItem.type];
                        for (var attr in templateItem) {
                            if (attr == 'event') {
                                ctrl[attr] = {};
                                for (var event in templateItem[attr]) {
                                    ctrl[attr][event] = ctrlItem[attr] != null ? (ctrlItem[attr][event] != null ? ctrlItem[attr][event] : templateItem[attr][event]) : templateItem[attr][event];
                                }
                            } else {
                                if (!koRejectAttributeList[attr]) {
                                    if (koExcludeAttributeList[attr] != null || (ctrlItem.type == 'jqxGrid')) {
                                        ctrl[attr] = ctrlItem[attr] != null ? ctrlItem[attr] : (templateListVm.defaultSet != null && templateListVm.defaultSet[attr] != null ? templateListVm.defaultSet[attr] : controlAttributes[ctrlItem.type][attr]);
                                    } else {
                                        ctrl[attr] = koGenerateViewModel.objectToViewModel(ctrlItem[attr] != null ? ctrlItem[attr] : (templateListVm.defaultSet != null && templateListVm.defaultSet[attr] != null ? templateListVm.defaultSet[attr] : controlAttributes[ctrlItem.type][attr]));
                                    }
                                }
                            }
                        }

                        //註冊ko validation事件
                        if (ctrlItem.validator != null && ctrlItem.value != null) {
                            ctrl.extend(ctrlItem.validator);
                        }
                    }
                    ctrl.row = n;
                    rowItems[dataItem] = ctrl;
                }
                for (var dataItem in templateListVm.template) {
                    if (templateListVm.template[dataItem].value == null) {
                        var ctrl = {},
                            ctrlItem = templateListVm.template[dataItem];

                        var templateItem = controlAttributes[ctrlItem.type];
                        for (var attr in templateItem) {
                            if (attr == 'event') {
                                ctrl[attr] = {};
                                for (var event in templateItem[attr]) {
                                    ctrl[attr][event] = ctrlItem[attr] != null ? (ctrlItem[attr][event] != null ? ctrlItem[attr][event] : templateItem[attr][event]) : templateItem[attr][event];
                                }
                            } else {
                                if (!koRejectAttributeList[attr]) {
                                    if (koExcludeAttributeList[attr] != null || (ctrlItem.type == 'jqxGrid')) {
                                        ctrl[attr] = ctrlItem[attr] != null ? ctrlItem[attr] : (templateListVm.defaultSet != null && templateListVm.defaultSet[attr] != null ? templateListVm.defaultSet[attr] : controlAttributes[ctrlItem.type][attr]);
                                    } else {
                                        ctrl[attr] = koGenerateViewModel.objectToViewModel(ctrlItem[attr] != null ? ctrlItem[attr] : (templateListVm.defaultSet != null && templateListVm.defaultSet[attr] != null ? templateListVm.defaultSet[attr] : controlAttributes[ctrlItem.type][attr]));
                                    }
                                }
                            }
                        }
                        ctrl.row = n;
                        rowItems[dataItem] = ctrl;
                    }
                }
                templateList.push(rowItems);
            }
            if (addFlg == true) {
                for (var i = 0; i < templateList.length; i++) {
                    var row = templateList[i];
                    templateListVm['list'].push(row);
                }
            } else {
                templateListVm['list'](templateList);
            }

        },
        getTemplateListData: function (templateList) {
            var templateListValue = [];
            for (var i = 0; i < templateList.list().length; i++) {
                var itemObject = templateList.list()[i];
                rowObject = {};
                for (var key in itemObject) {
                    if (typeof(itemObject[key]) == 'function') {
                        rowObject[key] = itemObject[key]();
                    }
                }
                templateListValue.push(rowObject);
            }
            return templateListValue;
        },
        setTemplateListOptions: function (inVar) {
            for (var i = 0; i < inVar.templateList.list().length; i++) {
                var rowObject = inVar.templateList.list()[i];
                rowObject[inVar.controlName][inVar.optionName](inVar.optionData);
            }
            inVar.templateList.template[inVar.controlName][inVar.optionName] = inVar.optionData;
        },
        resetRowNumber: function (templateList) {
            for (var i = 0; i < templateList().length; i++) {
                var row = templateList()[i];
                for (var key in row) {
                    row[key].row = i;
                }
            }
        },

        getGridSelectedData: function (jqxId) {
            var getselectedrowindexes = $('#' + jqxId).jqxGrid('getselectedrowindexes');
            //console.log(getselectedrowindexes);
            var selectedData = [];
            if (getselectedrowindexes.length > 0) {
                $.map(getselectedrowindexes, function (item, index) {
                    selectedData.push($jgrdResult.jqxGrid('getrowdata', item));
                });
            }
            return selectedData;
        },
        getGridDataFromIndex: function (gridSetting, index) {
            return $('#' + gridSetting.id).jqxGrid('getrowdata', index);
        },
        setGridDataByIndex: function (gridSetting, data, index) {
            for (var key in data) {
                try {
                    $('#' + gridSetting.id).jqxGrid('setcellvalue', index, key, data[key]);
                } catch (e) {
                    console.log(key + ' is not one of columns!!');
                }
            }
        },
        setGridCellData: function (gridSetting, row, dataField, data) {
            try {
                $('#' + gridSetting.id).jqxGrid('setcellvalue', row, dataField, data);
            } catch (e) {
                console.log(dataField + ' is not one of columns!!');
            }
        },
        setGridItemData: function (gridSetting, dataField, itemData) {
            for (var i = 0; i < gridSetting.columns.length; i++) {
                if (gridSetting.columns[i].dataField == dataField) {
                    if (gridSetting.columns[i].itemData != null) {
                        gridSetting.columns[i].itemData(itemData);
                    } else {
                        console.log(dataField + ' is not found itemData of attributes!!');
                    }
                }
            }
        },
        setGridData: function (gridSetting, data) {
            var base = gridSetting;
            grid.initGridWithArray({
                localdata: data,
                targetGrid: $('#' + base.id),
                width: base.width,
                height: base.height,
                selectionmode: base.selectionmode,
                autoheight: base.autoheight,
                editable: base.editable,
                pageable: base.pageable,
                localization: base.localization,
                theme: base.theme,
                showstatusbar: base.showstatusbar,
                showaggregates: base.showaggregates,
                statusbarheight: base.statusbarheight,
                sortable: base.sortable,
                datafield: grid.getDataFieldsFromColumns(base.columns, base.data),
                columns: grid.getColumns(base.columns, base)
            });
        },
        checkGridValidation: function (gridSetting) {
            var validationObjects = {},
                $grid = $('#' + gridSetting.id),
                validationResult = true;
            $grid.jqxGrid('hidevalidationpopups');
            if ($.isArray(gridSetting.columns)) {
                $.map(gridSetting.columns, function (item, index) {
                    if (item.validation) {
                        validationObjects[item.dataField] = item.validation;
                    }
                });
            }

            for (var i = 0; i < $grid.jqxGrid('getrows').length; i++) {
                for (var key in validationObjects) {
                    var gridCell = $grid.jqxGrid('getcell', i, key);
                    var validation = validationObjects[key](gridCell, gridCell.value);
                    if (validation != true) {
                        if (validation.result == false) {
                            $grid.jqxGrid('showvalidationpopup', i, key, validation.message);
                            validationResult = false;
                        }
                    }
                }
            }
            return validationResult;
        },
        hideGridValidation: function (gridSetting) {
            $('#' + gridSetting.id).jqxGrid('hidevalidationpopups');
        },
        getGridData: function (gridSetting) {
            return $('#' + gridSetting.id).jqxGrid('getrows');
        },
        isSectionValid: function (section) {
            var valid = true;
            if (section.errors().length > 0) {
                valid = false;
            }
            for (var key in section) {
                if (section[key].type == 'jqxGrid') {
                    if (!section[key].isValid()) {
                        valid = false;
                    }
                }
            }
            return valid;
        },
        showSectionValidMessage: function (section, show) {
            section.errors.showAllMessages(false);
            section.errors.showAllMessages(show);
            for (var key in section) {
                if (section[key].type == 'jqxGrid') {
                    if (show) {
                        section[key].isValid();
                    } else {
                        section[key].hideValidation();
                    }
                }
            }
        },
        setJqxTreeData: function (base) {
            var source =
            {
                datatype: "json",
                datafields: grid.getDataFieldsFromColumns([], base.data()),
                id: base.itemId(),
                localdata: base.data()
            };

            // create data adapter.
            var dataAdapter = new $.jqx.dataAdapter(source);
            // perform Data Binding.
            dataAdapter.dataBind();
            // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents
            // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter
            // specifies the mapping between the 'text' and 'label' fields.
            var records = dataAdapter.getRecordsHierarchy(
                base.itemId(),
                base.parentId(),
                'items', base.itemMapping()
            );
            var $JqxTree = $('#' + base.id());

            $JqxTree.jqxTree({
                source: records
            });
        }
    };
});
