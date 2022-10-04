# UICheckBoxList 勾選群組元件

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式

###HTML的引用語法

kaCheckBoxList 為 ViewModel 中定義勾選欄位的 ViewModel  
程式碼第 5 行的 class 定義為 [BootStrap 排版](http://getbootstrap.com/css/) 的 Css，主要的作用為程式排版的需要，可依實際的排版狀況增加 Css 定義來應對。

```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<ui-checkbox-list params="viewModel: kaCheckBoxList" class="col-xs-12 col-sm-12 col-md-6"></ui-checkbox-list>
<!--IE8的引用方式-->
<div data-bind='component: {name:"ui-checkbox-list", params: {viewModel: kaCheckBoxList}}' class="col-xs-12 col-sm-6 col-md-6">
</div>
```

### ViewModel 的設定語法

```javascript
kaCheckBoxList: {
    type: 'checkboxlist',
    value: ['04', '06'],
    label: 'CheckBox選項',
    labelWidth: '120px',
    itemListWidth: '70px',
    valign: false,
    itemList: [
        {itemName: '選項四', itemValue: '04'},
        {itemName: '選項五', itemValue: '05'},
        {itemName: '選項六', itemValue: '06'}
    ],
    isEnable: true,
    hasFocus: false,
    event: {
        click: function () {
        	//取值
            console.log(viewModel.querySection.kaCheckBoxList());
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
|value|陣列|是|
|label|文字欄位|是|
|labelWidth|文字/數值欄位|是|
|itemListWidth|文字/數值欄位|是|
|valign|布林值|是|
|itemList|陣列|是|
|isEnable|布林值|否|
|hasFocus|布林值|否|
|event-click|功能|否|

---
#### value
此元件的直維陣列型態，陣列的值必須存在於itemList的陣列中
```javascript
//給值方式
kaCheckBoxList(['01', '02']);
//取值方式
var value = kaCheckBoxList();
```

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
#### valign
valign = true 代表元件產出的列表為直式排列，false則為橫式排列，預設為false。

---
#### itemList
此屬性為json物件的陣列，主要功能為產生選項的資料來源，json物件的格式如下：  
itemName會顯示為選項的名稱，itemValue為選項勾選後回傳的值。
```javascript
{itemName: '選項一', itemValue: '01'}
```

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
#### isVisible
控制元件顯示或隱藏  
控制方式如下：
```javascript
//顯示 
kaCheckBoxList.isVisible(true)
//隱藏 
kaCheckBoxList.isVisible(false)
```