# UIControlButtons 控制按鈕元件

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式

###HTML的引用語法

controlButtons 為 ViewModel 中定義勾選欄位的 ViewModel  
```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<ui-control-button params="viewModel: controlButtons"></ui-control-button>
<!--IE8的引用方式-->
<div data-bind='component: {name:"ui-control-button", params: {viewModel: controlButtons}}'></div>
```

### ViewModel 的設定語法

```javascript
controlButtons: {
    panelClass: 'panel-info',
    buttons: [
        {
            label: '新增',
            id: 'buttonAdd',
            iconClass: 'glyphicon-plus',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
            }
        },
        {
            label: '儲存',
            id: 'buttonSave',
            iconClass: 'glyphicon-save-file',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
            }
        },
        {
            label: '刪除',
            id: 'buttonDelete',
            iconClass: 'glyphicon-remove',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
            }
        },
        {
            label: '清除',
            id: 'buttonClear',
            iconClass: 'glyphicon-erase',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
            }
        },
        {
            label: '重載',
            id: 'buttonReload',
            iconClass: 'glyphicon-refresh',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
                window.location.reload()
            }
        },
        {
            label: '查詢',
            id: 'buttonQuery',
            iconClass: 'glyphicon-search',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
            }
        },
        {
            label: '匯出',
            id: 'buttonExport',
            iconClass: 'glyphicon-cloud-download',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
            }
        },
        {
            label: '列印',
            id: 'buttonPrint',
            iconClass: 'glyphicon-print',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
            }
        },
        {
            label: '匯入',
            id: 'buttonImport',
            iconClass: 'glyphicon-cloud-upload',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
            }
        }
    ]
}
```
---
## 參數說明
###主要參數
|參數名稱|欄位型態|必要|
|---|---|---|
|panelClass|文字欄位|是|
|buttons|陣列|是|

###按鈕參數
|參數名稱|欄位型態|必要|
|---|---|---|
|id|文字欄位|是|
|label|文字欄位|是|
|iconClass|文字欄位|是|
|buttonClass|文字欄位|是|
|isEnable|布林值|否|
|isVisible|布林值|否|
|event-click|功能|否|

---
#### panelClass
定義控制按鈕容器的風格
採用 BootStrap 的 Pannel Theme 定義，有以下幾種 Theme 選擇： 
* pannel-default 灰
* pannel-primary 深藍
* pannel-success 綠
* pannel-info 淺藍
* pannel-warning 橘
* pannel-danger 紅

---
#### iconClass
可以參考 Bootstrap 對於 [Glyphicons](http://getbootstrap.com/components/#glyphicons) 的定義，

---
#### buttonClass
採用 BootStrap 的 Button Theme 定義，有以下幾種 Theme 選擇： 
* btn-default 灰
* btn-primary 深藍
* btn-success 綠
* btn-info 淺藍
* btn-warning 橘
* btn-danger 紅
* btn-link 連結樣式

另外也可填入 BootStrap 對於 Button 大小的定義：
* btn-lg 大型按鈕
* btn-sm 小型按鈕
* btn-xs 超小型按鈕

---
#### isEnable
控制按鈕生效或失效  
控制方式如下：
```javascript
//生效 
kaCheckBoxList.isEnable(true)
//失效 
kaCheckBoxList.isEnable(false)
```

也可以透過區塊的控制，一次將區塊內所有的控制項設定為失效。  
```javascript
querySection.setEnable(false);
```

---
#### hasFocus
將由游標的焦點設定到按鈕上面  
控制方式如下：
```javascript
//設定焦點 
kaCheckBoxList.hasFocus(true)
```

---
## 方法
#### setVisible 
設定按鈕顯示或隱藏。
```javascript
viewModel.controlButtons.setVisible({
    buttonAdd: true,
    buttonSave: true,
    buttonDelete: false,
    buttonClear: true,
    buttonReload: true,
    buttonQuery: true,
    buttonExport: true,
    buttonPrint: true,
    buttonImport: false
});
```
---
#### setEnable 
設定按鈕是否鎖定。
```javascript
viewModel.controlButtons.setEnable({
    buttonAdd: true,
    buttonSave: false,
    buttonDelete: false,
    buttonClear: true,
    buttonReload: true,
    buttonQuery: true,
    buttonExport: false,
    buttonPrint: true,
    buttonImport: false
});
```
---
#### getEnableState 
取得按鈕目前的鎖定狀態，回傳為JSON物件。
```javascript
var state=viewModel.controlButtons.getEnableState();
```
---