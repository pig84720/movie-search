/**
 * Created by jerryhuang on 15/7/30.
 */
define(function (require) {
    return {
        textbox: {
            value: '',
            label: '',
            maxlength: 999,
            width: '145px',
            labelWidth: '120px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            unitLabel: '',
            allowNumber: false,
            allowEnglish: false,
            inputType: '',
            placeholder: '',
            cls: '',
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
            }
        },
        textarea: {
            value: '',
            label: '',
            maxlength: 999,
            rows: 3,
            cols: 10,
            width: '145px',
            labelWidth: '120px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            unitLabel: '',
            wordCount: 0,
            placeholder: '',
            cls: '',
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
            }
        },
        ckeditor: {
            id: 'editor1',
            value: '',
            label: '',
            maxlength: 999,
            rows: 3,
            cols: 10,
            width: '145px',
            labelWidth: '120px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            unitLabel: '',
            wordCount: 0,
            cls: '',
            config: {},
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
            }
        },
        numeric: {
            value: '',
            label: '',
            digit: 0,
            maxlength: 18,
            width: '145px',
            labelWidth: '120px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            unitLabel: '',
            placeholder: '',
            cls: '',
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
            }
        },
        month: {
            value: '',
            label: '',
            maxlength: 6,
            width: '70px',
            labelWidth: '120px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            unitLabel: '',
            placeholder: '',
            cls: '',
            event: {
                keypress: function () {
                },
                focus: function () {
                },
                blur: function () {
                },
                change: function () {
                },
                click: function () {
                }
            }
        },
        date: {
            value: '',
            label: '',
            maxlength: 8,
            width: '90px',
            labelWidth: '120px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            unitLabel: '',
            placeholder: '',
            cls: '',
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
            }
        },
        time: {
            value: '',
            label: '',
            maxlength: 4,
            width: '40px',
            labelWidth: '120px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            unitLabel: '',
            placeholder: '',
            cls: '',
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
            }
        },
        dropdownlist: {
            value: '',
            label: '',
            options: [],
            optionsText: 'text',
            optionsValue: 'value',
            optionsCaption: '請選擇',
            width: '',
            labelWidth: '120px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            unitLabel: '',
            cls: '',
            event: {
                focus: function () {
                },
                blur: function () {
                },
                change: function () {
                },
                click: function () {
                }
            }
        },
        jqxcombobox: {
            id: '',
            value: '',
            label: '',
            options: [],
            optionsText: 'text',
            optionsValue: 'value',
            width: '',
            labelWidth: '120px',
            boxWidth: '120px',
            boxHeight: '25px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            unitLabel: '',
            event: {
                bindingComplete: function (event) {
                },
                checkChange: function (event) {
                },
                close: function (event) {
                },
                change: function (event) {
                },
                open: function (event) {
                },
                select: function (event) {
                },
                unselect: function (event) {
                }
            }
        },
        checkbox: {
            value: false,
            label: '',
            labelWidth: '120px',
            itemName: 'checkbox item name',
            itemNameWidth: '70px',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            event: {
                click: function () {
                    return true;
                }
            }
        },
        checkboxlist: {
            value: ['01', '02'],
            label: '',
            labelWidth: '120px',
            itemListWidth: '70px',
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
                    return true;
                }
            }
        },
        radiolist: {
            value: '02',
            label: '',
            labelWidth: '120px',
            itemListWidth: '70px',
            groupName: 'radiobutton',
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
                    return true;
                }
            }
        },
        button: {
            label: '',
            width: '',
            ui: 'actionButton',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            event: {
                click: function () {
                }
            }
        },
        searchButton: {
            value: '',
            placeholder: '',
            label: '',
            width: '',
            ui: 'actionButton',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            event: {
                click: function () {
                }
            }
        },
        jqxGrid: {
            id: 'jqxGrid1',
            width: '',
            height: 200,
            selectionmode: 'singlerow',
            autoheight: false,
            editable: true,
            addEnable: true,
            delEnable: true,
            pageable: false,
            i18n: '',
            theme: '',
            defaultData: {},
            enterAddColumn: '',
            focusColumn: '',
            procdColumn: '',
            showstatusbar: false,
            showaggregates: false,
            statusbarheight: 25,
            sortable: false,
            addCallback: function (data, row) {
            },
            delCallback: function (data, row) {
            },
            columns: [
                {
                    type: 'serial',
                    text: '編號',
                    width: 40
                },
                {
                    type: 'serial',
                    text: '欄位一',
                    width: 100
                },
                {
                    type: 'serial',
                    text: '欄位二',
                    width: 100
                },
                {
                    type: 'serial',
                    text: '欄位三',
                    width: 100
                }
            ],
            cellbeginedit: function (row, datafield, columntype, value) {
                return true;
            },
            cellsrenderer: function (row, datafield, value, defaultHtml) {
                return defaultHtml;
            }
        },
        controlButton: {
            label: '',
            id: 'controlButton',
            iconClass: 'glyphicon-star',
            buttonClass: 'btn-info',
            isEnable: true,
            isVisible: true,
            click: function () {
                console.log('未設定controlButton『按鈕』的click事件！！');
            },
            itemList: []
        },
        excelToJson: {
            label: '',
            width: '120px',
            ui: 'btn-success',
            serviceUrl: SS.service.baseUrl,
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            isCsv: false,
            csvHeader: false,
            csvEncoding: 'big5',
            callback: function (data) {
                console.log(data);
            }

        },
        uploadFile: {
            label: '',
            width: '120px',
            ui: 'btn-success',
            serviceUrl: SS.service.baseUrl,
            uploadPath: 'upload',
            extFileLimit: [],
            setFileName: function () {
                return (new Date()).getTime().toString();
            },
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            isScale: false,
            scaleSetting: {maxSize: 1024, quality: 0.7},
            callback: function (data) {
                console.log(data);
            },
            openCallback: function () {
            },
            uploadApi: '',
            multiple: false
        },
        printButton: {
            id: '',
            label: '',
            width: '120px',
            ui: 'btn-success',
            serviceUrl: SS.service.baseUrl,
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            reportPath: '',
            reportId: '',
            reportVar: [],
            defaultReportType: [],
            validationCallback: function () {
                return true;
            }

        },
        jqxTree: {
            id: '',
            width: '100%',
            data: [],
            itemId: 'id',
            parentId: 'parentid',
            isVisible: true,
            itemMapping: [
                {name: 'text', map: 'label'},
                {name: 'path', map: 'value'}
            ],
            onExpand: function (item, args) {
            },
            onCollapse: function (item, args) {
            },
            onSelect: function (item, args) {
            }
        },
        marquee: {
            id: 'testMarquee',
            width: '360px',
            modalSize: 'modal-lg',
            modalHeight: '500px',
            cls: 'marqueeCss',
            kaUrlItems: [
                {
                    title: '測試訊息標題1測試訊息標題1測試訊息標題1測試訊息標題1...',
                    url: 'http://www.google.com.tw',
                    target: '_self',
                    content: '',
                    type: 'open'
                },
                {
                    title: '測試訊息標題2測試訊息標題2測試訊息標題2測試訊息標題2測試訊息標題2...',
                    url: 'http://www.google.com.tw',
                    target: '_blank',
                    content: '',
                    type: 'open'
                },
                {
                    title: '測試訊息標題3測試訊息標題3測試訊息標題3測試訊息標題3測試訊息標題3測試訊息標題3...',
                    url: 'http://www.google.com.tw',
                    target: '',
                    content: '',
                    type: 'inline'
                }
            ],
            click: function () {
            }
        },
        inputButtonGroup: {
            value: '',
            placeholder: '請輸入...',
            label: 'Go',
            width: '',
            buttonWidth: '',
            ui: 'actionButton',
            isEnable: true,
            hasFocus: false,
            isVisible: true,
            event: {
                click: function () {
                }
            }
        },
        addBookmark: {
            triggerType: 'link',
            label: '',
            width: '',
            ui: 'actionButton',
            bookmarkTitle: '',
            bookmarkUrl: '',
            cls: 'addBookmarkCss',
            isEnable: true,
            isVisible: true,
            click: function () {
            }
        },
        alert: {
            id: '',
            ui: 'alert-warning',
            title: '警告',
            value: '測試訊息...',
            isVisible: false,
            autoDismiss: true
        },
        linkItem: {
            itemNo: '0',
            title: '',
            url: 'about:blank',
            target: '_blank',
            content: '',
            triggerType: 'open',
            modalSize: 'modal-lg',
            modalHeight: '500px',
            click: function () {
            }
        },
        epaper: {
            id: 'epaper',
            label: '訂閱電子報',
            modalSize: 'modal-lg',
            registUi: 'btn-info',
            registTitle: '訂閱電子報',
            registMessage: '每月發送的電子報與不定期發送的活動快訊 EDM，提供您更即時的資訊。',
            registPlaceholder: '請輸入您的E-Mail:',
            registLabel: '立即訂閱',
            registWidth: '100%',
            registButtonWidth: '120px',
            registClick: function () {
            },
            removeUi: 'btn-info',
            removeTitle: '退訂電子報',
            removeMessage: '一但選擇退訂電子報，您很可能會錯過相關活動與最新資訊。',
            removePlaceholder: '請輸入您的E-Mail:',
            removeLabel: '我要退訂',
            removeWidth: '100%',
            removeButtonWidth: '120px',
            removeClick: function () {
            }
        },
        youtubePlayer: {
            id: 'youtubePlayer',
            width: '100%',
            height: null,
            playerVars: {'autoplay': 1, 'controls': 1, 'autohide': 1, 'wmode': 'opaque'},
            filmList: ['Z4vARWLOzUI', '8w4iI51FhAE'],
            playIndex: 0
        },
        linkset: {
            width: '360px',
            modalSize: 'modal-lg',
            modalHeight: '500px',
            cls: 'linksetCss',
            align: 'vertical',
            kaUrlItems: [
                {
                    title: '測試訊息標題1測試訊息標題1...',
                    url: 'http://www.google.com.tw',
                    target: '_self',
                    content: '',
                    type: 'open'
                },
                {
                    title: '測試訊訊息標題2測試訊息標題2...',
                    url: 'http://www.google.com.tw',
                    target: '_blank',
                    content: '',
                    type: 'open'
                },
                {
                    title: '測試訊3測試訊息標息標題3...',
                    url: 'http://www.google.com.tw',
                    target: '',
                    content: '',
                    type: 'inline'
                }
            ],
            click: function () {
            }
        },
        recaptcha: {
            id: 'recaptcha',
            label: '驗證',
            labelWidth: '120px',
            isVisible: true,
            verifyResult: false,
            siteKey: '6LfP8R4TAAAAAFeALVX6-4E1brFHeBQTMIe9LpPA',
            theme: '',
            callback: function () {
                console.log('recaptcha need to add callback function!');
            },
            expireCallback: function () {
                console.log('recaptcha need to add expireCallback function!');
            }
        }
    };
});