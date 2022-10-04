({
    modules: [  //編譯的設定維護在這裡
        //專案元件編譯設定
        {name: "components/viewmodels/TitleBarHLC"},

        //開發程式編譯設定
        {name: "main/template010"}
    ],
    baseUrl: "app",
    paths: {
        'knockout': 'base/resources/scripts/knockout-3.4.0',
        'ko.validation': 'base/resources/scripts/knockout.validation.min',
        'ko.mapping': 'base/resources/scripts/knockout.mapping.2.4.1.debug',

        'jQuery': 'base/resources/scripts/jquery-1.11.3.min',
        'jQuery.i18n': 'base/resources/scripts/jquery.i18n.properties-min-1.0.9',
        'jQuery.XDomainRequest': 'base/resources/scripts/jQuery.XDomainRequest',
        'ajaxLoader': 'base/resources/scripts/ajaxLoader',
        'jstorage': 'base/resources/scripts/jstorage.min',
        "moment": "base/resources/scripts/moment",
        "bootstrap": "base/resources/scripts/bootstrap.min",

        "jquery.smartmenus": "base/resources/scripts/jquery.smartmenus.min",
        "jquery.smartmenus.bootstrap": "base/resources/scripts/jquery.smartmenus.bootstrap.min",

        "jquery.ui.widget": "base/resources/scripts/jquery.ui.widget",
        "tmpl": "base/resources/scripts/tmpl.min",
        "load-image": "base/resources/scripts/load-image.all.min",
        "canvas-to-blob": "base/resources/scripts/canvas-to-blob.min",
        "jquery.blueimp-gallery": "base/resources/scripts/jquery.blueimp-gallery.min",
        "blueimp-helper": "base/resources/scripts/blueimp-helper",
        "blueimp-gallery": "base/resources/scripts/blueimp-gallery",
        "blueimp-gallery-video": "base/resources/scripts/blueimp-gallery-video",
        "jquery.iframe-transport": "base/resources/scripts/jquery.iframe-transport",
        "jquery.fileupload": "base/resources/scripts/jquery.fileupload",
        "jquery.fileupload-process": "base/resources/scripts/jquery.fileupload-process",
        "jquery.fileupload-image": "base/resources/scripts/jquery.fileupload-image",
        "jquery.fileupload-audio": "base/resources/scripts/jquery.fileupload-audio",
        "jquery.fileupload-video": "base/resources/scripts/jquery.fileupload-video",
        "load-image-meta": "base/resources/scripts/load-image-meta",
        "load-image-exif": "base/resources/scripts/load-image-exif",
        "load-image-ios": "base/resources/scripts/load-image-ios",
        "jquery.fileupload-validate": "base/resources/scripts/jquery.fileupload-validate",
        "jquery.fileupload-ui": "base/resources/scripts/jquery.fileupload-ui",
        "jquery.browser": "base/resources/scripts/jquery.browser.min",
        "jquery.xdr-transport": "base/resources/scripts/jquery.xdr-transport",

        "jquery.bootstrap-autohidingnavbar": "base/resources/scripts/jquery.bootstrap-autohidingnavbar",
        "jquery.signalR": "base/resources/scripts/jquery.signalR-2.2.0.min",

        "html5shiv": "base/resources/scripts/html5shiv.min",
        "respond": "base/resources/scripts/respond.min",
        "showdown": "base/resources/scripts/showdown.min",
        "highlight": "base/resources/scripts/highlight.pack",

        //JQWidget
        "jqx-all": "base/resources/scripts/jqwidgets/jqx-all",
        "jqxgettheme": "base/resources/scripts/jqwidgets/gettheme",
        "jqxcore": "base/resources/scripts/jqwidgets/jqxcore",
        "jqxdata": "base/resources/scripts/jqwidgets/jqxdata",
        "jqxdraw": "base/resources/scripts/jqwidgets/jqxdraw",
        "jqxchart.core": "base/resources/scripts/jqwidgets/jqxchart.core",
        "jqxscrollbar": "base/resources/scripts/jqwidgets/jqxscrollbar",
        "jqxmenu": "base/resources/scripts/jqwidgets/jqxmenu",
        "jqxnavigationbar": "base/resources/scripts/jqwidgets/jqxnavigationbar",
        "jqxbuttons": "base/resources/scripts/jqwidgets/jqxbuttons",
        "jqxwindow": "base/resources/scripts/jqwidgets/jqxwindow",
        "jqxinput": "base/resources/scripts/jqwidgets/jqxinput",
        "jqxdropdownlist": "base/resources/scripts/jqwidgets/jqxdropdownlist",
        "jqxlistbox": "base/resources/scripts/jqwidgets/jqxlistbox",
        "jqxknockout": "base/resources/scripts/jqwidgets/jqxknockout",
        "jqxcheckbox": "base/resources/scripts/jqwidgets/jqxcheckbox",
        "jqxdatetimeinput": "base/resources/scripts/jqwidgets/jqxdatetimeinput",
        "jqxnumberinput": "base/resources/scripts/jqwidgets/jqxnumberinput",
        "jqxcalendar": "base/resources/scripts/jqwidgets/jqxcalendar",
        "jqxtooltip": "base/resources/scripts/jqwidgets/jqxtooltip",
        "jqxexpander": "base/resources/scripts/jqwidgets/jqxexpander",
        "jqxdocking": "base/resources/scripts/jqwidgets/jqxdocking",
        "jqxpanel": "base/resources/scripts/jqwidgets/jqxpanel",
        "jqxtree": "base/resources/scripts/jqwidgets/jqxtree",
        "jqxcombobox": "base/resources/scripts/jqwidgets/jqxcombobox",
        "jqxdragdrop": "base/resources/scripts/jqwidgets/jqxdragdrop",

        "jqxgrid": "base/resources/scripts/jqwidgets/jqxgrid",
        "jqxgrid.selection": "base/resources/scripts/jqwidgets/jqxgrid.selection",
        "jqxgrid.sort": "base/resources/scripts/jqwidgets/jqxgrid.sort",
        "jqxgrid.edit": "base/resources/scripts/jqwidgets/jqxgrid.edit",
        "jqxgrid.pager": "base/resources/scripts/jqwidgets/jqxgrid.pager",
        "jqxgrid.columnsresize": "base/resources/scripts/jqwidgets/jqxgrid.columnsresize",
        "jqxgrid.aggregates": "base/resources/scripts/jqwidgets/jqxgrid.aggregates",
        "jqxglobalize": "base/resources/scripts/jqwidgets/globalization/globalize",
        "jqxglobalize.culture.ZH-TW": "base/resources/scripts/jqwidgets/globalization/globalize.culture.ZH-TW",
        "jqxglobalize.culture.ZH-CN": "base/resources/scripts/jqwidgets/globalization/globalize.culture.ZH-CN",

        "jquery.marquee": "base/components/resources/scripts/jquery.marquee.min",
        "jquery.royalslider": "base/components/resources/scripts/jquery.royalslider.min",
        "base64": "base/resources/scripts/base64",
        "jquery.scrolltofixed": "base/components/resources/scripts/jquery-scrolltofixed-min",
        "ckeditor": "base/components/resources/scripts/CKEditor/ckeditor",
        "papaParse": "base/components/resources/scripts/papaparse.min",

        //SS Library
        "WebApiClient": "base/utils/WebApiClient",
        "Common": "base/utils/Common",
        "Check": "base/utils/Check",
        "Data": "base/utils/Data",
        "Grid": "base/utils/Grid",
        "Grid.DropDownList": "base/utils/Grid.DropDownList",
        "Grid.Date": "base/utils/Grid.Date",
        "Grid.Numeric": "base/utils/Grid.Numeric",
        "i18n": "base/utils/i18n",
        "Upload": "base/utils/Upload",
        "Application": "base/utils/Application",
        "Mask": "base/utils/Mask",
        "KoCustomLoader": "base/utils/KoCustomLoader",
        "KoCustomBinding": "base/utils/KoCustomBinding",
        "KoValidation": "base/utils/KoValidation",
        "RegisterComponents": "base/utils/RegisterComponents",
        "KoOperation": "base/utils/KoOperation",
        "ModelToViewModel": "base/utils/ModelToViewModel",
        "ControlAttributes": "base/utils/ControlAttributes",
        "SmartMenu": "base/utils/SmartMenu",
        "KoGenerateViewModel": "base/utils/KoGenerateViewModel",
        "PostMessage": "base/utils/PostMessage",
        "SecureData": "base/utils/SecureData",
        "Report": "base/utils/Report",

        //ComponentList
        "baseComponentList": "base/components/List",
        "componentList": "components/List",

        //appSetting
        "appSetting": "main/AppSetting",
        'proxyPageAppSetting': "base/main/proxyPageAppSetting",
        'subAppSetting': "main/subFolder/AppSetting"
    },
    shim: {
        'knockout': {
            exports: 'ko'
        },
        'ko.mapping': {
            exports: 'ko.mapping'
        },
        'ko.validation': {
            deps: ['knockout']
        },
        'jQuery.XDomainRequest': {
            deps: ['jQuery']
        },
        'jstorage': {
            //deps: ['jQuery']
        },
        'jqxcore': {
            //deps: ['jQuery']
        },
        'jqxdata': {
            deps: ['jqxcore']
        },
        'jqxdraw': {
            deps: ['jqxcore']
        },
        'jqxchart.core': {
            deps: ['jqxcore']
        },
        'jqxbuttons': {
            deps: ['jqxcore']
        },
        'jqxscrollbar': {
            deps: ['jqxbuttons']
        },
        'jqxmenu': {
            deps: ['jqxscrollbar']
        },
        'jqxnavigationbar': {
            deps: ['jqxcore']
        },
        'jqxwindow': {
            deps: ['jqxcore']
        },
        'jqxinput': {
            deps: ['jqxcore']
        },
        'jqxtree': {
            deps: ['jqxpanel', 'jqxdata']
        },
        'jqxgrid': {
            deps: [
                'jqxdata',
                'jqxmenu',
                'jqxcheckbox',
                'jqxlistbox',
                'jqxdropdownlist',
                'jqxnumberinput',
                'jqxcalendar'
            ]
        },
        'jqxdropdownlist': {
            deps: ['jqxcore']
        },
        'jqxlistbox': {
            deps: ['jqxcore']
        },
        'jqxknockout': {
            deps: ['jqxcore']
        },
        'jqxcheckbox': {
            deps: ['jqxcore']
        },
        'jqxdatetimeinput': {
            deps: ['jqxcore']
        },
        'jqxnumberinput': {
            deps: ['jqxcore']
        },
        'jqxcalendar': {
            deps: ['jqxdatetimeinput']
        },
        'jqxtooltip': {
            deps: ['jqxcore']
        },
        'jqxexpander': {
            deps: ['jqxcore']
        },
        'jqxpanel': {
            deps: ['jqxscrollbar']
        },
        'jqxdocking': {
            deps: ['jqxwindow']
        },
        'jqxgettheme': {
            deps: ['jqxcore']
        },
        'jqxdragdrop': {
          deps: ['jqxcore']
        },
        'jqxgrid.selection': {
            deps: ['jqxgrid']
        },
        'jqxgrid.sort': {
            deps: ['jqxgrid']
        },
        'jqxgrid.pager': {
            deps: ['jqxgrid']
        },
        'jqxgrid.columnsresize': {
            deps: ['jqxgrid']
        },
        'jqxgrid.aggregates': {
            deps: ['jqxgrid']
        },
        'jqxgrid.edit': {
            deps: [
                'jqxgrid',
                'jqxgrid.columnsresize',
                'jqxgrid.pager',
                'jqxgrid.sort',
                'jqxgrid.selection',
                'jqxgrid.aggregates'
            ]
        },
        'jqxglobalize': {
            deps: ['jqxcore']
        },
        'jqxcombobox': {
            deps: [
                'jqxlistbox',
                'jqxscrollbar',
                'jqxbuttons',
                'jqxdata',
                'jqxcore'
            ]
        },
        'jqxglobalize.culture.ZH-TW': {
            deps: ['jqxglobalize']
        },
        'jqxglobalize.culture.ZH-CN': {
            deps: ['jqxglobalize']
        },
        'WebApiClient': {
            deps: ['jQuery']
        },
        'Common': {
            //deps: ['jQuery', 'Application']
        },
        'Check': {
            //deps: ['jQuery']
        },
        'Data': {
            //deps: ['jQuery']
        },
        'Grid': {
            //deps: ['jQuery']
        },
        'i18n': {
            //deps: ['jQuery']
        },
        'Upload': {
            //deps: ['jQuery']
        },
        'Date': {
            //deps: ['jQuery']
        },
        'Application': {
            //deps: ['jQuery']
        },
        'Mask': {
            deps: ['Application']
        },
        'KoCustomLoader': {
            deps: ['knockout']
        },
        'KoCustomBinding': {
            deps: ['knockout']
        },
        'KoValidation': {
            deps: ['knockout']
        },
        'bootstrap': {
            deps: ['jQuery'],
            exports: "$.fn.popover"
        },
        'jquery.smartmenus': {
            // deps: ['jQuery']
        },
        'jquery.smartmenus.bootstrap': {
            deps: ['jquery.smartmenus']
        },


        'jquery.ui.widget': {
            deps: ['jQuery']
        },
        //'tmpl': {
        //    deps: ['jquery.ui.widget']
        //},
        //'load-image': {
        //    deps: ['tmpl']
        //},
        //'canvas-to-blob': {
        //    deps: ['tmpl']
        //},
        //'jquery.blueimp-gallery': {
        //    deps: ['canvas-to-blob']
        //},
        'jquery.iframe-transport': {
            deps: ['jquery.ui.widget']
        },
        'jquery.fileupload': {
            deps: ['jquery.iframe-transport']
        },
        'jquery.fileupload-process': {
            deps: ['jquery.fileupload']
        },
        'jquery.fileupload-image': {
            deps: ['jquery.fileupload-process']
        },
        'jquery.fileupload-audio': {
            deps: ['jquery.fileupload-image']
        },
        'jquery.fileupload-video': {
            deps: ['jquery.fileupload-audio']
        },
        'jquery.fileupload-validate': {
            deps: ['jquery.fileupload-video']
        },
        'jquery.fileupload-ui': {
            deps: ['jquery.fileupload-validate']
        },
        'showdown-prettify': {
            deps: ['showdown']
        }
    },
    dir: "app/build/app",
    skipDirOptimize: true,
    keepBuildDir: false,
    generateSourceMaps: true,
    preserveLicenseComments: false,
    optimize: 'uglify2',
    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: false,
        max_line_length: 0,
        //How to pass uglifyjs defined symbols for AST symbol replacement,
        //see "defines" options for ast_mangle in the uglifys docs.
        defines: {
            DEBUG: ['name', 'false']
        },
        //Custom value supported by r.js but done differently
        //in uglifyjs directly:
        //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
        no_mangle: false
    }
})
