# templateList 樣板清單

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式
主要提供陣列資料綁定樣板元件，類似Grid的功能，但是版面可以由開發者自行定義。

###HTML的引用語法

```html
<div class="row" data-bind="foreach: kList.list">
    <div class="row">
        <div data-bind='component: {name:"ui-textbox", params: {viewModel: kPOLNO}}'
             class="col-xs-12 col-sm-3 col-md-3"></div>
        <div data-bind='component: {name:"ui-date", params: {viewModel: kGIVEDATE}}'
             class="col-xs-12 col-sm-3 col-md-3"></div>
        <div data-bind='component: {name:"ui-dropdownlist", params: {viewModel: kPOLKIND}}'
             class="col-xs-12 col-sm-2 col-md-2"></div>
        <div data-bind='text: TEST1' class="col-xs-12 col-sm-2 col-md-2"></div>
        <div data-bind='component: {name:"ui-button", params: {viewModel: removeButton}}'
             style="float: left; margin-left: 5px;" class="col-xs-12 col-sm-2 col-md-2"></div>
    </div>
</div>
```

### ViewModel 的設定語法

```javascript
kList: {
    type: 'templateList',
    template: {
        kPOLNO: {
            type: 'textbox',
            value: '',
            label: '罰單號碼',
            width: '105px',
            labelWidth: '120px'//,
            validator: {
                validation: {
                    validator: function (val) {
                        return ($.trim(val) != '');
                    },
                    message: '請輸入『罰單號碼』欄位.'
                }
            }
        },
        kPOLKIND: {
            type: 'dropdownlist',
            value: '',
            label: '罰單類別',
            options: [],
            optionsText: 'text',
            optionsValue: 'value',
            optionsCaption: '請選擇',
            width: '',
            labelWidth: '120px',
            validator: {
                required: {
                    message: '請輸入『罰單類別』欄位.'
                }
            }
        },
        kGIVEDATE: {
            type: 'date',
            value: '',
            label: '交車日',
            width: '90px',
            labelWidth: '120px',
            validator: {
                required: {
                    message: '請輸入『交車日』欄位.'
                }
            },
            event: {
                blur: function (vm, e) {
                    var row = vm.viewModel.row;
                    console.log(row);
                    viewModel.editSection.kList.setValue({
                        row: row,
                        dataField: 'kPOLNO',
                        value: '1234567890'
                    });
                    viewModel.editSection.kList.setEnable({
                        row: row,
                        dataField: 'kPOLNO',
                        enable: false
                    });
                    var kPOLKIND = viewModel.editSection.kList.getValue({
                        row: row,
                        dataField: 'kPOLKIND'
                    });
                    console.log(kPOLKIND);
                }
            }
        },
        removeButton: {
            type: 'button',
            label: '移除',
            width: '60px',
            ui: 'btn-success',
            event: {
                click: function (vm, e) {
                    var row = vm.viewModel.row;
                    viewModel.editSection.kList.removeRow(row);
                }
            }
        }
    },
    list: []
}
```
---
## 參數說明

|參數名稱|欄位型態|必要|
|---|---|---|
|type|文字欄位|是|
|template|JSON物件|是|
|list|JSON陣列|是|

---
#### template
可以由目前已存在的預設元件或是自訂元件組成。

---
#### list
綁定的資料內容，單筆資料的結構需參照template的定義及命名，屬性可以多不可少，  
不含value元件，不需要綁定資料欄位。

---
## 方法

#### getData
取得templateList的資料
```javascript
var listData=viewModel.editSection.kList.getData();
```
---

#### setOptions
設定templateList中，有下拉選單的選項。
```javascript
viewModel.editSection.kList.setOptions({
    controlName: 'kPOLKIND',
    optionName: 'options',
    optionData: [
        {text: '選項一', value: '01'},
        {text: '選項二', value: '02'},
        {text: '選項三', value: '03'},
        {text: '選項四', value: '04'},
        {text: '選項五', value: '05'},
        {text: '選項六', value: '06'}
    ]
});
```
---

#### setValue
設定templateList中，同一列特定欄位的值
```javascript
blur: function (vm, e) {
    var row = vm.viewModel.row;
    viewModel.editSection.kList.setValue({
        row: row,
        dataField: 'kPOLNO',
        value: '1234567890'
    });
}
```
---
#### getValue
取得templateList中，同一列特定欄位的值。
```javascript
blur: function (vm, e) {
    var row = vm.viewModel.row;
    var kPOLKIND = viewModel.editSection.kList.getValue({
        row: row,
        dataField: 'kPOLKIND'
    });
}
```
---
#### setData
綁定templateList資料。
```javascript
viewModel.editSection.kList.setData([
    {kPOLNO: 'K09928349', kPOLKIND: '01', kGIVEDATE: '20150801', TEST1: '20150801'},
    {kPOLNO: 'K09928350', kPOLKIND: '02', kGIVEDATE: '20150820', TEST1: '20150802'},
    {kPOLNO: 'K09928351', kPOLKIND: '03', kGIVEDATE: '20150831', TEST1: '20150803'}
]);
```
---
#### setEnable
設定同一列的欄位鎖定。
```javascript
blur: function (vm, e) {
    var row = vm.viewModel.row;
    viewModel.editSection.kList.setEnable({
        row: row,
        dataField: 'kPOLNO',
        enable: false
    });
}
```
---
#### addRows
新增一列。
```javascript
viewModel.editSection.kList.addRows([
    {kPOLNO: 'K09928352', kPOLKIND: '04', kGIVEDATE: '20150908', TEST1: '20150909'}
]);
```
---
#### removeRow
移除一列，以下範例為移除第一列的範例。
```javascript
viewModel.editSection.kList.removeRow(0);
```
---