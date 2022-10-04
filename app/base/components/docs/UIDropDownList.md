# UIDropDownList 下拉元件

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式

###HTML的引用語法

kRelation 為 ViewModel 中定義勾選欄位的 ViewModel  
程式碼第 5 行的 class 定義為 [BootStrap 排版](http://getbootstrap.com/css/) 的 Css，主要的作用為程式排版的需要，可依實際的排版狀況增加 Css 定義來應對。

```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<ui-dropdownlist params="viewModel: kRelation" class="col-xs-12 col-sm-6 col-md-6"></ui-dropdownlist>
<!--IE8的引用方式-->
<div data-bind='component: {name:"ui-dropdownlist", params: {viewModel: kRelation}}'
                             class="col-xs-12 col-sm-6 col-md-6"></div>
```

### ViewModel 的設定語法

```javascript
kRelation: {
    type: 'dropdownlist',
    value: '',
    label: '關係',
    options: [],
    optionsText: 'text',
    optionsValue: 'value',
    optionsCaption: '請選擇',
    width: '',
    labelWidth: '120px',
    unitLabel: '',
    isEnable: true,
    hasFocus: false,
    isVisible: true,
    event: {
        focus: function () {
        },
        blur: function () {
        },
        change: function () {
        },
        click: function () {
        }
    },
    validator: {
        required: {
            message: '請輸入『關係』欄位.'
        }
    }
}
```
---
## 參數說明

|參數名稱|欄位型態|必要|
|---|---|---|
|type|文字欄位|是|
|value|文字欄位|是|
|label|文字欄位|是|
|options|Json 陣列|是|
|optionsText|文字欄位|是|
|optionsValue|文字欄位|是|
|optionsCaption|文字欄位|是|
|width|文字/數值欄位|否|
|labelWidth|文字/數值欄位|否|
|unitLabel|文字欄位|否|
|isEnable|布林值|否|
|hasFocus|布林值|否|
|isVisible|布林值|否|
|event-keypress|功能|否|
|event-focus|功能|否|
|event-blur|功能|否|
|event-change|功能|否|
|event-click|功能|否|
|validator|ko validator 物件|否|


---
#### options
定義選項的內容，資料型態為 Json 的陣列。
設定選項的內容可以採用以下語法：
```javascript
viewModel.querySection.kRelation.options([
    {text: '選項一', value: '01'},
    {text: '選項二', value: '02'},
    {text: '選項三', value: '03'},
    {text: '選項四', value: '04'},
    {text: '選項五', value: '05'},
    {text: '選項六', value: '06'}
]);
```

---
#### optionsText
設定下拉選項的顯示欄位為Json中的哪個欄位，通常是用 text ，如果改為其他欄位也可以。  

---
#### optionsValue
設定下拉選項的值為Json中的哪個欄位，通常是用 value ，如果改為其他欄位也可以。  

---
#### optionsCaption
未選擇選項時，顯示的內容，例如：請選擇‘全部...等字眼。  

---
#### width
控制按鈕寬度，可以為以下幾種型態的定義  
* 120
* '120px'
* '1em'
* '100%'

---
#### labelWidth
控制按鈕寬度，可以為以下幾種型態的定義  
* 120
* '120px'
* '1em'
* '100%'

---
#### unitLabel
接續在元件尾端顯示的單位值。  
例如：<元件>公里  
公里的部分就是利用unitLabel定義會顯示的文字位置  

---
#### isEnable
控制按鈕生效或失效  
控制方式如下：
```javascript
//生效 
kRelation.isEnable(true)
//失效 
kRelation.isEnable(false)
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
kRelation.hasFocus(true)
```

---
#### isVisible
控制元件顯示或隱藏  
控制方式如下：
```javascript
//顯示 
kRelation.isVisible(true)
//隱藏 
kRelation.isVisible(false)
```

---
#### validator
目前採用的 validation 是 knockout-validation，相關進階語法可以參考[knockout-validation](https://github.com/Knockout-Contrib/Knockout-Validation)官方網站說明。  

必要欄位檢核
```javascript
validator: {
    required: {
        message: '訊息內容'
    }
}
```

自訂檢核
```javascript
validator: {
    validation: {
    	//val代表是該viewmodel的值
        validator: function (val) {
        	//檢核條件，回傳false代表檢核失敗
            return ($.trim(val) != '');
        },
        //檢核失敗顯示的訊息內容
        message: '訊息內容'
    }
}
```