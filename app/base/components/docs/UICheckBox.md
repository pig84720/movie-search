# UICheckBox 勾選元件

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式

###HTML的引用語法

kCheck 為 ViewModel 中定義勾選欄位的 ViewModel  
程式碼第 5 行的 class 定義為 [BootStrap 排版](http://getbootstrap.com/css/) 的 Css，主要的作用為程式排版的需要，可依實際的排版狀況增加 Css 定義來應對。

```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<ui-checkbox params="viewModel: kCheck" class="col-xs-12 col-sm-6 col-md-6"></ui-checkbox>
<!--IE8的引用方式-->
<div data-bind='component: {name:"ui-checkbox", params: {viewModel: kCheck}}' 
     class="col-xs-12 col-sm-6 col-md-6">
</div>
```

### ViewModel 的設定語法

```javascript
kCheck: {
    type: 'checkbox',
    value: false,
    label: '是否有效',
    labelWidth: '120px',
    itemName: '有效',
    itemNameWidth: '70px',
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
|value|布林值|是|
|label|文字欄位|是|
|labelWidth|文字/數值欄位|是|
|itemName|文字欄位|是|
|itemNameWidth|文字/數值欄位|是|
|isEnable|布林值|否|
|hasFocus|布林值|否|
|event-click|功能|否|

---
#### labelWidth
控制按鈕寬度，可以為以下幾種型態的定義
* 120
* '120px'
* '1em'
* '100%'

---
#### itemNameWidth
控制按鈕寬度，可以為以下幾種型態的定義
* 120
* '120px'
* '1em'
* '100%'

---
#### isEnable
控制按鈕生效或失效  
控制方式如下：
```javascript
//生效 
kCheck.isEnable(true)
//失效 
kCheck.isEnable(false)
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
kCheck.hasFocus(true)
```

---
#### isVisible
控制元件顯示或隱藏  
控制方式如下：
```javascript
//顯示 
kCheck.isVisible(true)
//隱藏 
kCheck.isVisible(false)
```