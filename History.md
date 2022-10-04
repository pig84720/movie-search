# SSMvvm文件發布歷程 

記錄SSMvvm文件修正的內容。  

---  

### Version 0.1.4
#### 2019/10/14   
* 修改appConfig.js中，對於 SS.app.baseUrl 改踩用連結網址擷取處理，增加port的判斷處理(感謝Gordon協助))

### Version 0.1.3
#### 2019/9/9   
* 修改appConfig.js中，對於 SS.app.baseUrl 改踩用連結網址擷取處理

### Version 0.1.2
### Version 0.1.1
#### 2019/9/9   
* 修改http-server版本及AppConfig.js相關測試路徑
* 修改程式產生預設值

### Version 0.0.52
#### 2019/9/6  
* 修改datacontext中的範例內容

### Version 0.0.50
#### 2017/7/7  
* 修正Textbox觸發keypress事件的處理  
  
### Version 0.0.49
#### 2017/5/18  
* 修正UIPrintButton在相容性檢視下，無法關閉報表預覽介面
  
### Version 0.0.48
#### 2017/5/15  
* 修正textbox template向下相容的問題

### Version 0.0.47
#### 2017/4/24  
* SecureData中少傳dataType的參數
  
### Version 0.0.46
#### 2017/3/17  
* 修正『日期』元件 IE 相容性檢視下，切換月份會關閉日期
  
### Version 0.0.45
#### 2017/2/21  
* 修正『時間區間』元件 onBlur 觸發問題
  
### Version 0.0.44
#### 2017/2/21  
* 增加『時間區間』元件 
    
### Version 0.0.43  
#### 2017/1/19  
* 修正textbox元件inputType的判斷問題  
  
### Version 0.0.42  
#### 2016/12/22  
* 修正Grid中下拉欄位連動的問題  
  
### Version 0.0.41  
#### 2016/12/2  
* 修正ControlAttributes.js 增加 controlButton 的屬性 itemList＝[]
  
### Version 0.0.40  
#### 2016/12/2  
* 修正WebApiClient.js在IE7/8時，對傳送JSON字串格式的header    
  
### Version 0.0.39  
#### 2016/11/22  
* 修正日期格式欄位在Bootstrap的Modal組件開窗中，點選日曆帶入值時，會發生無限迴圈的錯誤    
  
### Version 0.0.38  
#### 2016/11/14  
* 修正日期格式欄位轉換五碼數字沒有顯示錯誤訊息  
  
### Version 0.0.37  
#### 2016/11/14  
* 修正 jqxcombobox 在同一頁面無法使用多次的問題  
* 修正 SSAPI 與 Service 共用 iframe 的狀況  
  
### Version 0.0.36  
#### 2016/11/4  
* 修正 Grid 輸入民國年無法轉西元年的問題  
  
### Version 0.0.35  
#### 2016/10/5  
* 修改Grid新增狀態數值欄位歸零的問題  
* Grid 增加 setCellData 的 Method，傳遞參數(row, dataField, data)  
  
### Version 0.0.34  
#### 2016/10/5  
* 修改Grid數值欄位沒有加上千分位逗點的問題  
  
### Version 0.0.33  
#### 2016/9/9  
* 修正textbox樣板在IE8的問題  
#### 2016/9/7  
* 修正smartMenu中folderLink物件要多次點選才生效  
  
### Version 0.0.32  
#### 2016/9/6  
* 修正Grid數值欄位異常  
  
### Version 0.0.31  
#### 2016/9/6  
* app.js 改為未編譯版本  
  
### Version 0.0.30  
#### 2016/9/5  
* 修復 excelToJson 新加屬性（isCsv ）會造成舊有已編譯程式發生錯誤的狀況  
  
### Version 0.0.29  
#### 2016/9/5  
* 修復 component template 新加屬性（cls, placeholder, inputType ）會造成舊有已編譯程式發生錯誤的狀況  
  
### Version 0.0.28  
#### 2016/9/5  
* 修復 component template 新加屬性（cls, placeholder ）會造成舊有已編譯程式發生錯誤的狀況  
  
### Version 0.0.27  
#### 2016/8/27  
* 排除簡體中文 CSV 匯入指定編碼會有亂碼的狀況  
  
### Version 0.0.26  
#### 2016/8/26  
* 修正IE8中Textbox樣板的錯誤  
* 修正papaParse在IE8環境的錯誤問題  
  
### Version 0.0.25  
#### 2016/8/24  
* 修正非IE瀏覽器無法使用Csv to Json的功能  
  
### Version 0.0.24  
#### 2016/8/18  
* 修正GRID Sort的設定，設定Grid的sortable:true就可以讓所有欄位生效  
  
### Version 0.0.23  
#### 2016/8/17  
* 修正Bootstrap.min.js載入問題  
  
### Version 0.0.22  
#### 2016/8/17  
* 修正EXCEL轉JSON的問題  
  
### Version 0.0.21  
#### 2016/8/4  
* 修正 yo ssmvvm 產出問題  
  
### Version 0.0.20  
#### 2016/8/4  
* 更新UIExcelToJson及UIExcelToJsonOleDB增加CSV匯入功能  
* 增加UICKEditor  
* 更新UIAddBookmark功能，讓IE 11下可以直接加入我的最愛  
* 修正UISmartMenu的Bug  
* 修正UIThumbnail功能，增加動態overlay顯示資訊  

### Version 0.0.19  
#### 2016/7/28  
* 更新UIExcelToJson及UIExcelToJsonOleDB回傳資料增加fileName於callback功能的第二個回傳參數  
  
### Version 0.0.18  
#### 2016/6/8  
* 修正上傳檔案取得重複上傳結果的問題  
  
### Version 0.0.17  
#### 2016/6/3  
* 更新JQWidget到4.1.2版  
* 修正UIJqxGrid元件在多日期欄位的問題  
* 增加UIJqxGrid元件的欄位定義time  
* 修正元件編譯的設定並重新編譯所有元件，讓編譯的元件有map的功能  
* 修正程式產生功能的html定義，避免IE11的相容性檢視造成錯誤
* 修正程式產生功能的main定義，避免程式進行編譯時會發生編譯不全的問題
  
### Version 0.0.16  
#### 2016/5/5  
* UIDate、UIDateFromTo、UIMonth、UIMonthFromTo、UINumericBox、UINumericFromTo、UITextArea、UITextBox、UITime 增加 placeholder 及 cls (自訂class) 定義  
* UIDropDownList 增加 cls (自訂class) 定義  
  
### Version 0.0.15  
#### 2016/5/5  
* 更新 UITextBox 元件的樣板檔案  
  
### Version 0.0.14  
#### 2016/5/4  
* 修改 UITextBox 元件，增加 inputType 的屬性設定，可以設定密碼欄位  
* 增加 UIReCaptcha、UIAddBookmark、UILinkSet、UIMarquee、UIYoutubePlayer、UIAlert、UICarousel、UIePaper、UISmartMenu、UIThumbnail、UIInputButtonGroup 系統元件  
* 增加引用 base64.js 的程式庫  
* 修正 proxyPage 處理 IE8 的時候無法傳送 json 格式的資料  
* 增加 hotcar 改版的專案元件 UIHotSalerList、UICarList、UISalerList  
* 修正 UIPrintButton 的列印問題，多個報表會傳送最後一組設定  
* 修正 UIMenu 多餘的處理及標籤  
* 增加頁面初始化不顯示內容的處理  
* 增加 hotIndex.html 展示新元件的處理  
  
### Version 0.0.13  
#### 2016/4/7  
* 增加新元件UIExcelToJsonOleDB，使用方式請見template010.ie8.html範例程式  
  
### Version 0.0.12  
#### 2016/4/1  
* 修正IE8在起迄檢核的問題  
* 修正檢核處理，檢核失敗不觸動blur事件  
  
### Version 0.0.11  
#### 2016/3/30  
* 修正上傳錯誤的檔案類型時，檢核不會關閉執行中的遮罩  
* 修正檢核訊息在IE11位置錯誤地問題  
  
#### 2016/3/29  
* 修正Grid欄位的鎖定控制處理  
  
### Version 0.0.10
#### 2016/3/4  
* 修正SecureData.js中，exeMultiArr、exeMultiAppend、exeBatchArr、spExeBatchMultiArr的方法沒有辦法重用連線設定的問題
  
---  
### Version 0.0.9
#### 2016/3/4  
* 移除Grid 案件事件的Console.log處理  
  
---
#### 2016/3/3  
* 執行『 yo ssmvvm 』時，專案中的components目錄下的List不進行覆蓋  
  
---
### Version 0.0.8
#### 2016/03/01
* 修改SecureData.js的jsonToExcel、getSpToExcel增加轉CSV的功能  
  
---
### Version 0.0.7
#### 2016/02/25
* 增加jqxcombobox元件
* 修改PageLayout.js，增加收合指示icon

---
### Version 0.0.6
#### 2016/02/23 問題修正
* yo ssmvvm自動判斷appConfig.js是否存在，已存在就不進行覆蓋
* yo ssmvvm:program 子產生器，修正多層子目錄的路徑問題，目前最多可以有六層子目錄
* 更新SS.css，修正檢核訊息被其他控制項阻擋的問題
* 增加SSMvvm文件發布歷程 ==> History.md
* 增加新元件jqxcombobox

---  
#### 2016/02/22 問題修正
* UIJqxGrid.js增加引用jqxcalendar.js
* 修正PageLayout.js，Enter to tab 排除隱藏欄位，如果跳欄的結果是同一個欄位，就自動回到第一個欄位
* 增加jqxcombobox的元件

---  
#### 2016/02/01 功能擴增
SecureData Module 增加以下三個Api的呼叫
* exeMultiAppend
* exeBatchArr
* spExeBatchMultiArr
  
---
#### 2015/12/30 文件發布  
正式將SSMvvm文件對外開放查詢，目前開放查詢的網址如下：
http://wiki.searching-service.com/doc

