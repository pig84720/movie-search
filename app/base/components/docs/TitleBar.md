# TitleBar 程式標題列元件

主要功能為顯示登入者的相關資訊及程式代號名稱，相關參數內容可由前端 Session 值傳入，再由 ViewModel 的 init 事件進行綁定。

---

## 使用方式

###HTML的引用語法

titleInfo 為 ViewModel 中定義 Title Bar 的 ViewModel ，id 為 ViewModel 的程式編號  
```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<title-bar params="viewModel: titleInfo, id: id"></title-bar>
<!--IE8的引用方式-->
<div data-bind='component: {name:"title-bar", params: {viewModel: titleInfo, id: id}}'></div>

```

### ViewModel 的設定語法

```javascript
//viewmodel定義方式
titleInfo: {
    programId: '',
    programName: '',
    userId: '',
    userName: '',
    userCompany: '',
    userDepartment: '',
    loginTime: ''
}

//設定值的方式
viewModel.titleInfo.setData({
    programId: data.PROGID,
    programName: data.PROGNM,
    userId: data.USERID,
    userName: data.EMPLNM,
    userCompany: data.DLRNM,
    userDepartment: data.DEPTNM,
    loginTime: moment().format('YYYY/MM/DD HH:mm:ss')
});
```

## 參數說明

|參數名稱|欄位型態|必要|
|---|---|---|
|programId|文字欄位|否|
|programName|文字欄位|否|
|userId|文字欄位|否|
|userName|文字欄位|否|
|userCompany|文字欄位|否|
|userDepartment|文字欄位|否|
|loginTime|文字欄位|否|