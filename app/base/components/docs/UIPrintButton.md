# UIPrintButton 列印元件

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式

###HTML的引用語法

printReportAPR1020P 為 ViewModel 中定義查詢按鈕的 ViewModel。  
程式碼第5行的 style 定義，主要的作用為程式排版的需要，可依實際的排版狀況增加 Css 定義來應對。  
```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<ui-print-button params="viewModel: printReportAPR1020P"></ui-print-button>
<!--IE8的引用方式-->
<div data-bind='component: {name:"ui-print-button", params: {viewModel: printReportAPR1020P}}'
                         style="float: left; margin-left: 5px;">
</div>

```

### ViewModel 的設定語法

```javascript
printReportAPR1020P: {
    type: 'printButton',
    id: 'printReportAPR1020P',
    label: '列印APR1020P',
    width: '120px',
    ui: 'btn-success',
    serviceUrl: SS.service.baseUrl,
    reportPath: '/HLCFI/AP/APR/',
    reportId: 'APR1020P',
    reportVar: [
        {column: 'SYSCD', value: 'LC'},
        {column: 'DATAID', value: '01'},
        {column: 'MCODE', value: ''},
        {column: 'UserName', value: 'Jerry Huang'}
    ],
    defaultReportType:['CSV'],
    validationCallback: function () {
        return viewModel.querySection.isValid();
    }

}
```
---
## 參數說明

|參數名稱|欄位型態|必要|
|---|---|---|
|type|文字欄位|是|
|id|文字欄位|是|
|label|文字欄位|是|
|width|文字/數值欄位|否|
|ui|文字欄位|否|
|serviceUrl|文字欄位|否|
|reportPath|文字欄位|否|
|reportId|文字欄位|否|
|reportVar|文字欄位|否|
|defaultReportType|文字欄位|否|
|isEnable|布林值|否|
|hasFocus|布林值|否|
|isVisible|布林值|否|
|validationCallback|功能|否|

---
#### width
控制按鈕寬度，可以為以下幾種型態的定義：
* 120
* '120px'
* '1em'
* '100%'

---
#### ui
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
#### serviceUrl
此元件運作需要與後端繼承 SSService 的服務綁定，  
服務網址如果不指定，會自動使用 SS.service.baseUrl ，此設定會定義在 config.js 裡面。

---
#### reportPath
SSRS的報表路徑。

---
#### reportId
SSRS的報表編號。

---
#### reportVar
傳入報表列印的參數陣列，順序不需要與 SSRS 報表一致。

---
#### defaultReportType
預設勾選輸出的報表格式。

---
#### isEnable
控制按鈕生效或失效。  
控制方式如下：
```javascript
//生效 
queryData.isEnable(true)
//失效 
queryData.isEnable(false)
```

也可以透過區塊的控制，一次將區塊內所有的控制項設定為失效。  
```javascript
querySection.setEnable(false);
```

---
#### hasFocus
將由游標的焦點設定到按鈕上面。  
控制方式如下：
```javascript
//設定焦點 
queryData.hasFocus(true)
```

---
#### isVisible
控制元件顯示或隱藏  
控制方式如下：
```javascript
//顯示 
queryData.isVisible(true)
//隱藏 
queryData.isVisible(false)
```

---
#### validationCallback
按下報表列印按鈕時進行的檢核，回傳為false代表檢核失敗，反之則為成功。  
