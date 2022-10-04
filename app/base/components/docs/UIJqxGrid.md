# UIJqxGrid Grid元件

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式
此元件主要採用JQwidget Grid為實作對象，相關Grid的操作方法可以參考[JQwidget Grid的文件](http://www.jqwidgets.com/jquery-widgets-demo/demos/jqxgrid/index.htm)說明。

###HTML的引用語法

grid1 為 ViewModel 中定義Grid元件的 ViewModel  
程式碼第 5 行的 class 定義為 [BootStrap 排版](http://getbootstrap.com/css/) 的 Css，主要的作用為程式排版的需要，可依實際的排版狀況增加 Css 定義來應對。

```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<ui-jqxgrid params="viewModel: grid1"></ui-jqxgrid>
<!--IE8的引用方式-->
<div data-bind='component: {name:"ui-jqxgrid", params: {viewModel: grid1}}'></div>
```

### ViewModel 的設定語法

```javascript
grid1: {
    type: 'jqxGrid',
    id: 'jqxGrid1',
    data: [],
    width: '100%',
    height: 200,
    selectionmode: 'singlerow',
    autoheight: false,
    editable: true,
    pageable: false,
    theme: '',
    defaultData: {POLNO: '', CARNO: '', POLKIND: '', GIVEDATE: '', GIVEMONTH: '', RENTAMT: 0, VALID: true},
    enterAddColumn: 'RENTAMT',
    focusColumn: 'POLNO',
    procdColumn: '',
    columns: [
        {
            type: 'serial',
            text: '編號',
            width: 40
        },//...定義Grid欄位內容
    ],
    cellbeginedit: function (row, datafield, columntype, value) {
        return true;
    },
    cellsrenderer: function (row, datafield, value, defaultHtml) {
        return defaultHtml;
    }
}
```
---
## 參數說明

|參數名稱|欄位型態|必要|
|---|---|---|
|type|文字欄位|是|
|id|文字欄位|是|
|data|JSON陣列|是|
|width|文字/數值欄位|是|
|height|文字/數值欄位|是|
|selectionmode|文字欄位|是|
|autoheight|布林值|是|
|editable|布林值|是|
|pageable|布林值|是|
|theme|文字欄位|否|
|defaultData|JSON物件|否|
|enterAddColumn|文字欄位|否|
|focusColumn|文字欄位|否|
|procdColumn|文字欄位|否|
|columns|JSON陣列|是|
|cellbeginedit|功能|否|
|cellsrenderer|功能|否|

---
#### width
控制按鈕寬度，可以為以下幾種型態的定義  
* 120
* '120px'
* '1em'
* '100%'

---
#### height
控制按鈕寬度，可以為以下幾種型態的定義  
* 120
* '120px'
* '1em'
* '100%'

---
#### selectionmode
設定選取模式，有以下設定可供選擇
* 'none'-將選取模式設定為失效
* 'singlerow'- 選擇一列
* 'multiplerows' - 選取多列
* 'multiplerowsextended' - 可以用圈選的方式選擇多列資料
* 'singlecell' - 選擇一個欄位
* 'multiplecells' - 選擇多個欄位
* 'multiplecellsextended' - 可用用圈選的方式選擇多個欄位
* 'multiplecellsadvanced' - 像Excel的選取方式，選擇多個欄位，如果要有鍵盤上下左右移動的功能，可以設定此種模式
* 'checkbox' - 使用checkBox欄位來進行多選處理

---
#### autoheight
自動依照每列行高決定Grid高度，一般我們會設定為false。

---
#### editable
設定Grid是否可以進行編輯動作。

---
#### pageable
設定Grid是否進行分頁顯示，一般是不需要設定分頁。

---
#### theme
設定Grid的佈景主題，需要配合JQWidget的Theme Css引入。

Css引入方式如下，引入以下的Css之後，可以設定Grid的theme為energyblue。
```html
<link rel="stylesheet" href="../../jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="../../jqwidgets/styles/jqx.energyblue.css" type="text/css" />
```

---
#### defaultData
新增一行資料的時候，指定個欄位的預設值，預設值的內容結構需比照comumns的定義結構。
```javascript
{POLNO: '', CARNO: '', POLKIND: '', GIVEDATE: '', GIVEMONTH: '', RENTAMT: 0, VALID: true}
```

---
#### enterAddColumn
按下Enter按鍵後，新增一列的欄位設定。

---
#### focusColumn
定義新增一列之後，游標Focus的欄位。

---
#### procdColumn
判斷是否可以刪除列資料的處理區分欄位，此欄位的內容需要為，A:新增，U:修改，D:刪除的欄位內容。

---
#### cellbeginedit
主要功能為控制哪些欄位不可以維護的處理，如果不可以維護則回傳false。

---
#### cellsrenderer
主要是將不可以維護的欄位顏色渲染成灰色。

---
#### columns
定義此Grid是由哪些欄位所組成，欄位的定義有以下的設定：

##### serial 自動編號欄位
主要功能為顯示行號。
定義方式如下：
```javascript
{
    type: 'serial',	//欄位類別
    text: '編號',	//欄位標題
    width: 40,	//欄位寬度
    hidden: false	//隱藏欄位
}
```
---
##### text 文字欄位
定義方式如下：
```javascript
{
    type: 'text',	//欄位類別
    text: '罰單號碼',	//欄位標題
    dataField: 'POLNO',	//綁定資料欄位
    width: 100,			//欄位寬度
    cellsalign: 'center',	//欄位內容對齊方式
    align: 'center',	//欄位標題對齊方式
    editable: true,		//是否可編輯
    hidden: false,		//隱藏欄位
    pinned: false,		//凍結欄位
    aggregates:['count'],	//匯總方式
    cellbeginedit:function(row, datafield, columntype, value){},	//欄位開始編輯事件
    cellendedit: function (row, datafield, columntype, oldvalue, newvalue) {	//欄位結束編輯事件
    },
    cellsrenderer:function(row, columnfield, value, defaulthtml, columnproperties){},	//欄位渲染事件
    cellvaluechanging:function(row, datafield, columntype, oldvalue, newvalue){},	//欄位值變更輯事件
    aggregatesrenderer:function(aggregates){	//匯總資料渲染事件
        var renderstring = "";
        $.each(aggregates, function (key, value) {
            var name = key == 'min' ? 'Min' : 'Max';
            renderstring += '' + name + ': ' + value +'';
        });
        return renderstring;
    },
    validation: function (cell, value) {	//欄位檢核
        if ($.trim(value) == '') {
            return {result: false, message: "欄位『罰單號碼』為必要欄位！！"};
        }
        return true;
    }
}
```
---
##### dropdownlist 下拉欄位
定義方式如下：
```javascript
{
    type: 'dropdownlist',	//欄位類別
    text: '罰單類別',		//欄位標題
    dataField: 'POLKIND',	//綁定資料欄位
    width: 100,				//欄位寬度
    cellsalign: 'center',	//欄位內容對齊方式
    align: 'center',		//欄位標題對齊方式
    editable: true,			//是否可編輯
    hidden: false,		//隱藏欄位
    itemData: ko.observableArray([	//下拉欄位項目資料
        {text: '選項一', value: '01'},
        {text: '選項二', value: '02'},
        {text: '選項三', value: '03'},
        {text: '選項四', value: '04'},
        {text: '選項五', value: '05'},
        {text: '選項六', value: '06'}
    ]),
    displayMember: 'text',		//下拉欄位選項顯示欄位定義
    valueMember: 'value',		//下拉欄位選項值欄位定義
    placeHolder: '請選擇',		//未選擇時的提示字眼
    pinned: false,		//凍結欄位
    aggregates:['count'],	//匯總方式
    cellbeginedit:function(row, datafield, columntype, value){},	//欄位開始編輯事件
    cellendedit: function (row, datafield, columntype, oldvalue, newvalue) {	//欄位結束編輯事件
    },
    cellsrenderer:function(row, columnfield, value, defaulthtml, columnproperties){},	//欄位渲染事件
    cellvaluechanging:function(row, datafield, columntype, oldvalue, newvalue){},	//欄位值變更輯事件
    aggregatesrenderer:function(aggregates){},	//匯總資料渲染事件
    callback: function (selectItem, row) {	//選取選項之後觸發的欄位
    },
    validation: function (cell, value) {	//欄位檢核
        return true;
    }
}
```
---
##### date 日期欄位
定義方式如下：
```javascript
{
    type: 'date',			//欄位類別
    text: '交車日',		//欄位標題
    dataField: 'GIVEDATE',	//綁定資料欄位
    width: 110,				//欄位寬度
    cellsalign: 'center',	//欄位內容對齊方式
    align: 'center',	//欄位標題對齊方式
    editable: true,		//是否可編輯
    calendar: true,		//是否顯示日曆
    hidden: false,		//隱藏欄位
    pinned: false,		//凍結欄位
    aggregates:['count'],	//匯總方式
    cellbeginedit:function(row, datafield, columntype, value){},	//欄位開始編輯事件
    cellendedit: function (row, datafield, columntype, oldvalue, newvalue) {	//欄位結束編輯事件
    },
    cellsrenderer:function(row, columnfield, value, defaulthtml, columnproperties){},	//欄位渲染事件
    cellvaluechanging:function(row, datafield, columntype, oldvalue, newvalue){},	//欄位值變更輯事件
    aggregatesrenderer:function(aggregates){},	//匯總資料渲染事件
    validation: function (cell, value) {	//欄位檢核
        return true;
    }
}
```
---
##### month 年月欄位
定義方式如下：
```javascript
{
    type: 'month',	//欄位類別
    text: '交車月',	//欄位標題
    dataField: 'GIVEMONTH',	//綁定資料欄位
    width: 90,	//欄位寬度
    cellsalign: 'center',	//欄位內容對齊方式
    align: 'center',	//欄位標題對齊方式
    editable: true,		//是否可編輯
    hidden: false,		//隱藏欄位
    pinned: false,		//凍結欄位
    aggregates:['count'],	//匯總方式
    cellbeginedit:function(row, datafield, columntype, value){},	//欄位開始編輯事件
    cellendedit: function (row, datafield, columntype, oldvalue, newvalue) {	//欄位結束編輯事件
    },
    cellsrenderer:function(row, columnfield, value, defaulthtml, columnproperties){},	//欄位渲染事件
    cellvaluechanging:function(row, datafield, columntype, oldvalue, newvalue){},	//欄位值變更輯事件
    aggregatesrenderer:function(aggregates){},	//匯總資料渲染事件
    validation: function (cell, value) {	//欄位檢核
        return true;
    }
}
```
---
##### numeric 數值欄位
定義方式如下：
```javascript
{
    type: 'numeric',	//欄位類別
    digits: 0,
    maxlength: 4,
    text: '租金',	//欄位標題
    dataField: 'RENTAMT',	//綁定資料欄位
    width: 90,	//欄位寬度
    cellsalign: 'right',	//欄位內容對齊方式
    align: 'center',	//欄位標題對齊方式
    editable: true,		//是否可編輯
    hidden: false,		//隱藏欄位
    pinned: false,		//凍結欄位
    aggregates:['count'],	//匯總方式
    cellbeginedit:function(row, datafield, columntype, value){},	//欄位開始編輯事件
    cellendedit: function (row, datafield, columntype, oldvalue, newvalue) {	//欄位結束編輯事件
    },
    cellsrenderer:function(row, columnfield, value, defaulthtml, columnproperties){},	//欄位渲染事件
    cellvaluechanging:function(row, datafield, columntype, oldvalue, newvalue){},	//欄位值變更輯事件
    aggregatesrenderer:function(aggregates){},	//匯總資料渲染事件
    validation: function (cell, value) {	//欄位檢核
        return true;
    }
}
```
---
##### checkbox 勾選欄位
定義方式如下：
```javascript
{
    type: 'checkbox',	//欄位類別
    text: '有效',	//欄位標題
    dataField: 'VALID',	//綁定資料欄位
    width: 80,	//欄位寬度
    cellsalign: 'center',	//欄位內容對齊方式
    align: 'center',	//欄位標題對齊方式
    editable: true,		//是否可編輯
    hidden: false,		//隱藏欄位
    allCheck: true,     //是否在表頭顯示全選的Checkbox
    allCheckCallback: function (checked) {  //全選的Checkbox勾選的時候會觸發此功能，並傳入勾選狀態
    },
    pinned: false,		//凍結欄位
    aggregates:['count'],	//匯總方式
    cellbeginedit:function(row, datafield, columntype, value){},	//欄位開始編輯事件
    cellendedit: function (row, datafield, columntype, oldvalue, newvalue) {	//欄位結束編輯事件
    },
    cellsrenderer:function(row, columnfield, value, defaulthtml, columnproperties){},	//欄位渲染事件
    cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue) {	//勾選狀態變更時處發的事件
    },
    aggregatesrenderer:function(aggregates){},	//匯總資料渲染事件
    validation: function (cell, value) {	//欄位檢核
        return true;
    }
}
```
---
##### button 按鈕欄位
定義方式如下：
```javascript
{
    type: 'button',	//欄位類別
    text: '測試',	//欄位標題
    width: 100,	//欄位寬度
    cellsalign: 'center',	//欄位內容對齊方式
    align: 'center',	//欄位標題對齊方式
    editable: true,		//是否不鎖定欄位
    hidden: false,		//隱藏欄位
    pinned: false,		//凍結欄位
    cellbeginedit:function(row, datafield, columntype, value){},	//欄位開始編輯事件
    cellendedit: function (row, datafield, columntype, oldvalue, newvalue) {	//欄位結束編輯事件
    },
    cellsrenderer:function(row, columnfield, value, defaulthtml, columnproperties){},	//欄位渲染事件
    buttonclick: function (index) {	//按鈕按下的執行功能
    }
}
```
---
## 方法

#### getData
取得Grid資料
```javascript
var gridData=viewModel.listSection.grid1.getData();
```
---

#### getSelectedData
取得選取的Grid資料
```javascript
var selectGridData=viewModel.listSection.grid1.getSelectedData();
```
---

#### getDataFromIndex
依照Grid的index取得Grid資料，由第0筆開始。
```javascript
var gridData=viewModel.listSection.grid1.getDataFromIndex(1);
```
---

#### setDataByIndex
依照Grid的index設定Grid資料，由第0筆開始。  
其中 data 的型態為 json ，屬性為 grid 的 datafield，可以單獨只設定一個欄位。  
```javascript
viewModel.listSection.grid1.setDataByIndex(data, 0);
```
---

#### setData
綁定Grid資料
```javascript
viewModel.listSection.grid1.setData([
    {
        POLNO: 'D287637828',
        CARNO: '3847-TT',
        POLKIND: '01',
        GIVEDATE: '2015/07/01',
        GIVEMONTH: '2015/07',
        RENTAMT: 1000,
        VALID: true,
        SEQ: 0
    },
    {
        POLNO: 'D287637829',
        CARNO: 'FF-3748',
        POLKIND: '02',
        GIVEDATE: '2015/08/01',
        GIVEMONTH: '2015/08',
        RENTAMT: 2400,
        VALID: false,
        SEQ: 1
    },
    {
        POLNO: 'D287637838',
        CARNO: '2763-77',
        POLKIND: '03',
        GIVEDATE: '2015/08/11',
        GIVEMONTH: '2015/08',
        RENTAMT: 3200,
        VALID: true,
        SEQ: 2
    }
]);
```
---
#### isValid
檢核Grid欄位是否合法
```javascript
if(viewModel.listSection.grid1.isValid()){
//檢核成功的處理邏輯
};
```
---
#### hideValidation
隱藏檢核訊息
```javascript
viewModel.listSection.grid1.hideValidation();
```
---