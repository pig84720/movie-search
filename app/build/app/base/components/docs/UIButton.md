# UIButton 按鈕元件

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式

###HTML的引用語法

queryData 為 ViewModel 中定義查詢按鈕的 ViewModel。  
程式碼第5行的 style 定義，主要的作用為程式排版的需要，可依實際的排版狀況增加 Css 定義來應對。  
```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<ui-button params="viewModel: queryData"></ui-button>
<!--IE8的引用方式-->
<div data-bind='component: {name:"ui-button", params: {viewModel: queryData}}' 
     style="float: left; margin-left: 5px;" >
</div>

```

### ViewModel 的設定語法

```javascript
queryData: {
    type: 'button',
    label: '查詢',
    width: '120px',
    ui: 'btn-primary',
    isEnable: true,
    hasFocus: false,
    event: {
        click: function () {
        }
    }
}
```
---
## 參數說明

|參數名稱|欄位型態|必要|
|---|---|---|
|type|文字欄位|是|
|label|文字欄位|是|
|width|文字/數值欄位|否|
|ui|文字欄位|否|
|isEnable|布林值|否|
|hasFocus|布林值|否|
|isVisible|布林值|否|
|event-click|功能|否|

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