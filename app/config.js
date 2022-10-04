require.config({
  urlArgs: appSetting == null ? '' : (appSetting.debug ? 'bust=' + (new Date()).getTime() : ''),
  baseUrl: appSetting == null ? '../app' : appSetting.appBaseUrl, //未編譯設定
  //baseUrl: '../App',    //編譯第一層子目錄設定
  //baseUrl: '../../App',    //編譯第二層子目錄設定...以此類推
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

    "tmpl": "base/resources/scripts/tmpl.min",
    "load-image": "base/resources/scripts/load-image.all.min",
    "canvas-to-blob": "base/resources/scripts/canvas-to-blob.min",
    "load-image-meta": "base/resources/scripts/load-image-meta",
    "load-image-exif": "base/resources/scripts/load-image-exif",
    "load-image-ios": "base/resources/scripts/load-image-ios",

    "jquery.bootstrap-autohidingnavbar": "base/resources/scripts/jquery.bootstrap-autohidingnavbar",
    "jquery.signalR": "base/resources/scripts/jquery.signalR-2.2.0.min",

    "html5shiv": "base/resources/scripts/html5shiv.min",
    "respond": "base/resources/scripts/respond.min",
    "showdown": "base/resources/scripts/showdown.min",
    "highlight": "base/resources/scripts/highlight.pack",

    "base64": "base/resources/scripts/base64",
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

    //swiper
    "swiper": "utils/swiper-bundle.min"
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
    'WebApiClient': {
      deps: ['jQuery']
    },
    'Common': {
      deps: ['jQuery', 'Application']
    },
    'Check': {
      deps: ['jQuery']
    },
    'Data': {
      deps: ['jQuery']
    },
    'Grid': {
      deps: ['jQuery']
    },
    'i18n': {
      deps: ['jQuery']
    },
    'Upload': {
      deps: ['jQuery']
    },
    'Date': {
      deps: ['jQuery']
    },
    'Application': {
      deps: ['jQuery']
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
    'showdown-prettify': {
      deps: ['showdown']
    }
  },
  waitSeconds: 0
});

define(function (require) {
//    require 必要的Module
  require('bootstrap');
  require('Application');
  // require('Swiper');

  var common = require('Common');

  //swiper-bundle.css
  common.loadCss([
    {
      id: 'swiperBundleCss',
      uri: SS.app.baseUrl + 'css/swiper-bundle.css'
    }
  ])
  if (!$('#bootstrapCss')[0]) {
    common.loadCss([
      {
        id: 'bootstrapCss',
        uri: SS.app.baseUrl + 'app/base/resources/css/bootstrap.min.css'
      },
      {
        id: 'bootstrapThemeCss',
        uri: SS.app.baseUrl + 'app/base/resources/css/bootstrap-theme.min.css'
      }
    ]);
  }

  //因為ko.mapping已經有require ko的機制，ko載入改在ko.mapping中進行
  window.ko.mapping = require('ko.mapping');
  window.moment = require('moment');

  var date = new Date();
  date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
  document.cookie = "Token=" + SS.ssapi.token + "; expires=" + date.toGMTString() + "; path=/";
  SS.app.baseUrl = appSetting.baseUrl != null ? appSetting.baseUrl : SS.app.baseUrl;
});
