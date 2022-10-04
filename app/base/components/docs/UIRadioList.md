# UIRadioList 單選元件

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式

###HTML的引用語法

kRadio 為 ViewModel 中定義勾選欄位的 ViewModel  
程式碼第 5 行的 class 定義為 [BootStrap 排版](http://getbootstrap.com/css/) 的 Css，主要的作用為程式排版的需要，可依實際的排版狀況增加 Css 定義來應對。

```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<ui-radio-list params="viewModel: kRadio" class="col-xs-12 col-sm-12 col-md-6"></ui-radio-list>
<!--IE8的引用方式-->
<div data-bind='component: {name:"ui-radio-list", params: {viewModel: kRadio}}'
                             class="col-xs-12 col-sm-6 col-md-6"></div>
```

### ViewModel 的設定語法

```javascript
kRadio: {
    type: 'radiolist',
    value: '02',
    label: '測試選項',
    labelWidth: '120px',
    itemListWidth: '70px',
    groupName: 'kRadio',
    valign: false,
    itemList: [
        {itemName: '選項一', itemValue: '01'},
        {itemName: '選項二', itemValue: '02'},
        {itemName: '選項三', itemValue: '03'}
    ],
    isEnable: true,
    hasFocus: false,
    isVisible: true,
    event: {
        click: function () {
            console.log('kRadio click');
            console.log(viewModel.querySection.kRadio());
            return true;
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
|labelWidth|文字/數值欄位|否|
|itemListWidth|文字/數值欄位|否|
|itemList|Json 陣列|是|
|groupName|文字欄位|是|
|isEnable|布林值|否|
|hasFocus|布林值|否|
|isVisible|布林值|否|
|event-click|功能|否|
|validator|ko validator 物件|否|

---
#### labelWidth
控制按鈕寬度，可以為以下幾種型態的定義  
* 120
* '120px'
* '1em'
* '100%'

---
#### itemListWidth
控制按鈕寬度，可以為以下幾種型態的定義  
* 120
* '120px'
* '1em'
* '100%'

---
#### itemList
定義選項的內容，資料型態為 Json 的陣列。
設定選項的內容可以採用以下語法：
(itemName:選項名稱，itemValue:選項勾選回傳值)
```javascript
viewModel.querySection.kRadio.itemList([
    {itemName: '選項一', itemValue: '01'},
    {itemName: '選項二', itemValue: '02'},
    {itemName: '選項三', itemValue: '03'},
    {itemName: '選項四', itemValue: '04'},
    {itemName: '選項五', itemValue: '05'},
    {itemName: '選項六', itemValue: '06'}
]);
```

---
#### groupName
定義 itemList 選項是歸屬在同一組，groupName 不可重複。

---
#### isEnable
控制按鈕生效或失效  
控制方式如下：
```javascript
//生效 
kRadio.isEnable(true)
//失效 
kRadio.isEnable(false)
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
kRadio.hasFocus(true)
```

---
#### isVisible
控制元件顯示或隱藏  
控制方式如下：
```javascript
//顯示 
kRadio.isVisible(true)
//隱藏 
kRadio.isVisible(false)
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