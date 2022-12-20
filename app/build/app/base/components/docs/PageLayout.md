# PageLayout 頁面排版處理

主要功能為處理區塊版面的初始化，區塊版面無上限，基本版面為查詢區、清單區、維護區。  
主要功能列舉如下：
* 初始化區塊，並自動開啟區塊
* 自動產生未定義id控制項的id
* 註冊 Enter to Tab 事件(相容於 Chrome 瀏覽器)

---

## 使用方式

###HTML的引用語法
id 為 ViewModel 的程式編號，只需要引用 HTML 標籤即可生效套用  
```html
<!--Chrome / Safari / Firefox / IE9+ 的引用方式-->
<page-layout params="id: id"></page-layout>
<!--IE8的引用方式-->
<div data-bind='component: {name:"page-layout", params: {id: id}}'></div>
```
可以配合以下的版面進行設定
```html
<!--查詢區塊定義-->
<div class="panel panel-default panel-section " sectionId="querySection" style="display:none;">
    <div class="panel-heading row" role="tab">
        <button class="btn btn-default btn-sm col-md-12 col-xs-12 col-sm-12" type="button"
                data-toggle="collapse"
                data-target="#querySection" aria-expanded="true" aria-controls="querySection">
            查詢區
        </button>
    </div>
    <div id="querySection" class="collapse in panel-body " data-bind="'with': querySection">
    <!--元件放置區-->
    </div>
</div>

<!--清單區塊定義-->
<div class="panel panel-default panel-section" sectionId="listSection" style="display:none;">
    <div class="panel-heading row" role="tab">
        <button class="btn btn-default btn-sm col-md-12 col-xs-12 col-sm-12 " type="button"
                data-toggle="collapse"
                data-target="#listSection" aria-expanded="true" aria-controls="listSection">
            清單區
        </button>
    </div>
    <div id="listSection" class="collapse panel-body " data-bind="'with': listSection">
    <!--元件放置區-->
    </div>
</div>

<!--維護區塊定義-->
<div class="panel panel-default panel-section" sectionId="editSection" style="display:none;">
    <div class="panel-heading row" role="tab">
        <button class="btn btn-default btn-sm col-md-12 col-xs-12 col-sm-12 " type="button"
                data-toggle="collapse"
                data-target="#editSection" aria-expanded="true" aria-controls="editSection">
            維護區
        </button>
    </div>
    <div id="editSection" class="collapse panel-body" data-bind="'with': editSection">
    <!--元件放置區-->
    </div>
</div>
```

### ViewModel 的設定語法
無需 ViewModel 的設定

## 參數說明
無參數的設定

## 方法
#### setSectionExpand
設定區塊展開或是閉合
```javascript
viewModel.setSectionExpand([
    {id: 'querySection', expend: false},
    {id: 'listSection', expend: false},
    {id: 'editSection', expend: true}
]);
```
---