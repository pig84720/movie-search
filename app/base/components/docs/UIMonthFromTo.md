# UIMonthFromTo 年月起迄元件

提供統一元件，統一程式撰寫風格提升開發效率。

---

## 使用方式

###HTML的引用語法

kMonthFrom, kMonthTo 為 ViewModel 中定義勾選欄位的 ViewModel  
程式碼第 5 行的 class 定義為 [BootStrap 排版](http://getbootstrap.com/css/) 的 Css，主要的作用為程式排版的需要，可依實際的排版狀況增加 Css 定義來應對。  
  
設定方式基本上是與 month 的 viewmodel 設定相同，只是一次會使用兩個 month 的 viewmodel 定義。  

```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<ui-month-from-to params="from: kMonthFrom, to:kMonthTo" class="col-xs-12 col-sm-6 col-md-6"></ui-month-from-to>
<!--IE8的引用方式-->
<div data-bind='component: {name:"ui-month-from-to", params: {from: kMonthFrom, to:kMonthTo}}'
class="col-xs-12 col-sm-6 col-md-6">
</div>
```

### ViewModel 的設定語法

```javascript
kMonthFrom: {
    type: 'month',
    value: '2015/07',
    label: '月份',
    width: '90px',
    labelWidth: '120px',
    isEnable: true,
    hasFocus: false,
    isVisible: true,
    unitLabel: '',
    event: {
        keypress: function () {
            return true;
        },
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
            message: '請輸入『月份_起』欄位.'
        }
    }
}
kMonthTo: {
    type: 'month',
    value: '2015/07',
    label: '月份_迄',
    width: '90px',
    labelWidth: '120px',
    isEnable: true,
    hasFocus: false,
    isVisible: true,
    unitLabel: '',
    event: {
        keypress: function () {
            return true;
        },
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
            message: '請輸入『月份_迄』欄位.'
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
|labelWidth|文字/數值欄位|是
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
kMonth.isEnable(true)
//失效 
kMonth.isEnable(false)
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
kMonth.hasFocus(true)
```

---
#### isVisible
控制元件顯示或隱藏  
控制方式如下：
```javascript
//顯示 
kMonth.isVisible(true)
//隱藏 
kMonth.isVisible(false)
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