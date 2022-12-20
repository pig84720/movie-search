/**
 * Created by jerryhuang on 15/7/30.
 */
define(function (require) {
        var controlAttributes = require('ControlAttributes');
        var koGenerateViewModel = require('KoGenerateViewModel');
        var koOperation = require('KoOperation');
        var getAttributeCount = function (obj) {
            var count = 0;
            for (var key in obj) {
                count++;
            }
            return count;
        };
        var koExcludeAttributeList = koGenerateViewModel.koExcludeAttributeList;   //不轉換成ko物件的屬性
        var koRejectAttributeList = koGenerateViewModel.koRejectAttributeList;   //不註冊到viewModel的屬性
        var objectToViewModel = koGenerateViewModel.objectToViewModel;
        var sectionToViewModel = function (section) {
            var viewModel = {};
            for (var key in section) {
                if (typeof(section[key]) == 'function' || koRejectAttributeList[key]) {
                    viewModel[key] = section[key];
                } else if (typeof(section[key]) == 'string') {
                    viewModel[key] = ko.observable(section[key]);

                } else if (getAttributeCount(section[key]) == 0) {
                    viewModel[key] = ko.observable(section[key]);

                } else if (key == 'titleInfo') {
                    viewModel[key] = sectionToViewModel(section[key]);
                    viewModel[key]['setData'] = function (data) {
                        koOperation.setTitleInfo(this, data)
                    };

                } else if (key == 'controlButtons') {
                    var vm = {}
                    if (section['controlButtons'].panelClass) {
                        vm['panelClass'] = section['controlButtons'].panelClass;
                    }
                    if (section['controlButtons'].buttons) {
                        var buttonArray = [];
                        for (var i = 0; i < section['controlButtons'].buttons.length; i++) {
                            var button = section['controlButtons'].buttons[i],
                                returnButton = {};
                            for (var k in controlAttributes['controlButton']) {
                                returnButton[k] = objectToViewModel(button[k] ? button[k] : controlAttributes['controlButton'][k]);
                            }
                            buttonArray.push(returnButton);
                        }
                        vm['buttons'] = objectToViewModel(buttonArray);
                    }
                    vm['setEnable'] = function (data) {
                        koOperation.setControlButtonEnable(this, data);
                    };
                    vm['setVisible'] = function (data) {
                        koOperation.setControlButtonVisible(this, data);
                    };
                    vm['getEnableState'] = function () {
                        return koOperation.getControlButtonEnable(this);
                    };
                    viewModel[key] = vm;

                } else if (section[key].type == 'section') {
                    var sectionVm = {};
                    for (var k in section[key]) {
                        var item = section[key][k];
                        var templateItem = controlAttributes[section[key][k].type];
                        var control = item.value != null ? objectToViewModel(item.value) : (typeof(item) == 'string' || $.isArray(item) ? objectToViewModel(item) : {});
                        if (item.value != null) {
                            control['value'] = item.value;
                        }
                        if (section[key][k].type) {
                            if (section[key][k].type == 'templateList') {
                                var templateList = [];
                                //console.log();
                                for (var n = 0; n < section[key][k].list.length; n++) {
                                    var row = section[key][k].list[n],
                                        rowItems = {};
                                    for (var dataItem in row) {
                                        var ctrl = objectToViewModel(row[dataItem]),
                                            ctrlItem = section[key][k].template[dataItem];
                                        if (ctrlItem != null) {
                                            templateItem = controlAttributes[ctrlItem.type];
                                            for (var attr in templateItem) {
                                                if (attr == 'event') {
                                                    ctrl[attr] = {};
                                                    for (var event in templateItem[attr]) {
                                                        ctrl[attr][event] = ctrlItem[attr] != null ? (ctrlItem[attr][event] != null ? ctrlItem[attr][event] : templateItem[attr][event]) : templateItem[attr][event];
                                                    }
                                                } else {
                                                    if (!koRejectAttributeList[attr]) {
                                                        if (koExcludeAttributeList[attr] != null || (item.type == 'jqxGrid')) {
                                                            ctrl[attr] = ctrlItem[attr] != null ?
                                                                ctrlItem[attr] : (section[key][k].defaultSet != null && section[key][k].defaultSet[attr] != null ?
                                                                section[key][k].defaultSet[attr] : (section[key].defaultSet != null && section[key][attr] != null ?
                                                                section[key].defaultSet[attr] : controlAttributes[ctrlItem.type][attr]));
                                                        } else {
                                                            ctrl[attr] = objectToViewModel(ctrlItem[attr] != null ?
                                                                ctrlItem[attr] : (section[key][k].defaultSet != null && section[key][k].defaultSet[attr] != null ?
                                                                section[key][k].defaultSet[attr] : (section[key].defaultSet != null && section[key].defaultSet[attr] != null ?
                                                                section[key].defaultSet[attr] : controlAttributes[ctrlItem.type][attr])));
                                                        }
                                                    }
                                                }
                                            }

                                            //註冊ko validation事件
                                            //if (ctrlItem.validator != null && ctrlItem.value != null) {
                                            if ((ctrlItem.validator != null || (section[key][k].defaultSet != null && section[key][k].defaultSet.validator != null) || (section[key].defaultSet != null && section[key].defaultSet.validator != null)) && ctrl.value != null) {
                                                ctrl.extend(ctrlItem.validator != null ? ctrlItem.validator : (section[key][k].defaultSet != null && section[key][k].defaultSet.validator != null ? section[key][k].validator : section[key].defaultSet.validator));
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
                                if (section[key][k].defaultSet != null) {
                                    control['default'] = section[key][k].defaultSet;
                                    //將Section中的default值複製到template裡面，以便未來綁定資料時可以使用
                                    if (section[key].defaultSet != null) {
                                        for (var def in section[key].defaultSet) {
                                            if (control['default'][def] == null) {
                                                control['default'][def] = section[key].defaultSet[def];
                                            }
                                        }
                                    }
                                }
                                control['type'] = 'templateList';
                                control['template'] = section[key][k].template;
                                control['list'] = objectToViewModel(templateList);
                                control.errors = ko.validation.group(control, {deep: true});
                                control['setData'] = function (data) {
                                    koOperation.setTemplateListData(this, data);
                                };
                                control['getData'] = function () {
                                    return koOperation.getTemplateListData(this);
                                };
                                control['setOptions'] = function (i) {
                                    return koOperation.setTemplateListOptions({
                                        templateList: this,
                                        controlName: i.controlName,
                                        optionName: i.optionName,
                                        optionData: i.optionData
                                    });
                                };
                                control['setValue'] = function (i) {
                                    try {
                                        var list = this.list();
                                        list[i.row][i.dataField](i.value);
                                        return true;
                                    } catch (e) {
                                        return false;
                                    }
                                };
                                control['setEnable'] = function (i) {
                                    try {
                                        var list = this.list();
                                        list[i.row][i.dataField].isEnable(i.enable);
                                        return true;
                                    } catch (e) {
                                        return false;
                                    }
                                };
                                control['getValue'] = function (i) {
                                    try {
                                        var list = this.list();
                                        return list[i.row][i.dataField]();
                                    } catch (e) {
                                        return '';
                                    }
                                };
                                control['addRows'] = function (data) {
                                    koOperation.setTemplateListData(this, data, true);
                                    koOperation.resetRowNumber(this.list);
                                };
                                control['removeRow'] = function (index) {
                                    this.list.remove(this.list()[index]);
                                    koOperation.resetRowNumber(this.list);
                                };
                            } else {
                                for (var attr in templateItem) {
                                    if (attr == 'event') {
                                        control[attr] = {};
                                        for (var event in templateItem[attr]) {
                                            control[attr][event] = item[attr] != null && item[attr][event] != null ? item[attr][event] : templateItem[attr][event];
                                        }
                                    } else {
                                        if (!koRejectAttributeList[attr]) {
                                            if (koExcludeAttributeList[attr] != null || (item.type == 'jqxGrid')) {
                                                control[attr] = item[attr] != null ? item[attr] : controlAttributes[item.type][attr];
                                            } else {
                                                control[attr] = objectToViewModel(item[attr] != null ?
                                                    item[attr] : (section[key].defaultSet != null && section[key].defaultSet[attr] != null ?
                                                    section[key].defaultSet[attr] : controlAttributes[item.type][attr]));
                                            }
                                            //增加元件功能
                                            switch (item.type) {
                                                case 'jqxGrid':
                                                    control['getSelectedData'] = function () {
                                                        return koOperation.getGridSelectedData(this.id);
                                                    };
                                                    control['getData'] = function () {
                                                        return koOperation.getGridData(this);
                                                    };
                                                    control['getDataFromIndex'] = function (index) {
                                                        return koOperation.getGridDataFromIndex(this, index);
                                                    };
                                                    control['setDataByIndex'] = function (data, index) {
                                                        return koOperation.setGridDataByIndex(this, data, index);
                                                    };
                                                    control['setCellData'] = function (index, dataField, data) {
                                                        return koOperation.setGridCellData(this, index, dataField, data);
                                                    };
                                                    control['setItemData'] = function (dataField, itemData) {
                                                        return koOperation.setGridItemData(this, dataField, itemData);
                                                    };
                                                    control['setData'] = function (data) {
                                                        koOperation.setGridData(this, data);
                                                    };
                                                    control['isValid'] = function () {
                                                        return koOperation.checkGridValidation(this);
                                                    };
                                                    control['hideValidation'] = function () {
                                                        koOperation.hideGridValidation(this);
                                                    };
                                                    control['focus'] = function(row, datafield) {
                                                        $('#' + this.id).jqxGrid('begincelledit', row, datafield);
                                                    };
                                                    break;
                                                case 'jqxTree':
                                                    control['setData'] = function (data) {
                                                        this.data(data)
                                                        koOperation.setJqxTreeData(this);
                                                    };
                                                    break;
                                            }
                                        }
                                    }
                                }
                                //註冊ko validation事件
                                //if (item.validator != null && item.value != null) {
                                if ((item.validator != null || (section[key].defaultSet != null && section[key].defaultSet.validator != null)) && control.value != null) {
                                    control.extend(item.validator != null ? item.validator : section[key].defaultSet.validator);
                                }
                            }
                            control['type'] = section[key][k].type;
                        } else {
                            //console.log(k);
                            //console.log(getAttributeCount(item));
                            //console.dir(typeof(item));
                            for (var attr in item) {
                                if (attr == 'event') {
                                    control[attr] = {};
                                    for (var event in item[attr]) {
                                        control[attr][event] = item[attr][event];
                                    }
                                } else {
                                    if (!koRejectAttributeList[attr]) {
                                        if (koExcludeAttributeList[attr] != null || (item.type == 'jqxGrid')) {
                                            control[attr] = item[attr];
                                        } else {
                                            control[attr] = objectToViewModel(item[attr]);
                                        }
                                    }
                                }
                            }
                            if (typeof(item) == 'function') {
                                control = item;
                            }
                            //註冊ko validation事件
                            if (item.validator != null && item.value != null) {
                                control.extend(item.validator);
                            }
                        }
                        sectionVm[k] = control;
                        //console.log(control);
                    }
                    sectionVm.errors = ko.validation.group(sectionVm, {deep: true});
                    if (section[key].defaultSet != null) {
                        sectionVm['default'] = section[key].defaultSet;
                    }
                    sectionVm['getData'] = function () {
                        return koOperation.getSectionData(this);
                    };
                    sectionVm['setData'] = function (data) {
                        return koOperation.setSectionData(this, data);
                    };
                    sectionVm['setEnable'] = function (enable) {
                        return koOperation.setAllDisabled({
                            viewModel: this,
                            enable: enable
                        });
                    };
                    sectionVm['isValid'] = function () {
                        return koOperation.isSectionValid(this);
                    };
                    sectionVm['showMessages'] = function (show) {
                        show = (show == null ? true : show);
                        return koOperation.showSectionValidMessage(this, show);
                    };
                    sectionVm['clear'] = function () {
                        return koOperation.setAllClear(this);
                    };
                    viewModel[key] = sectionVm;

                } else if ($.isArray(section[key])) {
                    viewModel[key] = ko.observableArray(section[key]);
                } else {
                    viewModel[key] = sectionToViewModel(section[key]);
                }

            }
            viewModel['setSectionExpand'] = function (i) {
                koOperation.setSectionExpand({
                    section: i,
                    pageId: this.id()
                });
            };
            viewModel['addTab'] = koOperation.addBootStrapTab;
            viewModel['closeTab'] = koOperation.closeActiveBootStrapTab;
            viewModel['numericAddComma'] = koOperation.numericAddComma;
            viewModel['convertDateString'] = koOperation.convertDateString;
            viewModel['convertMonthString'] = koOperation.convertMonthString;
            return viewModel;
        };
        var generateViewModel = function (obj, setting) {
            //var i = {
            //    titleInfo: setting ? (setting.titleInfo ? setting.titleInfo : true) : true,
            //    init: setting ? (setting.init ? setting.init : true) : true,
            //    id: setting ? (setting.id ? setting.id : true) : true,
            //    section: setting ? (setting.section ? setting.section : ['querySection', 'listSection', 'editSection']) : ['querySection', 'listSection', 'editSection']
            //}

            //var viewModel = ko.mapping.fromJS(obj);
            var viewModel = {};
            viewModel = sectionToViewModel(obj);

            //for (var key in obj) {
            //    if (getAttributeCount(obj[key]) == 0 || $.isArray(obj[key]) || typeof(obj[key]) == 'function') {
            //        viewModel[key] = ko.mapping.fromJS(obj[key]);
            //        //viewModel[key] = obj[key];
            //    } else {
            //        viewModel[key] = {};
            //    }
            //}
            //if (!viewModel.titleInfo) {
            //    viewModel.titleInfo = {};
            //}
            //if (obj.titleInfo) {
            //    for (var k in obj.titleInfo) {
            //        //if (koRejectAttributeList.indexOf(k) == -1) {
            //        if (!koRejectAttributeList[k]) {
            //            if (typeof(obj.titleInfo[k]) == 'function') {
            //                viewModel.titleInfo[k] = obj.titleInfo[k];
            //            } else {
            //                viewModel.titleInfo[k] = ko.mapping.fromJS(obj.titleInfo[k]);
            //            }
            //        }
            //    }
            //}
            //if (obj.controlButtons) {
            //    for (var k in obj.controlButtons) {
            //        if (!koRejectAttributeList[k]) {
            //            if (typeof(obj.controlButtons[k]) == 'function') {
            //                viewModel.controlButtons[k] = obj.controlButtons[k];
            //            } else {
            //                viewModel.controlButtons[k] = ko.mapping.fromJS(obj.controlButtons[k]);
            //            }
            //        }
            //    }
            //}
            //
            //for (var x = 0; x < i.section.length; x++) {
            //    if (obj[i.section[x]]) {
            //        for (var key in obj[i.section[x]]) {
            //            //轉換value為ko物件
            //            if (obj[i.section[x]][key].value != null && obj[i.section[x]][key].type != 'button') {
            //                viewModel[i.section[x]][key] = ko.mapping.fromJS(obj[i.section[x]][key].value);
            //            }
            //            //轉換無子項目的節點為ko物件
            //            if (getAttributeCount(obj[i.section[x]][key]) == 0) {
            //                viewModel[i.section[x]][key] = ko.mapping.fromJS(obj[i.section[x]][key]);
            //            }
            //            //將剩下的節點轉換成空物件
            //            if (!viewModel[i.section[x]][key]) {
            //                viewModel[i.section[x]][key] = {};
            //            }
            //
            //            //註冊控制項屬性
            //            for (var k in obj[i.section[x]][key]) {
            //                //if (koRejectAttributeList.indexOf(k) == -1) {
            //                if (!koRejectAttributeList[k]) {
            //                    //if (typeof(obj[i.section[x]][key][k]) == 'function' || koExcludeAttributeList.indexOf(k) > -1 || obj[i.section[x]][key].type == 'jqxGrid') {
            //                    if (typeof(obj[i.section[x]][key][k]) == 'function' || koExcludeAttributeList[k] || obj[i.section[x]][key].type == 'jqxGrid') {
            //                        viewModel[i.section[x]][key][k] = obj[i.section[x]][key][k];
            //                    } else {
            //                        viewModel[i.section[x]][key][k] = ko.mapping.fromJS(obj[i.section[x]][key][k]);
            //                    }
            //                }
            //            }
            //
            //            //註冊控制項預設屬性
            //            for (var k in controlAttributes[obj[i.section[x]][key].type]) {
            //                //如果沒有event的屬性，自動加上
            //                if (viewModel[i.section[x]][key]['event'] == null) {
            //                    viewModel[i.section[x]][key]['event'] == {};
            //                }
            //                //加上event的預設屬性
            //                for (var j in controlAttributes[obj[i.section[x]][key].type].event) {
            //                    if (!viewModel[i.section[x]][key].event) {
            //                        viewModel[i.section[x]][key].event = {};
            //                    }
            //                    if (!viewModel[i.section[x]][key].event[j]) {
            //                        viewModel[i.section[x]][key].event[j] = ko.toJS(ko.mapping.fromJS(controlAttributes[obj[i.section[x]][key].type].event[j]));
            //                    }
            //                }
            //                //如果有沒定義到的屬性，自動加上預設屬性
            //                if (viewModel[i.section[x]][key][k] == null) {
            //                    if (obj[i.section[x]][key].type != 'jqxGrid') {
            //                        viewModel[i.section[x]][key][k] = ko.mapping.fromJS(controlAttributes[obj[i.section[x]][key].type][k]);
            //                    } else {
            //                        viewModel[i.section[x]][key][k] = ko.toJS(ko.mapping.fromJS(controlAttributes[obj[i.section[x]][key].type][k]));
            //                    }
            //                }
            //            }
            //
            //            //自動加上validator的定義
            //            if (obj[i.section[x]][key].value != null) {
            //                if (obj[i.section[x]][key].validator != null && obj[i.section[x]][key].value != null) {
            //                    viewModel[i.section[x]][key].extend(obj[i.section[x]][key].validator);
            //                }
            //            }
            //            //指定個區段的驗證群組
            //            viewModel[i.section[x]].errors = ko.validation.group(viewModel[i.section[x]]);
            //        }
            //    }
            //}
            return viewModel;
        };
        return {
            getAttributeCount: getAttributeCount,
            generateViewModel: generateViewModel,
            objectToViewModel: objectToViewModel
        };
    }
)
;