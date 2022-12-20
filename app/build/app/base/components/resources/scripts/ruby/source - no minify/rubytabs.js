/**
 * RUBYTABS JQUERY PLUGIN
 * @package         RubyTabs
 * @author          HaiBach
 * @link            http://haibach.net/rubytabs
 * @version         1.5
 * @lastUpdate      16-10-2016
 */


(function($) {
'use strict';


/**
 * INITIALIZE GLOBAL VARIABLES IN JAVASCRIPT
 */
window.rt01MODULE = window.rt01MODULE || {};
if( !window.rt01VA ) {

    window.rt01VA = {
        "rubyName"  : "rubytabs",
        "rubyData"  : "tabs",
        "namespace" : "rt01",

        "$ruby"     : $(),
        "numID"     : 0
    };

    /**
     * OPTIONS DEFAULTS
     *  + Upto 300 options
     */
    rt01VA.optsDefault = {
        "tagCanvas"     : "div",
        "nameCanvas"    : "canvas",
        "nameViewport"  : "viewport",
        "nameSlide"     : "slide",
        "nameImageBack" : "imgback",
        "nameImageLazy" : "img",
        "nameNav"       : "nav",
        "namePag"       : "pag",
        "nameCap"       : "cap",
        "nameNext"      : "nav-next",
        "namePrev"      : "nav-prev",
        "namePlay"      : "playpause",
        "nameTimer"     : "timer",
        "nameLayer"     : "layer",
        "nameOverlay"   : "overlay",
        "nameDataSlide" : "slide",

        // Name to be replaced in "data-src" on <img> tag using image lazyload function.
        "nameDataLazy"  : "src",

        // The proper name for each rubytabs in the site. Used to link components markup outside with main markup of rubytabs.
        "name"          : null,
        "current"       : "cur",
        "actived"       : "actived",
        "deactived"     : "deactived",





        /**
         * OPTIONS TYPE OF ELEMENTS
         */
        // Change multiple options at once, like shortcut to a group priority options. included value: ["slider", "tabs"]
        "optionsPlus"   : "tabs",

        // Setup main effect.
        "fx"            : "line",

        // Easing of main effect.
        "fxEasing"      : "easeOutCubic",

        // Setup CSS One effect.
        "cssOne"        : "roDeal",

        // Setup name for out effect of CSS Two effects.
        "cssTwoOut"     : "pullOut",

        // Setup name for in effect of CSS Two effects.
        "cssTwoIn"      : "pushIn",
        "cssThreePrev"  : "pullIn",
        "cssThreeNext"  : "pushIn",

        // Setup name for CSS Four effect when swap to next slide out.
        "cssFourNextOut": "roEdgeLeftOut",

        // Setup name for CSS Four effect when swap to next slide in.
        "cssFourNextIn" : "roEdgeRightIn",

        // Setup name for CSS Four effect when swap to previous slide out.
        "cssFourPrevOut": "roEdgeRightOut",

        // Setup name for CSS Four effect when swap to previous slide in.
        "cssFourPrevIn" : "roEdgeLeftIn",

        // Easing of effect in CSS One, Two, Four effects.
        "cssEasing"     : null,

        // Position and size of imageback to fit the viewport slider. List value: "center", "fill", "fit", "stretch", "tile".
        "imagePosition" : null,

        // Swipe direction, default is horizontal. List of value : "hor", "ver"
        "direction"     : "hor",

        // Enable responsive and settings width-begin(or maximum) of the slider.
        "width"         : null,

        // Height of the slider. By default, it depends on the height image-background per slide.
        "height"        : null,

        // Width of center slide compared to width of slider.
        // + Value ​​in range [0-1] is the percentage(%) of slide compared to the slider.
        // + Value greater than 1 is unit "px".
        // + Support "range" features, value is array : [width slide, from, to]
        "widthSlide"    : 1,

        // Set width of image-background in the range width of the page.
        // + Support multiple range, value is array : [width slide, from, to]
        "widthRange"    : null,

        // Surrounding areas of image-background to slide in th range width of the page.
        // + Support multiple range, value is array : [value, from, to]
        "padding"       : 0,

        // Distance between slides. Unit is px and supports distances left and right. Example:
        // + "margin": [10, 20] → 10px is left distance, 20px is right distance
        // + "margin": 30 → 30px is left and right distance
        "margin"        : 30,

        // Duration of the effect. Unit millisecond.
        "speed"         : 400,
        "speedHeight"   : 400,

        // Duration check and update rubytabs
        "delayUpdate"   : 1000,

        // Perspective property for layer
        "perspective"   : 800,

        // List of value : "auto", number
        "slot"          : "auto",

        // List of value : "visible", number >= 1
        "stepNav"       : 1,
        "stepPlay"      : 1,

        // Set the slide will appear as rubytabs initialization, ID of slides started with 0. List of value option:
        // + "begin": begin position, equivalent to idBegin = 0
        // + "center": center position. If the total number of slides is an even number, then the position will be located near the left side. Example: Num of slide is 6, value of idBegin is 2
        // + "centerRight": similar "center" value, but located near the right side. Example: Num of slide is 6, value of idBegin is 3
        // + "end": end position
        // + 0 1 2 ...: specific value of the ID slide
        "idBegin"       : 0,

        // Set rubytabs initialized only on the specified device. List value: "desktop", "mobile" and "all".
        "showBy"        : "all",

        // Set rubytabs will appear in range width of the site. Range-width have 2 values "min-width" and "max-width"(optional).
        "showInRange"   : 0,

        // In coverscreen - fullscreen mode, the heigth of slider equal to the height of window browser minus the height of offset objects.
        "offsetBy"      : null,

        // Event Wheel, list of value: ["auto", "both", false]
        "wheel"         : false,





        /**
         * SETUP WITH BOOLEAN VALUE
         */
        // Option exclusively for HTML5 data. RubyTabs is automatically initialized after markup have loaded.
        "isAutoInit"    : true,

        // Turn on/off layout center in effect "line".
        "isCenter"      : true,

        // Turn on/off navigation control: next/previous button.
        "isNav"         : false,

        // Turn on/off pagination control: tabslist, thumbnail image.
        "isPag"         : true,

        // Turn on/off caption each slide.
        "isCap"         : false,

        // Turn on/off swipe gestures on rubytabs
        "isSwipe"       : true,
        "isLoop"        : true,
        "isAnimRebound" : true,

        // Turn on/off keyboard navigation, left/right arrow on keyboard to go prev/next slide.
        "isKeyboard"    : false,
        "isOverlay"     : false,
        "isViewGrabStop": false,
        "isFullscreen"  : false,
        "isSlideshow"   : false,

        // Turn on/off deep-linkinging features.
        "isDeeplinking" : false,

        // Turn on/off cookie features.
        "isCookie"      : false,
        "isLoader"      : true,
        "isParallaxScroll" : false,
        "isLayerParallax"  : false,
        "isMask"        : "auto",





        /**
         * OBJECT OPTIONS
         */

        /**
         * LOADING
         */
        "load"          : {
                            // The number of slides(tabs) preloaded before the rubytabs appears.
                            // List of value : type number, "all"
                            "preload"       : 1,

                            // The number next slides will load after rubytabs appears, the slides will load in parallel.
                            "amountEachLoad": 2,

                            //  Turn on/off only download the lazy objects (ImageBack, VideoIframe, IframeLazy ..) of selected slide.
                            "isLazy"        : true
                          },

        "swipe"         : {
                            // Easing for transition of effect after swipe end.
                            "easing"        : "easeOutQuint",

                            // Turn on/off swipe gestures in body content of tabs.
                            "isBody"        : true,

                            // Turn on/off auto swipe gestures on pagination when the total size of pagItems larger size pagination.
                            "isAutoOnPag"   : true,
                            "isLiveEffect"  : true
                          },

        /**
         * OPTIONS FOR ONLY 1 SLIDE EXIST
         */
        "oneSlide"      : {
                            "isNav"         : false,
                            "isPag"         : true,
                            "isSwipe"       : false
                          },

        "className"     : {
                            "grab"          : ["grab", "grabbing"],
                            "swipe"         : ["", "swiping"],
                            "stop"          : ["stopLeft", "stopRight"]
                          },

        /**
         * RUBYANIMATE KEYFRAMES FOR RUBYTABS
         */
        "rubyAnimateKeyframes"   : {
                            "fadeOut"       : [{ "pos": 100, "opacity": 0 }],
                            "fadeIn"        : [{ "pos": 0, "opacity": 0 }]
                          },

        "rubyAnimateOne" : {
                            "fade" : {
                                "next" : [ "fadeOut", "fadeIn" ],
                                "prev" : [ "fadeOut", "fadeIn" ]
                            }
                          },

        /**
         * LIST NAME OF MATH EFFECTS
         *  + Random effect : "randomMath"
         */
        "fxMathName"    : [
                            "rectMove", "rectRun", "rectSlice",
                            "rubyFade", "rubyMove", "rubyRun", "rubyScale",
                            "zigzagRun",
                            "randomMath"
                          ],

        "coverflow3D"   : {
                            "widthSlide"  : 0.8,
                            "perspective" : 1200,
                            "zDeep"       : 600,
                            "rotate"      : 30,
                            "opacity"     : 1,
                            "isDeepMulti" : true
                          },

        "nav"           : {
                            "isEventTap"    : true,
                            "markup"        : "<div class='{ns}nav'><div class='{ns}nav-prev'>prev</div><div class='{ns}nav-next'>next</div></div>",
                            "markupOutside" : "<div class='{ns}nav-prev'>prev</div><div class='{ns}nav-next'>next</div>"
                          },

        /**
         * PAGINATION
         *  + Support direction, value : "hor", "ver"
         *  + Support position, value : "begin", "end"
         *  + Support align, value : "begin", "center", "end", "justify"
         *  + Support link thumbnail "data-thumbnail-link" on Imageback
         */
        "pag"           : {
                            // Type of pagination(tablist). List OF value : "thumbnail", "tabs", "bullet", "list".
                            "type"          : "tabs",

                            // Setup fixed width for pagItem. By default, the pagItem will get largest width in the pagItems.
                            "width"         : null,

                            // Setup fixed height for pagItem. By default, the pagItem will get largest height in the pagItems.
                            "height"        : null,
                            "minWidth"      : null,
                            "minHeight"     : null,
                            "maxWidth"      : null,
                            "maxHeight"     : null,

                            // Setup the direction of pagination. List of value : "hor", "ver".
                            "direction"     : "hor",

                            // Setup the position of pagination compared to the content tabs. List of value: "begin", "center".
                            "position"      : "begin",

                            // Align of pagItems compared to pagination. List of value: "begin", "center", "end", "justify".
                            "align"         : "begin",

                            // Time to transition of pagItem current automatically move to the center position.
                            "speed"         : 300,

                            // Easing transition of pagItem current automatically move to the center position.
                            "easing"        : "easeOutCubic",

                            // Setup width(horizontal direction) / height(vertical direction) of pagination compared to width/height of rubytabs.
                            // + "null": size of pagination depends on css.
                            // + "self": size pagination is equal to size all pagItems combined.
                            // + "full": size pagination is equal to size content of rubytabs.
                            "sizeAuto"      : "full",

                            // Get the size of each pagItem compared to the size of other pagItems. List of value: "self", "min", "max".
                            "typeSizeItem"  : "self",

                            // Event tap on pagItem
                            "isEventTap"    : true,

                            // Turn on/off the current pagItem automatically moves into the center position of pagination.
                            // Only for Tabs horizontal, also tabs vertical allways have ItemCur in center position
                            "isItemCurCenterWhenTap" : true,
                            "isJustifyWhenLarge"     : false,   // Kich thuoc tat ca items deu fit lai bang kich thuoc voi pagination

                            // Turn on/off navigation next/previous of pagItem.
                            "isArrow"       : true,

                            // Add tap event on navigation next/previous
                            "isTapOnArrow"  : true,

                            // Turn on/off mark of pagItem current. Supported animation.
                            "isMark"        : false,

                            // The size of mark depends on the size (can include "padding", "margin"..) pagItem current.
                            // List of value: "self", "padding", "border", "margin".
                            "sizeMarkTo"    : "border",

                            // Adding classes to the pagination markup.
                            "moreClass"     : null,

                            // Minimum width of RubyTabs to switch to horizontal direction.
                            "widthMinToHor" : 0,

                            // Minimum width of browser-document to switch to horizontal direction.
                            "rangeMinToHor" : 0,

                            // Event wheel for pagination, list of value : "auto", "both", false
                            "wheel"         : "auto",

                            "markupArrow"   : "<div class='{ns}pagarrow-item {ns}pagarrow-{dirs}'><div class='{ns}pagarrow-icon'></div></div>",
                            "markupMark"    : "<div class='{ns}pagmark'><div class='{ns}pagmark-item'></div></div>"

                          },

        "image"         : {
                            "isResponsive"  : true
                          },

        /**
         * IMAGEBACK
         *  + Support options only for Imageback by "data-imageback"
         */
        "imageback"     : {
                            // List of value : "center", "fill", "fit", "stretch", "tile"
                            "position"      : "center",
                            "isResponsive"  : true
                          },

        "video"         : {
                            "height"        : 480,
                            "isBtnPause"    : false,
                            "isPauseThenRemove" : false
                          },

        /**
         * VIDEOBACK
         *  + Support options only for Videoback by "data-videoback"
         */
        "videoback"     : {
                            // List of value : "fill", "fit"
                            "position"      : "fill",

                            // List of value : "fill", "fit"
                            "posterPosition": "fill",
                            "opacity"       : 0.3,
                            "isResponsive"  : true
                          },

        /**
         * HOTSPOT
         *  + Support RubyTween for hotspot
         *  + Support FxCSS for hotspot
         *  + Support Layer for hotspot
         *  + Support Responsive option for hotspot
         */
        "hotspot"       : {
                            "widthItem"     : null,
                            "sizeArea"      : 10,

                            // List of value : "top", "bottom", "left", "right"
                            "position"      : "top",

                            // Event to open hotspot. List of value : "tap", "hover"
                            "eventToOpen"   : 'tap',

                            "animIn"        : [{ "y": "100%", "opacity": 0 }, { "y": 0, "opacity": 1, "duration": 200 }],
                            "animOut"       : [{ "y": 0 }, { "y": "100%", "opacity": 0, "duration": 200 }],
                            "animTopIn"     : null,
                            "animTopOut"    : null,
                            "animBottomIn"  : null,
                            "animBottomOut" : null,
                            "animLeftIn"    : null,
                            "animLeftOut"   : null,
                            "animRightIn"   : null,
                            "animRightOut"  : null,

                            "markupPoint"   : "<div class='{ns}hspoint'></div>",
                            "isActivedAtFirst" : false,
                            "isResponsive"  : false
                          },

        /**
         * LAYER
         *  + x/y/z position supported string value : "top", "bottom", "left", "right"
         *  + x/y position supported short string value : "topOut", "bottomOut", "leftOut", "rightOut"
         */
        "layer"         : {
                            "width"         : null,
                            "height"        : null,
                            "count"         : 1,
                            "direction"     : "normal",
                            "duration"      : 400,
                            "delay"         : 0,
                            "easing"        : "easeOutQuad",

                            // List of value : "click", "hover"
                            "eventToPlay"   : null,

                            "isPlayWhenSlideActived" : true,
                            "isAutoPlay"    : true,
                            "isResponsive"  : true,
                            "isRandom"      : true
                          },

        /**
         * LAYER PARALLAX
         */
        "layerParallax" : {
                            "isParallax"    : true,
                            "radiusLevelValue"  : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                            "radiusLevel"   : 3,
                            "radius"        : null,

                            // List of value : "reverse", "same"
                            "direction"     : "reverse"
                          },

        "parallax"      : {
                            "scrollDirection"   : "same",
                            "scrollDepth"       : 80,
                            "scrollBgDepth"     : 80,
                            "scrollLayerDepth"  : 50,
                            "isScroll"          : false,
                            "isScrollLayerFade" : true
                          },

        "parallaxScroll" : {
                            "direction"     : "same",
                            "bgDepth"       : 80,
                            "layerDepth"    : 50,
                            "isLayerEnable" : true,
                            "isLayerFade"   : true
                          },

        "slideshow"     : {
                            "delay"         : 8000,

                            // List of value : "line" , "arc"
                            "timer"         : "arc",

                            // Turn on/off auto play slideshow at first
                            // Only actived false when have playpause button
                            "isAutoRun"     : true,
                            "isPlayPause"   : true,
                            "isTimer"       : true,
                            "isLoop"        : true,
                            "isHoverPause"  : false,

                            // Only play slideshow when rubytabs in the display area.
                            "isRunInto"     : false,
                            "isRandom"      : false
                          },

        "timerArc"      : {
                            "width"         : null,
                            "height"        : null,
                            "fps"           : 30,
                            "rotate"        : 0,

                            "radius"        : 14,
                            "weight"        : 4,
                            "stroke"        : "hsla(0,0%,0%,.6)",
                            "fill"          : "transparent",

                            "radiusOuter"   : 14,
                            "weightOuter"   : 2,
                            "strokeOuter"   : "hsla(0,0%,0%,.1)",
                            "fillOuter"     : "transparent"
                          },

        /**
         * FLICKR
         *  + Support get photo from URL
         *  + Support get photo from "Photo Recent", "Photo Album", "Photo Faves"
         *  + Support get photo depends on size
         *  + Support get source photo by "data-flickr"
         *  + Support get source photo by URL and photoID
         *  + Support get ID by "Path Name" instead of "NSID"
         */
        "flickr"        : {
                            "urlRequest"      : "https://api.flickr.com/services/rest/?method=flickr.{method}&api_key={key}{typeID}&format=json&nojsoncallback=1",
                            "apiKey"          : "a85720e2fbb21eccea51fcb75cb22184",

                            // List of value : number, "all"
                            "photoNum"        : 10,
                            "photoRecentNum"  : null,
                            "photoAlbumNum"   : null,
                            "photoFavesNum"   : null,

                            // List of value : "Square", "Large Square", "Thumbnail", "Small", "Small 320", "Medium", "Medium 640", "Medium 800", "Large", "Large 1600", "Large 2048", "Original"
                            "photoSize"       : "Large",

                            // List of value : "begin", "last", number
                            "photoPosition"   : "last",

                            "getPhotoRecentByUrl" : null,
                            "getPhotoAlbumByUrl"  : null,
                            "getPhotoFavesByUrl"  : null,

                            "recentID"        : null,
                            "albumID"         : null,
                            "favesID"         : null,
                            "isRandomPhoto"   : false,

                            "markupSlide"      : "<div><a class='{ns}imgback' data-flickr='{\"numID\": {numID}, \"photoID\": \"{photoID}\"}'>{photoTitle}</a>{markupInfo}</div>",
                            "markupInfo"       : "<div class='{ns}flickr-info' data-layer-animate='{infoLayer}'>{markupPhotoTitle}{markupAlbumTitle}{markupSplit}{markupAuthor}</div>",
                            "markupSplit"      : " | ",

                            "markupPhotoTitle" : "<a class='{ns}flickr-photo-title' href='{photoURL}'>{photoTitle}</a>",
                            "markupAlbumTitle" : "<a class='{ns}flickr-album-title' href='{albumURL}'>{albumTitle}</a>",
                            "markupAuthor"     : "<a class='{ns}flickr-author' href='{authorURL}'>{author}</a>",

                            "infoLayer"    : [
                                { "x": 20, "y": "100%{parent}" },
                                { "y": "100%{parent} - 100% - 20", "duration": 400 }
                            ],

                            "isInfo"           : true,
                            "isPhotoTitle"     : true,
                            "isAlbumTitle"     : true,
                            "isAuthor"         : true
                          },

        "markup"        : {
                            "loader"        : "<div class='{ns}loader'><svg class='{ns}loader-circular'><circle class='{ns}loader-path' cx='50%' cy='50%' r='20' fill='none' stroke-width='4' stroke-miterlimit='15'/></svg></div>",
                            "loaderThumb"   :"<div class='{ns}loader {ns}loader-small'><svg class='{ns}loader-circular'><circle class='{ns}loader-path' cx='50%' cy='50%' r='10' fill='none' stroke-width='3' stroke-miterlimit='15'/></svg></div>",

                            "ssControl"     : "<div class='{ns}ss-control'></div>",

                            // List of value : "ruby", "viewport", "nav", "ssControl"
                            "navInto"       : "viewport",
                            "pagInto"       : "ruby",
                            "ssControlInto" : "ruby",
                            "timerInto"     : "ssControl",
                            "playInto"      : "ssControl"
                          },

        /**
         * DEEP LINKING
         */
        "deeplinking"   : {
                            // Prefix 0 is name of rubytabs, support multi-liking on the same page.
                            // Prefix 1 is name of slide on that rubytabs.
                            "prefixDefault" : ["ruby", "slide"],

                            // Prefix of #hash combine with order of slide, begin by 0.
                            "prefix"        : null,

                            // Deeplinking auto convert ID of slide to #hash corresponds on URL
                            "isIDConvert"   : true,

                            // URL only change if slide have ID on dom
                            "isOnlyShowID"  : true
                          },

        /**
         * COOKIE
         */
        "cookie"        : {
                            // Unique name of cookie to stored rubytabs, avoid conflict with other cookies on different pages. Default is empty-string.
                            "name"          : "",

                            // Days storing of cookie on the browser
                            "days"          : 7
                          },

        // Options danh rieng cho thiet bi mobile
        "mobile"        : {
                            "speedHeight"   : null,
                            "direction"     : "hor"
                          },

        // Options danh rieng cho nhung browser khong ho tro CSS Transform
        "fallback"      : {
                            "markup" : {
                                "loader" : "<div class='{ns}loader {ns}loader-old'>loading</div>"
                            }
                          },

        "rev"           : ["erp"],          // ["omed", "ten.hcabiah"], ["eerf"], ["erp"]
        "versionBrand"  : "1",
        "version"       : "1.5"
    };










    /**
     * OPTIONS DEFAULT PLUS
     */
    rt01VA.optsPlus = {

        /**
         * OPTIONS PLUS MAC DINH CHO TABS
         */
        "tabs" : {},

        /**
         * OPTIONS PLUS DEFAULT FOR SLIDER
         */
        "slider" : {
            "margin"    : 0,
            "load"      : {
                            "isLazy"    : false
                          },

            "pag"       : {
                            "type"      : "thumbnail",
                            "position"  : "end",
                            "align"     : "center"
                          }
        },

        /**
         * OPTIONS PLUS MAC DINH CHO CAROUSEL
         */
        "carousel" : {
            "fx"         : "line",
            "speed"      : 600,
            "widthSlide" : 300,
            "margin"     : 15,

            "isCenter"   : false,
            "isLoop"     : false,
            "isPag"      : false,
            "isNav"      : true,

            "load"       : {
                            "isLazy": false
                           }
        }
    };











    /**
     * FUNCTION M
     */
    rt01VA.M = {

        /**
         * DISPLAY ERROR MESSAGES
         */
        Message : function(message, detail) {
            if( typeof console === 'object' && message !== undefined ) {
                var str = '['+ rt01VA.rubyName +': '+ message +']';

                if( !!detail ) str += ' -> '+ detail;
                console.warn(str);
            }
        },

        /**
         * CONVERT 'STRING' TO 'JSON'
         */
        StringToJson : function(str, messageError) {
            if( typeof str == 'string' ) {

                // Replace quotes to single quotes
                str = str.replace(/\u0027/g, '\u0022');


                /**
                 * PARSE 'STRING' TO 'JSON'
                 */
                try      { str = $.parseJSON(str) }
                catch(e) { rt01VA.M.Message(messageError) }
            }

            // Return value depending on each case
            return $.isPlainObject(str) ? $.extend(true, {}, str)
                                        : $.isArray(str) ? $.extend(true, [], str)
                                                         : {};
        },

        /**
         * CONVERT 'JSON' TO 'STRING'
         */
        JsonToString : function(json, messageError) {
            if( typeof json == 'object' ) {

                /**
                 * PARSE 'JSON' TO 'STRING'
                 */
                try      { json = JSON.stringify(json) }
                catch(e) { rt01VA.M.Message(messageError) }
            }
            return (typeof json == 'string') ? json : '';
        },










        /**
         * CONVERT VALUE TO NUMBER
         */
        PFloat : function(n) {

            // Check and convert to number float
            // Condition < 9007199254740992 : larger for incorrect results
            if( /^\-?\d*\.?\d+\w*$/g.test(n) ) {
                var n1 = parseFloat(n);
                if (n1 < 9007199254740992 ) return n1;
            }


            // Case : value Boolean
            else if( /^(true|on)$/g.test(n) ) return true;
            else if( /^(false|off)$/g.test(n) ) return false;
            return 0;
        },

        // Convert value to number integer
        PInt : function(v) { return /^\-?\d+/g.test(v) ? parseInt(v, 10) : 0; },










        /**
         * GET SIZE OF OJBECT
         *  + Get size not included css transformed
         *  + Size base on "offsetWidth", "offsetHeight"
         *  + Check getComputedStyle by document.defaultView otherwise error
         */
        SizeNoTransform : function($el, type, isMargin) {

            /**
             * CONDITONAL EXECUTION
             *  + First paramater $el : forced to Element Node
             */
            if( !($el && !!$el[0]) ) return 0;



            /**
             * INITIAL SETUP
             */
            var that    = this,
                el      = $el[0],
                style   = document.defaultView ? getComputedStyle(el) : el.currentStyle,

                isWidth = /Width/i.test(type),
                size    = el[isWidth ? 'offsetWidth' : 'offsetHeight'],

                padding = isWidth ? that.PFloat(style.paddingLeft) + that.PFloat(style.paddingRight)
                                  : that.PFloat(style.paddingTop) + that.PFloat(style.paddingBottom),

                border  = isWidth ? that.PFloat(style.borderLeftWidth) + that.PFloat(style.borderRightWidth)
                                  : that.PFloat(style.borderTopWidth) + that.PFloat(style.borderBottomWidth),

                margin  = isWidth ? that.PFloat(style.marginLeft) + that.PFloat(style.marginRight)
                                  : that.PFloat(style.marginTop) + that.PFloat(style.marginBottom);



            /**
             * SETUP SIZE DEPENDING ON EACH CASE
             */
            // Case : get size OuterWidth - OuterHeight
            if( /^Outer\w+/.test(type) ) {
                if( isMargin ) size += margin;
            }

            // Case : get size InnerWidth - InnerHeight
            else if( /^Inner\w+/.test(type) ) {
                size -= border;
            }

            // Case : get size Width - Height
            else if( /^(Width|Height)$/.test(type) ) {
                size -= border + padding;
            }

            // Return results
            return size;
        },

        Width       : function($el) { return this.SizeNoTransform($el, 'Width') },
        Height      : function($el) { return this.SizeNoTransform($el, 'Height') },
        InnerWidth  : function($el) { return this.SizeNoTransform($el, 'InnerWidth') },
        InnerHeight : function($el) { return this.SizeNoTransform($el, 'InnerHeight') },
        OuterWidth  : function($el, isMargin) { return this.SizeNoTransform($el, 'OuterWidth', isMargin) },
        OuterHeight : function($el, isMargin) { return this.SizeNoTransform($el, 'OuterHeight', isMargin) }
    };
}










/**
 * MAIN RUBYTABS PLUGIN
 */
$[rt01VA.rubyName] = function($ruby, OptsJS) {

    /**
     * GLOBAL VARIABLES IN THE PLUGIN
     */
    var cs  = {},
        va  = {
            $ruby   : $ruby,                                // Stored rubytabs object in variable
            $w      : $(window),
            $doc    : $(document),
            rubykey : Math.ceil( Math.random()*1e9 ),       // Rubykey : prevent conflicts when initialize multiple rubytabs
            ns      : rt01VA.namespace,                     // Namespace of the plugin
            data    : {},                                   // Stored all properties of the slides
            numNSID : 0                                     // Number of NSID in the plugin
        },
        is   = {},
        ti   = {},
        o    = {},      // Variable 'o' : merge all options Data + js + default options
        oo   = {},      // Variable 'oo' : store the initial options
        vava = {},
        isis = {},

        // Variable 'one' : support for module
        one = { 'cs': cs, 'o': o, 'oo': oo, 'va': va, 'is': is, 'ti': ti },

        $w = $(window), $doc = $(document),
        $canvas, $viewport,

        num, cssTf, i, j,
        divdiv = '<div/>';










    /**
     * INIT METHODS
     */
    var INIT = {

        Check : function() {

            M.Browser();                            // Browser detect -> located above nam o tren phuc vu cho proto.ajax
            M.CssName();                            // CSS: get prefixed css style
            M.FirstSetup();                         // Setup bien dau tien ki init Ruby
            cs.ev.trigger('init');                  // Callback event begin init



            /**
             * FIRST CHECK
             */
            if( NOISREV.Check() ) {

                /**
                 * NEXT CHECK
                 *  + Check inside the rubytabs with content
                 */
                if( is.DISPLAY ){
                    DISPLAY.SetupInit();
                }
                else {

                    // Display rubytabs if no module
                    is.showInRange = is.wake = true;
                    INIT.Ready();
                }
            }
            else $ruby.remove();
        },


        Ready : function() {
            cs.ev.trigger('ready');                             // Trigger event 'ready'
            $ruby.removeClass(va.ns + 'none');                  // Remove initially hidden rubytabs

            is.RUBYANIMATE && RUBYANIMATE.UpdateAllKeyframes(); // Update RubyAnimate keyframe into rubytabs
            RENDER.Structure();                                 // Ruby: create structure system
            PROP.Ruby();                                        // Ruby: get properties system
                                                                // -> located above 'PAG.RenderSelf' because need to 'is.pag'

            is.SLIDESHOW && SLIDESHOW.RenderControl();          // Slideshow : render markup
            is.TIMER && TIMER.Render();                         // Timer: render markup

            is.NAV && NAV.Render();                             // Navigation: render markup
            is.PAG && PAG.RenderSelf();                         // Pagination: render markup
            is.CAP && CAPTION.Render();                         // Caption: render markup

            PROP.Slides();                                      // Slide: properties, below 'PAG.RenderSelf' -> need to '$pagItem' defined
            RENDER.Other();                                     // Ruby: render other elements
            is.APIREMOTE && APIREMOTE.Init();                   // API remote control: initialize

            PROP.DeepLinkCookie();                              // Get ID initially by deeplinking and cookie -> need 'va.IDsOnNode'


            is.FLICKR && FLICKR.Init();
            LOAD.Way();                                         // Arrange the order of ID to load before after





            /**
             * DISPLAY RUBY INITIALLY
             *  + The function repeated in 'UPDATE.Resize()'
             */
            // Support for 'POSSIZE.CombineAtFirst()' + position of tabs vertical at first
            is.pag && !is.pagList && PAG.TypeSizeItem();

            // Insert 'init' class to detect rubytabs initialize
            $ruby.addClass(va.ns +'init');

            // Get size width of ruby
            SIZE.WidthForRuby();

            // Responsive: calculate padding & va.rate
            is.res && RESPONSIVE.UpdateVars();
            va.rateInit = va.rate;

            // Check & convert pagination horizontal -> vertical at first
            is.pag && PAG.VerToHor();
            POSSIZE.CombineAtFirst();




            /**
             * CHECK + LOAD LAYER IMAGE OF HOME
             *  + If no module Layer -> Setup load first slide
             */
            if( is.LAYER ) LAYER.LoadHomeBegin();
            else           LOAD.Next();
        },


        Load : function() {
            is.initLoaded = true;                               // Store rubytabs initially loaded
            cs.ev.trigger('loaded');                            // Trigger event 'loaded'

            is.pag && !is.pagList && PAG.TypeSizeItem();        // Support for 'POSSIZE.CombineAtFirst()' below + position tabs vertical at first

            is.res && is.fullscreen && FULLSCREEN.Variable();   // Fullscreeen: calculate padding + va.rate
            POSSIZE.CombineAtFirst();                           // Setup position & size at first (need height ruby if vertical direction)


            EVENTS.Setup();                                     // Arrange & setup the events
            EVENTS.LoadAll();                                   // Setup event loaded everything

            M.LastSetup();                                       // Setup everything left after initialize
            is.initEnd = true;                                  // Notify the initialization end


            if( is.LAYER ) {
                LAYER.Init($viewport);                          // Initialize home layer
                LAYER.Play('home');                             // Play tween for home layer
            }


            // Add timer for slideshow -> Fixed IE at first: get value of scrollTop incorrect
            setTimeout(function() {
                is.slideshow && SLIDESHOW.Init();
            }, 400);
        }
    },










    /**
     * METHODS M EXTEND
     */
    M = $.extend(true, {}, rt01VA.M, {

        /**
         * FIRST SETUP OF VARIABLE IN RUBY
         */
        FirstSetup : function() {

            /**
             * MERGE ALL MODULES
             */
            PROP.MergeAllModules();


            /**
             * MERGE ALL OPTIONS
             */
            PROP.MergeAllOpts();


            /**
             * MERGE THE FUNCTION INTO GLOBAL VARIABLE
             *  + Combine api-base & api into 'cs'
             *  + Store 'cs' variable into ruby
             */
            cs.one = one;
            cs = $.extend(true, cs, API);
            $.data($ruby[0], rt01VA.rubyName, cs);



            /**
             * SETUP THE VARIABLE OF SYSTEM
             */
            rt01VA.$ruby = rt01VA.$ruby.add($ruby);
            rt01VA.numID++;



            /**
             * SETUP ID OF RUBY
             *  + Support multiply ruby awareness on page
             *  + va.rubyID: index ID of the particular ruby
             */
            va.rubyID = rt01VA.numID;



            /**
             * SETUP THE INITIAL VALUES
             */
            va.ns = rt01VA.namespace;

            // Name of ruby
            va.name = o.name || $ruby.attr('id') || null;

            // Support for slideshow have video -> all videos must be closed when slideshow playing
            va.nVideoOpen = 0;

            // Lock tap events on navigation && pagination -> prevent multiply setting running same time
            is.tapEnable = true;

            // Store name of effect -> support for toggle class effect
            va.fxLast = va.fxCur = 'none';

            // Add custom classes into ruby depends on each slide
            va.classAdd = [];

            // Variable actived & deactived
            va.actived   = va.ns + o.actived;
            va.deactived = va.ns + o.deactived;

            // Variable support for ruby full update -> additional info
            // Variable will reset to null if go to end 'API.update()'
            va.addInfo = null;
        },

        /**
         * SETUP THE REMAINING PROPERTIES WHEN THE END OF INIT
         */
        LastSetup : function() {

            // Fixed for IE7: calculate incorrect size of pagination
            !is.tf && setTimeout(UPDATE.Resize, 50);
        },










        /**
         * BROWSER DETEAC + CHECK HTML5/CSS3 PROPERTIES
         */
        Browser : function() {

            // Variable shortcut & initialize at first
            var navAgent = navigator.userAgent;
                navAgentAll = navAgent || navigator.vender || window

            is.ie = /*@cc_on!@*/false || document.documentMode;     // At least IE6
            is.safari = /Constructor/i.test(Object.prototype.toString.call(window.HTMLElement));
            is.opera = !!window.opera || /\sOPR\//i.test(navAgent);
            is.chrome = !!window.chrome && !is.opera;               // Chrome 1+
            is.firefox = window.InstallTrigger !== undefined;

            // Check IE11 : IE11 not support 'conditional compilation' anymore
            is.ie11 = !!(is.ie && !new Function('/*@cc_on return @_jscript_version; @*/')());
            is.ie7  = !!(is.ie && /MSIE\s7\./i.test(navAgent));


            // Name of browser - return undefined if not found
            var browser = ['ie', 'safari', 'opera', 'chrome', 'firefox'];
            for( i = browser.length; i >= 0; i-- ) {
                if( !!is[browser[i]] ) { is.browser = browser[i]; break; }
            }


            // Check browser support touch event
            // Remove 'is.msGesture' -> incorrect & no needed, replace by 'is.evPoinerAll'
            // is.msGesture = !!(window.navigator && window.navigator.msPointerEnabled) || !!window.MSGesture;
            is.evPointer = !!window.PointerEvent;
            is.evMSPointer = !!window.MSPointerEvent;
            is.evPointerAll = is.evPointer || is.evMSPointer;
            is.evSwipe = !!(("ontouchstart" in window) || (window.DocumentTouch && document instanceof DocumentTouch));
            is.swipeSupport = is.evSwipe || is.evPointer || is.evMSPointer;


            // Check is mobile, base on 3 elements:
            // + Support touch/pointer events
            // + Support 'orientation' direction -> not support on mobile simular
            // + UserAgent of comnmon browsers 'Android|webOS|iPhone|iPad..'
            // + Used test script on page 'detectmobilebrowsers.com'
            var navAgentAll = navAgent || navigator.vender || window.opera;
            is.mobile = is.swipeSupport &&
            ( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navAgentAll) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navAgentAll.substr(0, 4)) );

            // Check whether Android native browser (not Chrome) & version < 4.4
            is.androidNative = is.mobile && /Mozilla\/5\.0/i.test(navAgent) && /Android/i.test(navAgent)
                                         && /AppleWebKit/i.test(navAgent) && !(/Chrome/i.test(navAgent))
                                         && !(/Android\s+4\.4/i.test(navAgent));
            // Check iOS
            is.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;


            // Setting all kinds of events
            // Prevent conflicts with other rubytabs by add rubykey, ex: '.rt011234'
            var suffix    = '.'+ va.ns + va.rubykey,
                swipeName = ['', '', ''];

            if     ( is.evSwipe )     swipeName = ['touchstart', 'touchmove', 'touchend'];
            else if( is.evPointer )   swipeName = ['pointerdown', 'pointermove', 'pointerup'];
            else if( is.evMSPointer ) swipeName = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];

            va.ev = {
                click   : 'click'      + suffix,
                drag    : 'dragstart'  + suffix + ' selectstart'+ suffix,       // 'selectstart' --> ho tro IE7-8
                resize  : 'resize'     + suffix,
                scroll  : 'scroll'     + suffix,
                key     : 'keyup'      + suffix,
                hash    : 'hashchange' + suffix,

                swipe   : {
                    start : swipeName[0] + suffix,
                    move  : swipeName[1] + suffix,
                    end   : swipeName[2] + suffix,
                    type  : 'swipe'
                },

                mouse   : {
                    start : 'mousedown' + suffix,
                    move  : 'mousemove' + suffix,
                    end   : 'mouseup'   + suffix,
                    type  : 'mouse'
                },

                mouseenter : 'mouseenter' + suffix,
                mouseleave : 'mouseleave' + suffix
            };

            // If no touch event, reset 'ev.touch'
            if( swipeName[0] == '' ) va.ev.swipe = { start: '', move: '', end: '', type: 'swipe' };




            /**
             * OTHER SETUP
             */
            // Check browser support wheel native event
            is.wheelNative = !!('onwheel' in document.createElement('div'));

            // Check browser support 'console'
            is.console = typeof console === 'object';

            // Check browser support HTML5 cavans
            is.canvas2d = (function() {
                var el = document.createElement('canvas');
                return !!(el.getContext && el.getContext('2d'));
            }());

            // Check browser is running online file
            is.online = /https?/g.test(window.location.protocol);
        },

        /**
         * GET PREFIX OF CSS3 + NAME OF CSS
         */
        CssName : function() {

            /**
             * FUNCTION CHECK PREFIX VENDER OF BROWSER
             *  + Remove '-' mark. ex: from 'abc-def' to 'abcdef'
             */
            var test = {
                CamelCase : function(prop) {
                    return prop.replace(/-([a-z])/gi, function(m, prop) {
                        return prop.toUpperCase();
                    });
                },

                // MAIN TEST CSS
                CSS : function(prop, isPrefix) {

                    var style  = document.createElement('p').style,
                        vender = 'Webkit Moz ms O'.split(' '),
                        prefix = '-webkit- -moz- -ms- -o-'.split(' ');


                    // First, check vender of style
                    var styleCase = this.CamelCase(prop);
                    if( style[styleCase] !== undefined ) return (isPrefix ? '' : true);


                    // Next, check vender
                    // Convert string of style to Upper, ex: 'flex-wrap' to 'FlexWrap'
                    var preStyle = M.ProperCase(styleCase);

                    // Check each vender
                    for( var i = 0, len = vender.length; i < len; i++ ) {
                        if( style[vender[i] + preStyle] !== undefined ) return (isPrefix ? prefix[i] : true);
                    }

                    // Return false if not support
                    return false;
                },

                // PREFIX OF CSS STYLE
                Prefix : function(prop) { return this.CSS(prop, true) }
            };





            /**
             * CHECK PREFIX + VARIABLE CSS TRANSFORM BASIC
             */
            var tf = 'transform', ts = 'transition';

            // CSS check
            is.tf      = test.CSS(tf);
            is.tf3D    = test.CSS('perspective');
            is.ts      = test.CSS(ts);
            is.opacity = test.CSS('opacity');

            // Variable related to CSS
            var prefix = va.prefix = test.Prefix(tf);
            va.cssTf = cssTf = prefix + tf;





            /**
             * TRANSLATE TYPE : FIXED IN SAFARI MOBILE + IE
             */
            var tl3D = 'translate3d(', isTf3D = is.tf3D;

            va.tl0   = isTf3D ? tl3D        : 'translate(';
            va.tl1   = isTf3D ? ',0)'       : ')';
            va.tlx0  = isTf3D ? tl3D        : 'translateX(';
            va.tlx1  = isTf3D ? ',0,0)'     : ')';
            va.tly0  = isTf3D ? tl3D +'0,'  : 'translateY(';
            va.tly1  = isTf3D ? ',0)'       : ')';
        },










        /**
         * TOGGLE CLASS 'CURRENT' BETWEEN SLIDES
         */
        ToggleSlide : function() {

            /**
             * CONDITIONAL EXECUTION
             */
            if( !(cs.num >= 1) ) return;



            /**
             * SETUP CONTINUE
             */
            var idCur   = cs.idCur,
                idLast  = cs.idLast,
                $slCur  = va.$s.eq(idCur),
                $slLast = va.$s.eq(idLast),
                current = va.ns + o.current,
                deactived = va.deactived;


            // Slide: toggle class actived
            va.$s.not($slCur).removeClass(current).addClass(deactived);
            $slCur.addClass(current).removeClass(deactived);

            // Callback event toggle
            idLast !== undefined && cs.ev.trigger('deselectID', idLast);
            cs.ev.trigger('selectID', idCur);

            // Setting number of slide left & right into layer center(no loop)
            !is.centerLoop && PROP.CenterNoLoop();


            // Pagination: toggle class actived
            // Using similar methods above!
            if( is.pag ) {
                var $pagitemCur = va.$pagItem.eq(idCur);

                va.$pagItem.not($pagitemCur).removeClass(current);
                $pagitemCur.addClass(current);
                o.pag.isMark && PAG.SizePosOfMark();
            }

            // Navigation: toggle class inactive
            is.nav && NAV.Toggle();

            // Caption: toggle content
            is.cap && CAPTION.Toggle($slCur, $slLast);

            // Setting load current slide, although not to load
            LOAD.Add($slCur);

            // Toggle classAdd on ruby
            is.CLASSADD && CLASSADD.Toggle();

            // Toggle class mask on Canvas
            UPDATE.CanvasMask();

            // Toggle Deeplinking & Cookie
            // Prevent running at first
            if( idLast !== undefined ) {
                o.isDeeplinking && is.DEEPLINKING && DEEPLINKING.Write();
                o.isCookie && is.COOKIE && COOKIE.Write();
            }

            // Toggle source link on Iframe lazy
            is.IFRAME && IFRAME.ToggleSource($slCur);

            // Update nested ruby in the current slide
            is.NESTED && NESTED.RefreshInSlide($slCur);

            // Toggle swipe gestures on the current slide
            is.SWIPE && SWIPE.ToggleEvent();
        },


        /**
         * CASES:
         *  + Value = -1 : remove all classes
         *  + Value = 0 : toggle to class[0]
         *  + Value = 1 : toggle to class[1]
         */
        ToggleClass : function(type, value, $obj) {

            /**
             * CONDITIONAL EXECUTION
             *  + Improved on mobile -> not toggle class 'grabbing'
             */
            if( is.mobile && type == 'grab' ) return;


            /**
             * SETUP CONTINUE
             */
            var classes  = o.className[type],
                class0   = va.ns + classes[0],
                class1   = va.ns + classes[1],
                classAdd = value ? class1 : class0,
                classDel = value ? class0 : class1;

            // Setting default object
            if( $obj === undefined ) $obj = $viewport;


            // Value = -1 : remove all classes
            if( value == -1 ) $obj.removeClass(class0 +' '+ class1);

            // Value = 0 : toggle to class[0]
            // Value = 1 : toggle to class[1]
            else $obj.addClass(classAdd).removeClass(classDel);
        },


        /**
         * GET VALUE IN STRING
         */
        ValueX : function(str) {

            // Array: get value
            var a = str.substr(7, str.length - 8).split(', ');

            // Array: return value 5
            return M.PInt(a[4]);
        },




        /**
         * SETUP VARIABLES WHEN SCROLL BROWSER
         */
        Scroll : {
            Setup : function() {

                /**
                 * CASE SLIDESHOW ONLY RUN IN DISPLAY AREA
                 */
                if( is.ssRunInto ) {
                    is.into = false;
                    M.Scroll.Check();

                    var t = 200;
                    $w.off(va.ev.scroll);
                    $w.on(va.ev.scroll, function() {
                        clearTimeout(ti.scroll);
                        ti.scroll = setTimeout(function() { !is.ssPauseAbsolute && M.Scroll.Check() }, t);
                    });
                }


                /**
                 * CASE SLIDESHOW ALWAYS PLAYING
                 */
                else {
                    is.into = true;
                }
            },


            /**
             * CHECK RUBY INTO DISPLAY AREA
             */
            Check : function(isNoGo) {
                M.Scroll.Position();

                // Check ruby in display area of browser
                var isInto = !(va.topW > va.botRuby || va.botW < va.topRuby),
                    isGoSlideshow = !isNoGo && is.slideshow && is.ssRunInto;

                if( isInto ) {
                    if( !is.into ) {
                        is.into = true;
                        isGoSlideshow && SLIDESHOW.Go('scrollInto');
                    }
                }
                else {
                    if( is.into ) {
                        is.into = false;
                        isGoSlideshow && SLIDESHOW.Go('scrollOut');
                    }
                }
            },


            /**
             * POSITION OF RUBY COMPARE TO WINDOW
             */
            Position : function() {

                // Get top/bottom position of window
                va.hWin = $w.height();
                va.topW = $w.scrollTop();
                va.botW = va.hWin + va.topW;

                // Ruby offset
                va.topRuby = $ruby.offset().top;
                va.botRuby = va.topRuby + M.OuterHeight($ruby);
            }
        },




        /**
         * METHODS RELATE TO MATH
         */
        A     : function(v)         { return Math.abs(v) },
        R     : function(v)         { return Math.round(v) },
        C     : function(v)         { return Math.ceil(v) },
        Ra    : function()          { return Math.random() },
        Rm    : function(m ,n)      { return M.Ra() * (n - m) + m },
        Sum : function(a, to) {
            var total = 0;
            if( to < 0 ) return total;

            // Case not 'to' paramater
            if( to === undefined ) to = a.length;

            // Loop plus all values in the array[]
            for( var i = 0; i < to; i++ ) {
                total += a[i];
            }
            return total;
        },



        /**
         * METHODS RELATE TO CONVERT NUMBER
         */
        // Convert value to percent(%)
        PPercent : function(v, source) {
            if( v > 0 && v < 1 ) v *= source;
            return M.R(v);
        },

        // Convert string of style to json
        PStyleToJson : function($obj) {
            var style = $obj.attr('style'),
                re    = /\s*([\w-]+)\s*:\s*([^;]*)/g,
                json  = {},
                match;

            // Merge Width/Height attributes on object into json
            if( $obj.attr('width') !== undefined )  json.width = $obj.attr('width');
            if( $obj.attr('height') !== undefined ) json.height = $obj.attr('height');

            // Create loop to get value each object
            while( match = re.exec(style) ) {
                json[ match[1] ] = match[2];
            }

            // Convert value pixel of Width/Height to number
            var rePixel = /^-?\d*.?\d+px$/;
            if( rePixel.test(json.width) )  json.width = parseFloat(json.width);
            if( rePixel.test(json.height) ) json.height = parseFloat(json.height);

            return json;
        },

        // Check all values in the array is number
        ElesIsNumber : function(arr, lenCheck) {
            var len   = arr.length,
                isNum = $.isArray(arr) && len === lenCheck;

            if( isNum ) {
                for( var i = 0; i < len; i++ ) {
                    isNum = isNum && $.isNumeric(arr[i]);
                }
            }
            return isNum;
        },





        /**
         * METHODS RELATE TO TRANSFORM + TRANSITION
         */
        Tl : function(x,y,u) {
            var u = u || 'px';
            return va.tl0 + x + u +', '+ y + u + va.tl1;
        },

        // Translate x/y, support fallback transition
        Tlx : function(x,u) {
            var u = u || 'px';
            return is.tf ? (va.tlx0 + x + u + va.tlx1) : (x + u);
        },
        Tly : function(y,u) {
            var u = u || 'px';
            return is.tf ? (va.tly0 + y + u + va.tly1) : (y + u);
        },

        // Remove transform on object
        TfRemove : function($obj) {
            var tf = {};
            tf[cssTf] = '';
            $obj.css(tf);
        },



        /**
         * METHODS RELATE TO ARRAY[]
         */
        Shift : function($obj, isShift) { return isShift ? $obj.shift() : $obj.pop() },
        Push  : function($obj, v, isPush) { return isPush ? $obj.push(v) : $obj.unshift(v) },

        /**
         * RANDOM EFFECT IN THE EFFECT ARRAY[]
         */
        RandomInArray : function(arr, except) {

            // Conditional execution : arr is array
            if( $.isArray(arr) ) {

                /**
                 * CASE: ARRAY HAVE 1 OBJECT
                 */
                if( arr.length === 1 ) return arr[0];



                /**
                 * CASE: ARRAY HAVE MULTIPLE OBJECT
                 */
                var itemCur       = $.extend(true, [], arr),
                    indexItemLast = $.inArray(except, itemCur);

                // Remove the newly effect
                // If not found in effect array -> add 1 to fixed select
                if( indexItemLast === -1 ) indexItemLast = itemCur.length + 1;
                itemCur.splice(indexItemLast, 1);

                // Select random effect in the new array has removed old effect
                return itemCur[ M.R(M.Rm(0, itemCur.length - 1)) ];
            }
            return arr;
        },

        RandomInArray2 : function(arrSource, arrCopy, except) {
            if( $.isArray(arrSource) ) {

                // Reset the copy array if it empty
                // Reset the copy array if ramaining 1 object like 'except'
                if( !arrCopy.length || (arrCopy.length == 1 && arrCopy[0] == except) ) {
                    arrCopy = $.extend(true, arrCopy, arrSource);
                }

                // Remove 'except' first
                if( except !== undefined ) {
                    var indexExcept = $.inArray(except, arrCopy);
                    if( indexExcept !== -1 ) arrCopy.splice(indexExcept, 1);
                }



                // Get random value in the copy array
                var idCur   = M.R(M.Rm(0, arrCopy.length - 1)),
                    itemCur = arrCopy[idCur];

                // Remove value selected in the copy array
                arrCopy.splice(idCur, 1);

                // Return value selected
                return itemCur;
            }
            return arrSource;
        },





        /**
         * OTHER METHODS
         */
        // Swipe swap variable
        SwapVaOnSwipe : function() { return va.$swipeCur.is($canvas.add(va.$s)) ? va.can : va.pag; },

        // Toggle add/removeClass on object
        XClass : function($obj, isAdd, str) { $obj[(isAdd ? 'add' : 'remove') +'Class'](str); },

        // Capitalize the first letter of sting
        ProperCase : function(str) { return str.charAt(0).toUpperCase() + str.slice(1); },

        // Convert '{ns}' to namespace
        NS : function(str) {
            return (typeof str == 'string') ?  str.replace(/\{ns\}/g, va.ns)
                                            : '';
        },

        /**
         * CHECK WIDTH VALUE OF WINDOW/RUBY IN RANGE - SIMILAR MEDIA CSS
         */
        MatchMedia : function(min, max, isWidthOfRuby) {

            /**
             * CASE: GET WIDTH OF RUBY
             */
            if( !!isWidthOfRuby ) {
                var wRuby = M.OuterWidth($ruby);
                if( min <= wRuby && wRuby <= max ) return true;
            }


            /**
             * CASE: GET WIDTH OF WINDOW BROWSER
             */
            else {
                // Case : browser support matchMedia
                if( !!window.matchMedia ) {
                    var str = '(min-width: WMINpx) and (max-width: WMAXpx)'.replace('WMIN', min).replace('WMAX', max);
                    if( window.matchMedia(str).matches ) return true;
                }

                // Case default : not support matchMedia
                else {
                    var wWin = $w.width();
                    if( min <= wWin && wWin <= max ) return true;
                }
            }

            return false;
        },

        /**
         * SEARCH FOR NECESSARY VALUE IN ARRAY
         * @return int  Value width of ruby
         */
        GetValueInRange : function(value, valueName) {
            var name = !!valueName ? valueName : 'value';

            // additional : allow default value & get minimun value
            var wMin = 1e5, id = -1;
            for( i = value.num - 1; i >= 0; i-- ) {

                // 'from' & 'to' compared to width window
                if( M.MatchMedia(value[i].from, value[i].to ) ) {

                    if( wMin >= value[i].to ) {
                        wMin = value[i].to;
                        id = i;
                    }
                }
            }

            // Return value
            return (id > -1 ? value[id][name] : null);
        },

        /**
         * SEARCH NESTED RUBY IN RUBY
         *  + Remove nested ruby
         */
        Find : function($target, selector) {

            var $result       = $target.find(selector),
                $rubyNested   = $target.find('.' + va.ns),
                $resultNested = $rubyNested.find(selector);

            // Loai bo doi tuong trong Ruby Nested
            $result = $result.not($resultNested);
            return $result;
        },





        /**
         * GET OBJECT PROPERTIES IN 'DATA' VARIABLE
         *  + Allow pass number parameter for slide
         */
        Data : function($obj, opts) {
            var vData = va.data;


            /**
             * CONVERT NUMBER PARAMETER TO JQUERY OBJECT
             */
            if( $.isNumeric($obj) && (0 <= $obj && $obj < cs.num) ) {
                $obj = va.$s.eq($obj);
            }
            else if( $obj === 'home' ) {
                $obj = $viewport;
            }



            /**
             * CONDITIONAL EXECUTION
             */
            if( !($obj instanceof jQuery) ) return false;




            /**
             * SETUP EXTEND OBJECT
             */
            if( $.isPlainObject(opts) ) {

                opts = $.extend(true, {}, opts);
                delete opts.$self;
                delete opts.nsid;
            }
            else opts = {};





            /**
             * FIRST, SEARCH NSID OF OBJECT IN 'DATA' VARIABLE
             */
            var nsid;
            for( nsid in vData ) {

                if( $obj.is(vData[nsid]['$self']) ) {
                    return $.extend(true, vData[nsid], opts);
                }
            }




            /**
             * CREATE NEW PROPERTIES IN 'DATA' VARIABLE IF NSID NOT EXIST
             */
            nsid = va.numNSID;
            va.numNSID++;

            // Create new object
            vData[nsid] = { '$self': $obj, 'nsid': nsid };

            // Return the newly created 'data'
            return $.extend(true, vData[nsid], opts);
        },

        /**
         * GET TWEEN ANIMATE STORED IN 'DATA' OF OBJECT
         */
        GetTween : function($obj) {
            var objData = M.Data($obj);

            // Get tween animate on self object
            objData.tweenSelf = objData.tweenSelf || new RubyTween();
            return objData.tweenSelf;
        },





        /**
         * RETURN MODULES COMBINE WITH PROPERTIES
         */
        Module : function(name) {
            return $.extend({}, rt01MODULE[name], one);
        }
    }),










    /**
     * VALUE OF PROPERTIES
     */
    PROP = {

        /**
         * MERGE ALL MODULES INTO GLOBAL VARIABLE
         */
        MergeAllModules : function() {

            // Move module available to 'one' variable
            one.INIT        = INIT;
            one.M           = M;
            one.PROP        = PROP;
            one.RENDER      = RENDER;
            one.LOAD        = LOAD;
            one.EVENTS      = EVENTS;
            one.POSITION    = POSITION;
            one.SIZE        = SIZE;
            one.POSSIZE     = POSSIZE;
            one.TOSLIDE     = TOSLIDE;
            one.FX          = FX;
            one.VIEW        = VIEW;



            // Embbed 'one' variable into module outside
            SWIPE         = M.Module('SWIPE');
            RESPONSIVE    = M.Module('RESPONSIVE');
            NAV           = M.Module('NAV');
            PAG           = M.Module('PAG');
            CAPTION       = M.Module('CAPTION');
            IMAGE         = M.Module('IMAGE');
            VIDEOBACK     = M.Module('VIDEOBACK');
            VIDEOIFRAME   = M.Module('VIDEOIFRAME');
            IFRAME        = M.Module('IFRAME');
            HOTSPOT       = M.Module('HOTSPOT');
            LAYER         = M.Module('LAYER');
            LAYERPARALLAX = M.Module('LAYERPARALLAX');
            PARALLAX      = M.Module('PARALLAX');
            RUBYANIMATE   = M.Module('RUBYANIMATE');
            SLIDESHOW     = M.Module('SLIDESHOW');
            TIMER         = M.Module('TIMER');
            FLICKR        = M.Module('FLICKR');
            DISPLAY       = M.Module('DISPLAY');
            DEEPLINKING   = M.Module('DEEPLINKING');
            COOKIE        = M.Module('COOKIE');
            FULLSCREEN    = M.Module('FULLSCREEN');
            NESTED        = M.Module('NESTED');
            CLASSADD      = M.Module('CLASSADD');
            OLD           = M.Module('OLD');
            APIREMOTE     = M.Module('APIREMOTE');

            API           = $.extend(
                                API,
                                rt01MODULE.APIMORE
                            );

            VIEW          = $.extend(
                                VIEW,
                                rt01MODULE.VIEWMATH,
                                rt01MODULE.VIEWCSS,
                                rt01MODULE.VIEWCOVERFLOW3D,
                                one
                            );


            // Check module outside exist
            is.SWIPE         = !!rt01MODULE.SWIPE;
            is.RESPONSIVE    = !!rt01MODULE.RESPONSIVE;
            is.NAV           = !!rt01MODULE.NAV;
            is.PAG           = !!rt01MODULE.PAG;
            is.CAP           = !!rt01MODULE.CAPTION;
            is.IMAGE         = !!rt01MODULE.IMAGE;
            is.VIDEOBACK     = !!rt01MODULE.VIDEOBACK;
            is.VIDEOIFRAME   = !!rt01MODULE.VIDEOIFRAME;
            is.IFRAME        = !!rt01MODULE.IFRAME;
            is.HOTSPOT       = !!rt01MODULE.HOTSPOT;
            is.LAYER         = !!rt01MODULE.LAYER;
            is.LAYERPARALLAX = !!rt01MODULE.LAYERPARALLAX;
            is.PARALLAX      = !!rt01MODULE.PARALLAX;
            is.RUBYANIMATE   = !!rt01MODULE.RUBYANIMATE;
            is.SLIDESHOW     = !!rt01MODULE.SLIDESHOW;
            is.TIMER         = !!rt01MODULE.TIMER;
            is.FLICKR        = !!rt01MODULE.FLICKR;
            is.DISPLAY       = !!rt01MODULE.DISPLAY;
            is.DEEPLINKING   = !!rt01MODULE.DEEPLINKING;
            is.COOKIE        = !!rt01MODULE.COOKIE;
            is.NESTED        = !!rt01MODULE.NESTED;
            is.CLASSADD      = !!rt01MODULE.CLASSADD;
            is.APIREMOTE     = !!rt01MODULE.APIREMOTE;
        },

        /**
         * MERGE ALL OPTIONS TOGETHER
         */
        MergeAllOpts : function() {
            var optsDefault = rt01VA.optsDefault;


            /**
             * GET DATA ON HTML5
             *  + Check option of 'data' is json
             *  + Make sure convert to json if it's object
             */
            var optsData = $ruby.data(rt01VA.rubyData);
            optsData = M.StringToJson(optsData);


            /**
             * MERGE OPTIONS :
             *  + Merge all options on data html5 + data js into default options of ruby
             *  + Priority order: [optsData] > [OptsJS] > [options type ruby] > [default options]
             *  + Priority special options for the browser not support transform
             *  + Priority special options for mobile
             */
            var nameOptsPlus = null;
            if( !!optsData.optionsPlus )                nameOptsPlus = optsData.optionsPlus;
            if( !nameOptsPlus && !!OptsJS.optionsPlus ) nameOptsPlus = OptsJS.optionsPlus;
            if( !nameOptsPlus )                         nameOptsPlus = optsDefault.optionsPlus;

            var optsPlus = rt01VA.optsPlus[nameOptsPlus];
            o = $.extend(true, o, optsDefault, optsPlus, OptsJS, optsData);

            if( !is.tf && !$.isEmptyObject(o.fallback) )  o = $.extend(true, o, o.fallback);
            if( is.mobile && !$.isEmptyObject(o.mobile) ) o = $.extend(true, o, o.mobile);
        },










        /**
         * SPLIT & STORE ARRAY HAS 3 ELEMENTS
         */
        Chain3 : function(val, nameValue) {

            // Check 'nameValue', default is 'value'
            if( !nameValue ) nameValue = 'value';


            /**
             * CONVERT TYPE OF VALUE TO ARRAY
             *  + Case 1: nummber
             *  + Case 2: array has 3 item & value of each item is number
             */
            if     ( $.isNumeric(val) )       val = [[val, 0, 100000]];
            else if( M.ElesIsNumber(val, 3) ) val = [val];


            // CONDITIONAL EXECUTION
            if( !$.isArray(val) ) return false;


            // SETUP CONTINUE
            var chain = { num : val.length },
                wMax  = 0;      // Maximun value in array[]

            for( i = chain.num-1; i >= 0; i-- ) {
                var a = val[i];

                // Additional automated missing value
                if( $.isNumeric(a) ) a = [a, 0, 100000];

                // Convert string to other type
                a[1] = M.PInt(a[1]);
                a[2] = M.PInt(a[2]);

                chain[i] = {
                    'from' : a[1],
                    'to'   : a[2]
                };

                chain[i][nameValue] = parseFloat(a[0]);      // included float number

                // Search maxiumum value in array[]
                wMax = (wMax < a[2]) ? a[2] : wMax;
            }

            chain.wMax = M.PInt(wMax);
            return chain;
        },

        /**
         * SPLIT && STORE ARRAY HAS 4 ELEMENTS
         *  + Similar 'chain3()'
         *  + Case 2 value -> remove value 3 & 4
         */
        Chain4 : function(val) {

            // Convert to standard array
            if     ( $.isNumeric(val) )       val = [[val, val, 0, 100000]];
            else if( M.ElesIsNumber(val, 2) ) val = [[val[0], val[1], 0, 100000]];
            else if( M.ElesIsNumber(val, 4) ) val = [val];

            // Conditional execution
            if( !$.isArray(val) ) return false;



            /**
             * SETUP CONTINUE
             */
            var chain = { num : val.length },
                wMax  = 0;

            for( i = chain.num - 1; i >= 0; i-- ) {
                var a = val[i];

                // Additional automated missing value
                if( $.isNumeric(a) ) a = [a, a, 0, 100000];

                // Case: auto set from/to
                if( a.length == 2 ) { a[2] = 0; a[3] = 1e5; }

                // Case: double first value -> value left = value right
                else if( a.length == 3 ) { a.unshift(a[0]) }


                // Array: setting chain
                chain[i] = {
                    'left'  : parseFloat(a[0]),
                    'right' : parseFloat(a[1]),
                    'from'  : M.PInt(a[2]),
                    'to'    : M.PInt(a[3])
                };

                // wMax: width-to maximum
                wMax = (wMax < M.PInt(a[3])) ? a[3] : wMax;
            }

            chain.wMax = M.PInt(wMax);
            return chain;
        },











        /**
         * SETUP PROPERTIES OF DEEPLINKING & COOKIE AT FIRST
         */
        DeepLinkCookie : function() {

            // Update idCur & idBegin if 'deeplinking' or 'cookie' actived
            // Priority 'deeplinking' than 'cookie' if actived same time
            if( o.isDeeplinking ) is.DEEPLINKING && DEEPLINKING.Read();
            else if( o.isCookie ) is.COOKIE && COOKIE.Read();
        },










        /**
         * SETUP PROPERTIES AT FIRST
         */
        FirstSetup : function() {

            /**
             * THE VALUE SETUP ONLY ONCE
             */
            if( !va.stepSetupInit ) {
                is.loop = o.isLoop;

                // Default swipe object is Canvas
                va.$swipeCur = $canvas;

                // Create tween object
                va.tweenView    = new RubyTween();
                va.tweenSlide   = new RubyTween();
                va.tweenCaption = new RubyTween();

                va.tweenClone = new RubyTween();
                va.tweenMath  = new RubyTween();
                va.tweenParallaxScroll = new RubyTween();

                // Initialize object at first
                va.fxCSS        = {};
                va.fxMath       = {};
                va.ssIDRandom   = [];
                va.fxMathRandom = [];

                // Variable of Flickr
                va.flickrData      = {};
                va.flickrListPhoto = [];

                // Varible of position
                va.xBuffer = 0;

                // Properties of Canvas & pagination -> support for swipe
                va.can = { 'viewport' : $viewport };
                // Initialize at first, not setting because no 'isPag' & '$pag'
                va.pag = {};

                // Variable of loadding
                va.nLoadAtFirst = 0;        // Number of slide add to loading
                va.nLoaded      = 0;        // Number of slide already loaded
                is.preloaded    = false;    // Check preload finish

                // Add name of browser into ruby -> support fixed transform by css
                var ns      = ' '+ va.ns,
                    classes = '';
                if( is.browser == 'firefox' ) classes += ns +'firefox';
                if( is.ie7 )                  classes += ns +'ie7';
                if( is.mobile )               classes += ns +'mobile';
                if( is.androidNative )        classes += ns +'androidNative';
                $ruby.addClass(classes);



                /**
                 * SETUP PROPERTIES EACH SLIDE
                 */
                va.fx    = {};
                va.slot  = {};
                va.speed = {};
                va.delay = {};

                // Array storage ID-Node on each slide
                va.IDsOnNode = [];



                /**
                 * ADDITION: DATA FOR RUBY LIKE DATA SLIDE
                 */
                M.Data($viewport, {
                    'id'          : 'home',
                    'opts'        : $.extend(true, {}, o),
                    'tweenLayer'  : new RubyTween()
                });
            }



            /**
             * SETUP CAC GIA TRI LUC BAT DAU CO THE UPDATE
             */
            // Range chieu width cua slide
            // Uu tien cho Thuoc tinh trong hieu u'ng dac biet
            var wName  = 'widthSlide',
                fxName = o.fx,
                wSlide = (!!o[fxName] && !!o[fxName][wName]) ? o[fxName][wName]
                                                             : o[wName];

            va.sSlideRange = PROP.Chain3(wSlide, 'width');

            // Setup typeHeight cua Ruby
            is.heightFixed = $.isNumeric(o.height);
            // Type Height chuyen sang 'Fixed' neu Fullscreen
            if( o.isFullscreen ) is.heightFixed = true;
        },

        /**
         * SETUP CAC THUOC TINH THANH TUNG MUC RIENG BIET
         */
        IDNum : function() {

            // So luo.ng slide trong Ruby
            num = cs.num = va.$s.length;

            // ID slide current setup
            // Tu dong chuyen doi vi tri 'begin', 'center', 'end' sang gia tri number
            // Tu dong chuyen doi id dau neu gia tri la '<= 0'
            // Tu dong chuyen doi id cuoi neu '>= num'
            if( !va.stepSetupInit ) {
                var idBegin = o.idBegin;

                if     ( idBegin == 'begin' )       idBegin = 0;
                else if( idBegin == 'center' )      idBegin = ~~((num/2) - .5);
                else if( idBegin == 'centerRight' ) idBegin = ~~( num/2 );
                else if( idBegin == 'end' )         idBegin = num-1;

                else if (idBegin == -1 || idBegin >= num ) idBegin = num-1;
                else if( idBegin <= 0 )                    idBegin = 0;

                if( cs.idCur === undefined ) cs.idCur = va.idBegin = idBegin;
            }



            // Khoa cac thuoc tinh Ruby
            is.nav        = o.isNav && is.NAV;
            is.pag        = o.isPag && is.PAG;
            is.cap        = o.isCap && is.CAP;
            is.fullscreen = o.isFullscreen && !!rt01MODULE.FULLSCREEN;



            /**
             * SETUP FOR CASE: SPECIAL NUMBER OF SLIDE
             */
            // Case: 1 slide
            // Priority order: options oneSlide > options Main
            if( num == 1 ) {
                is.nav = o.oneSlide.isNav ? (o.isNav && is.NAV) : false;
                is.pag = o.oneSlide.isPag ? (o.isPag && is.PAG) : false;
            }
        },

        Transform : function() {

            // CSS duration options
            va.xTimer = 100;


            // Canvas: set Transition timing function
            va.easing = o.swipe.easing;
            va.moveBy = va.moveLastBy = 'swipe';
        },

        Direction : function() {

            // Swipe direction
            // Check 'va.addInfo' -> support update 'ver' to 'hor' dirction
            va.can.dirs = (o.direction == 'ver' && !is.mobile) ? 'ver' : 'hor';
            if( !(va.addInfo && va.addInfo.pagDirs) ) va.pag.dirs = o.pag.direction;

            // Shortcut vertical direction
            is.dirsHor = (va.can.dirs == 'hor');

            // Variable 'cssTf' changes in swipe direction
            // Only use on Canvas
            if( !is.tf ) cssTf = va.cssTf = (!is.dirsVer ? 'left' : 'top');


            // Setting properties of canvas & pagination
            function SameValue(name) {
                var isHor = va[name].dirs == 'hor';

                // Name of transform, support for fallback
                va[name].cssTf = is.tf ? cssTf
                                       : (isHor ? 'left' : 'top');

                // Name of pageX changes depending on direction of canvas & pagination
                va[name].pageX = isHor ? 'pageX' : 'pageY';
            }
            SameValue('can');
            SameValue('pag');
        },

        Fx : function() {

            /**
             * CHECK TYPE OF EFFECT
             */
            var aFxDefault = ['cssOne', 'cssTwo', 'cssThree', 'cssFour', 'none'],
                aFx3D      = ['coverflow3D'];

            function FxType() {

                /**
                 * CHECK TYPE OF EFFECT IN ARRAY AFX
                 */
                for( i = 0; i < aFxDefault.length; i++ ) {
                    if( o.fx == aFxDefault[i] ) return aFxDefault[i];
                }



                /**
                 * CASE THE SPECIAL TYPE
                 */
                // Case: type is 'line'
                if( o.fx === 'line' ) return 'line';

                // Case: type is '3D'
                else if( $.inArray(o.fx, aFx3D) !== -1 ) return '3d';

                // The remaining case: Math effect
                else return 'math';
            }

            va.fxType = FxType();




            /**
             * AUTOMATICALLY CONVERTED INTO 'DOT' LAYOUT BY NAME OF EFFECT
             */
            var a = ['randomMath'];
            a = $.merge(a, aFxDefault);
            a = $.merge(a, o.fxMathName);
            va.fxInLayoutDot = a;
        },

        Layout : function() {

            /**
             * SETUP LAYOUT VIEW
             */
            var viewList = ['mask', 'coverflow3D', 'zoom3D'],
                viewCSS  = ['cssOne', 'cssTwo', 'cssThree', 'cssFour'];

            // Setup 'view' option at first
            va.view = 'basic';
            if( $.inArray(o.fx, viewList) !== -1 )                  va.view = o.fx;
            // Effect need RubyAnimate object
            if( $.inArray(o.fx, viewCSS) !== -1 && is.RUBYANIMATE ) va.view = 'css';
            if( $.inArray(o.fx, o.fxMathName) !== -1 )              va.view = 'math';

            // Automatically converted 'view' if module FX not available or vertical direction
            if( num === 1 ) va.view = 'basic';
            if( !is.dirsHor ) va.view = 'basic';
            if( /^(mask|coverflow3D)$/.test(va.view) && !rt01MODULE['VIEW'+ va.view.toUpperCase()] ) va.view = 'basic';

            // Capitailize the first letter of 'view'
            va.View = M.ProperCase(va.view);




            /**
             * SETUP LAYOUT
             */
            va.layout = 'line';
            o.stepNav = o.stepPlay = 1;




            /**
             * CONVERT TO OTHER LAYOUT
             * @param string va.layout
             */
            if( o.fx == 'line') va.layout = 'line';

            // If 'o.fx' is name of list 'o.fxMathName' or is array -> convert to 'dot' layout
            else if( $.inArray(o.fx, va.fxInLayoutDot) !== -1 || $.isArray(o.fx) ) va.layout = 'dot';

            // Convert to other layout depends on 'view' options
            var viewListToLine = ['mask', 'coverflow3D'];
            if( $.inArray(o.fx, viewListToLine) !== -1 ) va.layout = 'line';
        },

        Center : function() {

            /**
             * SETUP IN CASE: HAS SPECIAL NUMBER OF SLIDE
             */
            if( num == 1 || num == 2 ) {
                if( va.layout === 'line' ) {
                    is.center = is.loop = false;
                }
            }

            else {
                is.center = o.isCenter;
                is.loop   = o.isLoop;
            }

            // Create new variable to easy comparision -> center & loop same time
            // Case: pagination is 'tabs' -> loading normal
            is.centerLoop = is.center && is.loop;




            /**
             * SETUP VALUE OF 'CENTER' VARIABLE
             */
            var center = va.center = {
                'isOdd' : M.C(num / 2) > num / 2
            };



            /**
             * SETUP FOR CENTER LAYOUT
             */
            if( is.centerLoop ) {

                // Slide clone be reset -> focus support for 'fillHole'
                !!va.$slClone && va.$slClone.remove();
                va.$slClone = $('');


                // Number of slide left & right
                center.nLeft  = ~~((num - 1) / 2);
                center.nRight = center.nLeft + (center.isOdd ? 0 : 1);
            }



            /**
             * SETUP FOR LAYOUT NOT CENTER
             */
            else {

                // Number of slide left & right
                PROP.CenterNoLoop();
            }
        },

        /**
         * SETUP VALUE OF CENTER LAYOUT NOT LOOP
         */
        CenterNoLoop : function() {
            va.center.nLeft  = cs.idCur;
            va.center.nRight = num - cs.idCur - 1;
        },

        SwipeEvent : function() {

            // Setup options at first
            if( !va.stepSetupInit ) {
                va.swipeTypeCur = null;
            }
        },

        Responsive : function() {

            /**
             * SETUP VALUE OF RESPONSIVE
             */
            // Width
            if( !!o.widthRange ) va.sizeRange = PROP.Chain3(o.widthRange);
            else                 va.sizeRange = null;    // Func update: reset value

            // Padding
            va.pa = { 'left': o.padding, 'top': 0 };    // va.pa always !== undefined
            if( o.padding != 0 ) va.paRange = PROP.Chain3(o.padding);
            else                 va.paRange = null;     // Func update: reset value

            // Margin
            if( o.margin != 0 ) va.maRange = PROP.Chain4(o.margin);
            else                va.maRange = null;      // Func update: reset value



            /**
             * SETUP IN CASE: HAVE RESPONSIVE
             */
            is.res = $.isNumeric(o.width) && is.RESPONSIVE;
            if( is.res ) {

                va.wRes = o.width;
                va.hRes = is.heightFixed ? o.height : 0;

                // Fullscreen: setup
                if( o.isFullscreen ) {

                    // Height responsive : auto add value when not setup --> used for fullscreen
                    if( va.hRes == 0 ) va.hRes = va.wRes;

                    // Ratio responsive
                    va.rRes = va.wRes / va.hRes;
                }
            }



            /**
             * SETUP VARIABLE AT FIRST
             */
            if( !va.stepSetupInit ) {
                va.rate = 1;
            }
        },

        Grab : function() {

            // Grab stop
            if( o.isViewGrabStop ) $viewport.addClass(va.ns +'grabstop');
            else                   $viewport.removeClass(va.ns +'grabstop');
        },

        Pagination : function() {
            var op = o.pag;

            // Support for old version
            if( op.type == 'tab' ) op.type = 'tabs';

            // Setup for 'list' type of pagination -> only render not setup event
            is.pagList  = op.type == 'list';
            is.pagTabs  = op.type == 'tabs';
            is.pagThumb = op.type == 'thumbnail';
            is.alignJustify = op.align == 'justify';
            if( is.pagList ) is.swipeOnPag = false;


            // CHECK VERTICAL TABS
            function IsPagVer(opts, pag) {
                return !is.pagOutside
                    && !is.pagList
                    && (opts.isPag && pag.direction == 'ver');
            }


            // CHECK TYPE OF VERTICAL TABS
            va.pagVer = IsPagVer(o, o.pag) && va.pag.dirs == 'ver' ? (o.pag.position == 'begin' ? 'begin' : 'end')
                                                                     : null;

            // Reset margin oin Viewport if before is vertical tabs
            if( !!va.stepSetupInit && IsPagVer(oo, oo.pag) ) {
                $viewport.css({ 'margin-left': '', 'margin-right': '' });
            }

            // Check size of pagItem = size of Item
            // If there is fixed size -> size Self pagItem = false
            is.pagItemSizeSelf = (op.typeSizeItem == 'self' && !is.alignJustify);
            if( $.isNumeric(op.width) || $.isNumeric(op.height) ) is.pagItemSizeSelf = false;
        },

        Slideshow : function() {

            // Timer
            var ss = o.slideshow;
            is.slideshow = o.isSlideshow && is.SLIDESHOW;
            is.timer = is.slideshow && ss.isTimer && is.TIMER;
            va.timer = (ss.timer == 'arc' && !is.canvas2d) ? 'line' : ss.timer;

            // Button PlayPause
            is.playpause = is.slideshow && ss.isPlayPause;
            is.ssControl = is.timer || is.playpause;

            // Setup autoRun -> autoRun = false, when at same time the playpause & isAutoRun = false
            is.autoRun = !(ss.isPlayPause && !ss.isAutoRun);
            is.ssPauseAbsolute = !is.autoRun;

            // Setup other
            is.ssRunInto   = ss.isRunInto;
            is.hoverAction = false;
            is.stop        = false;
        },

        LastSetup : function() {

            // Update value when refresh ruby
            if( va.stepSetupInit ) {

                // Update fixed: remove Viewport-height inline
                is.heightFixed && $viewport.css('height', '');
            }

            // Remove all options in free version
            o.rev[0] == 'eerf' && NOISREV.Eerf();
        },

        /**
         * SETUP THE PROPERTIES OF RUBY IN SEPARATE FUNCTION
         */
        Ruby : function() {

            /**
             * SETUP THE PROPERTIES AT FIRST -> PRIORITY ORDER IMPORTANT
             */
            PROP.FirstSetup();
            PROP.IDNum();
            PROP.Transform();
            PROP.Direction();           // Affecting 'view' direction

            PROP.Fx();
            PROP.Layout();
            PROP.Center();
            PROP.SwipeEvent();          // Affecting fx & layout
            PROP.Responsive();

            PROP.Grab();
            PROP.Pagination();          // Below swipe event
            PROP.Slideshow();
            PROP.LastSetup();



            /**
             * SETUP THE REST
             */
            // Ruby: clear datas after first setup Ruby
            !va.stepSetupInit && $ruby.removeAttr('data-'+ rt01VA.rubyData).removeData(rt01VA.rubyData);

            // Variable to recognize call PROP.Setup() run first
            if( va.stepSetupInit === undefined ) va.stepSetupInit = 1;

            // Add class after setup properties
            UPDATE.AddClass();
        },











        /**
         * PROPERTIES & OPTIONS EACH SLIDE
         */
        Slides : function() {

            // Reset position of slide at first in fallback mode
            if( !is.tf ) va.$s.css({ 'left': '', 'top': '' });



            /**
             * SETUP EACH SLIDE
             */
            var fxType = va.fxType;
            va.$s.each(function(i) {

                var $slCur  = $(this),
                    slData  = M.Data($slCur),
                    optsCur = slData['opts'] || {};


                /**
                 * SETUP REQUIRED PART
                 *  + Store ID for each slide
                 *  + Store ID for each pagitem
                 */
                slData['id'] = i;
                is.pag && M.Data(va.$pagItem.eq(i), { 'id': i });



                /**
                 * SETUP CURRENT OPTIONS OF EACH SLIDE
                 *  + Case: at first setup slide after initialize ruby || no options in data of current slide
                 *  + Case: update properties of ruby
                 *  + Case: update properties of each slide
                 *  + Case: change number of slide || add slide by api
                 */
                if( va.fx[i] === undefined || $.isEmptyObject(optsCur) || slData.loadBy == 'apiAdd' ) {
                    var nameData = 'data-'+ o.nameDataSlide,
                        optsData = $slCur.data(o.nameDataSlide),
                        msgError = 'options on "XX" in Slide YY not valid'
                                    .replace(/XX/, nameData)
                                    .replace(/YY/, i);

                    optsData = M.StringToJson(optsData, msgError);
                    optsCur  = $.extend(true, optsCur, o, optsData);

                    // Remove 'data-slide' attribute on each slide
                    $slCur.removeAttr(nameData);
                }

                // Case: update properties of ruby
                else if( $.isPlainObject(va.optsUpdate) && !$.isEmptyObject(va.optsUpdate) ) {
                    optsCur = $.extend(true, optsCur, va.optsUpdate);
                }

                // Case: update properties of each slide
                else if( $.isPlainObject(va.optsSlides) && $.isPlainObject(va.optsSlides[i]) ) {
                    optsCur = $.extend(true, optsCur, va.optsSlides[i]);
                }

                // Case: remove slide by api
                else if( is.apiRemove ) {}

                // The remaining case -> not setup anymore
                else return;



                /**
                 * SETUP PROPERTIES OF EFFECT
                 */
                // Setup Fx name
                if( /^(cssOne|cssTwo|cssThree|cssFour)$/.test(fxType) ) {

                    // Setup & store current effect into variable
                    va.fx[i] = VIEW.GetFxCss(fxType, optsCur);
                }

                else if( fxType == 'none' ) va.fx[i] = 'none';
                else                        va.fx[i] = (va.layout == 'line') ? null : optsCur.fx;


                // Setup Others options
                va.slot[i]  = optsCur.slot;
                va.speed[i] = optsCur.speed;
                va.delay[i] = optsCur.slideshow.delay;
                slData['opts'] = optsCur;

                // Check minimum value of 'speed' & 'delay'
                if( va.speed[i] < 200 ) va.speed[i] = 200;
                if( va.delay[i] < 500 ) va.delay[i] = 500;




                /**
                 * SETUP OTHER PROPERTIES
                 */
                // Store classAdd of each slide
                if( is.CLASSADD ) va.classAdd[i] = CLASSADD.Filter(optsCur);

                // Check have id-text & store all id-text of slide into array variable
                va.IDsOnNode[i] = $slCur.attr('id');

                // Check + setup Iframe lazy
                is.IFRAME && IFRAME.Init($slCur);

                // Store 'control' element
                // Store all current options on each slide
                slData['control']    = optsCur.control;
                slData['tweenLayer'] = slData['tweenLayer'] || new RubyTween();
            });



            /**
             * SETUP THE END VARIABLE
             */
            va.tDelay = va.delay[cs.idCur];

            // value 1: for init Ruby; value 2: for init slide
            if( va.stepSetupInit === 1 ) va.stepSetupInit = 2;

            // Toggle 'first' & 'last' class for pagitems
            is.pag && PAG.FirstLastClass();
        }
    },










    /**
     * UPDATE VALUE PROPERTIES
     */
    UPDATE = {

        // Remove current class on ruby -> used for update properties
        RemoveClass : function() {

            // Ruby: remove exist class
            var classRuby = '{ns}layout-{layout} {ns}view-{view} {ns}fx-{fx} {ns}height-{height}'
                                .replace(/\{ns\}/g, va.ns)
                                .replace(/\{layout\}/, vava.layout)
                                .replace(/\{view\}/, vava.view)
                                .replace(/\{fx\}/, vava.fxType)
                                .replace(/\{height\}/, isis.heightFixed ? 'fixed' : 'auto');


            // First, remove class in ruby
            $ruby.removeClass(classRuby);

            // Remove class added on pagination
            is.pag && PAG.ToggleClass(false);
        },

        // Add class into ruby after update
        AddClass : function() {

            // Ruby: class layout & height type
            var ns        = ' '+ va.ns,
                classRuby = '{ns}layout-{layout} {ns}view-{view} {ns}fx-{fx} {ns}height-{height}'
                                .replace(/\{ns\}/g, va.ns)
                                .replace(/\{layout\}/, va.layout)
                                .replace(/\{view\}/, va.view)
                                .replace(/\{fx\}/, va.fxType)
                                .replace(/\{height\}/, is.heightFixed ? 'fixed' : 'auto');

            // Class recognize browser support transform & showInRange
            classRuby += ns + (is.tf ? 'transform' : 'no-transform');
            classRuby += is.opacity ? '' : ns +'no-opacity';
            if( !is.showInRange ) classRuby += ns +'none';

            // Add class into ruby after setup
            $ruby.addClass(classRuby);

            // Pagination add type class
            is.pag && PAG.ToggleClass(true);
        },

        // Reset other when update options
        Reset : function() {

            // Layout dot: remove translate
            if( va.layout == 'dot' ) {
                var _tf = {}; _tf[cssTf] = '';
                va.$s.css(_tf);
                POSITION.AnimateX($canvas, 0, 1, 1);
            }

            // Remove 'perspective' on Viewport
            if( /^(basic)$/.test(va.view) ) {
                var tf = {}; tf[va.prefix +'perspective'] = '';
                $viewport.css(tf);
            }
        },


        /**
         * UPDATE 'MASK' ON CAVAS
         */
        CanvasMask : function() {
            var isMaskCur = M.Data(cs.idCur)['opts']['isMask'],
                classMask = va.ns + 'mask';


            /**
             * CASE: MASK AUTO
             */
            if( isMaskCur == 'auto' ) {

                /**
                 * CASE TYPE FX IS 'CSS'
                 */
                if( /^css/.test(va.fxType) ) {
                    $viewport.removeClass(classMask);
                }


                /**
                 * CASE OTHER TYPE OF FX
                 */
                else {
                    $viewport.addClass(classMask);
                }
            }



            /**
             * CASE OTHER MASK
             */
            else if( isMaskCur === false ) $viewport.removeClass(classMask);
            else                           $viewport.addClass(classMask);
        },











        /**
         * REUPDATE WHEN WINDOW RESIZE
         *  + Order functions is important !!!
         */
        Resize : function() {
            // console.log('resize');
            cs.ev.trigger('resize');                            // Trigger event 'resize'

            // Setup size of pagItem
            // + Search value of wItem/hItem
            // + In vertical tabs -> need reset size of pagination at first
            is.pag && !is.pagList && PAG.TypeSizeItem();


            SIZE.WidthForRuby();                                // First, get 'width' of ruby
            is.res && RESPONSIVE.UpdateVars();                  // Responsive: calculation padding & va.rate
            is.IMAGE && IMAGE.UpdateAllImageBy('size');         // Update size of Image item when there is width of slide
            is.VIDEOBACK && VIDEOBACK.UpdateAllVideoBy('size', '$videoback');


            is.heightFixed && SIZE.HeightFixedForRuby();        // First, get height of ruby -> support image autoFit/autoFill
            SIZE.EndOfRuby();                                   // Size of ruby depends on direction
            is.res && is.fullscreen && FULLSCREEN.Variable();    // Fullscreen: reupdate variable -> 'padding' & v'a.rate' need height of ruby first
            is.IMAGE && IMAGE.UpdateAllImageBy('position');     // Update all position of Imageback all slides, after getting height of ruby


            if( is.VIDEOBACK ) {
                VIDEOBACK.UpdateAllVideoBy('position', '$videoback');
                VIDEOBACK.UpdateAllVideoBy('size', '$videobackPoster');

                // Must update position of Videoback first
                VIDEOBACK.UpdateAllVideoBy('position', '$videobackPoster');
            }


            is.PARALLAX && PARALLAX.Check(va.$s);               // Update Parallax effect in all slides
            POSSIZE.CombineAtFirst();



            /**
             * SETUP NEED DELAY TIMER
             */
            setTimeout(function() {

                // Setup Layer
                if( is.LAYER ) {

                    // Update properties of Layer in all slides
                    // Update position of Layer in current slide
                    LAYER.Update();
                    LAYER.Resume(cs.idCur);
                    LAYER.Resume('home');
                }

                // Setup Hotspot
                is.HOTSPOT && HOTSPOT.UpdatePosition(cs.idCur);
            }, 0);

            SIZE.AnimHeightForRuby(true);                       // animHeightForRuby: update make image shake
            cs.ev.trigger('resizeEnd');                         // Trigger event 'resizeEnd'
        }
    },










    /**
     * NOISREV
     */
    NOISREV = {
        Check : function() {

            // Initialize variable
            var ver   = o.rev[0],
                isRun = false;

            // Pre version
            if     ( ver == 'erp' || ver == 'eerf' ) isRun = true;
            else if( ver == 'omed') {

                var demoURL = o.rev[1].split('').reverse().join('');
                if( document.URL.indexOf(demoURL) !== -1 ) isRun = true;
            }
            return isRun;
        },

        // Properties of free version
        Eerf : function() {

            // Options chung
            var options = {
                cssOne      : null,
                cssTwoIn    : null,
                cssTwoOut   : null,
                cssEasing   : null,

                isSlideshow : false,
                name        : null
            };
            o  = $.extend(true, o, options);

            // Layout line
            if( o.fx === null ) { o.fx = va.layout = 'line' }

            // 'pag' options
            o.pag.direction = 'hor';
        }
    },










    /**
     * RENDER ELEMENTS
     */
    RENDER = {

        /**
         * RENDER STRUCTURE MARKUP OF THE ELEMENTS
         */
        Structure : function() {

            // Setup markup first: Viewport, Canvas
            RENDER.Viewport();
            RENDER.Canvas();
            RENDER.OverlayGhost($viewport);


            // Search + setup home layer
            is.LAYER && LAYER.LayerHomeMarkup();


            // Slides: setup markup
            // + Create '$s' empty -> add new slide in loop function
            va.$s = $('');
            $canvas.children().each(function() { RENDER.Slide($(this)) });


            // Setup each elements each slide
            va.$s.each(function() {
                var $slCur = $(this);

                // Setup Caption, PagItem
                RENDER.CapPagHTML($slCur);

                // Setup Videos
                is.VIDEOIFRAME && VIDEOIFRAME.ConvertTag($slCur);
            });
        },

        /**
         * CREATE MARKUP OF VIEWPORT
         */
        Viewport : function() {

            // Initialize variable
            var viewClass = va.ns + o.nameViewport,
                viewport  = $ruby.children('.'+ viewClass);


            // Search markup viewport
            if( viewport.length ) $viewport = viewport;
            else {
                $ruby.wrapInner( $(divdiv, { 'class': viewClass }) );
                $viewport = $ruby.children('.'+ viewClass);
            }

            // Store 'viewport' in variable
            va.$viewport = $viewport;
        },

        /**
         * CREATE MARKUP OF CANVAS
         *  + Default tagname is 'div'
         *  + Can chnages tagName of canvas by 'tagName' option
         *  + Automatically changes tagName of canvas to 'ul' if tagName of slide is 'li'
         */
        Canvas : function() {

            // Initialize variable
            var canvasClass = va.ns + o.nameCanvas,
                tagCanvas   = o.tagCanvas,
                canvas      = $viewport.children('.'+ canvasClass);


            /**
             * CASE: MARKUP CANVAS IS OUTSIDE || EXIST BEFORE
             */
            if( canvas.length ) {
                tagCanvas = canvas[0].tagName.toLowerCase();
            }


            /**
             * CASE: CREATE NEW MARKUP OF CANVAS
             */
            else {

                /**
                 * CASE: SLIDES EXIST
                 */
                var $slides = $viewport.children();
                if( $slides.length ) {

                    // Automatically changes tagCanvasName if tagName of children is 'li'
                    if( tagCanvas == 'div' && $slides[0].tagName.toLowerCase() == 'li' ) tagCanvas = 'ul';

                    var html = (tagCanvas == 'ul') ? '<ul/>' : divdiv;
                    $slides.wrapAll( $(html, {'class': canvasClass}) );
                }


                /**
                 * CASE: THE SLIDES NOT EXIST
                 */
                else {
                    $viewport.append( $('<div/>', { 'class': canvasClass }) );
                }
            }



            /**
             * STORE CANVAS INTO GLOBAL VARIABLE
             */
            $canvas = va.$canvas = $viewport.children('.'+ canvasClass);
            M.Data($canvas, { 'tagName': tagCanvas, 'pos' : { 'x' : 0 } });
        },

        /**
         * OVERLAY GHOST: SUPPORT SWIPE GESTURE NOT PREVENT BY ANY OTHER ELEMENTS
         */
        OverlayGhost : function($parent) {

            var $overlayGhost = $(divdiv, { 'class' : va.ns +'overlay-ghost' });
            $parent.append($overlayGhost);
        },

        /**
         * CREATE MARKUP OF SLIDES
         *  + Wrap 'div'/'li' for slide without wrapper
         *  + Add class '{ns}slide' & add icon loader into slide
         */
        Slide : function($sl) {
            var slClass    = va.ns + o.nameSlide,
                slTagBegin = $sl[0].tagName.toLowerCase();


            /**
             * SETUP OF TAG NAME
             */
            // Case: wrapper is 'div|li|article|section'
            if( /^(div|li|article|section)$/.test(slTagBegin) || $sl.hasClass(slClass) ) {
                // do nothing
            }

            // Case: wrapper is 'style|script' -> remove setup
            else if( /^(style|script)$/.test(slTagBegin) ) {
                return;
            }

            // Case: wrapper is '<br>' -> remove current slide
            else if( /^(br)$/.test(slTagBegin) ) {
                $sl.remove();
                return false;
            }

            // Slide without wrapper, only one element link '<a>', '<img>'
            else {
                var canvasTag = M.Data($canvas)['tagName'],
                    slTag     = (canvasTag == 'ul') ? '<li/>' : divdiv,
                    $wrapper  = $(slTag, { 'class': slClass });

                $sl.wrap($wrapper);
                $sl = $sl.closest('.'+ slClass);
            }




            // Slide: add class -> make sure slide has class nameSlide
            // Slides assign to variable $s, add class 'sleep' to setup height 100% , hidden all children
            $sl
                .addClass( slClass )
                .addClass( M.NS('{ns}sleep {ns}no-loaded') )
                .addClass( va.deactived );

            // Slide: initialize properties in data to get info without error
            var FALSE = false;
            M.Data($sl, {
                'isLoading'  : FALSE,
                'isLoaded'   : FALSE,
                'isImgback'  : FALSE,
                'isVideo'    : FALSE,
                'isAjax'     : FALSE,
                'isPagEmpty' : FALSE,
                'loadBy'     : 'normal'
            });


            // Insert icon loader into slide
            RENDER.LoaderAdd($sl, $sl, '$slLoader');

            // Insert slide to '$s' variable
            va.$s = va.$s.add($sl);

            // Return slide: supprot for add new slide by api
            return $sl;
        },

        /**
         * SEARCH & CREATE MARKUP CAPTION ITEM & PAGITEM OF CURRENT SLIDE
         */
        CapPagHTML : function($slCur) {

            /**
             * SEARCH CONTENT CAPTION OF CURRENT SLIDE
             */
            var ns       = va.ns,
                capHTML  = '',
                slData   = M.Data($slCur),
                $imgback = $slCur.find('.' + ns + o.nameImageBack);

            // First, get content of Imageback
            $imgback.each(function() {
                var $i = $(this);

                // Content of caption depends on tagName
                // + is image: get content in 'alt' attribute
                // + is link tag: get content inside tag
                var tag = this.tagName.toLowerCase();
                if     ( tag === 'img' ) capHTML = $i.attr('alt');
                else if( tag === 'a' )   capHTML = $i.html();
            });


            // Keep searching content in Caption item element
            var $capItem = $slCur.children('.' + ns + 'capitem');
            if( $capItem.length ) {
                capHTML = $capItem.html();
                $capItem.remove();
            }

            // Store captionItem into data slide
            slData.htmlCap = capHTML;



            /**
             * SETUP PAGINATION ITEM
             */
            // Pagination item: search '.pagitem' -> store into data slide
            var $pagItem = $slCur.children('.' + ns + 'pagitem');

            // Case: create new node if not exist
            if( !$pagItem.length ) {
                $pagItem = $(divdiv, { 'class': ns + 'pagitem' });
                slData.isPagEmpty = true;
            }

            // Store object into data slide then remove
            slData.$pagItem = $pagItem;
            $pagItem.remove();
        },










        /**
         * SERACH THE ELEMENTS OF OUTSIDE RUBY
         */
        SearchNode : function(classSearch) {
            var $dom = $(),
                NAME = va.name;


            /**
             * CONDITIONAL EXECUTION: MUST BE 'NAME' DEFINED
             */
            if( NAME !== null && NAME !== undefined ) {
                $(classSearch).each(function() {

                    var $item      = $(this),
                        markupData = $item.data(rt01VA.rubyName + 'Markup');

                    // Get object if value in data link name of ruby
                    if( markupData === NAME ) $dom = $item;
                });

                // Return object
                if( $dom.length ) return $dom;
            }



            /**
             * KEEP SEARCHING OBJECT INSIDE RUBY
             */
            var $findNext = M.Find($ruby, classSearch);

            // Return object found
            return $findNext.length ? $findNext : $();
        },

        /**
         * INSERT THE MARKUP INTO OBJECT
         */
        Into : function(intoParent, $child) {
            var oMarkup = o.markup, $parent;

            // Search parent object
            switch( intoParent ) {

                case 'viewport' :
                    $parent = $viewport;
                    break;

                case 'nav' :
                    if( !va.$nav ) {
                        va.$nav = $(divdiv, {'class' : va.ns + o.nameNav});
                        RENDER.Into(oMarkup.navInto, va.$nav);
                    }
                    $parent = va.$nav;
                    break;

                case 'ssControl' :
                    $parent = va.$ssControl;
                    break;

                default :
                    $parent = $ruby;
                    break;
            }

            // Insert new childrent found into parent
            $parent.append($child);
        },

        /**
         * RENDER ICON LOADER
         */
        LoaderAdd : function($slide, $parent, name) {

            /**
             * CONDITIONAL EXECUTION
             */
            if( !(o.isLoader) ) return;



            /**
             * CREATE LOADER
             */
            var markup  = (name === '$loaderThumb') ? M.NS(o.markup.loaderThumb)
                                                    : M.NS(o.markup.loader),

                // Create loader by jQuery
                $loader = $(markup);

            // Store loader into data slide & insert to parent
            M.Data($slide)[name] = $loader;
            $parent.append($loader);
        },

        LoaderRemove : function($slide, name) {

            var $loader = M.Data($slide)[name];
            $loader && $loader.remove();
        },










        /**
         * UPDATE IMAGE IN 'OVERLAY' ELEMENT
         */
        DivImg : function(name, parent, isAfter) {

            var classes   = va.ns + o[name+'Name'],
                nameUpper = M.ProperCase(name);     // Capitalize the first letter of 'name', ex: 'overlay' to 'Overlay'

            va[name] = $ruby.find('.'+ classes);


            // Case: option actived
            if( o['is'+ nameUpper] ) {
                if( !va[name].length ) {

                    // Check image inside container
                    var src = $ruby.data('img'+ name),
                        tag = (!!src) ? '<div class="'+ classes +'"><img src="'+ src +'" alt="['+ name +']"></div>'
                                      : '<div class="'+ classes +'"></div>';

                    // Select insert after || before compare with parent object
                    isAfter && parent.after($(tag)) || parent.before($(tag));
                }
            }

            // Case: option deactived -> remove, support for 'update' api
            else if( va[name].length ) va[name].remove();
        },

        /**
         * RENDER OTHER ELEMENTS
         */
        Other : function() {

            // Render overlay element
            (oo.isOverlay != o.isOverlay) && RENDER.DivImg('overlay', $canvas, true);
        }
    },










    /**
     * LOAD METHODS
     * Support features:
     *  + Begin loading slide with ID != 0
     *  + Load by zigzag left/right if idBegin != 0
     *  + Preload slide, default is 1
     *  + Support parallel load : optimal load speed
     *  + When no loaded, switch to other slide -> priority load current slide
     */
    LOAD = {

        /**
         * STORE ID OF SLIDES INTO ARRAY TO LOADDING SLIDE IN ORDER
         */
        Way : function() {
            var IDToLoad = [],          // Store ID of slide in array
                idCur    = cs.idCur,    // ID current
                oload    = o.load;


            /**
             * CHECK LOADING STATUS OF SLIDE
             */
            function IsSlideLoading(id) {
                return M.Data(va.$s.eq(id))['isLoading'];
            }


            /**
             * FUNCTION: LOADING THE SLIDE IN ORDER FORM SMALLEST TO LARGEST
             * + Load in order : 0,1,2,3,4...
             */
            function LoadLinear() {
                for( var i = 0; i < num; i++ ) {
                    !IsSlideLoading(i) && IDToLoad.push(i);
                }
            }


            /**
             * LOADING SLIDES BY ZIGZAG DEPENDS ON 'IDMAP'
             */
            function LoadZigzagByIDMap() {
                var idMap    = va.idMap,
                    idCenter = M.C(num / 2 - 1),
                    idCur    = idCenter,
                    nLeft    = 1,
                    nRight   = 1,
                    isRight  = true;


                /**
                 * SETUP EACH SLIDE
                 */
                for( var i = 0; i < num; i++ ) {

                    /**
                     * CASE: THE FIRST SLIDE
                     */
                    if( i == 0 ) {
                        !IsSlideLoading(idMap[idCur]) && IDToLoad.push( idMap[idCur] );
                    }


                    /**
                     * CASE: SETUP OTHER SLIDE
                     */
                    else {
                        if( isRight ) {
                            idCur = idCenter + nRight;
                            nRight++;
                            isRight = false;
                        }
                        else {
                            idCur = idCenter - nLeft;
                            nLeft++;
                            isRight = true;
                        }

                        !IsSlideLoading(idMap[idCur]) && IDToLoad.push( idMap[idCur] );
                    }
                }
            }


            /**
             * LOADING SLIDES ZIGZAG BY RIGHT/LEFT DIRECTION
             * + Begin loading at idBegin -> next load right/left -> next load right/left
             */
            function LoadZigzagLine() {
                var right     = 1,      // Default: load right first
                    n         = 1,
                    leftEnd   = 0,      // Shortcut leftEnd
                    rightrEnd = 0;      // Shortcut rightEnd


                /**
                 * SETUP EACH SLIDE
                 */
                for( var i = 0; i < num; i++ ) {

                    /**
                     * CASE: THE FIRST SLIDE
                     */
                    if( i == 0 ) {
                        !IsSlideLoading(va.idBegin) && IDToLoad.push(va.idBegin);
                    }


                    /**
                     * CASE: OTHER SLIDES
                     */
                    else {
                        if( (idCur != num - 1) && (right || leftEnd) ) {
                            !IsSlideLoading(idCur + n) && IDToLoad.push(idCur + n);

                            // Left: end
                            if( leftEnd ) n++;
                            else          right = 0;

                            // Right: check end
                            if( IDToLoad[i] >= num-1 ) rightrEnd = 1;
                        }
                        else {
                            !IsSlideLoading(idCur - n) && IDToLoad.push(idCur - n);
                            n++;

                            // Right: end
                            right = !rightrEnd;

                            // Left: check end
                            if( IDToLoad[i] <= 0 ) leftEnd = 1;
                        }
                    }
                }
            }





            /**
             * THE NUMBER OF SLIDE PARALLEL LOADING
             *  + After complete preload -> 'va.nLoadParallet' allways = -1 -> plus 1 at first to easy setup
             */
            va.nLoadParallel = oload.amountEachLoad + 1;


            /**
             * SETUP PRELOAD
             *  + Case 'all': load all slides
             *  + Case == 0: allways preload 1 slide
             */
            va.preload = oload.preload;
            if( oload.preload == 'all' ) va.preload = num;
            if( oload.preload <= 0 )     va.preload = 1;



            /**
             * SETUP ORDER & POSITION ID OF SLIDES
             */
            LOAD.IDMap();



            /**
             * SETUP IN ORDER LOAD OF SLIDES
             */
            if( cs.num > 0 ) {

                // Case: slide at center position ->  load zigzag-round
                if( va.layout == 'line' && is.centerLoop ) LoadZigzagByIDMap();

                // Case: slide at position linear
                // If ID = 0: load linear, the rest is load zigzag-line
                else (idCur == 0) ? LoadLinear() : LoadZigzagLine();
            }

            // Store value IDToLoad into variable
            va.IDToLoad = IDToLoad;
        },

        /**
         * ORDER APPEARANCE OF ID SLIDE
         * The steps taken:
         *  + Search ID-slide begin in array[]
         *  + The remaining order in array[] by plus 1
         *  + If order > va.num -> begin by 0
         */
        IDMap : function() {
            var map = [];

            /**
             * SETUP IDMAP FOR CENTER LAYOUT
             */
            if( va.layout == 'line' && is.centerLoop ) {

                // Priority slide right appears if sum of slides is even number
                var idBegin = M.C(num / 2) + cs.idCur;
                if( !va.center.isOdd ) idBegin++;

                // 'idBegin' begin again by smaller, if larger 'va.num'
                if( idBegin >= num ) idBegin -= num;


                // Function loop: add ID to map
                for( i = 0; i < num; i++ ) {

                    // idBegin return 0, if larger 'va.num'
                    if( idBegin >= num ) idBegin = 0;

                    // Map: add value
                    map[i] = idBegin++;
                }
            }


            /**
             * SETUP IDMAP FOR LAYOUT WITHOUT CENTER
             */
            else {
                for( i = 0; i < num; i++ ) {
                    map.push(i);
                }
            }

            // Store result into variable
            va.idMap = map;
        },










        /**
         * SETUP PARALLET LOADDING MULTIPLE SLIDES AT FIRST
         */
        ParallelWhenSlideBegin : function() {
            var IDToLoad = va.IDToLoad;

            /**
             * UPDATE VARIABLE TO RECOGNIZE STATUS LOADING
             */
            IDToLoad.length && IDToLoad.shift();        // Get ID current slide
            va.nLoadAtFirst++;                          // Increase the number of load



            /**
             * SETUP PRELOAD SLIDES AT RUBY APPEARANCE AT FIRST
             *  + This time 'LOAD.slideBegin()' in 'LOAD.ParalletWhenSlideEnd()' be paused
             */
            if( va.nLoadAtFirst < va.preload && IDToLoad.length ) {
                LOAD.SlideBegin( va.$s.eq(IDToLoad[0]) );
            }
        },

        /**
         * SETUP PARALLET MULTIPLE SLIDES SAME TIME WHEN FINISH SETUP THE SLIDE
         */
        ParallelWhenSlideEnd : function($slide) {

            // Initialize variable
            var IDToLoad = va.IDToLoad,
                oload    = o.load;

            // Variable use for preload
            va.nLoaded++;

            // Complete the process preload
            if( !is.preloaded && va.nLoaded == va.preload ) is.preloaded = true;


            // Check next load
            if( !oload.isLazy ) {

                // LoadAmount only performed when complete preload
                // Reset value of 'va.nLoadParallet' if 'va.nLoadParallet' == 0
                if( is.preloaded ) {

                    va.nLoadParallel--;
                    if( !va.nLoadParallel ) va.nLoadParallel = o.load.amountEachLoad;
                }



                /**
                 * SETUP LOAD NEXT SLIDE
                 *  + Condition: va.IDToLoad[] !== empty & is.preloaded == true
                 *  + If is.preloaded == false -> 'LOAD.SlideBegin()' be paused -> load new slide switch to 'LOAD.ParalletWhenSlideBegin()'
                 *  + Additional condition: 'LOAD.Add()' not work -> avoid runing multiple function same time
                 */
                if( IDToLoad.length && is.preloaded && va.nLoadParallel >= oload.amountEachLoad && !M.Data($slide)['isLoadAdd'] ) {

                    for( i = va.nLoadParallel; i > 0; i-- ) {
                        LOAD.Next();
                    }
                }
            }
        },

        /**
         * LOADING ADD NEW SLIDE WHEN TOGGLE TO OTHER SLIDE
         */
        Add : function($slide) {
            var slData = M.Data($slide);


            // Check slide is complete loading
            if( slData && !slData.isLoading ) {

                // Reset 'loadAll' variable
                is.loadAll = false;

                // Because unknown ID of current slide in va.IDToLoad[] -> use loop
                // Get index ID in va.IDToLoad[]
                // Check va.IDToLoad !== null in the case add new slide by api
                var IDToLoad = va.IDToLoad;
                if( IDToLoad.length ) {

                    for( i = IDToLoad.length - 1; i >= 0; i-- ) {
                        if( IDToLoad[i] === cs.idCur ) {

                            // Swap ID in va.IDToLoadp[], if there is no order in next load
                            IDToLoad.splice(0, 0, IDToLoad.splice(i, 1)[0]);

                            // Break loop for
                            i = -1;
                        }
                    }
                }


                // Check next load slide
                LOAD.Next($slide);
            }
        },










        /**
         * LOAD NEXT SLIDE
         */
        Next : function($slNext) {

            /**
             * CONDITIONAL EXECUTION
             */
            if( !(cs.num && va.IDToLoad.length) ) return;



            /**
             * SETUP LOAD NEXT SLIDE
             */
            // Get slide in 'va.IDToLoad' if without 'slNext' paramater
            if( !$slNext ) $slNext = va.$s.eq(va.IDToLoad[0]);

            // Load next slide
            LOAD.SlideBegin($slNext);
        },

        /**
         * SETUP CURRENT SLIDE AT FIRST
         */
        SlideBegin : function($slide) {
            var slData = M.Data($slide);

            // Ver 1.5 - 24/09/2016 : fixed when add new slide by api, $slide = undefined
            if( !$slide.length ) return;

            // Load: setup begin
            cs.ev.trigger('loadBegin', [$slide, slData.id]);

            // Setup load all slide same time
            LOAD.ParallelWhenSlideBegin();

            // Remove class 'sleep' -> diplay the childrent of slide
            $slide.removeClass(va.ns +'sleep');

            // Status loading of current slide
            slData.isLoading = true;




            /**
             * CASE: ID SLIDE === IDBEGIN OPTION
             */
            if( slData.id === va.idBegin ) {

                // Toggle current slide at first
                cs.idCur == 0 && cs.ev.trigger('start');
                M.ToggleSlide();
            }




            /**
             * OTHER SETUP
             */
            // Setup all Image & Videoback in slide
            is.VIDEOBACK && VIDEOBACK.SetupAtLoadSlideBegin($slide);
            is.IMAGE && IMAGE.SetupAtLoadSlideBegin($slide);

            // Continue setup 'SlideEnd' if without Image & Videoback
            if( !slData.isVideoback && !slData.imageLen ) {
                LOAD.SlideEnd($slide);
            }
        },

        /**
         * SETUP CURRENT SLIDE AFTER LOADED ALL IMAGE
         *  + Only for slide object (not included Canvas)
         */
        SlideEnd : function($slide) {

            var hSlide  = M.OuterHeight($slide, true),
                slData  = M.Data($slide),
                id      = slData.id,
                ns      = va.ns;

            // Slide current: setting data
            slData.height   = hSlide;
            slData.isLoaded = true;

            // Remove class after complete loaded
            $slide.removeClass(ns + 'no-loaded');




            /**
             * DISPLAY RUBY & SETUP THE PROPERTIES AFTER COMPLETE LOADED FIRST SLIDE
             */
            if( !is.initLoaded ) {

                // Toggle class 'init' & 'ready' -> Ruby ready
                $ruby.addClass(ns + 'ready').removeClass(ns + 'init');

                // SETUP HEIGHT OF RUBY AT FIRST SLIDE
                // -> Must be removed class 'init' when make fn -> fixed lag
                if( is.heightFixed ) SIZE.HeightFixedForRuby();
                else                 SIZE.HeightAutoForRuby(hSlide);

                // Setup size of ruby depends on direction
                SIZE.EndOfRuby();

                // Init: load continue
                INIT.Load();
            }




            /**
             * SETUP POSITION OF IMAGEBACK + VIDEOBACK
             */
            if( is.IMAGE ) {
                IMAGE.BackPosition(slData.$imgback);
            }

            // Case: Videoback
            if( is.VIDEOBACK ) {

                // Setup position of Videoback
                VIDEOBACK.Position(slData.$videoback);

                // Setup properties of Video Poster
                var $videoPoster = slData.$videobackPoster;
                VIDEOBACK.Properties($videoPoster);
                VIDEOBACK.SizeResponsive($videoPoster);
                VIDEOBACK.Position($videoPoster);

                // Play Videoback of current slide
                id == cs.idCur && VIDEOBACK.Run('play');
            }


            // Update size & position of veritcal direction
            !is.dirsHor && VERTICAL.SlideLoaded();

            // Display slide after loaded all image
            $slide.addClass(ns + 'ready');

            // Icon loader: remove
            RENDER.LoaderRemove($slide, '$slLoader');




            /**
             * SETUP PAGINATION OF SLIDE
             */
            is.pag && PAG.SetupWhenLoadSlideEnd($slide);




            /**
             * SETUP HOTSPOT AT FIRST
             */
            if( is.HOTSPOT ) {
                HOTSPOT.Init($slide);

                // Use timer for fixed size of Hotspot item incorrect at first
                setTimeout(function() { HOTSPOT.Reset(id) }, 10);
            }




            /**
             * SETUP LAYER AT FIRST
             *  + Need 'va.hRuby' first
             */
            if( is.LAYER ) {
                LAYER.Init($slide);

                // Play Tween animate of current slide
                id == cs.idCur && LAYER.Play(id);
            }




            /**
             * SETUP PARALLAX LAYER AT FIRST
             */
            if( is.LAYERPARALLAX ) {
                LAYERPARALLAX.Init($slide);

                // Toggle event of parallax effect layer
                id == cs.idCur && LAYERPARALLAX.ToggleEvent(id);
            }




            /**
             * INITIALIZE VIDEO IFRAME
             */
            is.VIDEOIFRAME && VIDEOIFRAME.Init($slide);




            /**
             * CHECK CURRENT SLIDE HAS PARALLAX EFFECT
             */
            is.PARALLAX && PARALLAX.Check($slide);




            /**
             * CONTINUE PLAY SLIDESHOW AFTER LOADED SLIDE
             */
            is.slideshow && SLIDESHOW.Go('slideLoaded');




            /**
             * SETUP EVENTS TRIGGER
             */
            // Events trigger: slide loaded
            cs.ev.trigger('loadSlide.' + id);
            cs.ev.trigger('loadEnd', [$slide, id]);

            // Events 'loadAll' : when va.IDToLoad[] empty
            if( !va.IDToLoad.length ) {
                is.loadAll = true;
                cs.ev.trigger('loadAll');
            }




            /**
             * LOAD NEXT SLIDE
             *  + Located at end
             */
            LOAD.ParallelWhenSlideEnd($slide);
        }
    },










    /**
     * POSITION
     */
    POSITION = {

        /**
         * SETUP ANIMATION WITH FIXED POSITION
         */
        AnimateX : function($obj, nx, isNoAnim, isPosFixed, speed, easing) {

            /**
             * VALUE SETUP
             * Object translate is '$obj' -> if not, select ''$swipeCur'
             */
            var $swipe = ($obj === null) ? va.$swipeCur : $obj,
                p      = $swipe.is($canvas.add(va.$s)) ? va.can : va.pag,

                // Position to go to
                x = isPosFixed ? nx : (- nx * p.sTranslate + p.xCanvas);

            // Speed & easing of transition
            speed  = speed || va.speed[cs.idCur];
            easing = easing || va.easing;

            // Setup limited position in Carousel effect
            x = POSITION.LimitInCarouselX(x);

            // Update current position of 'xCanvas'
            p.xCanvas = x;




            /**
             * TRANSITION SETUP
             *  + Case: support transtion css
             *  + Case: not support transition css
             */
            var tf = (p.dirs === 'hor') ? { 'x': x }
                                        : { 'y': x },

                // Get Tween of '$swipe'
                tween = M.GetTween($swipe);


            // Case: have Animation
            if( !isNoAnim ) {
                tween
                    .animate($swipe, tf, {
                        isNew    : true,
                        duration : speed,
                        easing   : easing
                    });
            }

            // Case: without Animation
            else tween.css($swipe, tf);
        },

        /**
         * SETUP POSITION MIN/MAX IN CAROUSEL EFFECT
         */
        LimitInCarouselX : function(x) {

            // Conditional execution
            if( va.layout == 'line' && !is.loop && va.$swipeCur.is(va.$canvas) ) {
                var p = va.can;

                if     ( x > p.xMin ) x = p.xMin;
                else if( x < p.xMax ) x = p.xMax;
            }

            // Return value of limited position
            return x;
        },

        /**
         * SETUP MOVE OBJECT TO FIXED POSITION
         */
        TranslateX : function($obj, nx, isPosFixed, xPlus, isHorCustom) {

            // Setup position
            var x;
            if( isPosFixed ) x = nx;
            else             x = nx * va.can.sTranslate;


            // Transform: add _xPlus
            if( $.isNumeric(xPlus) ) x += xPlus;

            // Setup Tween CSS for object
            var isHor = isHorCustom === undefined ? is.dirsHor : isHorCustom,
                tf    = isHor ? { 'x' : x }
                              : { 'y' : x };

            M.GetTween($obj).css($obj, tf);
        },




        /**
         * BALANCE FOR CENTER LAYOUT
         * @porpose
         *  + Move slide to edge position
         *  + -> Slides allways balance number of 2 side after Canvas move
         *
         * @howtodo
         *  + Determine how many slide need to move -> create loop to move each slide
         *  + Move each slide: determine ID, position of slide need to move
         *  + Performed translate by 'xTranslate()'
         */
        Balance : function(isContinuity, isOne, speed) {
            // Conditional execution
            if( !is.loop ) return;


            /**
             * CHECK MOVE 'NEXT' OR 'PREV'
             *  + Move 'next'/'prev' have the same way -> different parameter
             */
            var isNext = va.nMove > 0,

                // Variable store different between of translate 'next' or 'prev'
                a = isNext ? { 's' : 1, 'id0': 0, 'idN': num - 1 }
                           : { 's' : -1, 'id0': num - 1, 'idN': 0 },

                // Number of slide translate combine with 'isOne' parameter, default is 'va.nMove'
                nMove = isOne ? 1 : M.A(va.nMove);


            // Speed of translate -> more slide more smaller speed
            a.speed = (speed === undefined) ? va.speed[cs.idCur] : speed;

            // Insert other options into variable
            a.isNext = isNext;
            a.isContinuity = isContinuity;




            /**
             * SETUP POSITION OF SLIDE FOR BALANCE
             */
            for( i = 0; i < nMove; i++ ) {

                /**
                 * VALUE OF EDGE SLIDE -> MOVE THE VARIABLE IN ARRAY
                 *  + id: get ID slide of first value in array
                 *  + xCur: get position of last value in array + wSlide
                 *  + tf: position of transform
                 */
                var id     = va.idMap[a.id0],
                    $slCur = va.$s.eq(id),
                    xCur   = va.pBegin[a.idN] + (va.can.sTranslate * a.s),
                    tf     = {};



                /**
                 * VALUE OF TRANSFORM FOR SLIDE IN EACH CASE
                 */
                // Case: normal
                if( va.view == 'basic' || va.view == 'mask' ) {
                    var tl = is.dirsHor ? 'Tlx' : 'Tly';            // Translate by css3
                    tf[cssTf] = M[tl](xCur);

                    $slCur.css(tf);
                }

                // Case: view coverflow3D
                else if( va.view == 'coverflow3D' ) {
                    var cover = o.coverflow3D,
                        z     = cover.isDeepMulti ? cover.zDeep * ((isNext ? va.center.nRight : va.center.nLeft) + 1)
                                                  : cover.zDeep;

                    va.tweenSlide.css($slCur, {
                        'x'       : xCur,
                        'z'       : -z,
                        'rotateY' : -cover.rotate * a.s
                    });
                }




                /**
                 * UPDATE VALUE IN VARIABLE
                 */
                M.Shift(va.idMap, isNext);
                M.Push(va.idMap, id, isNext);

                M.Shift(va.pBegin, isNext);
                M.Push(va.pBegin, xCur, isNext);




                /**
                 * UPDATE TRANSFORM ON SLIDES IN OTHER VIEW
                 */
                var balanceName = 'Balance'+ va.View;
                !!VIEW[balanceName] && VIEW[balanceName](a);
            }
        },

        /**
         * COPY SLIDES INTO WHEN TOGGLE SLIDE BY PAGINATION
         * @purpose
         *  + Toggle slide by pagination -> slide at edge position will automatically translate to all slide balnace
         *  + Appeare white area by edge slide translate -> copy edge slide but remain in place -> after translate done then remove all copy slide
         */
        FillHole : function() {
            // Conditional execution
            if( !is.loop) return

            // Check slideClone - remove
            va.$slClone.length && va.$slClone.remove();
            va.$slClone = $('');




            // Check clone slide
            // When toggle slide, slide hidden behind Viewport, not necessary to clone slide
            var center   = va.center,
                nMove    = (va.nMove > 0) ? center.nLeft : center.nRight,
                nMin     = nMove - center.nEdge,
                nMoveAbs = M.A(va.nMove);

            if( nMoveAbs > nMin ) {

                /**
                 * CREATE CLONE SLIDE + REMOVE ELEMENTS NOT NECESSARY
                 */
                for( i = nMin; i < nMoveAbs; i++ ) {

                    // Copy slide then append into Canvas
                    // Remove class 'cur' if on clone slide
                    var id = (va.nMove > 0) ? va.idMap[i]
                                            : va.idMap[num - 1 - i],

                        $slCur   = va.$s.eq(id),
                        $slClone = $slCur
                                    .clone()
                                    .addClass(va.deactived)
                                    .removeClass(va.ns + o.current)
                                    .appendTo($canvas);

                    // Store into data of slide
                    M.Data($slClone, { '$slSource': $slCur });

                    // Add new clone slide into variable -> remove all clone slide after translate done
                    va.$slClone = va.$slClone.add($slClone);
                }




                /**
                 * SETUP FOR SPECIAL VIEW
                 */
                var fnName = 'FillHole' + va.View;
                !!VIEW[fnName] && VIEW[fnName]();




                /**
                 * REMOVE ALL CLONE SLIDE AFTER ANIMATION END
                 */
                clearTimeout(ti.fillHole);
                ti.fillHole = setTimeout(function() {

                    va.$slClone.remove();
                }, va.speed[cs.idCur] + 10);
            }
        },




        /**
         * SETUP TRANSLATE REBOUND WHEN TAP ON NAVIGATION NOT ALLOW TO MOVE
         */
        AnimRebound : function(dirs) {
            if( !o.isAnimRebound ) return;

            // Initialize variable
            var p      = va.can,
                layout = va.layout,
                isNext = dirs == 'next',
                sign   = isNext ? -1 : 1,

                tSpeed = 150,                           // Speed of animation
                plus   = 30,                            // x plus value, unit px
                xBack  = isNext ? p.xMax : p.xMin,      // Initial position of Canvas
                xLimit = 130 * sign + xBack;            // Limited position for Canvas back -> +/- 130px



            /**
             * GET VALUE OF CURRENT POSITION -> SUPPORT GET POSITION OF CANVAS HAS MOVED
             */
            var xCur = $canvas.css(cssTf);
            if( is.tf ) xCur = (xCur == 'none') ? xBack : M.ValueX(xCur);
            else        xCur = (xCur == 'auto') ? xBack : M.PInt(xCur);



            /**
             * SETUP ANIMATION FOR CANVAS
             */
            var xGo = plus * sign + xCur;

            // Function animate Go & Back
            function Go()   { POSITION.AnimateX(null, xGo, 0, 1, tSpeed) }
            function Back() { POSITION.AnimateX(null, xBack, 0, 1) }

            // xGo : limited value
            // + When Canvas translate beyond allow
            // + Canvas translate to initial position
            if( xGo/sign > xLimit/sign ) {
                Back();
            }

            // Animate run
            // Canvas will translate a chunk -> setup timer for go back
            else {
                Go();
                clearTimeout(ti.rebound);
                ti.rebound = setTimeout(Back, tSpeed);
            }
        },

        /**
         * SETUP KEEP MOVING WHEN STOP SWIPE
         */
        Flywheel : function() {
            var isCanvas = $canvas.is(va.$swipeCur),
                p        = isCanvas ? va.can : va.pag;


            // Setup for $paginaton
            if( !isCanvas ) {

                /**
                 * CONDITIONAL EXECUTION FOR FLYWHEEL MOVING
                 *  + Inside scope of Viewport
                 *  + Duration of swipe < 200ms
                 *  + Moved temporarily must larger 1 'sTranslatel' -> case main slide
                */
                var tDrag      = va.tDrag1 - va.tDrag0,
                    isContinue = (va.xBuffer < 0 && va.xBuffer > p.xMax) && (tDrag < 200) && (M.A(va.xOffset) > 10);
                if( !isContinue ) return;


                /**
                 * SETUP CONTINUE
                 */
                var xOff    = va.pageX1 - va.x0Fix,     // Distance swiped -> get correct value instead 'xOffset'
                    xTarget = va.xBuffer + xOff,

                    /**
                     * WIDTH LIMITED
                     *  + Support check flywheel continue -> distance between x[0], x[1] > wLimit
                     *  + Support move pagination to edge if lack of distance
                     */
                    wLimit = 50;

                // Case: position to move to edge about a distance wLimit
                if     ( xTarget + wLimit > 0 )      xTarget = 0;
                else if( xTarget - wLimit < p.xMax ) xTarget = p.xMax;

                // Setup translate for pagination
                PAG.TranslateTo(xTarget);
            }
        },




        /**
         * MOVE CANVAS TO INITIAL POSITION
         *  + Remove transition after update
         */
        CanvasBegin : function() {

            /**
             * INIT POSITION OF CANVAS
             * @param int xCanvas
             *  + After resize -> Canvas & slide must reset position
             *  + Ruby center -> xCanvas: calculate back position of Canvas
             */
            var layout = va.layout,
                p      = va.can,
                xBegin = 0;

            // Init position of line layout
            if( layout == 'line' && is.center ) {
                var sSlideCur = is.dirsHor ? va.wSlide
                                           : M.OuterHeight(va.$s.eq(cs.idCur), true);

                xBegin = M.R( (va.sRuby - sSlideCur)/2 );
            }

            // Update init position of Canvas
            p.xCanvas = xBegin;



            /**
             * LIMITED POSITION OF CANVAS -> BUFFER SWIPE REDUCED RATE
             * @param int xMin
             * @param int xMax
             */
            if( layout == 'dot' )
                p.xMin = p.xMax = 0;

            else if( layout == 'line' ) {
                // Minimum position of Canvas
                p.xMin = xBegin;

                // Size of sum all slide
                // Same time remove 'margin' left of first item & 'margin' right of last item
                var sSlideSum = M.Sum(va.sSlideMap) - (va.ma[0] + va.ma[1]);

                // Maximum position of Canvas
                p.xMax = (va.wRuby < sSlideSum) ? - (sSlideSum - va.wRuby + xBegin)
                                                : xBegin;
            }



            /**
             * MOVE CANVAS TO POSITION OF CURRENT SLIDE
             */
            va.$swipeCur = $canvas;

            if( is.loop ) POSITION.AnimateX(null, xBegin, true, true);
            else          POSITION.AnimateX(null, cs.idCur, true);
        }
    },










    /**
     * SIZES
     */
    SIZE = {

        /**
         * GET VALUE MARGIN
         * @param array va.ma Value 1 is margin-left, value 2 is margin-right
         */
        Margin : function() {

            /**
             * CHECK & GET VALUE OF APPROPRIATE MARGIN
             */
            var wMin   = 1e5,
                id     = null,
                margin = va.maRange,
                wRuby  = va.wRuby,
                wWin   = $w.width();

            if( !!va.maRange ) {
                for( i = margin.num - 1; i >= 0; i-- ) {

                    // Search object have value inside the scrope
                    // Priority object have value 'to' largest
                    if( margin[i].from <= wWin && wWin <= margin[i].to ) {
                        if( wMin >= margin[i].to ) {

                            wMin = margin[i].to;
                            id   = i;
                        }
                    }
                }
            }

            // Get value of margin
            // Support value of margin according to %
            if( id !== null )
                va.ma = [ M.PPercent(margin[id].left, wRuby), M.PPercent(margin[id].right, wRuby) ];
            else
                va.ma = [0, 0];



            /**
             * AUTO GET MAGIN WHEN VIEWPORT HAVE PADDING
             *  + Fixed Viewport have CSS styled -> see the slide on Viewport
             */
            if( !va.maRange ) {
                if( is.dirsHor && va.wRuby !== M.InnerWidth($viewport) ) {
                    va.ma[0] = M.PInt($viewport.css('padding-left'));
                    va.ma[1] = M.PInt($viewport.css('padding-right'));
                }

                if( !is.dirsHor && va.hRuby !== M.InnerHeight($viewport) ) {
                    va.ma[0] = M.PInt($viewport.css('padding-top'));
                    va.ma[1] = M.PInt($viewport.css('padding-bottom'));
                }
            }
        },

        /**
         * SIZE INCLUDED MARGIN OF SLIDE
         * @param int va.wSlideFull
         * @param int va.can.sTranslate
         */
        TranslateS : function() {

            // Get value of margin
            SIZE.Margin();

            // Assign value
            // Default: wTranslate = wSLideFull -> other 'view' will update value later
            va.wSlideFull = va.can.sTranslate = va.wSlide + va.ma[0] + va.ma[1];
        },




        /**
         * SETUP WIDTH OF RUBY
         * @param init va.wRuby
         */
        WidthForRuby : function() {

            /**
             * VERTICAL TABS
             *  + Setup margin for Viewport -> get 'va.wRuby' value correct
             */
            if( is.pag && !!va.pagVer ) {

                // If have not margin, calculate size of pag item at first
                !va.pag.maRight && PAG.GetSizeOfItems();
                PAG.MarginOnViewport();
            }



            /**
             * WIDTH OF RUBY
             */
            va.wRuby = M.Width($viewport);



            /**
             * SETUP WIDTH OF SLIDE
             * @param int va.wSlide
             */
            // Setup horizontal direction
            var wSlide = null;
            if( is.dirsHor ) {

                // Get value Width of slide from 'range' array
                wSlide = M.GetValueInRange(va.sSlideRange, 'width');

                // Convert unit % to 'px', unit % in range [0, 1]
                if( wSlide > 0 && wSlide <= 1 ) wSlide *= va.wRuby;
            }

            // Setup vertical direction
            else {
                wSlide = va.wRuby;
            }

            // Rounded value 'wSlide'
            va.wSlide = M.PInt(wSlide);
        },

        /**
         * SETUP HEIGHT OF VIEWPORT FOR ANIMATE-HEIGHT IN HEIGHT-AUTO
         */
        HeightLockForAnim : function() {

            // First, setup current fixed height for Viewport
            $viewport.css('height', M.Height($viewport));

            // Create timer to remove fixed height for Viewport
            clearTimeout(ti.heightLock);
            ti.heightLock = setTimeout(function() {

                $viewport.css('height', '');
            }, o.speedHeight + 10);
        },

        /**
         * SETUP ANIMATE-HEIGHT EFFECT FOR RUBY
         * @param int va.hRuby
         */
        AnimHeightForRuby : function(isUpdateResize) {

            /**
             * GET HEIGHT OF CURRENT HEIGHT AT FIRST
             */
            var timePlus  = 30,

                // Ver 1.4 - 18/09/2016 : get size by 'offsetHeight' not included transformed css
                hSlideCur = M.OuterHeight(va.$s.eq(cs.idCur), true);




            /**
             * FUNTION: SUPPORT SMOOTH-HEIGHT FOR $CANVAS
             */
            function SmoothHeight(height) {

                // Store height value of ruby in variable
                // Size of Viewport varies depending on the swipe direction
                va.hRuby = height;
                if( !is.dirsHor ) va.sRuby = height;



                /**
                 * ANIMATION-HEIGHT EFFECT
                 *  + Remove effect if (speedHeight == null) || resize event
                 */
                if( o.speedHeight === null || isUpdateResize ) {
                    M.Scroll.Check();
                }

                else {
                    var speedHeight = o.speedHeight - timePlus;

                    // Setup animation effect
                    va.tweenView
                        .animate($viewport, { 'height': height }, {

                            isNew    : true,
                            duration : speedHeight,
                            complete : function() {

                                // Mark sure remove fixed height on Viewport
                                $viewport.css('height', '');

                                // Update value of variable ralative scroll browser
                                M.Scroll.Check();
                            }
                        });
                }
            }



            /**
             * CHECK HEIGHT CHANGES ON VIEWPORT
             */
            function CheckHeightChange() {

                // Smooth resize height Ruby when move to near slide
                // + Add options 'isUpdateResize' to allways run 'SmoothHeight()'
                // + Avoid case: resize event, (va.hRuby == hSlideCur) -> not execute 'SmoothHeight()'
                if( !is.heightFixed && ((va.hRuby != hSlideCur && hSlideCur > 0) || isUpdateResize) ) {
                    SmoothHeight(hSlideCur);


                    /**
                     * UPDATE VALUE OF PAGINATION VERTICAL WHEN CHANGES HEIGHT
                     *  + Smooth height for pagination vertical
                     */
                    if( is.pag && !is.pagList && va.pag.dirs == 'ver' && !is.pagOutside && o.pag.sizeAuto == 'full' ) {
                        PAG.PropAndStyle();
                    }
                }
            }




            /**
             * FUNCTION EXECUTION
             *  + Create timer for 'AnimHeightForRuby' -> Change height at last
             *  + Must be >= 30ms -> for Dot layout toggle class 'hNative' required delay for old browser ???
             */
            setTimeout(CheckHeightChange, timePlus);
        },




        /**
         * SETUP HEIGHT OF HEIGHT-AUTO WHEN LOADED FIRST SLIDE
         * @param int va.hRuby
         */
        HeightAutoForRuby : function(hSlide) {

            // Store & setup height allways be an integer
            va.hRuby = M.PInt(hSlide);
        },

        /**
         * SETUP HEIGHT OF HEIGHT-FIXED FOR RUBY
         * @param int va.hRuby
         */
        HeightFixedForRuby : function() {

            // Function: setup height for Viewport
            function HeightForViewport(h) {
                $viewport.css('height', h);
            }


            /**
             * SETUP IN FULLSCREEN MODE
             */
            if( o.isFullscreen ) {
                var hWin = $w.height();


                /**
                 * SETUP HEIGHT WHEN IT HAVE 'OFFSET'
                 */
                if( o.offsetBy !== null ) {
                    var hOffset = 0,
                        isImg   = false;

                    // Get height of $offset
                    var $offset = $(o.offsetBy);
                    $offset.each(function() {
                        hOffset += M.OuterHeight($(this), true);
                    });

                    // Are $offset the image ?
                    if( $offset.find('img').length ) isImg = true;

                    // Height Ruby will substract by height offsetBy container
                    hWin -= hOffset

                    // Reupdate position + size ruby when $offset contain images
                    if( isImg ) $w.on('load', function() { cs.refresh() });
                }

                va.hRuby = hWin;
                HeightForViewport(va.hRuby);
            }



            /**
             * SETUP NORMAL
             */
            else {

                // Priority level of height ruby: va.hRes > height css > o.height
                // Assign height Viewport when have height repsonsive
                if( va.hRes ) {
                    va.hRuby = M.R(va.hRes * va.rate);
                    HeightForViewport(va.hRuby);
                }
                else {

                    // Height value in css
                    var h = M.Height($viewport);

                    // Check if height in option !== height css
                    if( is.heightFixed && h != o.height ) {
                       h = o.height;
                       HeightForViewport(h);
                    }

                    if( !h ) h = 0;
                    va.hRuby = h;
                }
            }
        },

        /**
         * SETUP SIZE RUBY AFTER HAVE WIDTH - HEIGHT VALUE
         */
        EndOfRuby : function() {

            /**
             * IF WIDTH RUBY CHANGE -> UPDATE WIDTH - HEIGHT VALUE
             */
            if( va.wSlide !== M.Width($viewport) ) {

                // Get width of ruby at first
                SIZE.WidthForRuby();
                // Responsive: calculation padding & va.rate
                is.res && RESPONSIVE.UpdateVars();
                // Get height of ruby at first -> Support for image features autoFit/autoFill
                is.heightFixed ? SIZE.HeightFixedForRuby()
                               : SIZE.HeightAutoForRuby( M.OuterHeight(va.$s.eq(cs.idCur), true) );
            }


            /**
             * SETUP VARIABLE OF DIRECTION
             */
            // Varible to display size (width/height) of ruby
            va.sRuby = is.dirsHor ? va.wRuby : va.hRuby;
        }
    },











    /**
     * SETUP POSITION & SIZE
     */
    POSSIZE = {

        /**
         * SYNTHETIC INITIAL POSITION - SIZE OF ELEMENTS
         */
        CombineAtFirst : function() {

            /**
             * CSS WIDTH FOR CANVAS
             */
            if( va.layout == 'line' || va.layout == 'dot' ) {

                // Width of Canvas by swipe direction
                va.sCanvas = is.dirsHor ? va.wSlide : va.wRuby;
                $canvas.css('width', va.sCanvas);
            }

            // TranslateW: get
            SIZE.TranslateS();



            /**
             * SETUP VARIABLES IN LINE LAYOUT
             */
            if( va.layout == 'line' ) {

                /**
                 * IDENTIFY NUMBER OF EDGE SLIDE CAN SEE COMPARE WITH CENTER SLIDE
                 * @param int va.center.nEdge
                 */
                if( is.centerLoop ) {

                    var wAll = 0, i = 0;
                    while (wAll < va.wRuby) {
                        wAll = (va.wSlide + va.ma[0] + va.ma[1]) * (i * 2 + 1);       // Number 1: for center slide. Number 2: for edge slide
                        i++;
                    }
                    var nEdge = i-1;
                    if( nEdge * 2 >= num ) nEdge = ~~((num-1)/2);

                    // Store result into 'va.center'
                    va.center.nEdge = nEdge;
                }


                /**
                 * OTHER SETUP
                 */
                // Setup position for each slide
                var fnName = 'TFSlide'+ va.View;
                !!VIEW[fnName] && VIEW[fnName]();
            }




            /**
             * UPDATE POSITION OF CANVAS AT FIRST
             */
            POSITION.CanvasBegin();



            /**
             * PAGINATION: UPDATE VALUE OF VARIABLE
             */
            if( is.pag && !is.pagList ) {
                PAG.PropAndStyle();
                PAG.PosAndSizeOfItems();
                PAG.UpdateThumbnail();
                o.pag.isMark && PAG.SizePosOfMark();

                // Setup center position for center PagItem - without animation
                PAG.PosCenterForItemCur(true, true);



                /**
                 * CHECK CONVERT VERTICAL TABS TO HORIZONTAL TABS
                 *  + Create timer > 30ms: must be get height of ruby -> run first 'SIZE.AnimHeightForRuby()'
                 *  + 'PAG.VerToHor' into function() -> fixed IE7
                 */
                setTimeout(function() { PAG.VerToHor() }, 40);
            }
        },


        /**
         * SETUP POSITION & SIZE EACH SLIDE IN 'BASIC' VIEW
         */
        SlideBasic : function() {

            var pBegin    = va.pBegin    = [],
                sSlideMap = va.sSlideMap = [],
                nBegin    = is.centerLoop ? va.center.nLeft : 0;



            /**
             * FUNCTION: GET HEIGHT INCLUDED MARGIN OF CURRENT SLIDE
             */
            function HeightSlideCur(id) {
                return M.OuterHeight(va.$s.eq(id), true) + va.ma[0] + va.ma[1];
            }




            /**
             * STORE POSITION EACH SLIDE
             * @param array va.pBegin
             */
            // Default size of slide for horizontal direction
            if( is.dirsHor ) {
                for( i = 0; i < num; i++ ) {

                    sSlideMap[i] = va.wSlideFull;
                    pBegin[i] = sSlideMap[i] * (- nBegin + i);
                }
            }

            // Size of slide for vertical direction
            else {

                // Case: Center loop
                if( is.centerLoop ) {
                    var hTopPlus    = 0,
                        hBottomPlus = 0;

                    // Position Above
                    for( i = nBegin; i < num; i++ ) {
                        sSlideMap[i] = HeightSlideCur(va.idMap[i]);
                        pBegin[i] = hTopPlus;
                        hTopPlus += sSlideMap[i];   // Position starting = 0 -> must below location
                    }

                    // Position Below
                    for( i = nBegin - 1; i >= 0; i-- ) {
                        sSlideMap[i] = HeightSlideCur(va.idMap[i]);
                        hBottomPlus -= sSlideMap[i];
                        pBegin[i]    = hBottomPlus;
                    }
                }

                // Case: not Center loop
                else {
                    for( i = 0; i < num; i++ ) {
                        3[i] = HeightSlideCur(i);
                        pBegin[i] = sSlideMap[i] * i;
                    }
                }
            }
        }
    },











    /**
     * VIEW
     */
    VIEW = {

        /**
         * SETUP PROPERTIES WHEN RESIZE IN SIZE()
         */
        TFSlideBasic : function() {

            /**
             * SETUP POSITION & SIZE OF EACH SLIDE
             */
            POSSIZE.SlideBasic();



            /**
             * TRANSFORM POSITION OF EACH SLIDE BASE ON POSITION STORAGE ABOVE
             */
            var p         = va.can,
                isHor     = p.dirs == 'hor',
                translate = isHor ? 'Tlx' : 'Tly';


            va.tfMap = [];
            for( i = 0; i < num; i++ ) {
                var id = is.centerLoop ? va.idMap[i] : i,
                    tf = {};

                tf[p.cssTf] = M[translate](va.pBegin[i]);

                va.tfMap.push(tf);          // add vao namespace transform
                va.$s.eq(id).css(tf);       // Put slide into predefined position
            }
        }
    },










    /**
     * UPDATE POSITION & SIZE IN DIRECTION VERTICAL
     */
    VERTICAL = {

        /**
         * UPDATE POSITION & SIZE WHEN SLIDE LOAED
         */
        SlideLoaded : function() {
            // Size of each slide
            VIEW.TFSlideBasic();

            // Update position of Canvas when update position each slide
            if( va.layout == 'line' ) POSITION.CanvasBegin();
        }
    },










    /**
     * SWAP TO OTHER SLIDE
     */
    TOSLIDE = {

        /**
         * SETUP WHEN START MOVE TO NEXT SLIDE
         */
        Run : function(nSlide, isIDFixed, isContinuity, isPagCenter) {
            var idCur = cs.idCur;

            // Conditional execution
            if( !((!isIDFixed && nSlide <= cs.num) || (isIDFixed && idCur !== nSlide)) ) return;



            /**
             * TOSLIDE VARIABLE: STORE INITIAL PROPERTIES
             */
            va.ts = {
                'num'          : nSlide,
                // ID of fixed slide
                'isIDFixed'    : !!isIDFixed,
                // Swipe continuously
                'isContinuity' : !!isContinuity,
                // Default: is center
                'isPagCenter'  : (isPagCenter === undefined) ? true : !!isPagCenter
            };




            /**
             * SETUP INITIALIZE VARIABLES
             *  + fxRun : support slideshow + setup vertical tabs when body resize
             *  + slideNext : move to next or prev
             */
            is.fxRun = true;
            $ruby.addClass(va.ns +'fxRun');

            is.slideNext = isIDFixed ? (nSlide - cs.idCur > 0) : (nSlide > 0);
            cs.ev.trigger('fxBegin');




            /**
             * SETUP OTHER ELEMENTS WHEN SLIDE LOADED
             */
            if( M.Data(va.$s.eq(idCur))['isLoaded'] ) {

                is.HOTSPOT && HOTSPOT.Reset(idCur);                     // Reset initial status of Hotspot
                is.LAYER && LAYER.Reset(idCur);                         // Reset Tween current animate
                is.VIDEOIFRAME && VIDEOIFRAME.SlideDeactived(idCur);    // Closed all Video
                is.LAYERPARALLAX && LAYERPARALLAX.Reset(idCur)          // Reset position of Parallax item

                is.VIDEOBACK && VIDEOBACK.Run('pause');                 // Pause Videoback of current slide
            }

            // Slideshow: stop timer when run effect
            is.slideshow && SLIDESHOW.Go('slideToBegin');




            /**
             * MAIN SETUP
             */
            // Callback func: start && before
            isIDFixed ? (nSlide == 0) && cs.ev.trigger('start')
                      : (idCur + nSlide == 0 || idCur + nSlide - num == 0 ) && cs.ev.trigger('start');
            cs.ev.trigger('before');

            // ID: convert to ts.num
            if( isIDFixed ) va.ts.num -= idCur;

            // Easing transition of Canvas
            var es;
            if     ( va.moveBy == 'swipe' && va.moveLastBy != 'swipe' ) es = o.swipe.easing;
            else if( va.moveBy == 'tap' && va.moveLastBy != 'tap' )     es = o.fxEasing;

            if( es ) {
                va.easing = es;
                va.moveLastBy = va.moveBy;
            }

            // Continue setup depends layout
            TOSLIDE[va.layout]();
        },


        /**
         * SETUP CONTINUE IN 'LINE' LAYOUT
         */
        line : function() {
            var ts = va.ts;

            // Toggle ID current
            TOSLIDE.ToggleID();
            !is.heightFixed && SIZE.AnimHeightForRuby();

            // Setup when slide run end effect
            clearTimeout(ti.lineEnd);
            ti.lineEnd = setTimeout(TOSLIDE.End, va.speed[cs.idCur]);



            /**
             * ANIMATE $CANVAS IN HORIZONTAL DIRECTION
             */
            if( is.dirsHor ) {

                /**
                 * CASE: CENTER LOOP
                 */
                if( is.centerLoop ) {

                    // Translate by 'Tap' pagination
                    ts.isIDFixed && POSITION.FillHole();

                    // Setup transform of each slide to allways center layout
                    POSITION.Balance(ts.isContinuity);
                    !ts.isContinuity && POSITION.AnimateX($canvas, ts.num);
                }



                /**
                 * CASE: NO CENTER LOOP
                 */
                else {

                    // Animate to next object
                    !ts.isContinuity && POSITION.AnimateX($canvas, ts.num);

                    // Update transform on each slide
                    if( va.fxType == '3d' ) {
                        var restoreName = 'Restore'+ va.View;
                        !!VIEW[restoreName] && VIEW[restoreName]();
                    }
                }
            }




            /**
             * ANIMATE $CANVAS IN VERTICAL DIRECTION
             */
            else {

                /**
                 * CASE: CENTER LOOP
                 */
                if( is.centerLoop ) {

                    if( M.A(ts.num) == 1 ) {
                        var id         = ts.num > 0 ? cs.idLast : cs.idCur,
                            hSlideCur  = M.OuterHeight(va.$s.eq(id), true) + va.ma[0] + va.ma[1],
                            xTranslate = - (hSlideCur * ts.num - va.can.xCanvas);

                        // NOT FINISH -> PAUSE AT HERE !!!
                        POSITION.Balance(ts.isContinuity);
                        !ts.isContinuity && POSITION.AnimateX($canvas, xTranslate, false, true);
                    }
                }
            }
        },


        /**
         * SETUP CONTINUE IN 'DOT' LAYOUT
         */
        dot : function() {
            var ts = va.ts;

            // Toggle ID current
            // Add timer when toggle slide -> fixed flicker at first when performed 'Math' effect
            if( va.fxType == 'math' ) ts.isDelayWhenToggleID = true;
            TOSLIDE.ToggleID();

            // Setup animate height for Viewport in Height-Auto
            !is.heightFixed && SIZE.AnimHeightForRuby();

            // Initial setup effect
            FX.Init();
        },











        /**
         * TOGGLE CURRENT ID WITH LAST ID
         */
        ToggleID : function() {

            /**
             * SETUP VALUE HEIGHT FOR VIEWPORT IN HEIGHT-AUTO TO CREATE ANIMATE-HEIGHT EFFECT
             *  + Remove effect if 'speedHeight' == null
             */
            !is.heightFixed && (o.speedHeight !== null) && SIZE.HeightLockForAnim();




            /**
             * Change value of current & last ID
             */
            var ts    = va.ts,
                idCur = cs.idCur,
                // Store number of move slide
                nMove = va.nMove = ts.num;

            // Store idLast & update idCur
            cs.idLast = idCur;


            // Return value idCur when out range [0, num]
            idCur += nMove;
            if( is.loop ) {
                if(      nMove < 0 && idCur < 0 )    idCur = num + idCur;
                else if( nMove > 0 && idCur >= num ) idCur -= num;
            }

            // Past new value to current ID
            // Combine with 'swapID' event
            cs.ev.trigger('beforeSwapIDCur');
            cs.idCur = idCur;
            cs.ev.trigger('afterSwapIDCur');


            // Add timer for effect in 'Dot' layout : browser Chrome error -> slide shake
            // In week CPU, remove timer if click continuously
            if( !!ts.isDelayWhenToggleID ) setTimeout(M.ToggleSlide, 10);
            else                           M.ToggleSlide();




            /**
             * SETUP AFTER TOGGLE ID
             */
            TOSLIDE.AfterToggleID();
        },


        /**
         * SETUP AFTER TOGGLE ID
         *  + Similar with 'TOSLIDE.End()', but faster
         */
        AfterToggleID : function() {

            /**
             * SETUP CURRENT PAGITEM MOVE TO CENTER POSITION
             * @conditions
             *  + Only move to center when swipe on body run
             *  + Tap on PagItem
             *  + Vertical tabs allways execute that fucntion
             */
            if( is.pag && !is.pagList && va.ts.isPagCenter
            &&  (va.moveBy == 'swipe' || (va.moveBy == 'tap' && o.pag.isItemCurCenterWhenTap) || va.pag.dirs == 'ver') ) {

                // Because 'posCenter' for vertical tabs allways update properties 'PAG.PropAndStyle()' -> isForce = true : not animate to wrong position
                var isForceTf = (va.pag.dirs == 'ver') ? true : false;
                PAG.PosCenterForItemCur(isForceTf);
            }




            /**
             * OTHER SETUP
             */
            // Play Videoback in current slide
            is.VIDEOBACK && VIDEOBACK.Run('play');
        },


        /**
         * SETUP WHEN END EFFECT
         */
        End : function() {
            var idCur = cs.idCur;

            // Notice of end effect
            is.fxRun = false;
            $ruby.removeClass(va.ns +'fxRun');
            cs.ev.trigger('fxEnd');

            // Update & start play Layer of current slide
            if( is.LAYER ) {
                LAYER.Update(idCur);
                LAYER.Play(idCur);
                LAYER.Resume('home');
            }

            // Update position of Hotspot item after setup Layer
            is.HOTSPOT && HOTSPOT.UpdatePosition(idCur);

            // Toggle Parallax effect in layer
            is.LAYERPARALLAX && LAYERPARALLAX.ToggleEvent(idCur);

            // Other setup
            cs.ev.trigger('after');                         // Event after()
            idCur == num - 1 && cs.ev.trigger('end');       // Event end()




            /**
             * RESET SLIDE DISPLAY WHEN 'TAP' NAV - PAG & 'DRAG'
             */
            if( is.slideshow ) {
                is.hoverAction = true;

                // Check pause slideshow when have 'isLoop' == false & idCur at end
                if( !o.slideshow.isLoop && cs.idLast == num - 1 && idCur == 0 ) {
                    cs.pause();
                }
                else {
                    SLIDESHOW.Go('slideToEnd');
                }
            }
        }
    },










    /**
     * EVENTS
     */
    EVENTS = {

        /**
         * ARRANGE & SETUP THE EVENTS IN RUBY
         */
        Setup : function() {

            // Event Navigation & Pagination
            is.NAV && NAV.EventTap();
            is.PAG && PAG.EventTap();

            // Event Slideshow
            if( is.SLIDESHOW ) {
                SLIDESHOW.EventHover();
                SLIDESHOW.EventTap();
            }

            // Event Keyboard
            EVENTS.Keyboard();

            // Event Wheel & Mousewheel for Viewport, PagInner
            EVENTS.Wheel({
                '$wheel'    : $viewport,
                'direction' : va.can.dirs,
                'optsWheel' : o.wheel
            });
            is.PAG && EVENTS.Wheel({
                '$wheel'    : va.$pag,
                'direction' : va.pag.dirs,
                'optsWheel' : o.pag.wheel
            });

            // Event Deeplinking
            is.DEEPLINKING && DEEPLINKING.Events();

            // Event resize Window
            EVENTS.Resize();
        },

        /**
         * GET CORRECT EVENT BETWEEN MOUSE - TOUCH - SWIPE
         */
        GetEventRight : function(e) {
            var i = e;
            if( /^touch/.test(e.type) )        i = e.originalEvent.touches[0];
            else if( /pointer/i.test(e.type) ) i = e.originalEvent;
            return i;
        },

        /**
         * ADD TIMER TO REMOVE 2 EVENT 'CLICK' & 'SWIPEEND' IN SAME TIME
         */
        DelayToTapNext : function() {
            is.tapEnable = false;
            setTimeout( function() { is.tapEnable = true }, 10);
        },











        /**
         * NAVIGATION EVENTS
         */
        PrevCore : function(step) {
            va.moveBy = 'tap';

            /**
             * SETUP 'STEP' VARIABLE
             */
            step = step || 1;



            /**
             * CHECK ALLOW MOVE TO PREV SLIDE
             */
            if( (is.loop && cs.num > 1) || (!is.loop && cs.idCur > 0) ) {
                TOSLIDE.Run(- step);
            }
            else {
                POSITION.AnimRebound('prev');
            }
        },

        NextCore : function(step) {
            va.moveBy = 'tap';

            /**
             * SETUP 'STEP' VARIABLE
             */
            step = step || 1;



            /**
             * CHECK ALLOW MOVE TO NEXT SLIDE
             */
            if( (is.loop && cs.num > 1) || (!is.loop && cs.idCur < num - 1) ) {
                TOSLIDE.Run(step);
            }
            else {
                POSITION.AnimRebound('next');
            }
        },

        Prev : function() {
            if( is.tapEnable ) {
                var step = o.stepNav;

                EVENTS.PrevCore(step);
                EVENTS.DelayToTapNext();
            }
        },

        Next : function(isSlideshow) {
            if( is.tapEnable ) {

                // How many 'step' each case
                var step = isSlideshow ? o.stepPlay : o.stepNav;

                EVENTS.NextCore(step);
                EVENTS.DelayToTapNext();
            }
        },











        /**
         * EVENT TOGGLE SLIDE BY SHORTCUT KEYBOARD
         */
        Keyboard : function() {
            $doc.off(va.ev.key);

            if( o.isKeyboard ) {
                $doc.on(va.ev.key, function(e) {

                    // Check slideInto
                    M.Scroll.Check(true);
                    if( is.into ) {

                        var keyruby = e.keyRuby;
                        if     ( keyruby == 37 ) EVENTS.PrevCore(1);
                        else if( keyruby == 39 ) EVENTS.NextCore(1);
                    }
                });
            }
        },

        /**
         * EVENT TOGGLE SLIDE BY WHEEL EVENT
         *  + Reference value Wheel Delta (http://stackoverflow.com/q/5527601/6397436) :

                              | evt.wheelDelta | evt.detail
            ------------------+----------------+------------
              Safari v5/Win7  |       120      |      0
              Safari v5/OS X  |       120      |      0
              Safari v7/OS X  |        12      |      0
             Chrome v11/Win7  |       120      |      0
             Chrome v37/Win7  |       120      |      0
             Chrome v11/OS X  |         3 (!)  |      0      (possibly wrong)
             Chrome v37/OS X  |       120      |      0
                    IE9/Win7  |       120      |  undefined
              Opera v11/OS X  |        40      |     -1
              Opera v24/OS X  |       120      |      0
              Opera v11/Win7  |       120      |     -3
             Firefox v4/Win7  |    undefined   |     -3
             Firefox v4/OS X  |    undefined   |     -1
            Firefox v30/OS X  |    undefined   |     -1

         */
        Wheel : function(opts) {
            var suffix         = '.' + va.ns + va.rubykey,
                nameWheel      = 'wheel' + suffix,
                nameMouseWheel = 'mousewheel' + suffix,
                $wheel         = opts.$wheel;


            /**
             * CONDITIONAL EXECUTION
             */
            if( !opts.$wheel ) return;



            /**
             * AT FIRST: SETUP DATA WHEEL & REMOVE WHEEL EVENT ON OBJECT
             */
            // Loai bo event Wheel tren doi tuo.ng
            $wheel.off(nameWheel +' '+ nameMouseWheel);

            // Setup data wheel of object
            var wheelData = M.Data($wheel);
            if( !wheelData.wheelValue ) wheelData.wheelValue = { 'type': null, 'delta': 0 };

            var wheelValue = wheelData.wheelValue;




            /**
             * FUNCTION: MOVE TO NEXT SLIDE
             */
            function GotoNextSlide(deltaX, deltaY) {

                var wheelDelta          = wheelValue.delta,
                    valueActive         = 300,
                    isScrollPagePrevent = false;


                /**
                 * FIXED VALUE DELTA IN THE SPECIAL BROWSER
                 *  + Fixed for Firefox browser: value too small
                 */
                if( is.firefox ) {
                    deltaX *= 20;
                    deltaY *= 20;
                }




                /**
                 * FUNCTION: SETUP INCREASE CURRENT DELTA
                 */
                function DeltaPlus(deltaCur) {
                    if( deltaCur !== 0 && deltaCur !== undefined ) {

                        wheelDelta += (deltaCur > 0) ? deltaCur : -deltaCur;
                        isScrollPagePrevent = true;
                    }
                }




                /**
                 * SETUP VALUE DELTA DEPENDS ON OPTIONS
                 */
                switch (opts.optsWheel) {

                    /**
                     * TRUONG HOP 'AUTO'
                     */
                    case 'auto' :

                        // Case: horizontal direction
                        if( opts.direction == 'hor' ) DeltaPlus(deltaX);

                        // Case: vertical direction
                        else DeltaPlus(deltaY);
                        break;


                    /**
                     * CASE: 'BOTH'
                     */
                    case 'both' :
                        DeltaPlus(deltaX || deltaY);
                        break;
                }





                /**
                 * CHECK MOVE TO NEXT SLIDE
                 *  + Wheel twice will be allowed move to postion next slide
                 */
                if( wheelDelta <= -valueActive ) {

                    // Move to previous slide
                    EVENTS.PrevCore(1);

                    // Reset variable
                    wheelDelta = 0;
                    wheelValue.type = null;
                }

                else if( wheelDelta >= valueActive ) {

                    // Move to next slide
                    EVENTS.NextCore(1);

                    // Reset variable
                    wheelDelta = 0;
                    wheelValue.type = null;
                }

                // Store value of wheel event on Data
                wheelValue.delta = wheelDelta;

                // Return value prevent scroll page
                return isScrollPagePrevent;
            }




            /**
             * STRUCTURE OF WHEEL EVENT BETWEEN NATIVE WHEEL & WHEEL PLUGIN
             */
            if( o.wheel !== false ) {
                $wheel.on(nameMouseWheel +' '+ nameWheel, function(e) {
                    var typeCur = e.type,
                        events  = e.originalEvent;

                    // Match name of wheel event -> setup continue
                    if( wheelValue.type === null || wheelValue.type == typeCur ) {

                        // Setup type of current wheel if removed
                        if( wheelValue.type === null ) wheelValue.type = typeCur;

                        var deltaX = events.wheelDeltaX || events.deltaX || 0,
                            deltaY = events.wheelDeltaY || events.deltaY || 0;

                        // Check move to next slide
                        var isScrollPagePrevent = GotoNextSlide(deltaX, deltaY);

                        // Prevent to scroll page
                        if( isScrollPagePrevent ) return false;
                    }
                });
            }
        },










        /**
         * UPDATE RUBY AFTER LOAD ALL IMAGE || WINDOW LOADED
         */
        LoadAll : function() {

            /**
             * FUNCTION: CHECK VALUE OF 'RATE' CHNAGES
             *  + Update ruby if init 'rate' !== current 'rate'
             */
            function CheckRate() {
                is.res && va.rateInit != va.rate && cs.refresh();
            }



            /**
             * EXECUTE EVENT
             */
            cs.ev
                .off('loadAll')
                .on('loadAll', function() { CheckRate() });



            /**
             * EVENT 'LOAD' WINDOW
             *  + Update ruby
             */
            $w.on('load', function(e) {
                setTimeout(cs.refresh, 100);
            });
        },

        /**
         * EVENT UPDATE RUBY AFTER BROWSER RESIZE
         */
        Resize : function() {

            // Function check
            function Check() {

                clearTimeout(ti.resize);
                ti.resize = setTimeout(function() {

                    // Fullscreen: find current page at first
                    if( o.isFullscreen ) va.hRuby = $w.height();
                    // Update variable relative to scroll page
                    is.slideshow && !is.ssPauseAbsolute && M.Scroll.Check();

                    // Ruby: toggle showInRange
                    !!o.showInRange && is.DISPLAY && DISPLAY.Toggle();

                    // Reupdate Ruby: when show/hide scroll-bar browser
                    if( is.showInRange && ((M.Width($viewport) !== va.wRuby) || (M.Height($viewport) !== va.hRuby)) ) {
                        UPDATE.Resize();
                    }
                }, 100);
            }

            // Resize: event
            $w.off(va.ev.resize);
            $w.on(va.ev.resize, Check);




            /**
             * !IMPORTANT
             *  + Add 'div' resize event
             *  + Replace for functions need to resize:
             *      - Ruby nested initialize
             *      - 'EVENTS.RubyLoaded()' -> reby loaded all image
             *      - 'EVENTS.PageLoaed()' -> the webpage loaded
             *      - 'EVENTS.ReCheck()' -> remove 'ReCheck()' in 'resize' event & animate-height effect
             */
            clearInterval(ti.resizeLoop);
            ti.resizeLoop = setInterval(function() {

                var hCur = M.OuterHeight(va.$s.eq(cs.idCur), true),
                    wCur = M.Width($viewport);

                if( !is.fxRun && !is.swiping && (wCur != va.wRuby || hCur != va.hRuby) ) {
                    UPDATE.Resize();
                }
            }, o.delayUpdate);
        }
    },










    /**
     * EFFECT FOR 'DOT' LAYOUT
     */
    FX = {

        /**
         * CLASSIFICATION OF EFFECT AT FIRST
         *  + 'Math' effect
         *  + 'CSS' effect
         */
        Init : function(f) {
            var fxType = va.fxType,
                fnName = 'ToSlide' + va.View;


            // 'Math' effect
            if( fxType == 'math' && !!VIEW[fnName] ) VIEW[fnName]();

            // 'CSS' effect
            else if( /^css/.test(fxType) && !!VIEW[fnName] ) VIEW[fnName]();

            // None effect
            else FX.none();
        },

        /**
         * SETUP VARIABLES AT END
         */
        End : function(speedCur) {

            // Case: without timer
            if( speedCur === null ) {
                TOSLIDE.End();
            }

            // Case: hove timer
            else {
                if( !$.isNumeric(speedCur) ) speedCur = va.speed[cs.idCur];

                // Create timer
                clearTimeout(ti.fxEnd);
                ti.fxEnd = setTimeout(TOSLIDE.End, speedCur);
            }
        },











        /**
         * NONE EFFECT
         */
        none : function() {
            TOSLIDE.End();
        }
    },










    /**
     * API BASIC
     */
    API = {

        /**
         * THE BASIC API METHOD IN RUBY
         */
        // Method navigation
        prev : function(step) { EVENTS.PrevCore(step) },
        next : function(step) { EVENTS.NextCore(step) },
        first: function() { TOSLIDE.Run(0, true) },
        last : function() { TOSLIDE.Run(num - 1, true) },
        goto : function(id) {

            /**
             * FUNCTION: MOVE TO SLIDE
             */
            function GotoSlide($sl) {

                // Check valid of selector
                if( $sl.length && va.$s.is($sl) ) {
                    var slideID = M.Data($sl)['id'];

                    // Move to Slide
                    $.isNumeric(slideID) && TOSLIDE.Run(slideID, true);
                }
            }




            /**
             * CONVERT ID TO 'NUMBER' IF IT IS 'STRING NUMBER'
             */
            if( $.isNumeric(id) ) id = M.PInt(id);



            /**
             * MOVE TO SLIDE IN THE CASE
             */
            // Case: ID is number
            if( id >= 0 && id < num ) TOSLIDE.Run(id, true);


            // Case: ID is string - jQuery selector
            else if( typeof id === 'string' ) {
                var $slide = $(id);

                // Go to slide by $slide
                GotoSlide($slide);
            }


            // Case: ID is jQuery object
            else if( id instanceof jQuery ) GotoSlide(id);
        },


        // API Slideshow
        play  : function() { is.slideshow && SLIDESHOW.Api('play'); },
        pause : function() { is.slideshow && SLIDESHOW.Api('pause'); },
        stop  : function() { is.slideshow && SLIDESHOW.Api('stop'); },


        // API Layer
        playLayer   : function() { is.LAYER && LAYER.Play(cs.idCur); },
        pauseLayer  : function() { is.LAYER && LAYER.Pause(cs.idCur); },
        resumeLayer : function() { is.LAYER && LAYER.Resume(cs.idCur); },


        // Method update properties
        update : function(options, isNoRefresh) {

            // Store old options & update new options with deep level
            one.oo = oo = $.extend(true, {}, o);
            one.vava = vava = $.extend(true, {}, va);
            one.isis = isis = $.extend(true, {}, is);
            o = $.extend(true, o, options);
            va.optsUpdate = options;

            // Check ruby toggle display
            !!is.awake && !isNoRefresh && cs.refresh();
            va.optsUpdate = va.addInfo = null;
        },

        updateOnSlides : function(options) {
            if( !$.isPlainObject(options) ) return;

            va.optsSlides = options;
            cs.refresh();
            va.optsSlides = null;
        },

        refresh : function() {
            // console.log('refresh');
            PROP.MergeAllModules();
            UPDATE.RemoveClass();

            // Update value of name ruby
            va.name = o.name || $ruby.attr('id') || null;

            // Update RubyAnimate keyframes into ruby system
            is.RUBYANIMATE && RUBYANIMATE.UpdateAllKeyframes();
            PROP.Ruby();

            is.SLIDESHOW && SLIDESHOW.RenderControl();  // Slideshow: update markup
            is.TIMER && TIMER.Render();                 // Timer: update markup
            is.NAV && NAV.Render();                     // Navigation: update markup
            is.PAG && PAG.RenderSelf();                 // Pagination: update markup
            is.CAP && CAPTION.Render();                 // Caption: update markup

            PROP.Slides();
            LOAD.IDMap();

            // Toggle slide depends on Deeplinking - Cookie
            PROP.DeepLinkCookie();
            M.ToggleSlide();

            UPDATE.Reset();
            UPDATE.Resize();


            // Others
            RENDER.Other();
            EVENTS.Setup();

            is.APIREMOTE && APIREMOTE.Init();           // Api remote: update event
            is.SLIDESHOW && SLIDESHOW.UpdateAll();
        },

        // Destroy ruby
        destroy : function(isDelete) {

            // Remove swipe event
            is.SWIPE && SWIPE.Events(false);


            // Remove 'tap' event on navigation & pagination
            var evClick = va.ev.mouse.end +' '+ va.ev.swipe.end +' '+ va.ev.click;
            o.isNav && va.$prev.add(va.$next).off(evClick);
            o.isPag && va.$pagItem.off(evClick);

            // Remove ohter events
            $doc.off(va.ev.key);
            $viewport.off(va.ev.wheel);

            // Remove resize-timer & resize event
            clearInterval(ti.resizeLoop);
            $w.off(va.ev.resize);

            // Pause slideshow
            // Remove timer & scroll event
            if( o.isSlideshow ) {
                clearInterval(ti.timer);
                $w.off(va.ev.scroll);
                this.stop();
            }



            // Remove all node of ruby
            if( !!isDelete ) {

                // Delete data on ruby
                $ruby.removeData(rt01VA.rubyName);

                // Remove all elements have markup-outside
                !!va.$nav && va.$nav.remove();
                !!va.$pag && va.$pag.remove();
                o.isCap && va.$cap.remove();

                if( o.isSlideshow ) {
                    !!va.$timer && va.$timer.remove();
                    !!va.$playpause && va.$playpause.remove();
                    !!va.$ssControl && va.$ssControl.remove();
                }

                // Update value in system
                rt01VA.$ruby = rt01VA.$ruby.not($ruby);

                // Remove Node of ruby
                $ruby.remove();
            }
        },

        // Restore ruby after using 'destroy' api
        restore : function() { INIT.Load() },




        /**
         * THE FUNCTION HAVE RETURN VALUE IN RUBY
         */
        width        : function() { return va.wRuby },
        height       : function() { return va.hRuby },
        slideLength  : function() { return num },
        slideCur     : function() { return va.$s.eq(cs.idCur) },
        slideAll     : function() { return va.$s },
        opts         : function() { return o },
        optsCur      : function() { return M.Data(cs.idCur).opts },
        variable     : function() { return va },
        browser      : function() { return is.browser },
        isMobile     : function() { return is.mobile },
        isTransform  : function() { return is.tf },
        isTransition : function() { return is.ts },




        /**
         * TRIGGER EVENTS:
         *  ['init', 'ready', 'loaded']
         *  ['loadAll', 'loadSlide.id', 'loadBegin', 'loadEnd']
         *  ['resize', 'resizeEnd']
         *  ['start', 'end', 'before', 'after']
         *  ['selectID', 'deselectID', 'swipeBegin', 'swipeEnd', 'fxBegin', 'fxEnd']
         *  ['slideshowPlay', 'slideshowPause', 'slideshowStop']
         *  ['beforeSwapIDCur', 'afterSwapIDCur']
         *  ['beforeTap']
         */
        ev : $(divdiv)
    },











    /**
     * THE OTHER MODULES OF PLUGIN
     */
    SWIPE,
    RESPONSIVE,
    NAV,
    PAG,
    CAPTION,
    IMAGE,
    VIDEOBACK,
    VIDEOIFRAME,
    IFRAME,
    HOTSPOT,
    LAYER,
    PARALLAX,
    LAYERPARALLAX,
    FXMATH,
    RUBYANIMATE,
    SLIDESHOW,
    TIMER,
    FLICKR,
    DISPLAY,
    DEEPLINKING,
    COOKIE,
    FULLSCREEN,
    NESTED,
    CLASSADD,
    OLD,
    APIREMOTE;










    /**
     * BEGIN INITIALIZE RUBY
     */
    INIT.Check();
};










/**
 * CREATE NEW RUBY BY JQUERY
 *  + Method: var ruby = $('...').rubytabs();
 */
$.fn[rt01VA.rubyName] = function() {

    var args     = arguments,               // args[0] : options, args[1]: value
        rubyName = rt01VA.rubyName,
        rubyData = null;


    /**
     * SETUP EACH OBJECT
     */
    $(this).each(function() {
        var $self = $(this),
            ruby  = $self.data(rubyName);

        // Parameter 1 is allways object -> to easy check
        if( args[0] === undefined ) args[0] = {};


        /**
         * CASE: INITIALIZE OBJECT + UPDATE PROPERTIES
         */
        if( $.isPlainObject(args[0]) ) {

            // CREATE NEW RUBY
            if( !ruby ) new $[rubyName]($self, args[0]);

            // UPDATE PROPERTIES
            else if( !$.isEmptyObject(args[0]) ) ruby.update(args[0]);


            // Store data of ruby
            rubyData = $self.data(rubyName);
        }


        /**
         * CASE: CALL API - AFTER INITIATED RUBY
         */
        else {
            try      { ruby[args[0]](args[1]) }
            catch(e) { !!window.console && console.warn('['+ rubyName +': function not exist!]') }
        }
    });

    // Return data ruby
    return rubyData;
};










/**
 * AUTOMATICALLY INITIALIZE RUBY
 */
rt01MODULE.AUTOINIT = function($ruby) {

    $ruby.each(function() {
        var $self    = $(this),
            data     = $self.data(rt01VA.rubyData) || {},
            rubyName = rt01VA.rubyName,
            isJson   = true;


        /**
         * CHECK RUBY INITIALIZATION
         *  + Remove automatically initialize for ruby
         */
        if( $.isPlainObject(data) && $.isEmptyObject(data) ) return;




        /**
         * CHECK & SETUP MAIN DATA TO GET VALUE OF 'ISAUTOINIT' OPTION
         */
        if( typeof data === 'string' ) {

            // Convert to json
            var msgError = 'main options on "data-XX" not valid'.replace(/XX/, rt01VA.rubyData);
            data = rt01VA.M.StringToJson(data, msgError);

            // Check is json
            if( $.isEmptyObject(data) ) isJson = false;
        }



        /**
         * SETUP VALUE 'ISAUTOINIT'
         */
        var isAutoInit = data.isAutoInit;
        if( isAutoInit === undefined ) {

            isAutoInit = rt01VA['optsDefault']['isAutoInit'];
        }




        /**
         * CHECK BEFORE AUTOMATICALLY INITIALIZE
         *  + Check Data variable is Json + AutoInit
         *  + Check continue: data have 'isAutoInit' option
         *  + Check continue: data of ruby exist
         */
        // Case valid initialization: create new ruby
        // case unvalid initialization: hidden object
        (isJson && isAutoInit && !$self.data(rubyName)) ? $self[rubyName]()
                                                        : $self.addClass(rt01VA.namespace + 'none');
    });
};
$(document).ready(function() { rt01MODULE.AUTOINIT( $('.'+ rt01VA.namespace) ) });

})(jQuery);


















































/**
 * RUBYTWEEN
 * @package         RubyTween
 * @author          HaiBach
 * @link            http://haibach.net
 * @version         1.5
 */
(function($) {

    /*
     * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
     */
    $.GSGDEasing = $.GSGDEasing || {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            return $.GSGDEasing[$.GSGDEasing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - $.GSGDEasing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return $.GSGDEasing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return $.GSGDEasing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        },

        // Bo sung linear
        linear: function(x, t, b, c, d) {
            return t/d;
        }
    };

}(jQuery));










(function($) {
'use strict';

    /**
     * GLOBAL VARIABLES IN JAVASCRIPT
     */
    if( !window.rt00VA ) {

        /**
         * CREATE NEW GLOBAL VARIABLE
         */
        window.rt00VA = {
            fps    : 60,
            data   : {},
            nTween : 0,

            nameTf : ['x', 'y', 'z', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspectiveTF'],

            nameTf3D : ['z', 'rotateZ', 'scaleZ', 'perspectiveTF'],


            /**
             * DEFAULT OPTIONS IN PLUGIN
             */
            tfDefault : {
                'x'        : 0,
                'y'        : 0,
                'z'        : 0,
                'scale'    : 1,
                'scaleX'   : 1,
                'scaleY'   : 1,
                'scaleZ'   : 1,
                'rotate'   : 0,
                'rotateX'  : 0,
                'rotateY'  : 0,
                'rotateZ'  : 0,
                'skew'     : 0,
                'skewX'    : 0,
                'skewY'    : 0,
                'skewZ'    : 0,
                'perspectiveTF' : null
            },

            styleDefault : {
                'opacity' : 1
            },

            // Properties may have prefix -> will add later
            propFixed : ['perspectiveTF', 'overflow'],

            percentRef : {
                'x'      : 'OuterWidth',
                'y'      : 'OuterHeight',
                'left'   : 'OuterWidth',
                'right'  : 'OuterWidth',
                'top'    : 'OuterHeight',
                'bottom' : 'OuterHeight'
            },

            optsAnimDefault : {
                'duration'            : 1000,
                'delay'               : 0,
                'easing'              : 'easeOutQuad',
                'xParentOrigin'       : 0,
                'yParentOrigin'       : 0,
                'styleBegin'          : {},
                'styleEnd'            : {},

                'isFallbackTF'        : true,
                'isXYAlone'           : false,
                'isClearStyleDefault' : false,
                'isClearTFDefault'    : true,
                'isTFOrderByEnd'      : false,

                'isNew'               : false
            },

            optsCssDefault : {
                'type' : 'reset'
            },

            // Options can inherit value from options befores
            nameOptsInherit : ['xParentOrigin', 'yParentOrigin']
        };





        /**
         * FUNCTION: GET DATA PROPERTY OF ITEM
         */
        window.rt00VA.GetData = function($item) {
            var dataRuby = null,
                vData    = window.rt00VA.data;

            /**
             * CREATE LOOP TO CHECK ALL ITEM IN DATA
             */
            for( var key in vData ) {
                var $itemCur = vData[key]['$item'];

                if( $itemCur.is($item) ) {
                    dataRuby = vData[key];
                    break;
                }
            }
            return dataRuby;
        };
    }


    /**
     * GLOBAL VARIABLES IN PLUGIN
     */
    var VA = window.rt00VA,
        va = {},
        is = {},
        vData = VA.data,
        UNDE  = undefined;










    /**
     * FUNCITON M - UTILITIES
     */
    var M = $.extend({}, rt01VA.M, {

        /**
         * GET SIZE OF OJBECT
         */
        GetSize : function(data) {
            var size = 0;
            for( var key in data ) {

                if( data[key] !== UNDE ) size++;
            }
            return size;
        },

        // Convert Radius to PI
        ToPI : function(deg) { return deg * Math.PI / 180 },











        /**
         * CHECK BROWSER SUPPORT CSS PROPERTIES
         */
        // Capitalize first letter of string
        ProperCase : function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        // Convert string to CamelCase
        CamelCase : function(str) {
            return str.replace(/-([a-z])/gi, function(m, str) {
                return str.toUpperCase();
            });
        },

        CssCheck : function(property, isPrefix) {

            var style  = document.createElement('p').style,
                vender = 'Webkit Moz ms O'.split(' '),
                prefix = '-webkit- -moz- -ms- -o-'.split(' ');

            // Check first: style have vender
            var styleCase = this.CamelCase(property);
            if( style[styleCase] !== UNDE ) return (isPrefix ? '' : true);



            // Check continue if it has vender
            // First, convert string style to Upper -> ex: 'flex-wrap' to 'FlexWrap'
            var preStyle = M.ProperCase(styleCase);
            // Check each vender
            for( var i = 0, len = vender.length; i < len; i++ ) {
                if( style[vender[i] + preStyle] !== UNDE ) return (isPrefix ? prefix[i] : true);
            }

            // Reture false if not support
            return false;
        },










        /**
         * SORT ASCENDING VALUE IN ARRAY[]
         */
        ArrayMinToMax : function(a) {
            var aClone = $.extend([], a),
                aOrder = [],
                pos,
                min;


            for( var i = 0, len = aClone.length; i < len; i++ ) {

                min = aClone[0];
                pos = 0;
                for( var j = 1; j < aClone.length; j++ ) {

                    if( min > aClone[j] ) {
                        min = aClone[j];
                        pos = j;
                    }
                }

                aOrder.push(min);
                aClone.splice(pos, 1);
            }
            return aOrder;
        },


        /**
         * CONVERT NAME OF PROPERTIES FOR STANDARD CSS
         */
        ValidName : function(prop, opts) {
            var propNew = {};


            /**
             * CREATE LOOP TO CHECK ALL NAME IN 'PROP'
             */
            for( var name in prop ) {

                /**
                 * CASE: TRANSFORM ORIGIN
                 */
                if( name == 'originTF' ) {
                    propNew[VA.prefix + 'transform-origin'] = prop[name];
                }


                /**
                 * CASE NORMAL: COPY INITIAL 'PROP' TO NEW 'PROP'
                 */
                else {
                    propNew[name] = prop[name];
                }
            }



            /**
             * REMOVE ALL ELEMENTS TRANSFORM 3D IF NOT SUPPORT
             */
            if( !VA.isTf3D ) {
                for( var name in propNew ) {

                    if( $.inArray(name, VA.nameTf3D) !== -1 ) {
                        delete propNew[name];
                    }
                }
            }



            /**
             * REMOVE & CONVERT PROPERTIES IN TRANSFORM TO STYLE CSS
             */
            if( !VA.isTf ) {

                // Convert xyz translate to Absolute(left/top) position
                if( opts.isFallbackTF ) {
                    var source  = ['x', 'y'],
                        replace = ['left', 'top'];

                    for( var i = 0, len = source.length; i < len; i++ ) {
                        if( propNew[ source[i] ] !== UNDE ) {

                            propNew[ replace[i] ] = propNew[ source[i] ];
                            delete propNew[ source[i] ];
                        }
                    }
                }


                // Remove all elements Transform
                for( var name in propNew ) {
                    if( $.inArray(name, VA.nameTf) !== - 1 ) {
                        delete propNew[name];
                    }
                }
            }




            /**
             * MOVE ALL PROPERTIES 'OPTION' IN 'PROP'
             */
            // Collect all properties have in default options
            var aFind = [];
            for( var name in VA.optsAnimDefault ) {
                aFind.push(name);
            }

            // Convert properties have in 'prop' to 'opts'
            for( var i = 0, len = aFind.length; i < len; i++ ) {
                var propCur = propNew[ aFind[i] ];

                // Kiem tra thuoc tinh opts ton tai
                if( propCur !== UNDE ) {
                    opts[ aFind[i] ] = propCur;
                    delete propNew[ aFind[i] ];
                }
            }


            return propNew;
        },


        /**
         * ANALYZE + CONVERT VALUE OF CSS STYLE
         */
        ParseCssStyle : function(valueCur) {

            /**
             * CASE: VALUE IS STRING
             */
            if( typeof valueCur == 'string' ) {

                /**
                 * CASE: PROPERTY HAVE MULTIPLE VALUE
                 */
                if( valueCur.split(' ').length >= 2 ) {

                    // Split string to array
                    valueCur = valueCur.split(' ');

                    // Remove empty string in array
                    valueCur = $.grep(valueCur, function(v) { return v !== '' });
                }


                /**
                 * CASE: PROPERTY HAVE 1 VALUE
                 */
                else {

                    /**
                     * CASE: THE VALUE HAVE 'PX' UNIT
                     */
                    if( /px$/.test(valueCur) ) {
                        valueCur = parseFloat(valueCur);
                    }


                    /**
                     * CASE: THE VALUE HAVE '%' UNIT
                     */
                    else if( /\%$/.test(valueCur) ) {
                        // Not do anything
                    }


                    /**
                     * CASE OTHER
                     */
                    else {
                        // Convert value to Number (if possible)
                        var fooNum = parseFloat(valueCur);
                        if( !isNaN(fooNum) ) valueCur = fooNum;
                    }
                }
            }

            return valueCur;
        },











        /**
         * MERGE CURRENT OPTIONS WITH DEFAULT OPTIONS
         */
        MergeOptions : function(optsCur, itemOpts) {

            /**
             * SETUP THE OPTIONS INHERIT FROM VALUE OPTONS BEFORE
             */
            var nameInherit    = VA['nameOptsInherit'],
                optsNum        = itemOpts.length,
                optsInherit    = {},
                optsLastOnItem = {};

            // Case: options before exist on Item
            if( optsNum > 0 ) {
                optsLastOnItem = itemOpts[optsNum - 1];

                // Get all item inherit value
                for( var i = 0, len = nameInherit.length; i < len; i++ ) {
                    optsInherit[ nameInherit[i] ] = optsLastOnItem[ nameInherit[i] ];
                }
            }




            /**
             * MERGE ALL OPTIONS TOGETHER
             *  + Prority level: optsCur > optsDefault > optsInherit
             */
            var optsNew = $.extend(true, {}, optsLastOnItem, VA.optsAnimDefault, optsCur);
            return optsNew;
        }
    });










    /**
     * MATRIX
     */
    var MATRIX = {

        /**
         * GET VALUE TRANSFORM MATRIX FROM OBJECT
         */
        getFromItem : function($item) {
            var str = $item.css(VA.prefix + 'transform');

            if( /^matrix(3d)?\(/i.test(str) ) {

                var pBegin = str.indexOf('(') + 1,
                    subLen = str.length - pBegin - 1,
                    matrix = str.substr(pBegin, subLen).split(', ');


                // Rounded value in array
                for( var i = 0, len = matrix.length; i < len; i++ ) {
                    matrix[i] = parseFloat(matrix[i]);
                }
                return matrix;
            }
            return [1,0,0,1,0,0];
        },


        /**
         * COMBINE WITH MATRIX PROPERTIES FROM PARTICULAR PROPERTY
         */
        getFromProp : function(prop) {
            var matrixInit = [1,0,0,1,0,0];


            /**
             * CREATE LOOP TO SETUP EACH MATRIX PROPERTIES
             */
            for( var name in prop ) {
                var matrixCur = null;

                switch(name) {
                    case 'x' :
                        matrixCur = [1,0,0,1, prop[name], 0];
                        break;

                    case 'y' :
                        matrixCur = [1,0,0,1, 0, prop[name]];
                        break;

                    case 'rotate' :
                        var radian = M.ToPI(prop[name]),
                            cos    = parseFloat( Math.cos(radian).toFixed(5) ),
                            sin    = parseFloat( Math.sin(radian).toFixed(5) );

                        matrixCur = [cos, sin, -sin, cos, 0, 0];
                        break;


                    case 'scale' :
                        matrixCur = [prop[name],0,0, prop[name],0,0];
                        break;

                    case 'scaleX' :
                        matrixCur = [prop[name],0,0,1,0,0];
                        break;

                    case 'scaleY' :
                        matrixCur = [1,0,0, prop[name],0,0];
                        break;


                    case 'skew'  :
                    case 'skewX' :
                    case 'skewY' :
                        if( (prop[name] - 90) % 180 != 0 ) {

                            var radian = M.ToPI(prop[name]),
                                tan    = parseFloat( Math.tan(radian).toFixed(5) );

                            if     ( name == 'skew' )  matrixCur = [1,0, tan, 1,0,0];
                            else if( name == 'skewX' ) matrixCur = [1,0, tan, 1,0,0];
                            else if( name == 'skewY' ) matrixCur = [1, tan, 0,1,0,0];
                        }
                        break;
                }


                /**
                 * COMBINE INIT MATRIX WITH CURRENT MATRIX
                 */
                if( matrixCur !== null ) matrixInit = MATRIX.combine( matrixInit, matrixCur );
            }
            return matrixInit;
        },


        /**
         * SETUP MATRIX INHERITED FROM BEFORE PROPERTIES
         */
        propertyInherit : function(m1, m2, prop) {

            /**
             * CASE: INHERIT 3 PROPERTIES 'ROTATE', 'SCALE', 'SKEW'
             */
            if( m2[0] == 1 && m2[1] == 0 && m2[2] == 0 && m2[3] == 1
            && prop['rotate'] == UNDE
            && prop['scale'] == UNDE && prop['scaleX'] == UNDE && prop['scaleY'] == UNDE
            && prop['skew'] == UNDE && prop['skewX'] == UNDE && prop['skewY'] == UNDE ) {
                m2[0] = m1[0];
                m2[1] = m1[1];
                m2[2] = m1[2];
                m2[3] = m1[3];
            }



            /**
             * CASE: TRANSLATE
             */
            if( m2[4] == 0 && prop['x'] == UNDE ) m2[4] = m1[4];
            if( m2[5] == 0 && prop['y'] == UNDE ) m2[5] = m1[5];

            return m2;
        },


        /**
         * PARSE TRANSFORM PROPERTIES FROM STRING MATRIX
         */
        parse : function(m) {
            var order = ['xy', 'scale', 'skew', 'rotate'], tf = {};

            /**
             * PARSE X - Y TRANSLATE
             */
            tf.x = m[4];
            tf.y = m[5];


            /**
             * PARSE 'SCALE' PROPERTY
             */
            if( m[1] == 0 && m[2] == 0 ) {
                tf.scaleX = m[0];
                tf.scaleY = m[3];
            }


            /**
             * PARSE 'SKEW' PROPERTY
             */
            if( m[0] == 1 && m[3] == 1 ) {
                if( m[2] != 0 ) tf.skewX = parseFloat(( Math.atan(m[2]) * 180 / Math.PI ).toFixed(1));
                if( m[1] != 0 ) tf.skewY = parseFloat(( Math.atan(m[1]) * 180 / Math.PI ).toFixed(1));
            }


            /**
             * PARSE 'ROTATE' PROPERTY
             */
            if( m[0] == m[3] && m[1] == -m[2] ) {
                tf.rotate = parseFloat(( Math.acos(m[0]) * 180 / Math.PI ).toFixed(1));
            }

            // Return transform
            return tf;
        },


        /**
         * COMBINE 2 MATRIX
         */
        combine : function(m1, m2) {

            /**
             * CONVERT MATRIX 6 TO 9 VALUE
             */
            m1 = [m1[0], m1[1], 0, m1[2], m1[3], 0, m1[4], m1[5], 1];
            m2 = [m2[0], m2[1], 0, m2[2], m2[3], 0, m2[4], m2[5], 1];


            /**
             * LOOP CALCULATE VALUE OF MATRIX IN ORDER [0, 8]
             */
            var x = [];
            for( var i = 0, len = m2.length; i < len; i++ ) {

                var surplus = i % 3,
                    integer = ~~(i / 3);

                x[i]  = m1[surplus + 0] * m2[integer * 3 + 0];
                x[i] += m1[surplus + 3] * m2[integer * 3 + 1];
                x[i] += m1[surplus + 6] * m2[integer * 3 + 2];
            }
            return [x[0], x[1], x[3], x[4], x[6], x[7]];
        },


        /**
         * CONVERT MATRIX TO CSS STRING
         */
        toCss : function(m) {
            var style = {};
            style[VA.prefix +'transform'] = 'matrix('+ m.join(', ') +')';

            return style;
        }
    };










    /**
     * TRANSFORM CSS3
     */
    var TF = {

        /**
         * CHECK VALUE OF TRANSFORM DEFAULT
         *  + Support remove value of transform default
         */
        CheckValueDefault: function(tf, optsCur) {
            var isTfDefault = true;


            /**
             * CASE: HAVE OPTION REMOVE TRANSFORM DEFAULT
             */
            if( optsCur.isClearTFDefault ) {

                /**
                 * LOOP METHOD TO CHECK EACH TRANSFORM PROPERTIES
                 */
                for( var name in tf ) {
                    if( isTfDefault ) {

                        // Get default value of transform property
                        var valueDefault = VA['tfDefault'][name],
                            valueCur     = tf[name];

                        // Compare default value with current value
                        if( valueCur !== valueDefault) isTfDefault = false;
                    }
                }
            }


            /**
             * CASE: WITHOUT REMOVE TRANSFORM DEFAULT
             */
            else isTfDefault = false;


            // Return value
            return isTfDefault ? {} : tf;
        },


        /**
         * INHERIT PROPERTIES OF TFBEGIN BUT KEEP ORDER OF TFEND
         *  + Different $.extend() jQuery
         */
        Extend : function(tfBegin, tfEnd, opts) {

            /**
             * CASE: PROPERTIES IN ORDER OF 'TFEND'
             */
            if( opts.isTFOrderByEnd ) {

                // Loop to copy all properties in tfBegin but tfEnd not have
                for( var name in tfBegin ) {
                    if( tfEnd[name] === UNDE ) {
                        tfEnd[name] = tfBegin[name];
                    }
                }
            }


            /**
             * CASE: PROPERTIES IN ORDER OF 'TFBEGIN'
             */
            else {
                tfEnd = $.extend(true, {}, tfBegin, tfEnd);
            }




            /**
             * PRORITY 'PERSPECTIVE' PROPERTY IN THE FIRST PLACE
             */
            var perspectiveTF = tfEnd['perspectiveTF'];
            if( perspectiveTF !== UNDE ) {

                tfEnd = $.extend(true, { perspectiveTF: perspectiveTF }, tfEnd);
            }


            // Return result
            return tfEnd;
        },











        /**
         * MAKE TRANSFORM FROM PARTICULAR PROPERTIES
         */
        FromProp : function(prop) {
            var tf = {};


            /**
             * CREATE LOOP TO SETUP EACH PROPERTIES OF MATRIX
             */
            for( var name in prop ) {
                if( $.inArray(name, VA.nameTf) !== -1 ) {

                    /**
                     * REMOVE UNNECESSARY NAME
                     */
                    if( name == 'scale' ) {
                        tf['scaleX'] = tf['scaleY'] = prop[name];
                    }
                    else if( name == 'skew' ) {
                        tf['skewX'] = prop[name];
                    }
                    else {
                       tf[name] = prop[name];
                    }
                }
            }
            return tf;
        },


        /**
         * CONVERT VALUES HAVE OTHER UNIT TO 'PX'
         *  + Support convert '%' to 'px' unit
         */
        ConvertValueToPX : function($anim, name, valueCur) {
            var aNamePercent = ['x', 'y', 'left', 'right', 'top', 'bottom'],
                WIDTH        = 'OuterWidth',
                HEIGHT       = 'OuterHeight',
                aFnSizeRef   = [WIDTH, HEIGHT, WIDTH, WIDTH, HEIGHT, HEIGHT];




            /**
             * CONVERT VALUE '%' DEPENDS ON SIZE ITEM
             */
            var ConvertPercentByItem = function(vString) {

                // Check name of properties have supported
                var nameIndex = $.inArray(name, aNamePercent);
                if( nameIndex !== -1 ) {

                    // Convert '%' unit depends on size of Item
                    vString = parseFloat(vString);
                    vString = M[ aFnSizeRef[nameIndex] ]($anim) * vString / 100;
                    vString = Math.round(vString);
                }

                // Return result
                return vString;
            },


            /**
             * CONVERT VALUE '%' DEPENDS ON PARENT ITEM
             */
            ConvertPercentByParent = function(vNum, selectorParent) {

                // Check name of properties have supported
                var nameIndex = $.inArray(name, aNamePercent);
                if( nameIndex !== -1 ) {

                    var $parent = $anim.parent();
                    if( !!selectorParent ) {

                        var $select = $anim.closest(selectorParent);
                        if( $select.length ) $parent = $select;
                    }

                    vNum = M[ aFnSizeRef[nameIndex] ]($parent) * vNum / 100;
                    vNum = Math.round(vNum);
                }

                // Return result
                return vNum;
            };





            /**
             * CASE: VALUE IS STRING CONTAIN MATH
             *  + Only allow contain special character of Math
             *  + Limited the lenght of string < 200 characters -> for safe
             */
            var reOnlyContainMath = /^[0-9\(\)\+\-\*\/\%\s]|(\{.+\})+$/;
            if( (typeof valueCur == 'string') && reOnlyContainMath.test(valueCur) && (valueCur.length < 200) ) {


                /**
                 * CONVERT VALUE '%PARENT' TO 'PX' DEPENDS ON SIZE OF PARENT ITEM
                 *  + Setup convert '%' depends on size of Item
                 */
                var reParent    = /\d+\.?\d*\%?\{.+\}/g,
                    matchParent = valueCur.match(reParent);

                if( $.isArray(matchParent) ) {
                    for( var i = 0, len = matchParent.length; i < len; i++ ) {

                        // First, get value number in string
                        var vMatch   = matchParent[i],
                            vConvert = parseFloat(vMatch);


                        /**
                         * CASE: VALUE PERCENT(%)
                         */
                        var rePercent = /\d+\.?\d*\%\{(.+)\}/;
                        if( rePercent.test(vMatch) ) {

                            var vParent        = vMatch.match(rePercent),
                                selectorParent = null;

                            if( vParent && vParent[1] ) {

                                /**
                                 * CHECK VALID VALUE OF SELECTOR
                                 */
                                try {
                                    $(vParent[1]);
                                    selectorParent = vParent[1];
                                }
                                catch(e) {
                                    !!console && console.warn(e);
                                }
                            }

                            // Convert value '%' to 'px'
                            vConvert = ConvertPercentByParent(vConvert, selectorParent);
                        }

                        // Replace value Match with value converted
                        valueCur = valueCur.replace(vMatch, vConvert);
                    }
                }



                /**
                 * CONVERT VALUE '%' TO 'PX' DEPENDS ON SIZE OF ITEM
                 */
                var rePercent    = /\d+\.?\d*\%/g,
                    matchPercent = valueCur.match(rePercent);

                if( $.isArray(matchPercent) ) {
                    for( var i = 0, len = matchPercent.length; i < len; i++ ) {

                        // Convert value '%' to 'px'
                        var vPercent = matchPercent[i],
                            vPixel   = ConvertPercentByItem(vPercent);

                        // Replace value 'px' into init string
                        valueCur = valueCur.replace(vPercent, vPixel);
                    }
                }



                /**
                 * EXECUTION MATH WITH STRING CONVERTED
                 *  + Only execution when string only contain number
                 */
                var reOnlyNumber = /^[0-9\(\)\+\-\*\/\%\s]+$/;
                if( reOnlyNumber.test(valueCur) ) valueCur = eval(valueCur);
            }




            /**
             * RETURN RESUTL
             */
            return valueCur;
        },


        /**
         * CONVERT EACH PARTICULAR PROPERTIES TO CSS
         */
        ToCss : function(tf, opts) {

            /**
             * CHECK DEFAULT VALUE OF TRANSFORM
             */
            tf = TF.CheckValueDefault(tf, opts);



            /**
             * CONVERT PARTICULAR PROPERTIES TO GROUP PROPERTIES
             *  + Support properties arranged by order
             */
            var tfRaw = {};
            for( var name in tf ) {

                /**
                 * ROUNDED VALUE
                 */
                var nFixed = /^(x|y|z)$/.test(name) ? 100 : 10000,
                    tfCur  = Math.round(tf[name] * nFixed) / nFixed;



                /**
                 * MOVE PARTICULAR PROPERTIES INTO GROUP
                 */
                if( /^(x|y|z)$/.test(name) ) {

                    /**
                     * CASE: PARTICULAR XYZ POSITION
                     */
                    if( opts.isXYAlone ) {
                        if( name == 'x' && tf.x !== UNDE ) tfRaw['x'] = tfCur;
                        if( name == 'y' && tf.y !== UNDE ) tfRaw['y'] = tfCur;
                        if( name == 'z' && tf.z !== UNDE ) tfRaw['z'] = tfCur;
                    }


                    /**
                     * CASE: XYZ GO TOGATHER
                     */
                    else {
                        tfRaw.xy = tfRaw.xy || [0, 0, 0];

                        if( name == 'x' && tf.x !== UNDE ) tfRaw['xy'][0] = tfCur;
                        if( name == 'y' && tf.y !== UNDE ) tfRaw['xy'][1] = tfCur;
                        if( name == 'z' && tf.z !== UNDE ) tfRaw['xy'][2] = tfCur;
                    }

                }

                else if( /^scale/.test(name) ) {
                    tfRaw.scale = tfRaw.scale || [1, 1];

                    if( name == 'scaleX' && tf.scaleX !== UNDE ) tfRaw['scale'][0] = tfCur;
                    if( name == 'scaleY' && tf.scaleY !== UNDE ) tfRaw['scale'][1] = tfCur;
                    if( name == 'scaleZ' && tf.scaleZ !== UNDE ) tfRaw['scale'].push(tfCur);
                }

                else if( /^skew/.test(name) ) {
                    tfRaw.skew = tfRaw.skew || [0, 0];

                    if( name == 'skewX' && tf.skewX !== UNDE ) tfRaw['skew'][0] = tfCur;
                    if( name == 'skewY' && tf.skewY !== UNDE ) tfRaw['skew'][1] = tfCur;
                }

                else if( /^rotate/.test(name) ) {

                    if( name == 'rotate' && tf.rotate  !== UNDE ) tfRaw['rotate'] = tfCur;
                    if( name == 'rotateX' && tf.rotateX !== UNDE ) tfRaw['rotateX'] = tfCur;
                    if( name == 'rotateY' && tf.rotateY !== UNDE ) tfRaw['rotateY'] = tfCur;
                    if( name == 'rotateZ' && tf.rotateZ !== UNDE ) tfRaw['rotateZ'] = tfCur;
                }

                else if( /^perspectiveTF$/.test(name) ) {
                    tfRaw.perspectiveTF = tfCur;
                }
            }




            /**
             * CONVERT TRANSFORM TO CSS
             */
            var isTf3D = is.tf3D, cssTf = '';
            for( var name in tfRaw ) {

                /**
                 * CONVERT 'TRANSLATE'
                 */
                if( name == 'xy' ) {
                    cssTf += (isTf3D ? 'translate3d(_x_px, _y_px, _z_px) ' : 'translate(_x_px, _y_px) ')
                                .replace(/_x_/, tfRaw['xy'][0])
                                .replace(/_y_/, tfRaw['xy'][1])
                                .replace(/_z_/, tfRaw['xy'][2]);
                }

                // Case: xyz is pariticular elements
                else if( name == 'x' ) {
                    cssTf += 'translateX(_x_px) '.replace(/_x_/, tfRaw['x']);
                }
                else if( name == 'y' ) {
                    cssTf += 'translateY(_y_px) '.replace(/_y_/, tfRaw['y']);
                }
                else if( name == 'z' ) {
                    cssTf += (isTf3D ? 'translateZ(_z_px) ' : '')
                                .replace(/_z_/, tfRaw['z']);
                }



                /**
                 * CONVERT 'SCALE'
                 */
                else if( name == 'scale' ) {
                    var tfScale = tfRaw['scale'],
                        str     = ((isTf3D && tfScale.length == 3) ? 'scale3d(_x_, _y_, _z_) ' : 'scale(_x_, _y_) ')
                                .replace(/_x_/, tfScale[0])
                                .replace(/_y_/, tfScale[1])
                                .replace(/_z_/, tfScale[2]);

                    // Case: scaleX === scaleY
                    if( tfScale.length == 2 && tfScale[0] === tfScale[1] ) {
                        str = 'scale(_x_) '.replace(/_x_/, tfScale[0]);
                    }
                    cssTf += str;
                }


                /**
                 * CONVERT 'SKEW'
                 */
                else if( name == 'skew' ) {
                    var tfSkew = tfRaw['skew'];

                    // Case: skewY has default value
                    if( tfSkew[1] === 0 ) {
                        cssTf += 'skew(_x_deg) '.replace(/_x_/, tfSkew[0]);
                    }

                    // Case: skewY has other value
                    else {
                        cssTf += 'skew(_x_deg, _y_deg) '
                                    .replace(/_x_/, tfSkew[0])
                                    .replace(/_y_/, tfSkew[1]);
                    }
                }


                /**
                 * CONVERT 'ROTATE'
                 */
                else if( name == 'rotate' ) {
                    cssTf += 'rotate(_x_deg) '.replace(/_x_/, tfRaw['rotate']);
                }
                else if( name == 'rotateX' ) {
                    cssTf += (isTf3D ? 'rotateX(_x_deg) ' : 'rotate(_x_deg) ')
                                .replace(/_x_/, tfRaw['rotateX']);
                }
                else if( name == 'rotateY' ) {
                    cssTf += (isTf3D ? 'rotateY(_y_deg) ' : '')
                                .replace(/_y_/, tfRaw['rotateY']);
                }
                else if( name == 'rotateZ' ) {
                    cssTf += (isTf3D ? 'rotateZ(_z_deg) ' : '')
                                .replace(/_z_/, tfRaw['rotateZ']);
                }


                /**
                 * CONVERT 'PERSPECTIVE'
                 */
                else if( name == 'perspectiveTF' ) {
                    cssTf += (isTf3D ? 'perspective(_x_px) ' : '')
                                .replace(/_x_/, tfRaw['perspectiveTF']);
                }
            }

            // Remove whitespace at last position
            return cssTf.replace(/\s+$/, '');
        }
    };










    /**
     * DATABASE SYSTEM
     */
    var DB = {

        /**
         * CHECK RUBY ID OF ITEM HAVE EXIST IN SYSTEM
         */
        CheckRubyID : function($item) {
            var dataRuby = null;

            /**
             * CREATE LOOP TO CHECK ALL ITEM IN DATA
             */
            for( var key in vData ) {
                var $itemCur = vData[key]['$item'];

                if( $itemCur.is($item) ) {
                    dataRuby = key;
                    break;
                }
            }
            return dataRuby;
        },


        /**
         * GET DATA RUBY ID OF ITEM IN SYSTEM
         *  + If it not exist then create new ID Ruby
         */
        GetRubyID : function($item) {

            /**
             * CHECK RUBY ID OF ITEM HAVE EXIST ?
             */
            var dataRuby = DB.CheckRubyID($item);



            /**
             * CREATE NEW RUBY ID IF NOT EXIST IN SYSTEM
             */
            if( dataRuby === null ) {

                for( var i = 0, dataLen = M.GetSize(vData); i <= dataLen; i++ ) {
                    if( vData[i] === UNDE ) {

                        /**
                         * CREATE NEW ID IN SYSTEM
                         */
                        vData[i] = {
                            $item     : $item,
                            id        : null,
                            idDB      : i,
                            prop      : [],
                            opts      : [],
                            cssStyle  : null,
                            cssTf     : null,
                            isAnimate : false
                        };

                        dataRuby = i;
                        break;
                    }
                }
            }

            // Store data
            return dataRuby;
        },










        /**
         * UPDATE DATABASE OF ITEM
         */
        Update : function($item, prop, opts) {
            var rubyID   = DB.GetRubyID($item),
                itemData = VA.data[rubyID];

            /**
             * SETUP 'PROP' & 'OPTS' AT FIRST
             */
            if( !prop ) prop = {};
            if( !opts ) opts = {};




            /**
             * SETUP 'OPTS'/'PROP' + STORE OPTION IN DATA SYSTEM
             * @param boolean isNew     Create new animate system
             */
            if( opts.isNew ) {

                // Merge current options & default options
                opts = $.extend(true, {}, VA.optsAnimDefault, opts);

                // Reset Data system
                itemData.prop = [];
                itemData.opts = [];
            }
            else {
                // Merge current options & default options & inherit options
                opts = M.MergeOptions(opts, itemData['opts']);
            }


            // Convert name of properties to standard CSS
            prop = M.ValidName(prop, opts);

            // Store options into Data system
            itemData.prop.push(prop);
            itemData.opts.push(opts);


            return itemData;
        },


        /**
         * REMOVE DATABASE OF ITEM
         */
        Delete : function($item) {

            var rubyID = DB.CheckRubyID($item);
            if( rubyID !== null ) delete VA.data[rubyID];
        }
    };










    /**
     * SETUP OHTER GLOBAL VARIABLE IN PLUGIN
     */
    var __Init__ = function() {

        /**
         * THE GLOBAL PROPERTIES
         */
        VA.timeLoop  = ~~(1000 / VA.fps);
        VA.prefix    = M.CssCheck('transform', true);
        VA.isTf      = is.tf = M.CssCheck('transform');
        VA.isTf3D    = is.tf3D = M.CssCheck('perspective');

        // VA.isTf    = is.tf = true;
        // VA.isTf3D  = is.tf3D = false;
        VA.isTs      = is.ts   = M.CssCheck('transition');
        VA.isOpacity = is.opacity = M.CssCheck('opacity');


        /**
         * CONVERT NAME OF VARIABLE CAN BE PREFIX
         */
        var prefix = VA.prefix;
        VA.percentRef[prefix + 'transform-origin0'] = 'OuterWidth';
        VA.percentRef[prefix + 'transform-origin1'] = 'OuterHeight';
    }();











    /**
     * SETUP TIMER SYSTEM IN PLUGIN
     */
    function TIMER($item) {

        /**
         * STORE TIMER IN DATA
         */
        var that  = this,
            vData = window.rt00VA.data;

        that.id     = null;
        that.rubyID = null;




        /**
         * STORE ID ON SYSTEM
         */
        that.save = function() {
            vData[that.rubyID].id = that.id;
        }

        /**
         * REMOVE TIMER OF OBJECT
         */
        that.clear = function() {
            that.id = vData[that.rubyID].id;

            clearTimeout(that.id);
            clearInterval(that.id);
            vData[that.rubyID].id = that.id = null;
        }

        /**
         * FUNCTION CONTRUCTOR
         *  + Remove timer of object at first
         */
        var __contruct = function() {
            that.rubyID = DB.GetRubyID($item);
            that.clear();
        }();
    }










    /**
     * PLUGINS RUBY ANIMATE JQUERY
     *  + Incomplete 'start' & 'complete' options
     */
    function ANIMATE($anim) {

        var that     = this,
            an       = {},
            myData   = {},
            styleCur = {},

            isOverflowOnNode;



        /**
         * FUNCTION CLASS
         */
        /**
         * CHECK & INITIALIZATION ANIMATION
         */
        function Init() {

            /**
             * SETUP VARIABLE AT FIRST
             */
            an.rubyID = DB.GetRubyID($anim);
            myData = that.data = vData[an.rubyID];

            // Setup initialization timer of object
            if( myData.tsInit == UNDE ) myData.tsInit = VA.tsCur;

            // Properties & options of object
            var prop = myData.prop,
                opts = myData.opts;

            an.propEnd = prop[prop.length - 1];
            an.optsEnd = opts[opts.length - 1];



            /**
             * SETUP AFTER START ANIMATION
             */
            SetupStyleBegin();
            Start();
        }


        /**
         * SETUP VALUE OF STYLE & TRANSFORM AT FIRST
         */
        function SetupStyleBegin() {

            // Setup properties of normal Style
            StyleBegin();

            // Setup properties of transform CSS
            TransformBegin();
        }


        /**
         * SETUP VALUE OF STYLE AT FIRST
         */
        function StyleBegin() {

            var styleBegin  = an.optsEnd.styleBegin,
                styleEnd    = an.optsEnd.styleEnd,
                opts        = myData.opts,
                isAnimMulti = opts.length > 1;


            /**
             * LOOP TO SETUP VALUE NOT BE TRANSFORM CSS
             */
            for( var name in an.propEnd ) {
                if( $.inArray(name, VA.nameTf) === -1 ) {

                    /**
                     * SETUP STYLE END
                     *  + Parse & convert value of StyleEnd
                     */
                    var valueCur = an['propEnd'][name];
                    styleEnd[name] = M.ParseCssStyle(valueCur);



                    /**
                     * SETUP STYLE BEGIN
                     */
                    // Case: name of properties have fixed value -> inherit value of tfEnd
                    if( $.inArray(name, VA.propFixed) !== -1 ) {
                        styleBegin[name] = styleEnd[name];
                    }

                    else {
                        // Parse & convert value of StyleBegin
                        valueCur = $anim.css(name);
                        styleBegin[name] = M.ParseCssStyle(valueCur);
                    }
                }
            }


            // Inherit StyleEnd of animation before
            if( isAnimMulti ) styleBegin = $.extend(styleBegin, opts[opts.length - 2]['styleEnd']);

            // Inherit properties of CSS Style 'point' have setup before
            if( myData.cssStyle !== null ) {
                styleBegin = $.extend(true, styleBegin, myData.cssStyle);

                // Remove properties CSS Style after inherit
                myData.cssStyle = null;
            }





            /**
             * SETUP INHERIT PROPERTIES OF STYLE-END FROM STYLE-BEGIN
             */
            for( var name in styleBegin ) {

                if( styleEnd[name] === UNDE ) {
                    styleEnd[name] = styleBegin[name];
                }
            }
        }


        /**
         * SETUP VALUE OF TRANSFORM AT FIRST
         */
        function TransformBegin() {
            var opts = myData.opts;


            /**
             * GET TRANSFORM OF OBJECT AT FIRST
             */
            // Case: have many continuous animation
            var tfBegin;
            if( opts.length > 1 ) {

                // Get Transform-begin from Transform-end before
                tfBegin = $.extend({}, opts[opts.length - 2]['tfEnd']);
            }

            // Case: only 1 animation
            else {
                tfBegin = myData.tfCur;
                if( tfBegin == UNDE ) {

                    var matrixBegin = MATRIX.getFromItem($anim);

                    /**
                     * PARSE MATRIX TO INITIAL PROPERTIES
                     */
                    tfBegin = MATRIX.parse(matrixBegin);
                }
            }


            // Inherit the properties CSS Transform 'point' have setup before
            if( myData.cssTf !== null ) {
                tfBegin = $.extend(true, tfBegin, myData.cssTf);

                // Remove CSS Transform property after inherit
                myData.cssTf = null;
            }





            /**
             * GET TRANSFORM-END FROM SETUP PROPERTIES
             */
            var tfEnd = TF.FromProp(an.propEnd);




            /**
             * SETUP TRANSFORM INHERIT FROM PROPERTIES BEFORE
             */
            // Inherit 'tfBegin' properties but 'tfEnd' does not have, order of Transform depends on options
            tfEnd = TF.Extend(tfBegin, tfEnd, an.optsEnd);

            var tfDefault = VA.tfDefault;
            for( var name in tfEnd ) {

                /**
                 * ADDITIONAL PROPERTIES WITH TRANSFORM-BEGIN
                 */
                if( tfBegin[name] === UNDE ) {

                    // Case: value of properties !== default value
                    if( tfEnd[name] != tfDefault[name] ) {

                        // Case: name of property has fixed value -> inherit value from 'tfEnd'
                        if( $.inArray(name, VA.propFixed) !== -1 ) tfBegin[name] = tfEnd[name];

                        // Case normal -> default value
                        else tfBegin[name] = tfDefault[name];
                    }

                    // Case similar to default value: remove from Transform-end
                    else {
                        delete tfEnd[name];
                    }
                }



                /**
                 * REMOVE PROPERTIES ON TRANSFORM BEGIN - END SIMILAR TO DEFAULT PROPERTIES
                 */
                if( tfBegin[name] == tfDefault[name] && tfEnd[name] == tfDefault[name] ) {
                    delete tfBegin[name];
                    delete tfEnd[name];
                }
            }

            an.optsEnd.tfBegin = tfBegin;
            an.optsEnd.tfEnd   = tfEnd;
        }


        /**
         * SETUP VALUE WHEN BEGIN ANIMATION
         */
        function Start() {

            /**
             * INSERT STYLE 'OVERFLOW' AT FIRST: FIXED FOR OLD BROWSER
             */
            var style = $anim.attr('style');
            isOverflowOnNode = style && style.indexOf('overflow') !== -1;

            // Unavailable
            // !isOverflowOnNode && $anim.css('overflow', 'hidden');



            /**
             * EXECUTE FUNCTION 'START' AT FIRST
             */
            !!an.optsEnd.start && an.optsEnd.start();
        }











        /**
         * SETUP NEXT VALUE OF OBJECT, CALL FUNCTION FROM 'TWEEN'
         * @param boolean isForceAnim   Allways setup style for object
         */
        that.next = function(isForceAnim) {

            /**
             * SETUP CURRENT TIME
             * @param Int     an.xCur       Current time, in range [0, 1]
             * @param Boolean isAnimate     Check setup current animation
             */
            var opts       = myData.opts,
                isAnimate  = false,
                isComplete = false,
                tCur       = myData.tCur = VA.tsCur - myData.tsInit;


            for( var i = 0, len = opts.length; i < len; i++ ) {
                var optsCur = opts[i];

                // Case: tCur at the forward position the first Aniamtion
                if( tCur < optsCur.tPlay && i == 0 ) {

                    // Case: allways setup Style of object
                    if( isForceAnim ) {
                        an.optsPos = i;
                        an.xCur = 0;
                    }

                    // Case normal
                    else an.xCur = null;
                    break;
                }

                // Case: 'tCur' at the behide position the last Animation
                else if( tCur > optsCur.tEnd && i == len - 1 ) {
                    an.optsPos = i;
                    an.xCur = 1;
                    isComplete = true;
                    break;
                }

                // Case: 'tCur' located inside Animation
                else if( optsCur.tPlay <= tCur && tCur <= optsCur.tEnd ) {
                    an.optsPos = i;
                    an.xCur = $.GSGDEasing[optsCur.easing](null, tCur - optsCur.tPlay, 0, 1, optsCur.duration);
                    isAnimate = true;
                    break;
                }

                // Case: 'tCur' located outside Animation
                else if( !!opts[i + 1] && optsCur.tEnd < tCur && tCur < opts[i + 1].tPlay ) {
                    an.optsPos = i;
                    an.xCur = 1;
                    break;
                }
            }




            /**
             * SETUP VALUE OF CURRENT STYLE ON OBJECT
             */
            if( an.xCur !== null && opts.length ) {

                // First, reset size of Item
                GetSizeItem();

                // Reset variable 'styleCur'
                styleCur = {};

                // Setup current Style value of the object
                StyleNormalCur();
                StyleTransformCur();
                $anim.css(styleCur);
            }



            /**
             * EXECUTE OPTION 'COMPLETE'
             */
            if( isComplete ) {
                var optsCur = opts[an.optsPos];
                !!optsCur.complete && optsCur.complete();
            }


            /**
             * Return value check have Animation
             */
            return isAnimate;
        };











        /**
         * CONVERT VALUE HAS OTHER UNIT TO 'PX'
         *  + Support convert '%' to 'px'
         */
        function ConvertValue(name, valueCur) {

            /*
             * CASE: STRING
             */
            if( typeof valueCur == 'string' ) {

                /**
                 * CASE: UNIT IS 'PX'
                 */
                if( /px$/.test(valueCur) ) {
                    valueCur = parseFloat(valueCur);
                }


                /**
                 * CASE: UNIT IS '%'
                 */
                else if( /\%$/.test(valueCur) ) {

                    // Name of property exist in conversion system
                    var nameSizeFn = VA.percentRef[name];
                    if( nameSizeFn !== UNDE ) {

                        var sizeCur = an['size'][nameSizeFn];
                        valueCur = sizeCur * parseFloat(valueCur) / 100;
                    }
                }
            }



            /**
             * RETURN VALUE AFTER SETUP
             */
            return valueCur;
        }


        /**
         * GET SIZE OF ITEM IN CURRENT TIME
         */
        function GetSizeItem() {

            an.size = {
                'OuterWidth'  : M.OuterWidth($anim),
                'OuterHeight' : M.OuterHeight($anim)
            };
        }


        /**
         * SETUP VALUE PLUS DEPENDS ON PROPERTY NAME
         */
        function ValueCurForNumber(name, valueBegin, valueEnd) {
            var nameToFloat = ['opacity'],
                plus        = (valueEnd - valueBegin) * an.xCur;

            // Case: rounded number float
            if( $.inArray(name, nameToFloat) !== -1 ) {
                plus = Math.round(plus * 1000) / 1000;
            }

            // Case: rounded to integer
            else {

                /**
                 * ADDITIONAL 1 FRACTION : ANIMATE SMOOTHER
                 */
                plus = Math.round(plus * 10) / 10;
            }
            return valueBegin + plus;
        }


        /**
         * SETUP VALUE OF PROPERTY IS ARRAY[]
         */
        function ValueCurForArray(name, valueBegin, valueEnd) {
            var aValue = [];

            /**
             * SETUP EACH VALUE IN ARRAY[]
             *  + Remove element >= 2 : Browser not support Transform 3D
             */
            for( var i = 0, len = valueEnd.length; i < len && !(i >= 2 && !VA.isTf3D); i++ ) {

                /**
                 * CONVERT VALUE BEGIN - END
                 */
                var vaEndCur   = ConvertValue(name + i, valueEnd[i]),
                    vaBeginCur = ConvertValue(name + i, valueBegin[i]);

                // Case: value 'begin' not exist
                if( vaBeginCur === UNDE ) vaBeginCur = vaEndCur;



                /**
                 * SETUP CURRENT VALUE + STORE IN ARRAY[]
                 */
                var plus     = (vaEndCur - vaBeginCur) * an.xCur,
                    valueCur = Math.round((vaBeginCur + plus) * 10) / 10;

                aValue.push(valueCur + 'px');
            }


            /**
             * CONVERT ARRAY TO STRING
             */
            return aValue.join(' ');
        }


        /**
         * SETUP NORMAL PROPERTIES AT THE CURRENT TIME
         */
        function StyleNormalCur() {
            var optsCur = myData['opts'][an.optsPos];


            for( var name in optsCur['styleBegin'] ) {
                var valueBegin = optsCur['styleBegin'][name],
                    valueEnd   = optsCur['styleEnd'][name],
                    valueCur;


                /**
                 * CASE: PROPERTY HAS VALUE IS ARRAY[]
                 */
                if( $.isArray(valueBegin) ) {
                    valueCur = ValueCurForArray(name, valueBegin, valueEnd);
                }


                /**
                 * CASE: PROPERTY HAS OTHER VALUE
                 */
                else {

                    // Convert value String to Number (if posible)
                    valueBegin = ConvertValue(name, valueBegin);
                    valueEnd   = ConvertValue(name, valueEnd);

                    // Case: value of property is Number
                    if( $.isNumeric(valueBegin) && $.isNumeric(valueEnd) ) {
                        valueCur = ValueCurForNumber(name, valueBegin, valueEnd);
                    }

                    // Other case: keep changes
                    else {
                        valueCur = valueBegin;
                    }
                }





                /**
                 * REMOVE STYLES HAVE DEFAULT VALUE
                 */
                if( optsCur.isClearStyleDefault && VA['styleDefault'][name] === valueCur ) {
                    valueCur = '';
                }



                /**
                 * STORE VALUE OF CURRENT PROPERTY
                 */
                styleCur[name] = valueCur;
            }
        }


        /**
         * SETUP 'TRANSFORM' IN CURRENT TIME
         */
        function StyleTransformCur() {

            /**
             * SETUP CURRENT VALUE EACH TRANSFORM PROPERTIES
             */
            var optsCur = myData['opts'][an.optsPos],
                tfBegin = optsCur.tfBegin,
                tfEnd   = optsCur.tfEnd,
                tfCur   = {};

            for( var name in tfEnd ) {

                // Setup value 'plus' of each properties
                var tfBeginCur = TF.ConvertValueToPX($anim, name, tfBegin[name]),
                    tfEndCur   = TF.ConvertValueToPX($anim, name, tfEnd[name]),

                    valuePlus  = (tfEndCur - tfBeginCur) * an.xCur,
                    valueCur   = tfBeginCur + valuePlus;

                // Value of current property
                tfCur[name] = valueCur;
            }




            /**
             * CONVERT PARTICULAR PROPERTY OF TRANSFORM TO CSS
             */
            var cssTf = TF.ToCss(tfCur, optsCur);




            /**
             * STORE CURRENT TRANSFORM CSS
             */
            var nameTf = VA.prefix + 'transform';
            styleCur[nameTf] = cssTf;

            // Store current Transform into system
            myData.tfCur = tfCur;
        }











        // Initialize Animation
        Init();
    }











    /**
     * SETUP MAIN PLUGIN
     */
    window.RubyTween = function() {
        var that = this,
            tw   = that.tw = {
                id       : VA.nTween++,
                $items   : $(),
                data     : [],
                animate  : [],
                tsInit   : +new Date(),
                tCur     : 0,
                tMax     : Number.MAX_VALUE,
                status   : 'pause',             // Value included: 'wait', 'play', 'pause'
                dirs     : 'forward',           // Tween direction: 'forward', 'reverse'
                timeline : [],
                timeData : [],
                timeRef  : {},
                timePosCur  : 0,
                timeTypeCur : null
            };




        /**
         * SETUP ID-ITEM IN TWEEN SYSTEM
         */
        function SetupItemID(itemData, $item, prop, opts) {

            // Check object exist on Tween
            if( itemData.tweenID === UNDE ) {
                itemData.tweenID = tw.id;
            }

            else {

                /**
                 * UPDATE PROPERTIES OF ITEM WHEN ID-ITEM !== ID-TWEEN
                 */
                if( itemData.tweenID != tw.id ) {

                    // Noties to reset 'prop' & 'opts'
                    opts.isNew = true;

                    // Update time of object
                    itemData.tsInit = tw.tsCur;
                    itemData.tCur = 0;

                    // Re-register current 'prop' & 'opts'
                    itemData = DB.Update($item, prop, opts);
                    itemData.tweenID = tw.id;
                }
            }
        }

        /**
         * CHECK ITEM EXIST IN SYSTEM
         */
        function CheckItemExist(itemData) {

            for( var i = 0, len = tw.animate.length; i < len; i++ ) {
                if( tw['animate'][i]['data']['$item'].is(itemData.$item) ) return true;
            }
            return false;
        }

        /**
         * UPDATE INITIALIZATION TIME OF ALL ITEM
         */
        function UpdateTimeInitAllItem() {

            for( var i = 0, len = tw.animate.length; i < len; i++ ) {

                // Update initialization time for each object
                var dataCur = tw['animate'][i]['data'];
                dataCur.tsInit = tw.tsInit;
            }
        }










        /**
         * SETUP TIMELINE SYSTEM
         */
        function TimelineSetup($item, itemData) {

            /**
             * TIME 'WAIT' - 'PLAY' - 'END' OF OBJECT
             */
            tw.$items = tw.$items.add($item);


            var optsLen  = itemData.opts.length,
                optsEnd  = itemData.opts[optsLen - 1],
                optsLast = itemData.opts[optsLen - 2];

            optsEnd.tWait = (optsLen == 1) ? 0 : optsLast.tEnd;
            optsEnd.tPlay = optsEnd.tWait + optsEnd.delay;
            optsEnd.tEnd  = optsEnd.tPlay + optsEnd.duration;



            /**
             * INSERT TIME WAIT - PLAY - END INTO TIMELINE SYSTEM
             */
            if( $.inArray(optsEnd.tWait, tw.timeData) === -1 ) {
                tw.timeData.push(optsEnd.tWait);
                tw.timeRef[optsEnd.tWait] = 'wait';
            }


            if( $.inArray(optsEnd.tPlay, tw.timeData) === -1 ) {
                tw.timeData.push(optsEnd.tPlay);
                tw.timeRef[optsEnd.tPlay] = 'play';
            }
            else {
                tw.timeRef[optsEnd.tPlay] = 'play';
            }


            if( $.inArray(optsEnd.tEnd, tw.timeData) === -1 ) {
                tw.timeData.push(optsEnd.tEnd);
                tw.timeRef[optsEnd.tEnd] = 'end';
            }



            /**
             * ARRANGE VALUE IN ARRAY[] INCREASE
             */
            tw.timeData = M.ArrayMinToMax(tw.timeData);
            tw.tMax     = tw.timeData[tw.timeData.length - 1];



            /**
             * RESET TIMELINE SYSTEM
             */
            tw.timeline = [];
            var statusLast = 'end';
            for( var i = 0, len = tw.timeData.length; i < len; i++ ) {

                var timeCur    = tw.timeData[i],
                    timeNext   = tw.timeData[i + 1],
                    statusCur  = tw.timeRef[timeCur],
                    statusNext = tw.timeRef[timeNext];


                /**
                 * CASE: TIMEOUT 'END - WAIT'
                 * CASE: TIMEOUT 'END - PLAY'
                 */
                var isTimeoutWait = statusLast == 'end' && statusCur == 'wait',
                    isTimeoutEnd  = statusCur == 'end' && statusNext == 'play';
                if( isTimeoutWait || isTimeoutEnd ) {

                    /**
                     * FIND NEXT VALUE
                     */
                    var valuePlayNext;
                    if( isTimeoutWait ) {
                        for( var j = i; j < len; j++ ) {

                            if( tw.timeRef[ tw.timeData[j] ] == 'play' ) {
                                valuePlayNext = tw.timeData[j];
                                break;
                            }
                        }
                    }

                    if ( isTimeoutEnd ) valuePlayNext = timeNext;



                    /**
                     * SETUP 'TIMEOUT' VALUE
                     */
                    tw.timeline.push({
                        'type'  : 'timeout',
                        'time'  : timeCur,
                        'delay' : valuePlayNext - timeCur
                    });
                }



                /**
                 * CASE: INTERVAL 'WAIT - PLAY'
                 * CASE: INTERVAL 'END - PLAY'
                 */
                if( /^(wait|end)$/.test(statusLast) && statusCur == 'play' ) {
                    tw.timeline.push({
                        'type' : 'interval',
                        'time' : timeCur
                    });
                }


                /**
                 * SETUP END EACH LOOP
                 */
                statusLast = statusCur;
            }




            /**
             * REMOVE 'TIMEOUT' INSIDE 'INTERVAL'
             */
            var timeline = $.extend([], tw.timeline);
            for( var i = 0; i < timeline.length; i++ ) {

                if( timeline[i].type == 'timeout' ) {

                    /**
                     * CREATE LOOP TO CHECK EACH OBJECT HAS 'INTERVAL' CONTAIN CURRENT 'TIMEOUT'
                     */
                    for( var j = 0, lenJ = tw.animate.length; j < lenJ; j++ ) {
                        var dataCur = tw['animate'][j]['data'];
                        if( dataCur.tPlay < timeline[i].time && timeline[i].time < dataCur.tEnd ) {

                            // Remove next 'Timeout' & 'Interval' in Timeline array[]
                            timeline.splice(i, 2);
                            i--;
                            break;
                        }
                    }
                }
            }

            tw.timeline = timeline;
        }


        /**
         * UDPATE CURRENT POSITION IN TIMELINE
         */
        function TimelinePosCur() {

            var pos = null;
            for( var i = 0, len = tw.timeline.length; i < len; i++ ) {

                if( tw.timeline[i].time > tw.tCur ) {
                    pos = i - 1;
                    break;
                }
            }


            // Case: no any value when get value-end in Timeline array[]
            if( pos === null ) pos = tw.timeline.length - 1;

            // Store position of Animation
            tw.timePosCur = pos;
        }


        /**
         * SETUP PLAY ANIMATION
         */
        function Play() {
            var dirs = tw.dirs;


            /**
             * GET CURRENT TIME DEPENDS ON 'FORWARD' - 'REVERSE' DIRECTION
             *  + Case 'reverse': first reduce time 'tsInit'
             */
            var tsLast = tw.tsCur;
            tw.tsCur = VA.tsCur = +new Date();


            // Case: 'forward' direction
            if( dirs == 'forward' ) {
                tw.tCur = tw.tsCur - tw.tsInit;
            }

            // Case: 'reverse' direction
            else if( dirs == 'reverse' ) {
                tw.tCur -= tw.tsCur - tsLast;

                // Update time 'Init' for Tween & Items
                tw.tsInit = tw.tsCur - tw.tCur;
                UpdateTimeInitAllItem();
            }





            /**
             * UPDATE CURRENT POSITION IN TIMELINE
             */
            TimelinePosCur();

            // Case: 'reverse' position with Animate < 0
            if( dirs == 'reverse' && tw.timePosCur < 0 ) {

                // Mark sure setup Transform at first
                Next();

                // Not continue setup
                return;
            }




            /**
             * SETUP DURATION OF TIMER IF TYPE CURRENT TIMELINE IS 'TIMEOUT'
             */
            var tlCur    = tw.timeline[tw.timePosCur],
                tTimeout = 0;

            if( tlCur.type == 'timeout' ) {

                if( dirs == 'forward' ) tTimeout = tlCur.delay - (tw.tCur - tlCur.time);
                if( dirs == 'reverse' ) tTimeout = tw.tCur - tlCur.time;
            }




            /**
             * RESET CURRENT $ANIMATION
             */
            tw.animateCur = $.extend([], tw.animate);




            /**
             * CASE: CURRENT STATUS IS 'WAIT'
             */
            if( tw.status == 'wait' ) {

                // First remove 'timer' before
                clearTimeout(tw.timer);


                if( tlCur.type == 'timeout' ) {
                    tw.timer = setTimeout(Play, tTimeout);
                }

                else if( tlCur.type == 'interval' ) {
                    tw.timer = setInterval(Next, VA.timeLoop);
                }
            }



            /**
             * CASE: CURRENT STATUS IS 'STOP' - 'PAUSE'
             */
            else if( tw.status == 'pause' ) {

                /**
                 * CASE: 'TIMEOUT'
                 */
                if( tlCur.type == 'timeout' ) {
                    tw.status = 'wait';
                    tw.timer = setTimeout(Play, tTimeout);
                }


                /**
                 * CASE: 'INTERVAL'
                 */
                else if( tlCur.type == 'interval' ) {
                    tw.status = 'play';
                    tw.timer = setInterval(Next, VA.timeLoop);
                }
            }
        }


        /**
         * SETUP NEXT VALUE OF ALL OBJECTS
         *  + Function only execute from 'Play()'
         */
        function Next() {
            var dirs = tw.dirs;


            /**
             * CONDITIONAL EXECUTION
             */
            var numAnim = tw.animateCur.length;
            if( !numAnim ) {

                clearInterval(tw.timer);
                return;
            }




            /**
             * GET CURRENT TIME DEPENDS ON 'FORWARD' - 'REVERSE' DIRECTION
             *  + Case 'reverse': first reduce time 'tsInit'
             */
            var tsLast = tw.tsCur;
            tw.tsCur = VA.tsCur = +new Date();

            // Case: 'forward'
            if( dirs == 'forward' ) {
                tw.tCur = tw.tsCur - tw.tsInit;
            }

            // Case: 'reverse'
            else if( dirs == 'reverse' ) {
                tw.tCur -= tw.tsCur - tsLast;

                // Update time 'init' for Tween & Items
                tw.tsInit = tw.tsCur - tw.tCur;
                UpdateTimeInitAllItem();
            }




            /**
             * SETUP CURRENT VALUE STYLE OF OBJECTS
             */
            for( var i = 0, len = tw.animateCur.length; i < len; i++ ) {
                var isNext = tw.animateCur[i].next();


                /**
                 * REMOVE ANIMATE OF CURRENT OBJECT NEU NOT HAVE NEXT VALUE
                 */
                if( !isNext ) numAnim--;

                if( !numAnim ) {
                    clearInterval(tw.timer);


                    /**
                     * CASE: 'WAIT' FOR NEXT ANIMATION
                     */
                    if( tw.tCur < tw.tMax ) {

                        // Case: 'forward'
                        if( dirs == 'forward' ) {
                            tw.status = 'wait';
                            Play();
                        }

                        // Case: 'reverse'
                        else if( dirs == 'reverse' ) {

                            /**
                             * CASE: TIME 'WAIT' BETWEEN ANIAMTIONS
                             */
                            if( tw.tCur > 0 ) {
                                tw.status = 'wait';
                                Play();
                            }


                            /**
                             * CASE: TIME GO TO BEGIN POSITION
                             */
                            else {
                                // Reset direction of Tween
                                tw.dirs = 'forward';

                                // Mark sure setup Transform at first
                                // Included setup status
                                that.go(0);

                                // Execute function 'complete' (if have) when complete animation
                                !!tw.evComplete && tw.evComplete();
                            }
                        }
                    }



                    /**
                     * CASE: EXECUTE ALL IN TIMELINE
                     */
                    else if( tw.tCur >= tw.tMax ) {
                        tw.status = 'pause';

                        // Execute fuction 'complete' (if have) when complete animation
                        !!tw.evComplete && tw.evComplete();
                    }
                }
            }
        }










        /**
         * SETUP ANIMATE-TRANSFORM FOR OBJECT
         */
        that.animate = function($item, prop, opts, isAutoPlay) {

            // Conditional execution
            if( !($item && $item.length) ) return that;


            /**
             * GET CURRENT TIME
             *  + Support for setup below
             */
            tw.tsCur = VA.tsCur = +new Date();
            tw.tCur  = tw.tsCur - tw.tsInit;




            /**
             * SETUP & STORE 'PROP' - 'OPTS' OF ITEM INTO SYSTEM
             */
            var itemData = DB.Update($item, prop, opts);

            // Get value of 'opts' have stored if 'opts' not have value at first
            if( !opts ) opts = itemData.opts[itemData.opts.length - 1];

            // Case: create new animation
            if( opts.isNew ) {
                // Reset ID-Tween if setup new Animation
                itemData.tweenID = null;
            }

            // Variable to show Item have animate
            itemData.isAnimate = true;

            // Setup Item ID
            SetupItemID(itemData, $item, prop, opts);




            /**
             * INSERT TIME ANIMATION OF OBJECT INTO TIMELINE SYSTEM
             *  + Must have Item datavase before
             */
            TimelineSetup($item, itemData);



            /**
             * SETUP FOR EACH OBJECT
             */
            var animateCur = new ANIMATE($item);
            !CheckItemExist(itemData) && tw.animate.push(animateCur);



            /**
             * AUTOMATIC SETUP 'PLAY' ANIMATE
             *  + Not is parameter, default is 'true'
             */
            isAutoPlay = (isAutoPlay === UNDE) ? true : isAutoPlay;
            isAutoPlay && Play();

            // Return RubyTween
            return that;
        }


        /**
         * SETUP CSS TRANSFORM FOR OBJECT
         */
        that.css = function($item, prop, opts) {

            // Conditional execution
            if( !($item && $item.length) ) return that;

            // Update CSS options with default options
            opts = $.extend(true, {}, VA.optsCssDefault, opts);



            /**
             * CASE: RESET TWEEN-ANIMATE BY CSS
             */
            var optsType = opts.type;
            if( optsType == 'reset' ) {

                /**
                 * SETUP THUOC TINH MAC DINH
                 *  + Support remove properties relate to CSS Transform
                 */
                prop = $.extend({
                    'originTF'    : '',
                    'perspective' : ''
                }, prop);




                /**
                 * RESET 'PROP' & 'OPTS' OF ITEM IN SYSTEM
                 */
                // Pause Tween first
                that.pause();

                // Reset 'prop' & 'opts' of Item on Database
                opts.isNew = true;

                // Get data of ITem by 'DB.Update()'
                var itemData = DB.Update($item, prop, opts);

                // Remove Item from Tween system
                itemData.tweenID = null;




                /**
                 * SETUP PROPERTY CSS ON ITEM
                 */
                var styleCur = {};
                prop = itemData.prop[0];
                opts = itemData.opts[0];


                // Get property !== CSS Transfrom
                for( var name in prop ) {
                    if( $.inArray(name, VA.nameTf) === -1 ) {
                        styleCur[name] = prop[name];
                    }
                }


                // Get property of CSS Transform
                var propTf = TF.FromProp(prop);

                // Store Transform property into main variable: when not convert value
                itemData.tfCur = $.extend({}, propTf);

                // Convert special value of CSS Transform
                for( var name in propTf ) {
                    propTf[name] = TF.ConvertValueToPX($item, name, propTf[name]);
                }

                // Convert all properties of CSS Tranform to String
                var cssTf = TF.ToCss(propTf, opts);

                // Insert CSS Transform into main Style
                styleCur[VA.prefix + 'transform'] = cssTf;

                // Setup all properties of CSS on Item
                $item.css(styleCur);




                /**
                 * OTHER SETUP
                 */
                // Store $Item into system
                tw.$items = tw.$items.add($item);
            }



            /**
             * CASE: SETUP NEW CSS BEFORE SETUP ANIMATION
             */
            else if( /^(point|inherit)$/.test(optsType) ) {

                var rubyID   = DB.GetRubyID($item),
                    itemData = VA.data[rubyID],
                    cssStyle = {},
                    cssTf    = {};


                /**
                 * DISTINGUISH PROPERTIES OF TRANSFORM AND WITHOUT TRANSFORM
                 */
                // Convert name of property for standard
                prop = M.ValidName(prop, opts);

                for( var name in prop ) {
                    var valueCur = prop[name];

                    // Case: property not Transfrom
                    if( $.inArray(name, VA.nameTf) === -1 ) {

                        // Parse & convert value of CSS Style
                        cssStyle[name] = M.ParseCssStyle(valueCur);
                    }

                    // Case: property of Transform
                    else {
                        cssTf[name] = valueCur;
                    }
                }



                /**
                 * INHERIT ALL DEFAULT PROPERTIES TRANSFORM IF TYPE 'POINT'
                 */
                if( optsType == 'point' ) {
                    cssTf = TF.Extend(VA.tfDefault, cssTf, { 'isTFOrderByEnd': true });
                }



                /**
                 * STORE CSS-STYLE & CSS-TRANSFORM FOR NEXT ANIMATION
                 */
                itemData.cssStyle = cssStyle;
                itemData.cssTf    = cssTf;
            }

            return that;
        }












        /**
         * GO TO POSITION ON TIMELINE
         */
        that.go = function(pos, unit) {

            // Pause animate of objects
            that.pause();



            /**
             * SETUP CURRENT TIME DEPENDS ON UNIT
             */
            // Case: default unit is '%'
            var tCur = pos * tw.tMax / 100;

            // Case: unit is 'ms' (milisecond)
            if( unit == 'ms' ) tCur = pos;




            /**
             * CASE: NOT ANIMATE IN SYSTEM & START POSITION
             *  + Setup CSS at first by 'that.css()'
             */
            var animNum = tw.animate.length;
            if( tCur == 0 && !animNum ) {

                /**
                 * LOOP TO SETUP EACH OBJECT
                 */
                for( var i = 0, len = tw.$items.length; i < len; i++ ) {

                    var $itemCur = tw.$items.eq(i),
                        itemData = VA['data'][ DB.GetRubyID($itemCur) ];

                    // Condition setup CSS for object
                    if( !itemData['isAnimate'] && itemData['prop'].length == 1 ) {
                        that.css($itemCur, itemData['prop'][0], itemData['opts'][0]);
                    }
                }
            }





            /**
             * CASE: TWEEN HAVE ANIMATE
             */
            else {

                /**
                 * UPDATE CURRENT TIME
                 */
                tw.tCur   = tCur;
                tw.tsCur  = VA.tsCur = +new Date();
                tw.tsInit = tw.tsCur - tw.tCur;

                for( var i = 0, len = tw.animate.length; i < len; i++ ) {

                    // Update time 'init' for each object
                    tw['animate'][i]['data']['tsInit'] = tw.tsInit;

                    // Setup value current Style of objects
                    tw.animate[i].next(true);
                }
            }


            // Return RubyTween
            return that;
        }


        /**
         * EXECUTE 'PAUSE' TWEEN
         */
        that.pause = function() {

            /**
             * REMOVE TIMER OF TIMELINE
             */
            if( !/^(stop|pause)$/.test(tw.status) ) {
                clearTimeout(tw.timer);
                clearInterval(tw.timer);
                tw.status = 'pause';
            }

            // Return RubyTween
            return that;
        }


        /**
         * EXECUTE 'PLAY' TWEEN
         */
        that.play = function() {

            /**
             * CONDITIONAL EXECUTION
             */
            if( !/^(wait|play)$/.test(tw.status) && tw.animate.length ) {

                /**
                 * UPDATE INTIALIZATION TIME
                 */
                tw.tsCur = VA.tsCur = +new Date();
                tw.tsInit = tw.tsCur - tw.tCur;

                // Update time 'init' for all Item
                UpdateTimeInitAllItem();



                /**
                 * PLAY CONTINUE ANIMATION
                 */
                Play();
            }

            return that;
        }


        /**
         * EXECUTE CONTINUE TWEEN WHEN PAUSE
         */
        that.resume = function() {

            // Update current position & continue to play Tween
            that.go(tw.tCur, 'ms').play();
            return that;
        }


        /**
         * RESTART TWEEN ANIMATE
         */
        that.restart = function() {
            that.go(0).play();
            return that;
        }


        /**
         * REVERSE TWEEN ANIMATE
         */
        that.reverse = function() {

            // Variable to show Tween direction
            tw.dirs = 'reverse';

            // Update position Tween at current time
            that.go(tw.tCur, 'ms');

            // Update position Tween if at first place
            if( tw.tCur <= 0 ) that.go(100);

            // Continue play
            that.play();
            return that;
        }


        /**
         * RESET CURRENT TWEEN SYSTEM
         *  + Remove properties of Item out DB
         */
        that.reset = function(isDeleteItemDB) {

            /**
             * DELETE ALL ITEM IN DATABASE SYSTEM
             */
            if( isDeleteItemDB ) {
                for( var i = 0, len = tw.animate.length; i < len; i++ ) {

                    var idDBCur = tw['animate'][i]['data']['idDB'];
                    delete vData[idDBCur];
                }
            }



            /**
             * RESET OTHER PROPERTIES
             */
            tw.dirs = 'forward';
            tw.tCur = 0;
            tw.animate = [];
            tw.$items = $();
            tw.evComplete = null;

            return that;
        }











        /**
         * REMOVE DATABASE OF OBJECT IN SYSTEM
         */
        that.clearDB = function($item) {
            // console.log('clear');
        }


        /**
         * EVENT 'COMPLETE' CONTAIN METHODS - FUNCTION
         */
        that.eventComplete = function(fn) {
            tw.evComplete = fn;
            return that;
        }

        /**
         * EXECUTE EVENT 'COMPLETE'
         */
        that.complete = function() {

            // Go to position-end
            that.go(100);

            // Execute function 'complete' (if have) when aniamte complete
            !!tw.evComplete && tw.evComplete();
            return that;
        }
    }
}(jQuery));


















































/**
 * MODULE SWIPE
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M, VIEW, POSITION, PAG;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        ti   = self.ti;

        // Get Module embbed in Ruby
        M        = self.M;
        VIEW     = self.VIEW;
        POSITION = self.POSITION;
        // Module outside Ruby
        PAG      = M.Module('PAG');
    }


    /**
     * MODULE SWIPE
     */
    rt01MODULE.SWIPE = {

        /**
         * TOOGLE SWIPE EVENT WHEN SWAP SLIDE
         */
        ToggleEvent : function() {
            VariableModule(this);

            // Update property & variable of Swipe event on current Slide
            that.Properties( M.Data(cs.idCur)['opts'] );


            /**
             * TOGGLE EVENT SWIPE GESTURES
             */
            // Event Swipe total Ruby
            if( is.swipeCur != is.swipeLast ) {
                that.Events( is.swipeCur ? true : false );
            }

            // Event Swipe on Viewport
            if( is.swipeOnBodyLast !== undefined && is.swipeOnBodyCur !== is.swipeOnBodyLast ) {
                that.Events( is.swipeOnBodyCur ? 'onBody' : 'offBody' );
            }

            // Store status 'SwipeCur' on 'SwipeLast'
            is.swipeLast = is.swipeCur;
            is.swipeOnBodyLast = is.swipeOnBodyCur;
        },

        /**
         * UPDATE PROPERTY & VARIABLE 'SWIPE' OF CURRENT SWIPE
         */
        Properties : function(optsCur) {
            VariableModule(this);


            /**
             * SETUP 'SWIPECUR' VARIABLE
             */
            is.swipeCur = optsCur.isSwipe;

            //  Case: only 1 slide
            // Ver 1.5 - 24/09/2016: not placed in 'PROP.Slides()' -> error when add new by 'api.addSlide()' when ruby have 1 slide
            if( cs.num == 1 ) {
                is.swipeCur = o.oneSlide.isSwipe ? optsCur.isSwipe : false;
            }

            // Variable swipe on body at first
            is.swipeOnBodyCur = optsCur.swipe.isBody;




            /**
             * ACTION 'SWIPE' DEPENDS ON THE CASE
             *  + Separate to 'swipeBody' & 'swipePag'
             */
            // Truong hop slide hien tai co swipe gestures
            if( is.swipeCur ) {
                var swipe = optsCur.swipe;

                // Swipe on pagination
                is.swipeOnPag = true;
            }

            // Case: current slide without swipe gestures
            else {
                is.swipeOnBodyCur = is.swipeOnPag = false;
            }
        },

        /**
         * SETUP SWIPE EVENTS IN THE CASES
         */
        Events : function(status) {
            var that = this;
            VariableModule(that);

            // Re-register event on objects
            var isSwipeSupport = is.swipeSupport,
                evMouse = va.ev.mouse,
                evSwipe = va.ev.swipe;


            /**
             * FUNCTION CLASSES
             */
            var fn = {

                // Remove event swipe 'Start' on object
                offStart : function($swipe) {

                    // Remove class 'swipe-on' -> support recognize swipe gestures & fixed swipe in IE mobile
                    // Remove event 'Drag' on Images when swipe
                    $swipe
                        .removeClass(va.ns +'swipe-on').addClass(va.ns +'swipe-off')
                        .off(va.ev.mouse.start +' '+ va.ev.swipe.start)
                        .off(va.ev.drag);
                },

                // Remove event swipe 'Move' & 'End' on Document
                offMoveEnd : function() {
                    var ev = va.ev;
                    va.$doc
                        .off(ev.mouse.move +' '+ ev.mouse.end +' '+ ev.swipe.move +' '+ ev.swipe.end);
                },


                /**
                 * REMOVE EVENT SWIPE ON OBJECT
                 */
                offBody : function() {

                    // Remove class 'grab' out Viewport
                    M.ToggleClass('grab', -1);

                    // Return position of slide before remove evetns
                    // Ver 1.5 - 24/09/2016 : 'api.addSlide()' error when add -> remove -> re-add on Ruby have 1 slide
                    // that.LastSetup({}, va.swipeTypeCur, false);

                    // Remove event 'Start' on Viewport
                    fn.offStart(va.$viewport);
                },
                offPag : function() {

                    // Remove class 'grab' out Pagination
                    is.swipePagCur = false;
                    M.ToggleClass('grab', -1, va.$pag);
                    is.pag && fn.offStart(va.$pag);
                },

                /**
                 * REGISTER EVENT SWIPE ON OBJECT
                 */
                onBody : function() {
                    if( is.swipeOnBodyCur ) {

                        //  Remove & re-register swipe event on Document
                        fn.offMoveEnd();
                        fn.offBody();

                        // Register swipe event for $viewport
                        M.ToggleClass('grab', 0);
                        that.EventStart(va.$viewport, va.$canvas, evMouse);
                        isSwipeSupport && that.EventStart(va.$viewport, va.$canvas, evSwipe);
                    }
                },
                onPag : function() {
                    if( is.swipeOnPag && is.pag ) {

                        // Remove & re-register swipe event on Document
                        fn.offMoveEnd();
                        fn.offPag();

                        // Register swipe event for $pagination
                        is.swipePagCur = true;
                        M.ToggleClass('grab', 0, va.$pag);
                        that.EventStart(va.$pag, va.$pagInner, evMouse);
                        isSwipeSupport && that.EventStart(va.$pag, va.$pagInner, evSwipe);
                    }
                }
            };



            /**
             * CLASSIFY STATUS
             *  + To execute correct function
             *  + Support remove/register particular object
             */
            if( status === true ) {
                fn.onBody();

                // Setup swipe on pagination at first
                if( o.swipe.isAutoOnPag )
                    !va.pag.isViewLarge && fn.onPag();
                else
                    fn.onPag();
            }
            else if( status === false ) {
                fn.offBody();
                fn.offPag();
            }
            else fn[status]();
        },





        /**
         * SETUP EVENT & PROPERTI FOR $SWIPE : '$VIEWPORT', $PAGINATION
         */
        EventStart : function($swipe, $swipeCanvas, evName) {
            VariableModule(this);
            var that = this, ns = va.ns;


            /**
             * ADD CLASS 'SWIPE-ON'
             *  + Recognize object have swipe gestures
             *  + Fixed swipe in IE mobile
             */
            $swipe.addClass(ns +'swipe-on').removeClass(ns +'swipe-off');


            /**
             * REMOVE ACTION 'DRAG' ITEM IN RUBY
             */
            $swipe
                .off(va.ev.drag)
                .on(va.ev.drag, function(e) { return false });




            /**
             * EVENT START 'SWIPE' - 'DRAG'
             *  + 'swipeType': support swipe gestures in same time, 'swipe' & 'mouse'
             *  + Touchmouse distinguish 'swipe' of Ruby or 'scroll' page
             */
            $swipe.on(evName.start, { 'swipeType': evName.type }, function(e) {
                VariableModule(that);

                /**
                 * INITIAL SETUP
                 */
                // Direction & type of Swipe gesture
                va.swipeDirs = null;
                var evSwipeType = e.data.swipeType;
                if( va.swipeTypeCur === null ) va.swipeTypeCur = evSwipeType;



                /**
                 * CHECK $TARGET WHEN SWIPE 'START' ALLOW BEGIN
                 */
                var tagSpecial    = ['input', 'textarea', 'label', 'a'],
                    eTarget       = e.target,
                    targetTag     = eTarget.tagName.toLowerCase(),
                    isTargetAllow = $.inArray(targetTag, tagSpecial) === -1;

                // Remove swipe 'start' when $target is swipe-prevent
                if( isTargetAllow ) {

                    // Class prevent: 'swipe-prevent', 'nav-prev', 'nav-next'
                    var classPrevent =  '.' + ns + 'swipe-prevent' +
                                        ', .' + ns + o.namePrev +
                                        ', .' + ns + o.nameNext,

                        $swipePrevent = $(eTarget).closest(classPrevent);

                    if( $swipePrevent.length ) {
                        isTargetAllow = false;

                        // Toggle event 'drag' on $swipe to select text
                        that.EventDragToggle($swipe, va.ev[evSwipeType]);
                    }
                }

                // Remove event swipe 'start' when $target contain <a> node && nested
                if( isTargetAllow ) {
                    var $target     = $(eTarget),
                        $linkParent = $target.closest('a');

                    // If parent exist is '<a>' tag -> check place inside $viewport
                    if( $linkParent.length ) {
                        var $viewportCheck = $linkParent.closest('.'+ ns + o.nameViewport);
                        if( $viewportCheck.length && $viewportCheck.is(va.$viewport) ) {
                            isTargetAllow = false;
                        }
                    }

                    // Check 'target' is object of Nested Ruby
                    if( isTargetAllow ) {
                        var $ruby        = $target.closest('.'+ rt01VA.namespace),
                            $rubyParent  = $ruby.parent().closest('.'+ rt01VA.namespace);

                        if( va.$ruby.is($rubyParent) ) isTargetAllow = false;
                    }
                }











                /**
                 * CONDITION CONTINUE EVENT
                 *
                 */
                if( !(isTargetAllow && !is.lockSwipe && va.swipeTypeCur == evSwipeType && cs.num > 0) ) return;


                /**
                 * REGISTER SWIPE EVENT ON DOCUMENT WHEN START SWIPE
                 */
                that.EventMoveEnd(va.ev[evSwipeType]);


                /**
                 * SWIPE END
                 *  + Remove 'mouseLeave' -> unnecessary & make ruby simplifies
                 */
                va.$doc.one(evName.end, { 'swipeType': evName.type }, function(e) {

                    // Add timer to fixed iOS touchEnd slow
                    if( that.is.iOS ) {
                        setTimeout(function() {
                            that.LastSetup(e, e.data.swipeType, false);
                        }, 0);
                    }

                    // Setup normal on other device
                    else {
                        that.LastSetup(e, e.data.swipeType, false);
                    }
                });











                /**
                 * SETUP VARIABLE AT FIRST
                 *  + Get time at start 'drag'
                 */
                var isCanvas = $swipeCanvas.is(va.$canvas);
                va.tDrag0 = va.tDrag1 = +new Date();

                // Store property of object swiping -> only allow 1 object active
                va.$swipeCur = $swipeCanvas;

                // Remove animate, go to position-end Transform
                M.GetTween(va.$swipeCur).go(100);

                // Get value of variable 'va.can' || 'va.pag'
                var p = M.SwapVaOnSwipe();

                // Remove Tween of slide, go to position-end Transform
                (va.fxType == '3d') && va.tweenSlide.go(100);



                /**
                 * SETUP POSITION SWIPE 'START'
                 *  + x0: original position -> swipe position = current-position - original position
                 *  + x0Fix: original position, not change when toggle slide
                 *  + pageX1: support for 'tap' swipe start
                 */
                var i = that.EVENTS.GetEventRight(e);
                va.x0 = va.x0Fix = va.pageX1 = M.R( i[p.pageX] );

                // Y0 value: recognize swipe ruby or swipe page
                va.y0 = i.pageY;

                // xOffset, xBuffer : reset value
                va.xOffset = va.xBuffer = 0;

                // 'xBuffet' start by 'xCanvas' : when move only +/- current value
                va.xBuffer = p.xCanvas;

                // Bien reset lai dragBegin --> bien voi muc dich thuc hien 1 lan ban dau trong luc 'mouseMove'
                is.swipeBegin = true;

                // Reset value number of event swipe has executed -> support for trigger event 'swipeBegin'
                va.nMoveEvent = 0;

                // Canvas grabbing cursor
                va.$swipeCur.is(va.$canvas.add(va.$s)) && M.ToggleClass('grab', 1);

                // Update value of other view when start swipe
                var fnName = 'SwipeBegin'+ va.View;
                isCanvas && !!VIEW[fnName] && VIEW[fnName]();



                // + Fixed current cursor is 'default' after 'click'
                // + Not work in mobile -> not 'scroll' page
                evSwipeType == 'mouse' && e.preventDefault();
            });
        },

        EventMoveEnd : function(evName) {
            var that = this;

            /**
             * EVENT SWIPE MOVE
             */
            $(document).on(evName.move, { 'swipeType': evName.type }, function(e) {
                VariableModule(that);
                var evSwipeType = e.data.swipeType,
                    isCanvas    = va.$swipeCur.is(va.$canvas.add(va.$s));


                /**
                 * CONDITION CONTINUE EVENT - MOVED TEMPORARILY
                 */
                if( !(!is.lockSwipe && va.swipeTypeCur == evSwipeType) ) return;




                /**
                 * SETUP START SWIPE 'BEGIN'
                 */
                if( !va.nMoveEvent ) {

                    // Recognize $canvas is swiping
                    if( isCanvas ) is.swiping = true;

                    // Trigger event 'swipeBegin'
                    cs.ev.trigger('swipeBegin');
                }

                // Variable to recognize initial swipe
                va.nMoveEvent++;




                /**
                 * GET VALUE WHEN SWIPING
                 */
                // Get correct $event
                var i = that.EVENTS.GetEventRight(e);

                // Store old pageX & get new pageX -> recognize swipe 'left' or 'right'
                var p = M.SwapVaOnSwipe();
                va.pageX0 = va.pageX1;
                va.pageX1 = M.R( i[p.pageX] );




                /**
                 * SETUP CONTINUE WHEN 'PAGEX0' !== 'PAGEX1' -> SAVING CPU
                 */
                if( va.pageX0 != va.pageX1 ) {

                   // Value 'offset' of moved temporarily
                    va.xOffset = va.pageX1 - va.x0;

                    // Recognize swipe 'left' or 'right' -> use for swipe limit
                    is.swipeNav = (va.pageX1 > va.pageX0) ? 'right' : 'left';


                    /**
                     * MOVED TEMPORARILY ON MOBILE DEVICE
                     *  + Recognize scroll page or swipe ruby
                     *  + Sroll page: not have 'e.preventDefault()' in 'touchstart' & 'touchmove'
                     *  + Only execute 'touchmove' once & not 'touchend'
                     */
                    if( evSwipeType == 'swipe' ) {

                        va.y = M.A(va.y0 - i.pageY);
                        if( va.swipeDirs === null && M.A(va.xOffset) >= va.y ) va.swipeDirs = 'chieuX';
                        if( va.swipeDirs === null && va.y > 5 )                va.swipeDirs = 'chieuY';


                        // Case: swipe follow horizontal direction X
                        if( va.swipeDirs === null || va.swipeDirs == 'chieuX' ) {

                            // Prevent move 'scroll' page follow direction Y for Android
                            // Test on Chrome mobile simulate lagging (sometimes successfull, sometimes unsuccessfull)
                            e.preventDefault();

                            // Moved temporarily
                            that.XBuffer(va.pageX1);
                        }

                        // Case: swipe direction Y
                        // Remove event swipe 'Move' - 'End' of Document
                        else {
                            that.Events('offMoveEnd');
                        }
                    }

                    // Case: default is browser on desktop
                    else that.XBuffer(va.pageX1);
                }

                // Pagination Grabbing Cursor: toggle class
                !isCanvas && M.ToggleClass('grab', 1, va.$pag);

                // Lock swipe 'tap', check 'offset' to support 'click' if swipe it
                if( M.A(va.xOffset) > 10 && is.tapEnable ) is.tapEnable = false;     // Tap event more slowly
            });
        },

        /**
         * SETUP ELEMENTS WHEN COMPLETE SWIPE
         */
        LastSetup : function(e, evSwipeType, isScrollPage) {
            VariableModule(this);
            var isCanvas = va.$swipeCur.is(va.$canvas.add(va.$s));


            /**
             * CONDITIONAL EXECUTE
             */
            if( !is.lockSwipe && va.swipeTypeCur == evSwipeType ) {

                // Prevent event 'mouseup' on device support 'touch' event
                // If is 'scroll' page in AndroidNative not support prevent -> not 'scroll' page
                if( evSwipeType == 'swipe' && !isScrollPage ) {
                    e.preventDefault();
                }


                // Variable to recognize swipe-end on Cavas
                if( isCanvas ) is.swiping = false;
                // Callback event end swipe
                !is.swipeBegin && cs.ev.trigger('swipeEnd');

                // Get time at swipe-out : calculate fast or slow
                va.tDrag1 = +new Date();

                // Calculate position moved after swipe
                that.XNear();


                /**
                 * TOGGLE CLASS CURSOR
                 *  + Canvas: recover cursor-swipe
                 *  + Pagination: remove class cursor
                 */
                isCanvas
                ? M.ToggleClass('grab', (is.swipeOnBodyCur) ? 0 : -1)
                : M.ToggleClass('grab', -1, va.$pag);

                // Remove class 'grab-stop' when leave swipe
                o.isViewGrabStop && M.ToggleClass('stop', -1);
            }


            /**
             * OTHER SETUP
             */
            // Reset value of 'swipeTypeCur' at end of event
            // Must compare -> because have 2 event 'mouse' & 'touch' in mobile
            if( va.swipeTypeCur == evSwipeType ) va.swipeTypeCur = null;

            // Remove 'tap' event in swipe gestures
            if( is.mobile ) is.tapEnable = true;
            else            setTimeout(function() { is.tapEnable = true }, 10);

            // Remove event swipe 'Move' - 'End' on Document when complete swipe
            that.Events('offMoveEnd');
        },

        /**
         * SETUP REMOVE EVENT 'DRAG' OF $SWIPE-CURRENT -> SUPPROT SELECT TEXT
         */
        EventDragToggle : function($swipe, evName) {
            var that = this;
            VariableModule(that);

            // Remove event 'drag' on Swipe
            $swipe.off(va.ev.drag);

            // Recovery event 'drag' removed when 'tap' complete
            var evNameEndCur = evName.end +'stopDrag';
            va.$doc.on(evNameEndCur, function(e) {
                VariableModule(that);

                $swipe.on(va.ev.drag, function() { return false });
                va.$doc.off(evNameEndCur);
            });
        },




        /**
         * SETUP MOVED TEMPARORYLY WHEN SWIPE CONTINUOUS
         */
        XBuffer : function(xCur) {
            VariableModule(this);

            // Initialize variables
            var layout     = va.layout,
                view       = va.view,
                idCur      = cs.idCur,
                isRight    = is.swipeNav == 'right',
                isLeft     = is.swipeNav == 'left',

                isCanvas   = va.$swipeCur.is(va.$canvas.add(va.$s)),
                p          = isCanvas ? va.can : va.pag,
                sTranslate = p.sTranslate,

                // Thuoc tinh luu tru su khac nhau khi di chuyen 'next' hay 'prev'
                // Property store diference when move 'next' or 'prev'
                sign = va.xOffset < 0 ? 1 : -1,

                // Distance moved when swipe
                pageX = va.pageX1 - va.pageX0;




            /**
             * SETUP VARIABLE TO ALLOW MOVED TEMPORARILY DEPENDS ON EFFECT
             */
            var isBufferReduce = true,
                isBufferMove   = true;

            if( isCanvas ) {

                /**
                 * CASE SPECIAL: WHEN SWIPE BUFFER
                 */
                if( va.fxType == 'math' || va.view == 'css' ) isBufferMove = false;



                /**
                 * SETUP IN OPTION 'SWIPE'
                 */
                if( !o.swipe.isLiveEffect ) {
                    isBufferReduce = isBufferMove = false;
                }
            }






            /**
             * REDUCE VALUE OF THE MOVE -> WHEN SWIPE OUT VIEWPORT
             * CASE FOR LINE LAYOUT:
             *  + Only applies to Canvas have: isLoop == false & pagination
             */
            function TranslateReduce1() {

                /**
                 * CONDITIONAL EXECUTION
                 *  + Swipe limit only applies when swipe 'left' & 'right' out Viewport
                 */
                if( (isRight && va.xBuffer > p.xMin)
                ||  (isLeft  && va.xBuffer < p.xMax) ) {

                    // Reduce to 8 times for desktop, on mobile is smaller
                    var nRate1 = is.mobile ? 4 : 8;
                    pageX /= nRate1;
                }
            }

            function TranslateReduce2() {

                // Reduce for default move on 'dot' layout
                var nRate2 = is.mobile ? 3 : 6;
                pageX /= nRate2;

                // Continue reduce if 'isLoop' false
                if( !is.loop
                &&  (  (idCur <= 0 && isRight)
                    || (idCur >= cs.num - 1 && isLeft) ) ) {

                    pageX /= 4;
                }
            }


            // Not work for 'buffer' on Canvas have 'bufferReduce' false
            if( isBufferMove && isBufferReduce ) {

                // Case: 'swipeCur' is body Canvas
                if( isCanvas ) {
                    if( layout == 'line' && !is.loop ) TranslateReduce1();
                    if( layout == 'dot' )              TranslateReduce2();

                    /**
                     * GRAB STOP VIEW
                     */
                    if( !is.loop && o.isViewGrabStop ) {

                        if     ( isRight && va.xBuffer > 0 )      M.ToggleClass('stop', 0);
                        else if( isLeft  && va.xBuffer < p.xMax ) M.ToggleClass('stop', 1);
                    }
                }

                // Case: 'swipeCur' is PagInner
                else {
                    if( is.pag ) {
                        TranslateReduce1();

                        /**
                         * SETUP OTHER
                         */
                        // Pag Arrow: check toggle actived
                        // Moved temporarily for Pag Mark
                        o.pag.isArrow && PAG.ArrowActived(va.xBuffer);
                        o.pag.isMark  && PAG.XBufferOnMark(pageX);
                    }
                }
            }



            /**
             * MOVE BUFFER FOR CANVAS
             */
            va.xBuffer += pageX;

            // Move $swipe temprorary
            // Move x/y depend on swipe directdion
            if( isBufferMove ) {

                // Setup transform for current $swipe
                var tf = (p.dirs === 'hor') ? { 'x': M.R(va.xBuffer) }
                                            : { 'y': M.R(va.xBuffer) };

                M.GetTween(va.$swipeCur).css(va.$swipeCur, tf);
            }

            // Update transform for center layout & CSS effect
            // Parameter a: recognize swipe 'next' or 'prev'
            if( o.swipe.isLiveEffect ) {
                var fnName = 'Buffer'+ va.View;
                isCanvas && !!VIEW[fnName] && VIEW[fnName](sign);
            }




            /**
             * SETUP SWAP SLIDE WHEN SWIPE CONTINUOUS IN 'LINE' LAYOUT
             *  + Next/prev same function but differ in varaible 'a.s'
             *  + 'next' use '>', 'prev' use '<' : so '* -1' for 2 case to recognize '>' or '<'
             * @param int p.xCanvas
             */
            if( isCanvas && layout == 'line' ) {
                var posNext = p.xCanvas - (sTranslate * sign);

                // Swipe next slide (negative) -> swipe 'prev' is similar to 'next'
                if( va.xBuffer * sign < posNext * sign ) {

                    // Reset action only execute once in 'drag' continuous
                    is.swipeBegin = true;

                    // Update va.x0 -> use for event 'dragmove' -> when 'dragout', Canvas only move maximum a little distance
                    va.x0 = va.pageX1;

                    // Update xCanvas
                    p.xCanvas -= sTranslate * sign;

                    /**
                     * UPDATE OTHER ELEMENTS WHEN TOGGLE NEXT 1 SLIDE
                     *  + Add option 'isContinuity' -> prevent setup some options, including 'POSITION.AnimateX()'
                     *  + Because 'xCanvas' updated above
                     */
                    that.TOSLIDE.Run(sign, false, true);
                }
            }





            /**
             * OTHER SETUP
             *  + 'is.swipeBegin' : allow function execute once when drag 'move'
             */
            if( is.swipeBegin ) {
                is.swipeBegin = false;

                (view == 'mask') && VIEW.CloneImgbackInMask();
            }
        },

        /**
         * SETUP MOVE TO NEAR SLIDE WHEN COMPLETE SWIPE
         */
        XNear : function() {
            VariableModule(this);

            // Position & size of $swiping
            var isCanvas = va.$swipeCur.is(va.$canvas.add(va.$s)),
                layout   = va.layout,
                num      = cs.num,
                p        = isCanvas ? va.can : va.pag,
                xOffset  = va.xOffset;  // How many moved 'px'

            // Setup Easing when swipe complete
            va.moveBy = 'swipe';




            /**
             * SETUP ON BODY CANVAS
             */
            if( isCanvas ) {
                var wSlide = !!va.pa.left ? va.wSlideFull - (va.pa.left * 2) : va.wSlideFull,
                    tFast  = is.mobile ? 600 : 400,
                    isFast = va.tDrag1 - va.tDrag0 < tFast;


                // Width drag: select
                // Identify move fast or slow of slide
                var w3  = M.R(wSlide / 3),
                    w20 = M.R(wSlide / 20),
                    wLimit = isFast ? w20 : w3,

                    // Time to 'dot' layout recovery old position when move to new slide
                    tGo = 100,
                    // Time to slide recovery old position
                    tRestore = 400;



                /**
                 * SETUP MOVE TO NEXT / PREV / RESET
                 */
                // Move to next slide
                if( xOffset < -wLimit && (is.loop || (!is.loop && cs.idCur < num - 1)) && !!(num - 1) ) {

                    (layout == 'dot') && POSITION.AnimateX(null, 0, false, false, tGo);
                    that.TOSLIDE.Run(1);
                }

                // Move to prev slide
                else if( xOffset > wLimit && (is.loop || (!is.loop && cs.idCur > 0)) && !!(num - 1) ) {

                    (layout == 'dot') && POSITION.AnimateX(null, 0, false, false, tGo);
                    that.TOSLIDE.Run(-1);
                }

                // Recovery position
                else if( !!xOffset ) {

                    // Ver 1.5 - 24/09/2016 : remove variable 'is.swipeOnSlideCur'
                    POSITION.AnimateX(null, 0, false, false, tRestore);

                    // Recovery position & transform after moved temporarily
                    var fnName = 'Restore' + va.View;
                    !!VIEW[fnName] && VIEW[fnName]();
                }


                // Slideshow: setup variable -> reset timer when move next/prev to other slide
                if( (xOffset < -wLimit || xOffset > wLimit) && o.isSlideshow ) is.hoverAction = true;
            }



            /**
             * SETUP ON PAGINATION INNER
             */
            else {
                if( is.pag && xOffset != 0 ) {

                    // Update value 'xCanvas'
                    p.xCanvas = va.xBuffer;

                    // Recovery position center for PagInner
                    var sp = o.pag.speed;
                    if( p.align == 'center' || p.align == 'end' ) {
                        p.xCanvas != p.xMin && POSITION.AnimateX(null, p.xMin, false, true, sp);
                    }

                    // Recovery position begin/end if $canvas outside Viewport
                    else {
                        if( p.xCanvas > 0 )           { POSITION.AnimateX(null, 0, false, true, sp) }
                        else if( p.xCanvas < p.xMax ) { POSITION.AnimateX(null, p.xMax, false, true, sp) }
                    }


                    // Check actived on Pag Arrow
                    o.pag.isArrow && PAG.ArrowActived(p.xCanvas);

                    // Remove transition-duration on Pag Mark
                    // Update position of Pag Mark
                    if( o.pag.isMark ) {
                        PAG.SizePosOfMark();
                    }
                }
            }



            /**
             * OHTER SETUP
             *  + Flywheel: move continue
             */
            POSITION.Flywheel();
        }
    };
})(jQuery);










/**
 * MODULE RESPONSIVE
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE RESPONSIVE
     */
    rt01MODULE.RESPONSIVE = {

        /**
         * UPDATE CAC GIA TRI CUA RESPONSIVE
         * @param object va.pa
         * @param int va.rate
         */
        UpdateVars : function() {
            var that = this,
                o    = that.o,
                va   = that.va;


            /**
             * FUNCTION GET VALUE OF 'PADDING' IN VARIABLE 'VA.PARANGE'
             */
            function GetPadding() {
                var pa = 0;
                if( !!va.paRange ) {

                    pa = that.M.GetValueInRange(va.paRange);
                    if( pa === null ) pa = 0;
                }
                return pa;
            }



            /**
             * RANGE SETUP
             *  + Padding : get
             *  + Padding only work : 'va.wRuby' < width-responsive
             */
            if( !!o.widthRange ) {

                /**
                 * CONDITION:
                 * Case 1: wMax < va.wRes -> priority for small width in Range
                 * Case 2: wMax > va.wRes -> priority for 'width' in Range
                 */
                var wMax   = va.sizeRange.wMax,
                    isCond = (wMax > va.wRes) ? (wMax >= va.wRuby) : (va.wRes > va.wSlide);

                if( isCond ) {
                    // Get size from Range[]
                    var sizeRange = that.M.GetValueInRange(va.sizeRange);

                    va.pa.left = (sizeRange === null) ? GetPadding() : (va.wSlide - sizeRange)/2;
                }
                else va.pa.left = (va.wSlide - va.wRes)/2;
            }

            // Not have option 'widthRange'
            else va.pa.left = (va.wRes > va.wSlide) ? GetPadding() : (va.wSlide - va.wRes)/2;

            // Round number
            va.pa.left = ~~(va.pa.left);



            /**
             * OTHER SETUP
             */
            // Because padding 'left' allways has value so always = width-content / width-responsive
            var rateCur = (va.wSlide - (va.pa.left * 2)) / va.wRes;
            va.rate = (rateCur > 1) ? 1 : rateCur;
        }
    };
})(jQuery);










/**
 * MODULE NAVIGATION
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
    }


    /**
     * MODULE NAVIGATION
     */
    rt01MODULE.NAV = {

        /**
         * RENDER NAVIGATION
         */
        Render : function() {
            VariableModule(this);
            var ns = va.ns;


            /**
             * CASE: CREATE NEW MARKUP NAVIGATION
             */
            if( is.nav && !is.$nav ) {

                /**
                 * SEARCH $NAVIGATION FIRST
                 */
                var classes  = '.'+ ns + o.nameNav,
                    $navHTML = that.RENDER.SearchNode(classes);

                if( $navHTML.length ) {
                    va.$nav = $navHTML;

                    // Insert object inside of Navigation
                    va.$nav.append( that.M.NS(o.nav.markupOutside) );
                    is.navOutside = true;
                }
                else {
                    // Render naviation default if not exist markup
                    va.$nav = $( that.M.NS(o.nav.markup) );

                    // Insert $navigation into Ruby
                    that.RENDER.Into(o.markup.navInto, va.$nav);
                }



                /**
                 * SEARCH OTHER ELEMENTS IN NAVIGATION
                 */
                va.$prev = va.$nav.find('.'+ ns + o.namePrev);
                va.$next = va.$nav.find('.'+ ns + o.nameNext);


                /**
                 * UPDATE VARIABLE
                 */
                is.$nav = true;
            }




            /**
             * CASE: REMOVE NAVIGATION
             */
            else if( !is.nav && is.$nav ) {

                /**
                 * REMOVE $NAVIGATION
                 */
                va.$nav[ is.navOutside ? 'empty' : 'remove' ]();


                /**
                 * UPDATE VARIABLE
                 */
                is.$nav = false;
            }
        },



        /**
         * EVENT TAP-CLICK
         */
        EventTap : function() {
            VariableModule(this);
            var that   = this,
                evName = va.ev.click +' '+ va.ev.swipe.end;


            // Condition to setup event 'tap'
            if( !va.$nav ) return false;

            // Remove event on navigation
            va.$prev.add(va.$next).off(evName);



            /**
             * RE-REGISTER EVENT ON NAVIGATION (IF HAVE)
             */
            if( that.is.nav ) {
                va.$prev.on(evName, function(e) {
                    VariableModule(that);

                    // Trigger event 'beforeTap'
                    cs.ev.trigger('beforeTap');

                    // Move to prev slide
                    o.nav.isEventTap && that.EVENTS.Prev();
                    e.preventDefault();
                });

                va.$next.on(evName, function(e) {
                    VariableModule(that);

                    // Trigger event 'beforeTap'
                    cs.ev.trigger('beforeTap');

                    // Move to next slide
                    o.nav.isEventTap && that.EVENTS.Next();
                    e.preventDefault();
                });
            }
        },



        /**
         * TOGGLE NAVIGATION 'NEXT' OR 'PREV'
         */
        Toggle : function() {
            VariableModule(this);
            var deactived = va.deactived,
                idCur     = cs.idCur,
                num       = cs.num;

            if( !is.loop ) {
                if( idCur == 0 )       va.$prev.addClass(deactived);
                if( idCur == num - 1 ) va.$next.addClass(deactived);

                if( idCur != 0 )       va.$prev.removeClass(deactived);
                if( idCur != num - 1 ) va.$next.removeClass(deactived);
            }

            else va.$prev.add(va.$next).removeClass(deactived);
        }
    };
})(jQuery);










/**
 * MODULE PAGINATION
 *  + Support Pagination Mark
 *  + Support link <a> tag on PagItem
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, oo, cs, va, is, ti, M;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        oo   = self.oo;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        ti   = self.ti;
        M    = self.M;
    }


    /**
     * MODULE PAGINATION
     *  + Remove loader thumbnail inside 'SetupWhenLoadSlideEnd()'
     */
    rt01MODULE.PAG = {

        /**
         * RENDER CONTAINER PAGINATION
         */
        RenderSelf : function() {
            var that = this;
            VariableModule(that);


            /**
             * CASE: INSERT PAGINATION INTO RUBY
             */
            if( o.isPag && !is.$pag ) {

                /**
                 * SEARCH PAGINATION MARKUP OUTSIDE
                 */
                var ns       = ' '+ va.ns,
                    nsPag    = ns +'pag-',
                    pag      = o.pag,
                    pagOut   = ns +'outside',
                    dirs     = pag.direction,
                    pagClass = ns + o.namePag + ns + pag.type + nsPag + dirs + nsPag + pag.position,
                    $pagHTML = that.RENDER.SearchNode('.'+ va.ns + o.namePag);

                // Check & add class-more in pagination at initial
                if( typeof pag.moreClass == 'string' ) pagClass += ' '+ pag.moreClass;

                // Pagination: create Node with className -> class 'type' & 'dirs' will update later
                is.pagOutside = !!$pagHTML.length;
                va.$pag       = $pagHTML.length ? $pagHTML.addClass(pagClass + pagOut)
                                                : $('<div/>', { 'class' : pagClass });



                /**
                 * SETUP EACH PAGITEM
                 */
                va.$pagItem = $('');
                va.$s.each(function() { that.RenderPagItem($(this)) });



                /**
                 * INSERT PAGINATION INTO RUBY
                 */
                // Insert pagItem & pagInner into ruby
                va.$pagInner = $('<div/>', {'class' : va.ns +'paginner'});
                va.$pagInner.append(va.$pagItem);
                va.$pag.prepend(va.$pagInner);

                // Insert pagination into ruby depends on position
                if( !is.pagOutside ) {
                    va.$ruby[ (pag.position == 'begin') ? 'prepend' : 'append' ](va.$pag);
                }




                /**
                 * ADD CLASS TO RUBY -> SUPPORT TABS STYLE-CUSTOM
                 */
                var classes = nsPag + pag.type;
                if( !is.pagList ) {

                    // Add class 'dirs' & 'position'
                    classes += nsPag + dirs + nsPag + pag.position;
                    if( is.pagOutside ) classes += pagOut;
                }
                // Inert all class into ruby
                va.$ruby.addClass(classes);

                // Variable to recognize $pagination exist
                is.$pag = true;
            }



            /**
             * CASE: REMOVE PAGINATION
             */
            else if( !o.isPag && is.$pag ) {

                // Remove all thumbnail on slide (if exist)
                va.$s.each(function() {
                    M.Data($(this), { '$thumbWrap': undefined });
                });

                // Remove all pagination
                va.$pag[ is.pagOutside ? 'empty' : 'remove' ]();

                // Update variables
                is.$pag = is.$pagArrow = is.$pagMark = false;
                is.swipePagCur = false;
            }




            /**
             * SETUP MARKUP PAGARROW + PAGMARK
             */
            if( o.isPag ) {
                that.RenderPagArrow();
                that.RenderPagMark();
            }



            /**
             * CREATE NEW - REMOVE MARKUP THUMBNAIL AFTER OPTION UDPATED
             */
            if( is.$pag ) {
                va.$s.each(function() { that.RenderThumbnail($(this)) });
            }
        },

        RenderPagItem : function($slCur) {
            VariableModule(this);


            /**
             * STORE CURRENT PAGITEM TO VARIABLE
             */
            var $pItem = M.Data($slCur)['$pagItem'];
            va.$pagItem = va.$pagItem.add($pItem);


            // Return current $pagItem -> used in 'API.add()'
            return $pItem;
        },

        /**
         * RENDER PAG ARROW
         */
        RenderPagArrow : function() {
            VariableModule(this);

            /**
             * CASE CREATE NEW PAG-ARROW
             */
            if( o.pag.isArrow && !is.$pagArrow ) {

                // Convert Namespace in markup Arrow
                var str = M.NS(o.pag.markupArrow);

                // Insert Arrow left & right in pagination
                va.$pagArrowLeft  = $( str.replace(/\{dirs\}/g, 'left') );
                va.$pagArrowRight = $( str.replace(/\{dirs\}/g, 'right') );
                va.$pag.append(va.$pagArrowLeft, va.$pagArrowRight);

                // Variable to recognize $pagArrow exist
                is.$pagArrow = true;
            }



            /**
             * CASE: REMOVE PAG-ARROW MARKUP
             */
            if( !o.pag.isArrow && is.$pagArrow ) {

                va.$pagArrowLeft.remove();
                va.$pagArrowRight.remove();
                is.$pagArrow = false;
            }
        },

        /**
         * RENDER PAGINATION-MARK
         */
        RenderPagMark : function() {
            VariableModule(this);


            /**
             * CASE: CREATE NEW PAG-MARK MARKUP
             */
            if( o.pag.isMark && !is.$pagMark ) {

                // Insert pagMark into pagination
                va.$pagMark = $( M.NS(o.pag.markupMark) );
                va.$pagMarkItem = va.$pagMark.children();
                va.$pag.append(va.$pagMark);

                // Variable recognize $pagMark exist
                is.$pagMark = true;
            }



            /**
             * CASE: REMOVE PAG-MARK MARKUP
             */
            else if( !o.pag.isMark && is.$pagMark ) {
                va.$pagMark.remove();
                is.$pagMark = false;
            }
        },

        /**
         * SETUP BEFORE RENDER THUMBNAIL : CREATE WRAPPER, ICON-LOADER
         */
        RenderThumbnail : function($slCur) {
            VariableModule(this);
            var that   = this,
                slData = M.Data($slCur);


            /**
             * CASE: CREATE NEW THUMBNAIL-WRAP
             */
            if( is.pagThumb && !slData.$thumbWrap ) {


                /**
                 * FIRST, SEARCH THUMBNAIL OUTSIDE - BASE ON [DATA-THUMBNAIL-LINK]
                 */
                // Search $thumbnail-item inside slide
                var $thumbItem = M.Find($slCur, '.' + va.ns + 'thumbitem');

                // Search $imageback inside slide
                var $imgback      = M.Find($slCur, '.' + va.ns + o.nameImageBack),
                    $videoback    = M.Find($slCur, '.' + va.ns + 'videoback'),
                    isVideoPoster = $videoback.length && !/^\s*$/.test($videoback.attr('href'));


                // Setup source of thumbnail outside
                var thumbLink;
                if( $imgback.length || $videoback.length ) {

                    // Object need to get thumbnail outside
                    var $target = ($imgback.length && $imgback) || ($videoback.length && $videoback);

                    // Get source from 'data'
                    thumbLink = $target.data('thumbnail-link');

                    // Continue: check thumbnail-link has empty-string
                    if( /^\s*$/g.test(thumbLink) ) thumbLink = false;
                }





                /**
                 * CONDITION CONTINUE
                 */
                if( $thumbItem.length || $imgback.length || thumbLink || isVideoPoster || (slData.isLoaded && slData.$thumbItem) ) {


                    /**
                     * CREATE THUMBNAIL-WRAP TO PAGITEM
                     *  + Temporary : add class 'wfit' to fill image in thumbnail
                     */
                    var $pagItem   = slData.$pagItem,
                        $thumbWrap = $('<div/>', { 'class': '{ns}thumbwrap {ns}wfit'.replace(/\{ns\}/g, va.ns) });

                    $pagItem.append($thumbWrap);

                    // Store thumbnail-wrap in Data slide
                    slData.$thumbWrap = $thumbWrap;

                    // Add icon-loader to thumbnail
                    that.RENDER.LoaderAdd($slCur, $pagItem, '$loaderThumb');






                    /**
                     * CASE: HAVE THUMBNAIL-ITEM IN DATA
                     */
                    if( slData.isLoaded && slData.$thumbItem ) {

                        // Insert image to thumbnail
                        $thumbWrap.append( slData.$thumbItem );

                        // Remove loader-thumbnail
                        that.SetupWhenLoadSlideEnd($slCur);

                        // Update size & style for thumbnail-item
                        that.PosCenterForThumbItem($slCur);
                    }





                    /**
                     * CASE: HAVE THUMBNAIL-ITEM NODE
                     */
                    else if( $thumbItem.length ) {

                        // Move thumbnail-item to thumbnail-wrap
                        $thumbWrap.append($thumbItem);
                    }





                    /**
                     * CASE: LINK THUMBNAIL-ITEM SRC EXIST
                     */
                    else if( !!thumbLink ) {

                        // Create new thumbnail-image
                        $thumbItem = $('<img></img>', { 'src': thumbLink, 'class': va.ns + 'thumbitem' });

                        // Insert new image into thumbnail
                        $thumbWrap.append($thumbItem);
                    }




                    /**
                     * CASE: IAMGEBACK EXIST
                     *  + Create thumbnail-image by Imageback of current slide
                     *  + Create thumbnail in 'IMAGE.EventLoad()'
                     */
                    else if( $imgback.length ) {

                        // Thumbnail item copy from Imageback
                        $thumbItem = $imgback.clone();

                        // Remove class 'imgback' on thumbnail-image
                        // Remove size on clone Image
                        $thumbItem
                            .addClass(va.ns + 'thumbitem')
                            .removeClass(va.ns + 'imgback')
                            .css({ 'width': '', 'height': '' });


                        // Insert new image into thumbnail
                        $thumbWrap.append($thumbItem);
                    }
                }
            }




            /**
             * CASE: REMOVE THUMBNAIL-WRAP
             */
            else if( !is.pagThumb && !!slData.$thumbWrap ) {
                slData.$thumbWrap.remove();
                slData.$thumbWrap = null;
            }
        },

        /**
         * SETUP PAGINATION WHEN SLIDE LOAD END
         */
        SetupWhenLoadSlideEnd : function($slCur) {
            VariableModule(this);


            /**
             * SETUP THUMBNAIL
             */
            if( is.pagThumb ) {

                // Remove loader-thumbnail at end
                that.RENDER.LoaderRemove($slCur, '$loaderThumb');
            }
        },











        /**
         * FUNCTION TOGGLE CLASS ON PAGINATION
         *  + Check $pag exist, because Ruby start setup, setup properties before 'PAG.RenderSelf()'
         *  + Class on pagination and Ruby is similar
         */
        ToggleClass : function(isAdd) {
            VariableModule(this);


            /**
             * CONDITIONAL EXECUTION
             */
            if( $.isEmptyObject(oo) ) return;


            /**
             * SETUP CONTINUE
             */
            var opt         = isAdd ? o : oo,
                pag         = opt.pag,
                ns          = ' '+ va.ns,
                nsPag       = ns +'pag-',
                dirsCur     = '',
                classBasic  = '',
                classOnPag  = '',
                classOnRuby = '';


            /**
             * CLASS IN THE CASES
             */
            // Check add more class
            if( o.pag.moreClass != oo.pag.moreClass ) {
                classOnPag += ' '+ pag.moreClass;
            }

            // Check class 'type'
            if( o.pag.type != oo.pag.type ) {
                classOnPag  += ns + pag.type;
                classOnRuby += nsPag + pag.type;
            }

            // Check class 'position'
            if( o.pag.position != oo.pag.position ) {
                classBasic += nsPag +'pos-'+ pag.position;
            }


            // Check class 'direction'
            if( o.pag.direction != oo.pag.direction && pag.direction ) {
                classBasic += nsPag + pag.direction;
            }
            else if( !!va.addInfo ) {
                var pagDirs = va.addInfo.pagDirs;

                if( isAdd ) classBasic += nsPag + pagDirs;
                else        classBasic += nsPag + (pagDirs == 'hor' ? 'ver' : 'hor');
            }




            /**
             * TOGGLE CLASSES ON PAGINATION
             */
            classOnPag += ' '+ classBasic;
            !!va.$pag && va.$pag[ isAdd ? 'addClass' : 'removeClass' ](classOnPag);



            /**
             * TOGGLE CLASSES ON RUBY
             */
            classOnRuby += ' '+ classBasic;
            va.$ruby[isAdd ? 'addClass' : 'removeClass'](classOnRuby);
        },

        /**
         * TOGGLE 'FIRST' & 'LAST' CLASS FOR PAG-ITEMS
         */
        FirstLastClass : function() {
            var va = this.va,
                $pagItem   = va.$pagItem,
                classFirst = va.ns + 'first',
                classLast  = va.ns + 'last';

            if( !!$pagItem ) {
                $pagItem.removeClass(classFirst +' '+ classLast);
                $pagItem.first().addClass(classFirst);
                $pagItem.last().addClass(classLast);
            }
        },











        /**
         * EVENT 'TAP' ON PAGINATION
         */
        EventTap : function() {

            // Setup variable here to solve conflict in event 'on'
            var that = this;
            VariableModule(that);

            // Condition execution
            if( !va.$pag ) return false;



            /**
             * EVENT 'TAP' ON PAG-ITEM
             *  + Event 'click' : prevent move to new slide when start
             */
            // First, remove event 'tap' on pagItem
            var evName = va.ev.click +' '+ va.ev.swipe.end;
            va.$pagItem.off(evName);

            // Register event 'tap' on pagItem (if have)
            if( is.pag ) {

                /**
                 * REMOVE EVENT 'TAP' ON LINK TAG
                 */
                var $pagItem = $();
                va.$pagItem.each(function() {

                    var $item     = $(this),
                        isLinkTag = $item[0].tagName.toLowerCase() === 'a',
                        isHref    = $item.attr('href');

                    // Insert $pagItem if it not link <a> tag
                    if( !(isLinkTag && isHref) ) $pagItem = $pagItem.add($item);
                });




                /**
                 * REGISTER EVENT-END FOR PAG-ITEM
                 */
                $pagItem.on(evName, function(e) {
                    VariableModule(that);
                    var $item = $(this);

                    // Trigger event 'beforeTap'
                    cs.ev.trigger('beforeTap');


                    // Goto slide selected
                    if( o.pag.isEventTap && is.tapEnable ) {
                        va.moveBy = 'tap';
                        that.TOSLIDE.Run( M.Data($item)['id'] , true, false, true);

                        // Prevent 2 event 'tap' in same time
                        that.EVENTS.DelayToTapNext();
                    }

                    // Remove 'touchend' or 'moveup' -> only 1 event allow execute
                    // 'preventDefault' !== 'return false'
                    e.preventDefault();
                });
            }



            /**
             * EVENT 'TAP' ON PAG-ARROW
             */
            if( o.pag.isArrow ) {
                var $arrows = va.$pagArrowLeft.add(va.$pagArrowRight);
                $arrows.off(evName);

                // Register event on pagArrow
                if( o.pag.isTapOnArrow ) {
                    $arrows.on(evName, function(e) {
                        VariableModule(that);

                        if( is.tapEnable ) {
                            var dirs = $(this).is(va.$pagArrowLeft) ? 'left' : 'right';

                            // Change position of new pag when tap on Arrow
                            that.TranslatePagByTapArrow(dirs);

                            // Prevent 2 event 'tap' in same time
                            that.EVENTS.DelayToTapNext();
                        }

                        // Fixed error in IE must use 'preventDefault' -> not use 'return false'
                        e.preventDefault();
                    });
                }
            }
        },

        /**
         * TOGGLE EVENT SWIPE ON PAGINATION DEPEND ON SIZE TOTAL OF PAG-ITEM
         */
        ToggleEvent : function() {
            VariableModule(this);
            var isViewLarge = va.pag.isViewLarge;


            /**
             * REGISTER - REMOVE EVENT 'SWIPE'
             *  + if there are not option 'isAutoOnPag' == true -> not setup any more
             *  + Depending on 'isViewLarge' & 'is.swipePagCur'
             */
            if( is.SWIPE && !!o.swipe.isAutoOnPag && ((isViewLarge && !!is.swipePagCur) || (!isViewLarge && !is.swipePagCur)) ) {

                // Status current swipe on pagination
                var statusSwipeOnPag = isViewLarge ? 'offPag' : 'onPag';

                // Reset event swipe for pagination
                M.Module('SWIPE').Events(statusSwipeOnPag);
            }
        },










        /**
         * SIZE OF WIDTH-HEIGHT FOR PAG-ITEM
         */
        TypeSizeItem : function() {
            VariableModule(this);

            var op    = o.pag,
                p     = va.pag,
                wfit  = va.ns +'wfit',
                hfit  = va.ns +'hfit',
                isHor = (p.dirs == 'hor'),
                isSizeSelf = is.pagItemSizeSelf;


            /**
             * RESET WIDTH-HEIGHT FOR PAG-INNER
             *  + Get correct value width/height of pagItem
             *  + Toggle class 'wfit' & 'wfit' to get size
             */
            function ResetSizeOnInner() {

                va.$pagInner
                    .css({
                        'width'         : '',
                        'height'        : '',
                        'margin-right'  : '',
                        'margin-bottom' : ''
                    })
                    .removeClass(wfit +' '+ hfit);

                // Reset kich thuoc cua Pag Item
                va.$pagItem.each(function() { $(this).css({'width': '', 'height': ''}); });
            }


            /**
             * SETUP SIZE WIDTH/HEIGHT - MARGIN ON PAG-INNER
             *  + Total distance is calculated by 'margin-right' & 'margin-bottom'
             *  -> Not effect to size 100% & position of pagination
             *  -> Check vertical tabs outside -> remove width on pagInner
             */
            function SetupSizeOnInner() {
                var wInner = isHor  ? (op.typeSizeItem == 'max' ? p.wMax : p.wMin) : p.wMax,
                    hInner = !isHor ? (op.typeSizeItem == 'max' ? p.hMax : p.hMin) : p.hMax,
                    styles = {
                        'width'  : (is.pagOutside && !isHor) ? '' : wInner,
                        'height' : hInner
                    };

                // Add 'margin' to pagInner
                // Remove width/height on pagInner when pagItem at size before
                if( isHor ) {
                    styles['margin-bottom'] = p.maBottom;
                    if( isSizeSelf ) styles.width = '1px';
                }
                else {
                    styles['margin-right'] = p.maRight;
                    if( isSizeSelf ) styles.height = '1px';
                }

                // Setup style on pagInner
                va.$pagInner.css(styles);



                /**
                 * SETUP WIDTH/HEIGHT 'FIT' FOR PAG-ITEM
                 *  + If item is size 'self' depends on 'p.dirs' is 'wfit' or 'hfit'
                 *  + If item is not size 'self', must have 'wfit'-'hfit'
                 */
                if( !is.pagList ) {
                    var classes = wfit +' '+ hfit;

                    if( isSizeSelf ) {
                        classes = isHor ? hfit : wfit;
                    }

                    // Setup class 'wfit'-'hfit' on pagInner
                    va.$pagInner.addClass(classes);
                }
            }


            /**
             * GET PADDING & BORDER OF VIEWPORT
             *  -> support pag-tabs with 'sizeAuto-full' option
             */
            function GetSpaceOuterOfViewport() {
                var pad     = 'padding-',
                    border  = 'border-';

                function Space(aProp) {
                    var sizeView = 0, sizePag  = 0;

                    for( i = aProp.length - 1; i >= 0; i-- ) {
                        sizeView += M.PInt(va.$viewport.css(aProp[i]));
                        sizePag  += M.PInt(va.$pag.css(aProp[i]));
                    }
                    return sizeView - sizePag;
                }


                va.viewSpace = {
                    'hor': Space([pad +'left', pad +'right', border +'left-width', border +'right-width']),
                    'ver': Space([pad +'top', pad +'bottom', border +'top-width', border +'bottom-width'])
                };
            }



            /**
             * SETUP START
             */
            ResetSizeOnInner();
            that.GetSizeOfItems();

            SetupSizeOnInner();
            GetSpaceOuterOfViewport();
        },

        /**
         * GET WIDTH - HEIGHT OF EACH ITEMS
         */
        GetSizeOfItems : function() {
            VariableModule(this);
            var opag = o.pag,
                p  = va.pag;


            /**
             * GET VALUE PADDING - BORSER - MARGIN OF PAG-ITEM
             */
            function GetPaBoMaOfItems() {
                var cssName   = ['padding', 'border', 'margin'],
                    cssDirs   = ['Top', 'Right', 'Bottom', 'Left'],
                    cssSuffix = ['', 'Width', ''],
                    lenName   = cssName.length,
                    lenDirs   = cssDirs.length;

                // First: reset value of CSS name
                for( i = 0; i < lenName; i++ ) {
                    p[ cssName[i] ] = [[], [], [], []];
                }

                // Loop each $pagItem
                va.$pagItem.each(function(index) {

                    // Get style-computed of item
                    var style = document.defaultView ? getComputedStyle(this) : this.currentStyle;


                    /**
                     * LOOP TO GET VALUE OF CSS NAME
                     *  + Loop 1: CSS name
                     *  + Loop 2: CSS diretion
                     *  + Value is arranged in order: Padding.Top.IDPagItem
                     */
                    for( i = 0; i < lenName; i++ ) {
                        for( j = 0; j < lenDirs; j++ ) {
                            p[ cssName[i] ][j][index] = M.PInt( style[cssName[i] + cssDirs[j] + cssSuffix[i]] );
                        }
                    }
                });
            }

            /**
             * GET WIDTH - HEIGHT OF PAG-ITEM
             */
            function GetSizeOfItems(ns) {
                var ns2   = (ns == 'w') ? 'width' : 'height',
                    ns3   = (ns == 'w') ? 'Width' : 'Height',
                    names = [ns +'Self', ns +'ToPadding', ns + 'ToBorder', ns +'ToMargin'];


                // Reset property at first
                for( i = 0; i < names.length; i++ ) {
                    p[names[i]] = [];
                }


                // Setup each item
                va.$pagItem.each(function() {
                    var $itemCur   = $(this),
                        dSelf      = M.R( M[ns3]($itemCur) ),

                        // Distance around of item: padding, border, margin
                        dPadding   = M.R( M['Inner' + ns3]($itemCur) - dSelf ),
                        dPadToBor  = M.R( M['Outer' + ns3]($itemCur) - dSelf ),
                        dPadToMar  = M.R( M['Outer' + ns3]($itemCur, true) - dSelf );


                    // Setup size of pagItem when have option: width, height, minWidth, maxWidth...
                    var optsMin = opag['min'+ ns3],
                        optsMax = opag['max'+ ns3];

                    if( $.isNumeric(opag[ns2]) ) dSelf = opag[ns2];
                    if( $.isNumeric(optsMin) && dSelf < optsMin ) dSelf = optsMin;
                    if( $.isNumeric(optsMax) && dSelf > optsMax ) dSelf = optsMax;

                    // Push all size into array[]
                    // Part size is sum -> because size 'self' can change
                    p[names[0]].push(dSelf);
                    p[names[1]].push(dSelf + dPadding);
                    p[names[2]].push(dSelf + dPadToBor);
                    p[names[3]].push(dSelf + dPadToMar);
                });



                /**
                 * SETUP OTHER SIZE
                 *  + Size Min - Max of pagItem
                 *  + Total size of all pagItems
                 */
                p[ns +'Min'] = Math.min.apply(null, p[names[0]]);
                p[ns +'Max'] = Math.max.apply(null, p[names[0]]);
                p[ns +'Sum'] = M.Sum(p[names[3]]);
            }

            /**
             * GET MAXIMUM VALUE IN ARRAY[]
             */
            function MaxOfTwoArray(arr1, arr2) {
                var maxValue = 0;
                for( i = 0; i < cs.num; i++ ) {

                    var valueCur = arr1[i] - arr2[i];
                    if( valueCur > maxValue ) maxValue = valueCur;
                }
                return maxValue;
            }



            // Setup start
            GetPaBoMaOfItems();
            GetSizeOfItems('w');
            GetSizeOfItems('h');

            // Size of all pagItems depend on Direction
            p.sSum = (p.dirs == 'hor') ? p.wSum : p.hSum;

            // Valur largest of Margin for pagInner
            p.maRight  = MaxOfTwoArray(p.wToMargin, p.wSelf);
            p.maBottom = MaxOfTwoArray(p.hToMargin, p.hSelf);
        },

        // Get value properties of pagination relate to size
        PropAndStyle : function() {
            VariableModule(this);
            var that  = this,
                $pag  = va.$pag,
                num   = cs.num,
                p     = va.pag,
                isHor = p.dirs == 'hor';


            /**
             * SIZE OF PAGINATION CHANGE DEPEND ON SWIPE-CUR DIRECTION
             * Change by option 'sizeAuto' : null , 'full', 'self'
             *  + Convert 'sizeAuto' when pagination has markup outside
             *  + null: not setup
             *  + 'full': width / height pag = width / height ruby
             *  + 'self': width / height pag = sum total width / height all pagItem
             */
            var sizeAuto = (is.pagOutside && !isHor) ? 'self' : o.pag.sizeAuto,
                style    = { 'width': '', 'height': '' },
                sViewport;

            if( sizeAuto === null ) {
                sViewport = isHor ? M.Width($pag) : M.Height($pag);
            }
            else if( sizeAuto == 'full' ) {
                if( isHor ) sViewport = style.width  = va.wRuby + va.viewSpace.hor;
                else        sViewport = style.height = va.hRuby + va.viewSpace.ver;
            }
            else if( sizeAuto == 'self' ) {
                if( isHor ) sViewport = style.width  = p.wSum;
                else        sViewport = style.height = p.hSum;
            }

            // Setup size auto on pagination
            p.sViewport = sViewport;
            va.$pag.css(style);

            // Size of pag -> place below must to update style first
            p.wViewport = M.Width($pag);
            p.hViewport = M.Height($pag);
            p.sTranslate = 0;




            /**
             * SETUP ALIGN JUSTIFY
             *  + Justify: option 'sizeAuto' is null || 'full' -> for markup inside & 'hor' direction
             *  + Ver 1.5 - 05/10/2016: support Justify on markup outside
             */
            if( is.alignJustify && sizeAuto !== 'self' ) {

                // Case: horizontal direction
                if( isHor ) {

                    // Get maximum size of item
                    var wMaxItem  = Math.max.apply(null, p.wToMargin),
                        wSumItems = wMaxItem * num;

                    // Size of item depend on size-total sum all items with size-viewport
                    var wJustify = wMaxItem;
                    if( p.wViewport >= wSumItems || o.pag.isJustifyWhenLarge ) wJustify = ~~(p.wViewport / num);

                    // Update size of pagInner
                    var wItem = wJustify - p.maRight;
                    va.$pagInner.css({ 'width': wItem, 'height': p.hSelf[0] });
                }
            }




            /**
             * SETUP THE OTHER VARIABLE OF PAGINATION
             *  + Distance remain of 'va.wRuby' with size-total pagItem -> for multiple use
             *  + Check allow pagItem have center position -> width Viewport must > width-total pagItems sum
             */
            // First update property of pagItem
            that.GetSizeOfItems();

            // Setup next variables
            var wRemain     = p.sViewport - p.sSum,
                isViewLarge = p.isViewLarge = wRemain >= 0;



            /**
             * SETUP PULL - ALIGN OF PAG
             *  + Pull will default return is 'begin' -> if width of pagination > Viewport
             */
            p.align = o.pag.align;

            // Convert 'align' in the case
            // Ver 1.4 - 21/09/2016 : convert align 'justify' to align 'center' when 'isViewLarge' === true
            if( isViewLarge && p.align == 'justify' ) p.align = 'center';
            if( !isViewLarge && p.align != 'begin' )  p.align = 'begin';


            // Setup continue in difference position
            if( p.align == 'begin' ) {
                p.xMin = p.xCanvas = 0;
                p.xMax = isViewLarge ? 0 : wRemain;
            }
            else if( p.align == 'end' ) {
                p.xMin = p.xCanvas = wRemain;
                p.xMax = p.sViewport;
            }
            else if( p.align == 'center' ) {
                p.xMin = p.xCanvas = M.R(wRemain / 2);
                p.xMax = p.xMin + p.sSum;
            }



            /**
             * TOGGLE EVENT 'SWIPE' OF PAGINATION DEPENDING OF SIZE OF PAG-ITEM
             */
            that.ToggleEvent();
        },

        /**
         * POSITION OF EACH ITEM IN 'SIZE.TRANSLATES()'
         */
        PosAndSizeOfItems : function() {
            VariableModule(this);
            var p     = va.pag,
                isHor = p.dirs == 'hor';


            /**
             * FIRST UPDATE WIDTH - HEIGHT OF PAG-ITEM
             */
            that.GetSizeOfItems();



            /**
             * SETUP POSITION OF EACH ITEM DEPENDING TABS DIRECTION
             */
            var nameSize = isHor ? 'wToMargin' : 'hToMargin';
            p.pBegin = [0];

            for( i = 1; i < that.cs.num; i++ ) {
                p.pBegin[i] = p.pBegin[i-1] + p[nameSize][i-1];
            }




            /**
             * LOOP TO MOVE TO EACH ITEM BY POSITION BEFORE
             */
            var tl = (isHor ? 'Tlx' : 'Tly'), tf = {};

            // Remove position 'left' - 'top' when swap between 'horizontal' and 'vertical'
            if( !is.tf ) {
                if( isHor ) tf['top']  = '';
                else        tf['left'] = '';
            }

            // Setup continue
            for( i = 0; i < that.cs.num; i++ ) {

                // Setup position
                tf[p.cssTf] = M[tl](p.pBegin[i]);

                // Setup size
                if( is.pagItemSizeSelf ) {
                    if( isHor ) tf['width']  = p.wSelf[i];
                    else        tf['height'] = p.hSelf[i];
                }
                va.$pagItem.eq(i).css(tf);
            }
        },










        /**
         * POSITION & SIZE FOR THUMBNAIL-ITEM
         */
        PosCenterForThumbItem : function($slCur) {
            VariableModule(this);


            /**
             * CONDITIONAL EXECUTION
             *  + Check thumbnail-wrap exist
             *  + Check thumbnail-item exist
             *  + check thumbnail-item has loaded
             */
            var slData     = M.Data($slCur),
                $thumbWrap = slData.$thumbWrap,
                $thumbItem = slData.$thumbItem,
                iData      = M.Data($thumbItem);

            if( !($thumbWrap && $thumbItem && iData.isLoaded) ) return;




            /**
             * SETUP RATIO WIDTH / HEIGHT OF THUMBNAIL-IMAGE
             */
            var ns       = va.ns,
                wPagOpts = o.pag.width,
                hPagOpts = o.pag.height,
                wThumb   = $.isNumeric(wPagOpts) ? wPagOpts : M.Width($thumbWrap),
                hThumb   = $.isNumeric(hPagOpts) ? hPagOpts : M.Height($thumbWrap),
                rThumb   = wThumb / hThumb,
                rImgItem = iData.rate;

            if( rImgItem === undefined && iData.isImgback ) {
                rImgItem = iData.rate = M.Data(iData.$imgback)['rate'];
            }




            /**
             * SETUP STYLE CENTER POSITION DEPENDING ON SIZE THUMBNAIL-ITEM
             */
            var classAdd = '',
                style    = { 'width': '', 'height': '', 'left': '', 'top': '' };

            if( wThumb && hThumb ) {
                if( rImgItem > rThumb ) {
                    classAdd   = ns +'hfit';
                    style.left = - M.R((rImgItem * hThumb - wThumb) / 2);
                }
                else {
                    classAdd  = ns +'wfit';
                    style.top = - M.R((wThumb / rImgItem - hThumb) / 2);
                }
            }




            /**
             *SETUP STYLE TO IMAGE-ITEM
             */
            $thumbItem.css(style);

            // Toggle class 'fit' for Thumbnail
            var classRemove = '{ns}hfit{ns}wfit'
                                .replace(/\{ns\}/g, ns)
                                .replace(classAdd, '');

            $thumbWrap
                .addClass(classAdd)
                .removeClass(classRemove);
        },

        /**
         * UPDATE CENTER POSITION FOR ALL THUMBNAIL
         */
        UpdateThumbnail : function() {
            var that = this;
            VariableModule(that);

            /**
             * CONDITIONAL EXECUTION
             */
            if( !(is.pagThumb && is.initEnd) ) return;



            /**
             * UPDATE SIZE THUMBNAIL-ITEM FOR EACH SLIDE
             */
            va.$s.each(function() {
                that.PosCenterForThumbItem( $(this) );
            });
        },

        /**
         * SETUP CENTER POSITION FOR CURRENT PAG-ITEM
         */
        PosCenterForItemCur : function(isForceTf, isNoAnim) {
            var that = this, p = that.va.pag;
            VariableModule(that);


            /**
             * MAIN FUNCTION
             * Search position of pagInner
             *  + Position: distance ahead ItemCur -> ((distance from ItemCur to Viewport) / 2)
             */
            function Translate() {
                VariableModule(that);

                // Case larger: size-viewport > size-pagItems
                // If move by 'POSITION.AnimateX()', must check 'arrowActived()'
                if( p.isViewLarge ) {
                    if( p.dirs == 'ver' ) isNoAnim = false;
                    that.TranslateTo(p.xCanvas, isForceTf, isNoAnim);
                }

                // Case smaller: size-viewport < size-pagItems
                else {

                    // Position need to
                    var disOuter  = (p.dirs == 'hor') ? p.wToMargin : p.hToMargin,
                        disBefore = M.Sum(disOuter, cs.idCur),
                        xTarget   = - M.R(disBefore - ((p.sViewport - disOuter[cs.idCur])/2));


                    // Case the edge of Viewport: move to the edge
                    if     ( xTarget > 0 )      xTarget = 0;
                    else if( xTarget < p.xMax ) xTarget = p.xMax;

                    // Setup translate for pagination
                    that.TranslateTo(xTarget);
                }
            }


            /**
             * SETUP TIMER FOR TRANSLATE
             *  + Vertical tabs wait after animate-height then comes translate pagination
             */
            if( p.dirs == 'hor' ) {
                Translate();
            }
            else {
                var timer = 10 + o.speedHeight;
                clearTimeout(ti.centerItemCur);
                ti.centerItemCur = setTimeout(Translate, timer);
            }
        },

        /**
         * TRANSLATE PAG TO FIXED POSITION !!
         *  + Difference position 'xCanvas' -> saving CPU
         *  + Support 'pagItem0' at center position when resize smaller -> still recovery position of 'pagItem0'
         *  + Setup manual, not use 'xAnimate()' -> Canvas & pagination transition together
         *  + Support remove transition inline on object
         *  + Support fallback browser have no transition
         */
        TranslateTo : function(xTarget, isForceTf, isNoAnim) {
            VariableModule(this);
            var that = this, p = va.pag;

            // Conditional execution
            if( !(xTarget != p.xCanvas || xTarget == 0 || !!isForceTf) ) return;


            /**
             * SETUP TRANSLATE ON PAG-INNER
             */
            // Setup transform support direction
            var tweenPagInner = M.GetTween(va.$pagInner),
                tf = (p.dirs === 'hor') ? { 'x': M.R(xTarget) }
                                        : { 'y': M.R(xTarget) };

            // Case: have animation
            if( !isNoAnim ) {

                // Setup Tween animation
                tweenPagInner
                    .animate(va.$pagInner, tf, {
                        isNew    : true,
                        duration : o.pag.speed,
                        easing   : o.pag.easing
                    });
            }

            // Case: without animation
            else tweenPagInner.css(va.$pagInner, tf);





            /**
             * OHTER SETUP
             *  + Update position 'xCanvas' of pagination
             *  + Check Arrow 'actived' : after update position 'xCanvas'
             *  + Update position of pagMark
             */
            p.xCanvas = xTarget;
            o.pag.isArrow && that.ArrowActived(xTarget);
            o.pag.isMark && that.SizePosOfMark();
        },










        /**
         * ADD MARGIN INTO VIEWPORT -> GET CORRECT WIDTH OF VIEWPORT
         */
        MarginOnViewport : function() {
            VariableModule(this);

            var margin = M.OuterWidth(va.$pag, true);

            va.pagVer == 'begin' && va.$viewport.css('margin-left', margin);
            va.pagVer == 'end'   && va.$viewport.css('margin-right', margin);
        },

        /**
         * TABS 'VERTICAL' CONVERT TO 'HORIZONTAL' - AND REVERSE
         */
        VerToHor : function() {
            VariableModule(this);
            var op   = o.pag,
                p    = va.pag,
                dirs = null;

            // Check any change 'direction' of tabs
            if( is.pagTabs && op.direction == 'ver' ) {

                // Check have convert to 'horizontal' direction
                var isMinToHor = M.MatchMedia(0, op.widthMinToHor, true);
                // Check continue if result == false
                if( !isMinToHor ) isMinToHor = M.MatchMedia(0, op.rangeMinToHor);

                // Setup continue
                if( p.dirs == 'ver' && isMinToHor ) {
                    dirs = p.dirs = 'hor';

                    // Clear 'height' on paginaton
                    // Prevent setup height on pag in 'AnimHeightForRuby()'
                    !!va.$pag && va.$pag.stop(true).css('height', '');
                }
                else if( p.dirs == 'hor' && !isMinToHor ) {
                    dirs = p.dirs = 'ver';
                }
            }


            // Update ruby if change direction
            // Remove width-inline first to get correct width when update
            if( !!dirs ) {
                va.$canvas.add(va.$pag).css('width', '');
                va.addInfo = { 'pagDirs': dirs };
                cs.update({}, false);
            }
        },

        /**
         * ARROW TOGGLE ACTIVED
         *  + Execute when have changed position of 'pag.xCanvas'
         */
        ArrowActived : function(xCanvasCur) {
            VariableModule(this);

            var xPlusToShow = 30,
                actived     = va.actived,
                $paLeft     = va.$pagArrowLeft,
                $paRight    = va.$pagArrowRight;


            // Case: width-wiewport < width-pagItems sum
            if( !va.pag.isViewLarge ) {

                // Arrow left
                var isClassOnLeft = xCanvasCur < va.pag.xMin - xPlusToShow;
                M.XClass($paLeft, isClassOnLeft, actived);

                // Arrow Right
                var isClassOnRight = xCanvasCur > va.pag.xMax + xPlusToShow;
                M.XClass($paRight, isClassOnRight, actived);
            }

            // Case: width viewport larger
            else $paLeft.add($paRight).removeClass(actived);
        },

        /**
         * TRANSLATE PAGINATION BY 'TAP' ON ARROW
         */
        TranslatePagByTapArrow : function(dirs) {
            VariableModule(this);
            var p = va.pag;

            // Conditional execute
            if( p.isViewLarge ) return;


            /**
             * SEARCH POSTION MUST GO TO ON PAGINATION
             */
            var isLeft = dirs == 'left',
                sign   = isLeft ? 1 : -1,
                xPlus  = 10,
                xWish  = p.xCanvas + ((p.sViewport - xPlus) * sign),
                xLimit = isLeft ? p.xMin : p.xMax;

            // Setup position need to place in allowable limit
            if( (isLeft && xWish > xLimit ) || (!isLeft && xWish < xLimit) ) {
                xWish = xLimit;
            }

            // Setup translate pagination
            that.TranslateTo(xWish);
        },

        /**
         * SIZE & POSITION OF PAG-MARK
         */
        SizePosOfMark : function() {
            VariableModule(this);
            var p = va.pag, xPlus = 0;

            // Conditional execute
            if( p.margin === undefined ) return;



            /**
             * FUNCTION : GET SIZE OF PAG-MARK
             */
            function GetSize() {
                var isHor    = p.dirs == 'hor',
                    ns       = isHor ? 'w' : 'h',
                    ns2      = isHor ? '3' : '0',
                    sizeTo   = o.pag.sizeMarkTo,
                    idCur    = cs.idCur,
                    styles   = { 'width': '', 'height': '' },

                    margin   = p.margin[ns2][idCur],
                    marToBor = margin   + p.border[ns2][idCur],
                    marToPad = marToBor + p.padding[ns2][idCur],
                    dItemCur;

                // Get size of pagMark depending on option 'sizeMarkTo'
                if( sizeTo == 'margin' ) {
                    dItemCur = p[ns +'ToMargin'][idCur];
                    xPlus    = 0;
                }
                else if( sizeTo == 'border' ) {
                    dItemCur = p[ns +'ToBorder'][idCur];
                    xPlus    = margin;
                }
                else if( sizeTo == 'padding' ) {
                    dItemCur = p[ns +'ToPadding'][idCur];
                    xPlus    = marToBor;
                }
                else {
                    dItemCur = p[ns +'Self'][idCur];
                    xPlus    = marToPad;
                }


                // Condition continue
                if( dItemCur == p.dMark ) return;

                // Setup size on pagMark
                styles[isHor ? 'width' : 'height'] = dItemCur;
                va.$pagMarkItem.css(styles);
                p.dMark = dItemCur;
            }



            /**
             * FUNCTION : TRANSLATE TO PAG-MARK
             */
            function Translate() {

                // Search position for movement of pagMark
                if( p.pBegin === undefined ) return;
                var xMove = p.xCanvas + p.pBegin[cs.idCur] + xPlus;
                if( xMove == p.xMark ) return;

                // Setup translate of pagMark
                // Store position of pagMark
                that.POSITION.TranslateX(va.$pagMarkItem, xMove, true, null, p.dirs == 'hor');
                p.xMark = xMove;
            }



            GetSize();
            Translate();
        },

        /**
         * MOVED TEMPORARILY ON PAG-MARK
         */
        XBufferOnMark : function(pageX) {
            VariableModule(this);


            // Change position of pagMark depending on swipe gestures
            var p     = va.pag,
                xMove = pageX + p.xMark;

            that.POSITION.TranslateX(va.$pagMarkItem, M.C(xMove), true, null, p.dirs == 'hor');
            p.xMark = xMove;
        }
    };
})(jQuery);










/**
 * MODULE CAPTION
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, va, is, M;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        va   = self.va;
        is   = self.is;
        M    = self.M;
    }


    /**
     * MODULE CAPTION
     */
    rt01MODULE.CAPTION = {

        /**
         * RENDER CAPTION ELEMENT
         */
        Render : function() {
            VariableModule(this);


            /**
             * CASE: CREATE NEW CAPTION MARKUP
             */
            if( o.isCap && !is.$cap ) {

                /**
                 * SEARCH CAPTION MARKUP AT OUTSIDE
                 */
                var divdiv   = '<div/>',
                    classes  = '.'+ va.ns + o.nameCap,
                    $capHTML = that.RENDER.SearchNode(classes);

                // setup markup for Caption
                is.capOutside = !!$capHTML.length;
                va.$cap       = is.capOutside ? $capHTML
                                              : $(divdiv, {'class' : va.ns + o.nameCap});



                /**
                 * CREATE OTHER ELEMENTS MARKUP OF CAPTION
                 */
                va.$capCur   = $(divdiv, { 'class': va.ns +'cap-cur' });
                va.$capLast  = $(divdiv, { 'class': va.ns +'cap-last' });
                va.$capInner = $(divdiv, { 'class': va.ns +'capinner' });
                va.$capInner.append(va.$capCur, va.$capLast).appendTo(va.$cap);

                // Append caption into ruby
                !is.capOutside && va.$ruby.append(va.$cap);

                // Variable to recognize $caption exist
                is.$cap = true;
            }



            /**
             * CASE: REMOVE CAPTION MARKUP
             */
            else if( !o.isCap && is.$cap ) {

                // Remove caption markup
                va.$cap[ is.capOutside ? 'empty' : 'remove' ]();

                // Update variable
                is.$cap = false;
            }
        },


        Toggle : function($slCur, $slLast) {
            VariableModule(this);

            // Initialize variables
            var capCur  = M.Data($slCur)['htmlCap'],
                capLast = $slLast.length ? M.Data($slLast)['htmlCap'] : '';

            // Change content between current & last caption
            va.$capCur.html(capCur);




            /**
             * SETUP EFFECT
             *  + Not support on mobile -> unnecessary
             *  + Effect between current & last caption is Fade
             *  + Support effect-height for caption
             */
            if( !is.mobile && !is.ie7 ) {

                // Content of last caption
                va.$capLast.html(capLast);

                // Get height of caption
                var hCur  = M.OuterHeight(va.$capCur, true),
                    hLast = M.OuterHeight(va.$capLast, true) || hCur;      // Fixed at first = 0



                /**
                 * SETUP AFTER END ANIMATION
                 */
                function AnimComplete() {

                    // Add timer to mark sure at end place
                    setTimeout(function() {
                        VariableModule(that);

                        va.$capLast.css('visibility', '');
                        va.$capInner.css('height', '');
                    }, 10);
                }




                /**
                 * SETUP EFFECT WHEN TOGGLE CAPTION
                 */
                va.tweenCaption
                    .css(va.$capCur, { 'opacity': 0 })
                    .animate(va.$capCur, { 'opacity': 1 }, {

                        isNew    : true,
                        duration : o.speedHeight,
                        complete : AnimComplete
                    })

                    .css(va.$capLast, { 'opacity': 1, 'visibility': 'visible' })
                    .animate(va.$capLast, { 'opacity': 0 }, {
                        duration : o.speedHeight
                    });

                (hLast !== hCur) &&
                va.tweenCaption
                    .css(va.$capInner, { 'height': hLast })
                    .animate(va.$capInner, { 'height': hCur }, {
                        duration : o.speedHeight
                    });
            }
        }
    };
})(jQuery);










/**
 * MODULE IMAGE
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M, PAG;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        ti   = self.ti;
        M    = self.M;
        PAG  = M.Module('PAG');
    }


    /**
     * MODULE IMAGE
     */
    rt01MODULE.IMAGE = {

        /**
         * SETUP ALL IMAGES AT SLIDE-BEGIN
         */
        SetupAtLoadSlideBegin : function($slCur, selectorImage) {
            VariableModule(this);
            var ns     = va.ns,
                slData = M.Data($slCur);


            /**
             * SEARCH IMAGE IN RUBY
             *  + Must have class 'img' or image-layer
             *  + Callback old-version: support 'imglazy'
             */
            selectorImage = selectorImage ||
                            '.{ns}{imgback}, .{ns}{imglazy}, img.{ns}{layer}'
                                .replace(/\{imgback\}/, o.nameImageBack)
                                .replace(/\{imglazy\}/, o.nameImageLazy)
                                .replace(/\{layer\}/, o.nameLayer)
                                .replace(/\{ns\}/g, ns);

            // Image managed in current slide
            var $images = M.Find($slCur, selectorImage);

            // Search image in $pagItem
            if( slData.$pagItem ) {
                var selectorImageInPagItem = '.{ns}thumbitem, .{ns}{imglazy}'
                                                .replace(/\{imglazy\}/, o.nameImageLazy)
                                                .replace(/\{ns\}/g, ns),

                    $imageInPagItem = M.Find(slData.$pagItem, selectorImageInPagItem);

                // Add image in pagItem into variable-manage image of ruby
                $images = $images.add($imageInPagItem);
            }

            // Additional data in current slide at first
            M.Data($slCur, {
                '$images'  : $(),
                'imageLen' : $images.length,
                'nImage'   : 0
            });





            /**
             * SETUP ALL IMAGES IN SLIDE
             */
            $images.each(function() {
                var $i = $(this);


                /**
                 * CONVERT '<A>' TO '<IMG> TAG
                 */
                if( !/^img/i.test(this.tagName) ) $i = that.ConvertToImage($i);


                /**
                 * CHECK IMAGE-LAZY & IMAGEBACK IN RUBY
                 *  + Only allow 1 Imageback in each slide
                 *  + Image will support 'lazyload' & 'responsive' options
                 */
                var isImgback   = $i.hasClass(ns + o.nameImageBack),
                    isThumbItem = $i.hasClass(ns + 'thumbitem'),
                    isImgOfRuby = isImgback || $i.hasClass(ns + o.nameImageLazy);


                /**
                 * INITIAL PROPERTIES STORE IN DATA-IMAGE
                 */
                var iData = M.Data($i, {
                    '$slide'       : $slCur,
                    'isImgOfRuby'  : isImgOfRuby,
                    'isImgback'    : isImgback,
                    'isThumbItem'  : isThumbItem,
                    'isSrcOutside' : false,
                    'isLoaded'     : false,
                    'src'          : [],
                    'styleInline'  : M.PStyleToJson($i),
                    'opts'         : isImgback ? $.extend({}, slData.opts.imageback, $i.data('imageback'))
                                               : $.extend({}, slData.opts.image, $i.data('image'))
                });




                /**
                 * COMBINE BASIC PROPERTY && IMAGE PROPERTY
                 */
                // Property 'responsive' : priority on Layer
                if( iData.layer && (iData.layer.opts.isResponsive !== undefined) ) {
                    iData.opts.isResponsive = iData.layer.opts.isResponsive;
                }





                /**
                 * PROPERTIES ONLY IN IMAGE-BACK
                 */
                if( isImgback  ) {

                    // Wrap imageItem by 'div.imgback'
                    that.Wrap($i);

                    // Store imageback into Data
                    M.Data($slCur, {
                        '$imgbackWrap' : $slCur.find('.' + ns + 'imgback-wrap'),
                        '$imgback'     : $i,
                        'isImgback'    : true
                    });

                    // Support option 'imagePosition' on option slide
                    iData.opts.position = slData.opts.imagePosition || iData.opts.position;
                }




                /**
                 * SETUP ARRAY[] SRC OF IMAGE IN ORDER PRIORITY
                 */
                var iDataSRC    = iData.src,
                    iAttrSRC    = $i.attr('src'),
                    isSRCInline = /^data\:image\//g.test(iAttrSRC),
                    attrLazy    = $i.attr('data-' + o.nameDataLazy);


                // Store 'src' on attribute of image
                // Remove string with begin 'data:image/' -> ruby automatic add, conflict with load correct source
                !isSRCInline && iDataSRC.push(iAttrSRC);

                // Store 'src' on data image lazy
                if( attrLazy !== undefined && !/^\s*$/.test(attrLazy) ) {
                    iDataSRC.push(attrLazy);
                }
                $i.removeAttr('data-' + o.nameDataLazy);





                /**
                 * PAUSE TO SETUP CONTINUE 'URL' OF IMAGE IN THE SPECIAL CASES
                 *  + Support get 'url' of Flickr photo
                 */
                // Case: have 'data-flickr'
                if( is.FLICKR && !!$i.data('flickr') ) {

                    // Get link of photo by Flickr-ID
                    M.Module('FLICKR').GetLinkByPhotoID($i);
                }

                // Case: default
                else {
                    that.EventLoad($i);
                }
            });
        },

        /**
         * CONVERT OBJECT HAVE OTHER TAGS TO 'IMG' TAG
         *  + Copy all data, alt, id of link <a>
         *  + Video: wrap by 'div'
         */
        ConvertToImage : function($a) {
            VariableModule(this);


            /**
             * CREATE NEW IAMGE WITH DEFAULT PROPERTIES
             */
            var attrs     = {},
                imgGif    = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                imgAlt    = o.isCap ? 'image link' : $a.text(),
                $imageNew = $('<img>', { 'src': imgGif, 'alt': imgAlt });

            // Copy all properties on link <a> into new image node
            $.each($a[0].attributes, function(key, attr) {
                var nameCur  = attr.name,
                    valueCur = attr.value;

                $imageNew.attr(nameCur, valueCur);
                attrs[nameCur] = valueCur;
            });




            /**
             * SETUP DATA-LAZY FOR NEW IMAGE
             */
            var nameDataLazy = 'data-NAME'.replace(/NAME/, o.nameDataLazy),
                imageSRC     = $a.attr(nameDataLazy) || attrs.href || '';

            // Insert data-lazy into new image
            $imageNew
                .attr(nameDataLazy, imageSRC)
                .removeAttr('href');




            /**
             * OTHER SETUP
             */
            // IE fixed: remove 'width' / 'height' attribute on node
            is.ie && $imageNew.removeAttr('width height');

            // Replace new image
            $a.after($imageNew).remove();
            return $imageNew;
        },

        /**
         * WRAP IMAGEBACK-ITEM BY 'DIV' TAG
         */
        Wrap : function($imgItem) {
            VariableModule(this);


            /**
             * CHECK & CREATE NEW WRAP IMAGE
             */
            var classWrap = va.ns + 'imgback-wrap',
                $imgWrap  = $imgItem.closest('.' + classWrap);

            // Case: Image-wrap not exist
            if( !$imgWrap.length ) {

                /**
                 * CREATE NEW $IMAGE-WRAP
                 */
                $imgWrap = $('<div/>', { 'class': classWrap });
                $imgItem.wrap($imgWrap);

                // Update variable Image-wrap
                $imgWrap = $imgItem.closest('.' + classWrap);
            }

            // Copy all data of item to wrap
            M.Data($imgWrap, M.Data($imgItem));
            M.Data($imgWrap, { '$imgItem': $imgItem });




            /**
             * COPY PROPERTIES VIDEO TO IMAGE-WRAP
             */
            var attrName = ['data-video', 'data-video-link'];
            for( var i = 0, len = attrName.length; i < len; i++ ) {

                // Get current property
                var attrCur = $imgItem.attr( attrName[i] );

                // If property 'data' exist on node then copy to Image-wrap
                // Remove 'data' on the Image-item in same time
                if( !!attrCur ) {
                    $imgWrap.attr(attrName[i], attrCur);
                    $imgItem.removeAttr(attrName[i]);
                }
            }
        },











        /**
         * EVENT LOAD EACH IMAGE
         */
        EventLoad : function($i) {
            VariableModule(this);
            var that   = this,
                iData  = M.Data($i),
                $slCur = iData.$slide,
                slData = M.Data($slCur);



            /**
             * FUNCTION: SETUP AFTER IMAGE LOADED
             */
            function SetupAfterAllLoaded() {

                /**
                 * CHECK IMAGE LOADED -> IF LOADED COMPLETE THEN EXECUTE 'SLIDE-END'
                 */
                slData.nImage = slData.nImage + 1;

                if( slData.nImage == slData.imageLen
                    && (!slData.isVideoback || (slData.isVideoback && slData.isVideobackLoaded)) ) {


                    setTimeout(function() {
                        VariableModule(that);

                        (slData['id'] == 'home') ? M.Module('LAYER').LoadHomeEnd()
                                                 : that.LOAD.SlideEnd($slCur);
                    }, 10);
                }
            }


            /**
             * FUNCTION: SETUP WHEN IMAGE LOAD FAIL
             */
            function LoadFail(src) {

                // Image: change alt
                $i
                    .addClass(va.ns + 'load-failed')
                    .attr('alt', 'image load failed');
                M.Message('image load failed', src);

                // Image: all image loaded
                SetupAfterAllLoaded();
            }




            /**
             * CHECK IMAGE 'SRC' BEFORE SETUP CONTINUE
             */
            if( !iData.src.length ) return LoadFail('image source not found');




            /**
             * CHECK 'SRC' IMAGE LOADED SUCCESS
             */
            var imageNew = new Image(),
                iDataSRC = iData.src,
                srcCur   = iDataSRC.pop();


            // Event image load success
            imageNew.onload = function() {
                VariableModule(that);

                // Image: set properties
                // Pass 'this' image-node -> get width - height fast & correct than jQuery selector
                that.Properties($i, this);

                // Image: all image loaded
                SetupAfterAllLoaded();
            };

            // Event: image load fail
            imageNew.onerror = function() {
                VariableModule(that);

                // If 'src' array[] have value -> load next 'src' remain in array[]
                if( iDataSRC.length ) that.EventLoad($i);

                // If 'src' array[] empty -> display message not loaded
                else LoadFail(srcCur);
            };

            // Image-src : get at below 'i.onload()' -> fixed bug for IE
            // Get 'src' in Data -> in order priority
            $i.attr('src', srcCur);
            imageNew.src = srcCur;
        },

        /**
         * SETUP PROPERTIES OF IMAGE AFTER LOADED COMPLETE
         */
        Properties : function($i, i) {
            VariableModule(this);

            /**
             * STORE SIZE OF IMAGE ON DATA
             */
            var iData  = M.Data($i),
                wImage = i.width,
                hImage = i.height;

            M.Data($i, {
                'isLoaded' : true,
                'width'    : wImage,
                'height'   : hImage,
                'rate'     : wImage / hImage
            });



            /**
             * UPDATE $IMAGE INTO DATA-SLIDE
             */
            var slData = M.Data(iData.$slide);
            slData.$images = slData.$images.add($i);

            // Store thumbnail-item into Data
            if( iData.isThumbItem ) slData.$thumbItem = $i;




            /**
             * SIZE RESPONSIVE FOR IMAGE
             */
            iData.isImgOfRuby && that.SizeResponsive($i);




            /**
             * IMAGEBACK & THUMBNAIL-ITEM
             */
            if( iData.isImgback || iData.isThumbItem ) {

                // Remove event 'drag'
                $i.on(va.ev.drag, function(e) { return false });

                // Update size & style for thumbnail-item
                PAG.PosCenterForThumbItem(iData.$slide);
            }
        },











        /**
         * UPDATE SIZE FOR IMAGE-ITEM
         *  + Setup size first to get height of each slide
         *  + Allways put css size on Image-item -> get correct size in IE
         */
        SizeResponsive : function($imgItem) {
            VariableModule(this);
            var iData = M.Data($imgItem);

            // Conditional execution
            if( !(
                $imgItem
                && $imgItem.length
                && iData.opts.isResponsive
                && iData.type !== 'videoPoster'
            )) return;


            // Initialize variables
            var iData   = M.Data($imgItem),
                wInline = iData.styleInline.width,
                hInline = iData.styleInline.height,
                rate    = va.rate,

                // Reset style css for Image-item
                style = { 'width': '', 'height': '', 'left': '', 'top': '' },
                // Identify type position of Imageback
                typePosition = iData.opts.position;




            /**
             * FUNCTION: SIZE IMAGE DEPENDS ON DIFFERENT DIRECTION
             */
            function SizeDependRate() {
                if     ( wInline == 'auto' )    style.width = wInline;
                else if( $.isNumeric(wInline) ) style.width = M.R(wInline * rate);
                else                            style.width = M.R(iData.width * rate);

                if     ( hInline == 'auto' )    style.height = hInline;
                else if( $.isNumeric(hInline) ) style.height = M.R(hInline * rate);
                else                            style.height = M.R(iData.height * rate);

                $imgItem.css(style);
            }

            function SizeDependWidth() {
                style.width  = va.wSlide;
                style.height = M.R( style.width / iData.rate);
                $imgItem.css(style);
            }

            function SizeReset() {
                if( wInline !== undefined ) style.width = wInline;
                if( hInline !== undefined ) style.height = hInline;
                $imgItem.css(style);
            }




            /**
             * SIZE IMAGES IN RUBY
             */
            // Case: Imageback
            if( iData.isImgback ) {

                // Size by ratio responsive, include type: 'center', 'tile'
                if( typePosition == 'center' || typePosition == 'tile' ) {
                    SizeDependRate();
                }

                // Size by width-viewport, include type: 'fill', 'fit', 'stretch'
                else {
                    if( !is.heightFixed ) SizeDependWidth();
                }
            }

            // Case: normal image
            else {
                // Case without 'responsive' : remove width / height css
                // Case have 'responsive' : change size depending on 'rate'
                if( va.rate == 1 ) SizeReset();
                else               SizeDependRate();
            }
        },

        /**
         * SIZE & POSITION OF IMAGEBACK
         */
        BackPosition : function($imgItem) {
            VariableModule(this);

            // Conditional execution
            var iData = M.Data($imgItem);
            if( !(iData.isImgback && iData.type !== 'videoPoster') ) return;

            // Initialize variables
            var typePosition = iData.opts.position,
                wImage       = iData.width,
                hImage       = iData.height,
                rateImage    = iData.rate,
                rateCanvas   = va.wRuby / va.hRuby,
                wImageCur,
                hImageCur;






            /**
             * FUNCTION: RESIZE POSITION OF IAMGEBACK DEPENDING IN EACH CASES
             */
            // Size depend on width-viewport
            function SizeDependWidth() {
                wImageCur = va.wSlide;
                hImageCur = M.R( wImageCur / rateImage);
            }

            // Size depend on height-ruby
            function SizeDependHeight() {
                hImageCur = va.hRuby;
                wImageCur = M.R(hImageCur * rateImage);
            }

            // Position center-left for Imageback
            function PosCenterLeft() {
                var leftOnNode = M.PInt( $imgItem.css('left') ),
                    leftCur   = ~~( (va.wSlide - M.OuterWidth($imgItem, true)) / 2 );

                // Setup css 'left'
                if( leftOnNode !== leftCur ) $imgItem.css('left', leftCur);
            }

            // Position center-top for Imageback
            function PosCenterTop() {
                var top = M.R( (va.hRuby - M.OuterHeight($imgItem, true)) / 2 );
                if( top == 0 ) top = '';

                $imgItem.css('top', top);
            }










            /**
             * CASE: POSITION TYPE 'FILL'
             * Do not depend on ratio 'responsive'
             */
            if( typePosition == 'fill' ) {

                // Case: height fixed
                if( is.heightFixed ) {
                    (rateImage > rateCanvas) ? SizeDependHeight() : SizeDependWidth();

                    // Size for Image-item
                    $imgItem.css({ 'width' : wImageCur, 'height' : hImageCur });

                    // Position center left - top for Imageback
                    PosCenterLeft();
                    PosCenterTop();
                }
            }


            /**
             * CASE: POSITION TYPE 'FIT'
             * Do not depend on ratio 'rasponsive'
             */
            else if( typePosition == 'fit' ) {

                // Case: height fixed
                if( is.heightFixed ) {
                    (rateImage > rateCanvas) ? SizeDependWidth() : SizeDependHeight();

                    // Size for Image-item
                    $imgItem.css({ 'width' : wImageCur, 'height' : hImageCur });

                    // Position center left - top for Imageback
                    PosCenterLeft();
                    PosCenterTop();
                }
            }


            /**
             * CASE: POSITION TYPE 'STRETCH'
             * Do not depend on ratio 'responsive'
             */
            else if( typePosition == 'stretch' ) {

                // Case: height fixed
                if( is.heightFixed ) {
                    wImageCur = va.wSlide;
                    hImageCur = va.hRuby;

                    // Size for Image-item
                    $imgItem.css({ 'width' : wImageCur, 'height' : hImageCur });
                }
            }


            /**
             * CASE: POSITION TYPE 'TILE'
             */
            else if( typePosition == 'tile' ) {
                var aPosition    = [],
                    wImageAll    = 0,
                    hImageAll    = 0,
                    leftCur      = 0,
                    topCur       = 0,
                    isWidthFill  = false,
                    isHeightFill = false;

                // Get current size of Image-item
                wImageCur = M.OuterWidth($imgItem, true);
                hImageCur = M.OuterHeight($imgItem, true);


                /**
                 * LOOP TO CALCULATE POSITION OF EACH IMAGE-CLONE
                 * Loop 1: loop height size
                 * @param array aPosition
                 */
                do {
                    /**
                     * UPDATE VALUES FISRT
                     */
                    leftCur     = 0;
                    topCur      = hImageAll;
                    wImageAll   = 0
                    isWidthFill = false;


                    /**
                     * LOOP 2: LOOP WIDTH-DIRECTION
                     */
                    do {
                        // First store position left - top
                        aPosition.push([leftCur, topCur]);

                        // Update values
                        leftCur   += wImageCur;
                        wImageAll += wImageCur;

                        // Check to continue loop-2
                        if( wImageAll >= va.wSlide ) isWidthFill = true;

                    } while( !isWidthFill );


                    /**
                     * UPDATE VALUES AFTER CALCULATE POSITION IMAGE-CLONE BY WIDTH-DIRECTION
                     */
                    hImageAll += hImageCur;

                    /**
                     * CHECK CONTINUE LOOP-1
                     */
                    // Height-fixed is fill full height of ruby
                    if( is.heightFixed ) {
                        if( hImageAll >= va.hRuby ) isHeightFill = true;
                    }
                    // Height-auto is executed only once
                    else isHeightFill = true;

                } while( !isHeightFill );



                /**
                 * INSERT IMAGE-CLONE INTO IMAGEBACK WITH POSITION AVAILABLE
                 */
                // Remove Image-clone before
                var $imgItemClone = iData.$itemClone,
                    $imgWrap      = $imgItem.parent('.'+ va.ns + 'imgback-wrap');
                if( !!$imgItemClone ) $imgItemClone.remove();

                // Reset data Item Clone
                iData.$itemClone = $();

                // Loop to insert Image-clone
                for( var i = 1, posLength = aPosition.length; i < posLength; i++ ) {
                    var $imgCloneCur = $imgItem.clone();

                    // Insert below Image-item
                    $imgCloneCur
                        .addClass(va.ns + 'imgclone')
                        .css({ 'left': aPosition[i][0], 'top': aPosition[i][1] })
                        .appendTo($imgWrap);

                    // Store Image-clone into Data
                    iData.$itemClone = iData.$itemClone.add($imgCloneCur);
                }
            }


            /**
             * CASE: POSITION TYPE 'CENTER'
             */
            else {

                // Position center left - top for Imageback
                PosCenterLeft();
                is.heightFixed && PosCenterTop();
            }
        },

        /**
         * UPDATE SIZE || POSITION OF IMAGES
         */
        UpdateAllImageBy : function(typeUpdate) {
            var that = this;
            VariableModule(that);


            /**
             * RECOGNIZE NAME IMAGE IN DATA-SLIDE & NAME FUNCTION NEED TO UPDATE
             */
            var nameImage, nameFunction;
            switch( typeUpdate ) {

                // Update size of all images in ruby
                case 'size' :
                    nameImage    = '$images';
                    nameFunction = 'SizeResponsive';
                    break;

                // Update position for Imageback
                case 'position' :
                    nameImage    = '$imgback';
                    nameFunction = 'BackPosition';
                    break;

                default :
                    return;
            }




            /**
             * SIZE & POSITION OF IMAGES
             */
            va.$s
                .add(va.$viewport)
                .each(function() {

                    // Get images need setup in current slide
                    var $images = M.Data($(this))[nameImage];

                    // Update size || position of image
                    $images && $images.each(function() {
                        that[nameFunction]($(this));
                    });
                });
        }
    };
})(jQuery);










/**
 * MODULE VIDEO IFRAME
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M, SLIDESHOW;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        ti   = self.ti;
        M    = self.M;
        SLIDESHOW = M.Module('SLIDESHOW');
    }


    /**
     * MODULE VIDEO IFRAME
     */
    rt01MODULE.VIDEOIFRAME = {

        /**
         * CONVERT TAG IN THE RENDER PART
         */
        ConvertTag : function($slCur) {
            VariableModule(this);


            /**
             * SEARCH VIDEO-LINK IN CURRENT SLIDE
             */
            var selectorVideo = '[data-video-link]',
                $videos       = $slCur.find(selectorVideo);

            // Remove Videos in ruby-nesed
            var $nested = $slCur.find(va.ns),
                $videoInNested = $nested.find(selectorVideo);
            $videos = $videos.not($videoInNested);

            // Pause when without Videos
            if( !$videos.length ) return false;



            /**
             * FUNCTION: CONVERT LINK <A> TO <DIV>
             */
            // Part 1: create new <div>
            // Part 2: copy all attributes on link <a> to <div> node
            // Part 3: Create new Image-preview of Video if 'href' attrs exist
            function LinkToDiv($link) {

                /**
                 * CREATE IMAGE-WRAP WITH COPY ATTRIBUTES FROM LINK <A>
                 */
                var $videoWrap = $('<div/>', { 'class': va.ns +'video' });

                // Copy all attributes on link <a> to <div> node
                var attrs = {};
                $.each($link[0].attributes, function(key, attr) {

                    var nameCur  = attr.name,
                        valueCur = attr.value;

                    $videoWrap.attr(nameCur, valueCur);
                    attrs[nameCur] = valueCur;
                });



                /**
                 * CREATE IMAGE-PREVIEW OF VIDEO IF 'HREF' ATTRS EXIST
                 */
                if( attrs.href && !/^\s*$/g.test(attrs.href) ) {
                    var $imagePreview = $('<img/>', { 'src': attrs.href, 'alt': $link.text() });

                    // Insert class 'video preview' to Image-preview
                    $imagePreview.addClass(va.ns +'video-preview');
                    // Insert Image-preview into Video-wrap
                    $videoWrap.append($imagePreview).removeAttr('href');

                    // Move class 'image lazy' from Video-wrap to Image-preview
                    var classLazy = va.ns + o.nameImageLazy;
                    if( $videoWrap.hasClass(classLazy) ) {
                        $videoWrap.removeClass(classLazy);
                        $imagePreview.addClass(classLazy);
                    }
                }


                /**
                 * REPLACE LINK <A> NODE BY VIDEO-WRAP
                 */
                $link.after($videoWrap).remove();
                return $videoWrap;
            }




            /**
             * SETUP VIDEOS
             */
            // If link <a> then convert to <div> tag
            // Not convert on Imageback
            $videos.each(function() {

                var $videoCur = $(this),
                    videoTag  = $videoCur[0].tagName.toLowerCase(),
                    isImgback = $videoCur.hasClass(va.ns + o.nameImageBack);


                // Check convert
                if( videoTag == 'a' && !isImgback ) {
                    LinkToDiv($videoCur);
                }
            });
        },

        /**
         * INITIALIZE VIDEO WHEN START LOAD CURRENT SLIDE
         */
        Init : function($slCur) {
            VariableModule(this);

            var slData     = M.Data($slCur),
                $videoLink = $slCur.find('[data-video-link]'),
                $videoAll  = $(),
                isVideo    = false;


            /**
             * SETUP VIDEO-LINK
             *  + Only execute with $slide (not $viewport)
             */
            $videoLink.each(function() {

                var $videoCur = $(this),
                    strLink   = $videoCur.data('video-link'),

                    // Get ID & type of current video
                    videoData = that.GetID(strLink);



                /**
                 * VIDEO-LINK HAVE SUPPORTED: 'YOUTUBE', 'VIMEO'
                 */
                if( videoData.type ) {

                    /**
                     * DEFAULT OPTION AT FIRST
                     */
                    var optsDefault = {
                        $video    : $videoCur,
                        $slide    : $slCur,
                        isImgback : $videoCur.hasClass(va.ns + o.nameImageBack),
                        isShow    : false
                    };




                    /**
                     * IMAGE-PREVIEW OF VIDEO
                     */
                    var $imgPreview  = $videoCur.find('img'),
                        isImgPreview = false;

                    if( $imgPreview.length ) {
                        videoData.$imgPreview  = $imgPreview;
                        videoData.isImgPreview = isImgPreview = true;
                    }



                    /**
                     * POSITION OF VIDEO
                     */
                    var $imgbackWrap = slData.$imgbackWrap,
                        videoPosition;

                    if ( !!$imgbackWrap && $imgbackWrap.is($videoCur) ) videoPosition = 'imgback';
                    else if( !!M.Data($videoCur)['layer'] )             videoPosition = 'layer';
                    else                                                videoPosition = 'free';

                    // Store on Video-data
                    videoData.position = videoPosition;




                    /**
                     * MERGE DEFAULT OPTIONS & VIDEO-DATA
                     */
                    var msgError    = 'options on "data-video" not valid',
                        optsOnVideo = M.StringToJson( M.Data($videoCur)['video'], msgError );

                    videoData = $.extend(true, {}, optsDefault, o.video, videoData, optsOnVideo);

                    // Add class 'type' into current Video
                    // Remove unnecessary attributes on current Video node
                    $videoCur
                        .addClass( va.ns +'video '+ va.ns + videoData.type )
                        .addClass( isImgPreview ? '' : va.ns + 'no-preview' )
                        .removeAttr('data-video-link')
                        .removeAttr('data-video');

                    // Store 'video' property in Data
                    // Need to have $return : continue store next property
                    videoData = M.Data($videoCur, { 'video': videoData })['video'];




                    /**
                     * THE NECESSARY ELEMENTS IN VIDEO
                     */
                    // $iframe of Video
                    that.SetupIframe(videoData);

                    // Insert necessary button into Video
                    // Events for button
                    if( isImgPreview ) {
                        that.AddElements(videoData);
                        that.Events(videoData);

                    }

                    // Store Vidoe into global variable -> use to update Video
                    isVideo = true;
                    $videoAll = $videoAll.add($videoCur);
                }
            });




            /**
             * STORE 'VIDEO' VARIABLES INTO DATA OF CURRENT SLIDE
             */
            if( isVideo ) {
                slData.isVideo = true;
                slData.$video  = $videoAll;
            }
        },










        /**
         * GET ID OF CURRENT VIDEO
         */
        GetID : function(strLink) {
            var videoType = false, videoID;


            /**
             * CHECK VIDEO-LINK HAVE SUPPORTED & SEPARATE TYPE VIDEO-LINK
             */
            // Check link 'Youtube'
            // RegExp Youtube : base on "http://stackoverflow.com/a/9102270"
            function CheckYoutube() {
                var reYoutube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
                    match     = strLink.match(reYoutube);

                if( match && match[2].length == 11 ) {
                    videoID   = match[2];
                    videoType = 'youtube';
                }
            }

            // Check link 'Vimeo'
            // RegExp Vimeo : base on "http://stackoverflow.com/a/13286930"
            // Support 'ondemand'
            function CheckVimeo() {
                var reVimeo = /^.*(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|ondemand\/(?:\w+\/)?|)(\d+)(?:$|\/|\?)/,
                    match = strLink.match(reVimeo);

                if( match && match[3] ) {
                    videoID   = match[3];
                    videoType = 'vimeo';
                }
            }


            // The order steps check Video-link
            CheckYoutube();
            if( !videoType ) CheckVimeo();




            /**
             * RETURN  RESULT
             */
            return {
                'type' : videoType,
                'id'   : videoID
            };
        },

        /**
         * IFRAME OF CURRENT VIDEO
         */
        SetupIframe : function(videoData) {
            var that = this;
            VariableModule(that);


            /**
             * PARAMETER ON VIDEO-LINK ADDRESS
             */
            var isAutoplay = videoData.isImgPreview ? 1 : 0,
                para = '?';

            if( videoData.type == 'youtube' ) {

                // Iframe video paramater
                para += 'rel=0';                        // Not show info in player
                para += '&autohide=3';                  // Auto hide button play, volume, force auto hide when height slide large than height video
                para += '&autoplay='+ isAutoplay;       // Auto play when show
                para += '&showinfo=0';                  // Turn on info video
                para += '&wmode=opaque';                // Fixed ie7/8, iframe overlay & z-index -> do button-close hidden; In Firefox: iframe flash not appeare
                para += '&enablejsapi=1';               // Add api into Iframe

                videoData.src = 'https://www.youtube.com/embed/' + videoData.id + para;
            }
            else if( videoData.type == 'vimeo' ) {
                para += '&autoplay='+ isAutoplay;
                para += '&api=1';                       // Add api into Iframe
                videoData.src = 'https://player.vimeo.com/video/' + videoData.id + para;
            }




            /**
             * THE PROPERTIES ON IFRAME
             */
            var iframeAttrs = {
                'class'       : va.ns + 'video-item',
                'frameborder' : 0,
                'allowfullscreen' : '',
                'width'       : '100%',
                'height'      : videoData.isImgPreview ? '100%' : videoData.height +'px'
            };

            videoData.$iframe = $('<iframe></iframe>', iframeAttrs);




            /**
             * INSERT IFRAME DIRECTLY INTO VIDEO-WRAP IF WITHOUT IMAGE-PREVIEW
             */
            if( !videoData.isImgPreview ) videoData.$video.append(videoData.$iframe);
        },

        /**
         * INSERT BUTTON OPEN - CLOSE INTO VIDEO
         */
        AddElements : function(videoData) {
            VariableModule(this);
            var $video = videoData.$video;


            /**
             * CREATE OBJECT BUTTONS
             *  + Insert class 'swipe-prevent' -> remove event 'swipe-start'
             */
            var ns          = va.ns,
                classSelect = ns +'swipe-prevent',
                classPlay   = ns +'btn-play',
                classClose  = ns +'btn-close';

            videoData.$btnPlay  = $('<div/>', { 'class' : classPlay +' '+ classSelect }),
            videoData.$btnClose = $('<div/>', { 'class' : classClose +' '+ classSelect });



            /**
             * CREATE OBJECT 'OVERLAY' & 'LOADER'
             */
            that.RENDER.LoaderAdd($video, $video, '$loader');



            /**
             * INSERT ELEMENTS TO VIDEO
             */
            $video.append(videoData.$btnPlay, videoData.$btnClose);
        },










        /**
         * EVENT FOR THE ELEMENTS IN VIDEO
         */
        Events : function(videoData) {
            VariableModule(this);
            var that = this, nameTapEvent = va.ev.click, $video = videoData.$video;


            /**
             * EVENT 'TAP' FOR BUTTON-OPEN
             */
            videoData.$btnPlay.on(nameTapEvent, function(e) {
                VariableModule(that);

                // Open + Play Video Iframe
                that.FnOpen(videoData);


                /**
                 * CASE: THERE ARE SLIDESHOW
                 */
                if( is.slideshow ) {

                    va.nVideoOpen++;
                    SLIDESHOW.Go('videoOpen');
                }
            });




            /**
             * EVENT 'TAP' FOR BUTTON-CLOSE
             */
            videoData.$btnClose.on(nameTapEvent, function(e) {
                VariableModule(that);

                // Closed & remove Video-iframe
                that.FnClose(videoData);


                /**
                 * CASE: THERE ARE SLIDESHOW
                 */
                if( is.slideshow ) {
                    va.nVideoOpen--;

                    // Variable: 'nVideoOpen' >= 0
                    if(va.nVideoOpen < 0) va.nVideoOpen = 0;
                    SLIDESHOW.Go('videoClosed');
                }
            });



            /**
             * FIXED IE : EVENT 'HOVER' FOR IFRAME TO DISPLAY BUTOTN-CLOSE
             */
            if( is.ie ) {
                var classHover = va.ns +'hover';
                videoData.$iframe.hover(

                    function(e) { videoData.$btnClose.addClass(classHover) },
                    function(e) { videoData.$btnClose.removeClass(classHover) }
                );
            }
        },

        /**
         * FUNCTION: OPEN - CLOSE VIDEO
         */
        FnOpen : function(videoData) {
            VariableModule(this);
            var that = this, ns = va.ns, $video = videoData.$video;



            /**
             * FUNCTION : INSERT IFRAME - PLAY VIDEO
             */
            function IframeAppend() {

                // Insert class 'init' when load Iframe-video
                $video.addClass(ns +'video-init');

                // Variable to recognize Iframe embbed
                videoData.isEmbbed = true;

                // Iframe setup
                videoData.$iframe
                    .attr('src', videoData.src)
                    .prependTo($video)
                    .on('load', function() {

                        // Change class 'actived' on Video
                        $video.addClass(ns +'video-ready').removeClass(ns +'video-init');
                    });
            }

            function VideoPlay() {

                // Insert class 'ready' to diplay Video
                $video.addClass(ns +'video-ready');

                // API notices play Video
                var iframeContent = videoData.$iframe[0].contentWindow;
                if( videoData.type == 'youtube' ) {
                    iframeContent.postMessage('{ "event": "command", "func": "playVideo", "args": "" }', '*');
                }
                else if( videoData.type == 'vimeo' ) {
                    iframeContent.postMessage('{ "method": "play" }', '*');
                }
            }




            /**
             * DISPLAY VIDEO
             */
            videoData.isShow = true;

            // Add class 'Videoback show' to slide if current video is Imageback
            if( videoData.isImgback ) {
                videoData.$slide.addClass(ns +'videoback-show');
            }



            /**
             * ACTION FOR VIDEO EMBBED
             */
            if( videoData.isEmbbed ) VideoPlay();
            else                     IframeAppend();
        },

        FnClose : function(videoData) {
            VariableModule(this);
            var that = this, ns = va.ns, $video = videoData.$video;


            /**
             * FUNCTION: REMOVE IFRAME - PAUSE VIDEO
             */
            function IframeRemove() {

                videoData.isShow = false;
                videoData.isEmbbed = false;

                // Remove class 'ready'
                // Remove Iframe
                $video.removeClass(ns +'video-ready');
                videoData.$iframe.attr('src', 'about:blank').remove();
            }

            // Pause video by use api 'Post Message'
            function VideoPause() {
                var iframeContent = videoData.$iframe[0].contentWindow;

                if( videoData.type == 'youtube' ) {
                    iframeContent.postMessage('{ "event": "command", "func": "pauseVideo", "args": "" }', '*');
                }

                else if( videoData.type == 'vimeo' ) {

                    // API pause not work in file offline
                    if( is.online ) iframeContent.postMessage('{ "method": "pause" }', '*');
                    else            IframeRemove();
                }
            }




            /**
             * THE CURRENT VIDEO
             */
            if( videoData.isShow ) {

                // Remove class 'init'
                $video.removeClass(ns +'video-init');

                // Remove class 'Videoback show' on slide if the current video is Imageback
                if( videoData.isImgback ) {
                    videoData.$slide.removeClass(ns +'videoback-show');
                }

                // Remove Iframe-video
                if( videoData.isPauseThenRemove ) IframeRemove();
                else                              VideoPause();
            }
        },

        /**
         * STATUS SLIDE DEACTIVED
         */
        SlideDeactived : function(id) {
            var that = this;
            VariableModule(that);


            // Close all Videos on current slide
            var $video = M.Data(va.$s.eq(id))['$video'];
            !!$video && $video.each(function() {

                that.FnClose( M.Data($(this))['video'] );
            });

            // Reset variable 'nVideoOpen'
            if( is.slideshow ) va.nVideoOpen = 0;
        }
    };
})(jQuery);










/**
 * MODULE IFRAME
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, va, is, M;

    /**
     * CAP NHAT BIET TOAN CUC
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        va   = self.va;
        is   = self.is;
        M    = self.M;
    }


    /**
     * MODULE IFRAME LAZY
     */
    rt01MODULE.IFRAME = {

        /**
         * INITIAL SETUP IFRAME-LAZY
         */
        Init : function($slCur) {
            VariableModule(this);

            /**
             * SERACH LINK IFRAME IN CURRENT SLIDE
             */
            var selectorIframe = M.NS('a.{ns}iframe'),
                $iframe        = M.Find($slCur, selectorIframe);


            // Case: Iframe-lazy exist
            if( $iframe.length ) {

                // Store Iframe into current Data-slide
                M.Data($slCur, { 'isIframe': true, '$iframe': $iframe });

                // Convert link <a> to <iframe> tag
                that.ConvertTag($slCur);

                // Update $iframe in current slide
                M.Data($slCur, { '$iframe': M.Find($slCur, M.NS('iframe.{ns}iframe')) });
            }
        },


        /**
         * CONVERT LINK <A> TO <IFRAME> TAG
         */
        ConvertTag : function($slCur) {
            VariableModule(this);
            var slData = M.Data($slCur);

            // Conditional execution
            if( !slData.isIframe ) return;



            /**
             * FUNCTION: CONVERT LINK TO IFRAME
             *  + Copy all properties in link to Iframe node
             */
            function ConvertToIframe($link) {

                /**
                 * CREATE NEW $IFRAME
                 */
                var $iframe = $('<iframe/>');

                // Copy all properties on link to new Iframe node
                var attrs = {};
                $.each($link[0].attributes, function(key, attr) {

                    var nameCur  = attr.name,
                        valueCur = attr.value;

                    $iframe.attr(nameCur, valueCur);
                    attrs[nameCur] = valueCur;
                });

                // Replace link by Iframe node
                $link.after($iframe).remove();
            }



            /**
             * SETUP IFRAME IN CURRENT SLIDE
             */
            slData.$iframe.each(function() {
                ConvertToIframe( $(this) );
            });
        },


        /**
         * TOGGLE ADDRESS URL ON IFRAME
         */
        ToggleSource : function($slCur) {
            VariableModule(this);
            var slData = M.Data($slCur);

            // Conditional execution
            if( !slData.isIframe ) return;



            /**
             * SETUP EACH IFRAME
             */
            slData.$iframe.each(function() {
                var $iframe = $(this),
                    href    = $iframe.attr('href');

                // Change 'href' to 'src' property
                if( href && !/^\s*$/g.test(href) ) {
                    $iframe.attr('src', href).removeAttr('href');
                }
            });

            // Variable to recognize $iframe exist in slide
            slData.isFrame = false;
        }
    };
})(jQuery);











/**
 * MODULE MATH EFFECTS
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M, FX, FXMATH, i, j, idCur, speed, cssTf;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that   = self;
        o      = self.o;
        cs     = self.cs;
        va     = self.va;
        is     = self.is;
        ti     = self.ti;
        M      = self.M;
        FX     = self.FX;
        FXMATH = M.Module('FXMATH');

        idCur = self.cs.idCur;
        speed = va.speed;
        cssTf = va.cssTf;
    }


    /**
     * MODULE HIEU UNG MATH
     *  + Thoi gian 'speed', 'delay' cua tung fxFront : thay doi chieu` huong' cua hieu ung
     */
    rt01MODULE.FXMATH = {

        /**
         * 'RECT' EFFECT
         */
        rectMove : function(f, slot) {
            VariableModule(this);


            /**
             * GET 'SLOT' & INITIALIZE EFFECT
             */
            if( slot === undefined ) {
                var slotMax = (va.wRuby > 768) ? 10 : 5,
                    slotCur = va.slot[idCur];

                slot = (slotCur == 'auto') ? M.R( M.Rm(2, slotMax) ) : M.PInt(slotCur);
            }
            f.slot = slot;

            // Setup first for the effect
            that.FirstSetup(f, {
                'isMask'         : true,
                'isFxBackFading' : false,
                'isPrevNavFrontOfSlidePrev' : false
            });




            /**
             * TRANSFORM FOR $FX-FRONT AT BEGINNING
             */
            var tfBegin = { x: - f.mark * f.wFront },
                tfEnd   = { x: 0 };

            // Slot position start & Image Slot position
            for( i = 0; i < f.slot; i++ ) {

                // Position for Image-item at beginning
                that.PosBeginImgItem(f, i);


                // Clone $fxFront
                var $fxClone = f.$front.clone();

                // Transform on Imageback of $fxFront at beginning
                va.tweenMath
                    .css($fxClone.find('.{ns}imgback-wrap'.replace(/\{ns\}/, va.ns)), tfBegin);

                // Position at beginning & properties stransform-end stored on Data fxFront-clone
                $fxClone
                    .css({ 'left' : i * f.wFront, 'top' : 0 })
                    .appendTo(f.$frontWrap);

                M.Data($fxClone, { 'tfEnd': tfEnd, 'speed': speed[idCur], 'delay': 0 });
            }




            /**
             * TRANSFORM FOR $FX-BACK AT BEGINNING
             */
            // Easing
            f.easeIn  = 'easeOutCubic';
            f.easeOut = 'easeOutCubic';


            /**
             * ANIMATION FOR IMAGE-BACK
             */
            va.tweenMath
                .animate(f.$imgInBack, {
                    x : f.mark * f.wFront
                }, {
                    duration : speed[idCur],
                    easing   : f.isNext ? f.easeIn : f.easeOut
                },
                false);

            // Transform end
            f.animateBy = 'imgwrap';
            that.TransformEnd(f);
        },


        rectRun : function(f) {
            VariableModule(this);

            /**
             * GET 'SLOT' & INITIALIZE EFFECT
             */
            var slotCur = va.slot[idCur];
            f.slot = (slotCur == 'auto') ? M.R(M.Rm(3,6)) : M.PInt(slotCur);

            // Setup first for the effect
            that.FirstSetup(f);

            // Speed & delay
            var speedCur = speed[idCur] / 4,
                delayAll = speed[idCur] - speedCur,
                delayOne = delayAll / (f.slot - 1);     // -1 : -> make $fxFront first execute immediately



            /**
             * TRANSFORM FOR $FX-FRONT AT BEGINNING
             */
            var tfBegin, tfEnd;
            for( i = 0; i < f.slot; i++ ) {

                // Position of Image-item at beginning
                that.PosBeginImgItem(f, i);

                // 'Delay' duration & position beginning - ending
                var delayCur = delayAll - (i * delayOne),
                    xBegin   = f.isNext ? - M.R((i + 1) * f.wFront) : 0,
                    xEnd     = f.isNext ? 0 : M.R((f.slot - i) * f.wFront),
                    $fxClone = f.$front.clone();


                // Transform for $fxFront at beginning
                tfBegin = { x: xBegin };

                va.tweenMath
                    .css($fxClone.find('.{ns}imgback-wrap'.replace(/\{ns\}/, va.ns)), tfBegin);


                // Position at beginning & properties of transform-end stored on Data fxFront-clone
                tfEnd = { x: xEnd };

                $fxClone
                    .css({ 'left' : i * f.wFront, 'top' : 0 })
                    .appendTo(f.$frontWrap);

                M.Data($fxClone, { 'tfEnd': tfEnd, 'speed': speedCur, 'delay': delayCur });
            }

            // The ending transform for $fxFront
            f.animateBy = 'imgwrap';
            that.TransformEnd(f);
        },


        rectSlice : function(f) {
            VariableModule(this);

            /**
             * GET 'SLOT' & INITIALIZE EFFECT
             */
            var slotCur = va.slot[idCur];
            f.slot = (slotCur == 'auto') ? M.R(M.Rm(4,12)) : M.PInt(slotCur);

            // First setup for effect
            that.FirstSetup(f);


            // Speed & delay
            var speedCur = speed[idCur] / 4,
                delayAll = speed[idCur] - speedCur,
                delayOne = delayAll / f.slot;




            /**
             * FIND MAXIMUM HEIGHT FOR BETWEEN CURRENT & NEXT SLIDE
             */
            var hImgItemSlCur  = M.OuterHeight(f.$imgItemSlCur),
                hImgItemSlNext = M.OuterHeight(f.$imgItemSlNext),
                hImgItemMax    = hImgItemSlCur > hImgItemSlNext ? hImgItemSlCur : hImgItemSlNext;




            /**
             * TRANSFORM FOR $FX-FRONT
             */
            for( i = 0; i < f.slot; i++ ) {

                // Position of Image-item at beginning
                that.PosBeginImgItem(f, i);



                /**
                 * TRANSFORM OF $FX-FRONT AT BEGINNING
                 */
                var $fxClone = f.$front.clone(),
                    isSoLe   = M.R(i / 2) > (i / 2),
                    y        = isSoLe ? (hImgItemMax + 10) : (- hImgItemMax - 10),
                    yBegin   = f.isNext ? y : 0,
                    yEnd     = f.isNext ? 0 : y,

                    tfBegin  = { 'y': yBegin },
                    tfEnd    = { 'y': yEnd },

                    // Delay duration for each item
                    delayCur = !f.isNext ? i * delayOne : (delayAll - (i * delayOne));


                // Transform for $fxFront at beginning
                va.tweenMath
                    .css($fxClone.find('.{ns}imgback-wrap'.replace(/\{ns\}/, va.ns)), tfBegin);


                // Position at beginning & properties of transform-end stored on Data fxFront-clone
                $fxClone
                    .css({ 'left' : i * f.wFront, 'top' : 0 })
                    .appendTo(f.$frontWrap);

                M.Data($fxClone, { 'tfEnd': tfEnd, 'speed': speedCur , 'delay': delayCur });
            }

            // Transform for $fxFront at ending
            f.easeOut   = 'easeOutCubic';
            f.animateBy = 'imgwrap';
            that.TransformEnd(f);
        },










        /**
         * EFFECT 'RUBY'
         */
        rubyFade : function(f) {
            VariableModule(this);

            /**
             * GET 'SLOT' & INITIALIZE EFFECT
             */
            var slotCur = va.slot[idCur];
            f.slot = (slotCur == 'auto') ? M.R(M.Rm(2, 5)) : M.PInt(slotCur);

            // First setup for effect
            that.FirstSetup(f, {
                'isSizeSquare'   : true,
                'isFxBackFading' : false
            });



            // FxSlot & Image Slot: Position & Timer
            for( i = 0; i < f.slot.ver; i++ ) {
                for( j = 0; j < f.slot.hor; j++ ) {

                    // Position for Image-item at beginning
                    that.PosBeginImgItem(f, j, i);



                    /**
                     * TRANSFORM BEGINNING - ENDING FOR $FX-FRONT
                     */
                    var $fxClone = f.$front.clone(),
                        speedCur = ~~ M.Rm(100, speed[idCur]),
                        delayCur = M.Ra() * (speed[idCur] - speedCur);


                    // Transform-begin for $fxFront
                    var tfBegin = { 'opacity': f.opaReverse };

                    va.tweenMath
                        .css($fxClone.find('.{ns}imgback-wrap'.replace(/\{ns\}/, va.ns)), tfBegin);


                    // Position at beginning & properties of transform-end stored Data fxFront-clone
                    var tfEnd = { 'opacity': f.opacity };

                    $fxClone
                        .css({ 'left' : j * f.wFront, 'top' : i * f.hFront })
                        .appendTo(f.$frontWrap);

                    M.Data($fxClone, { 'tfEnd': tfEnd, 'speed': speedCur, 'delay': delayCur });
                }
            }

            // Transform-end for $fxFront
            f.easeOut   = 'easeOutCubic';
            f.animateBy = 'imgwrap';
            that.TransformEnd(f);
        },

        rubyMove : function(f) {
            VariableModule(this);

            /**
             * GET 'SLOT' & INITIALIZE EFFECT
             */
            var slotCur = va.slot[idCur];
            f.slot = (slotCur == 'auto') ? M.R(M.Rm(2, 5)) : M.PInt(slotCur);

            // Initialize effect
            that.FirstSetup(f, {
                'isMask'         : true,
                'isSizeSquare'   : true,
                'isFxBackFading' : false
            });


            // Function: return the random position
            function PositionRandom(v) {
                var x, y, a = {};
                switch (v) {
                    case 0: a.x = 0;    a.y = -100; break;
                    case 1: a.x = 100;  a.y = 0;    break;
                    case 2: a.x = 0;    a.y = 100;  break;
                    case 3: a.x = -100; a.y = 0;    break;
                }
                return a;
            }


            // FxSlot & Image Slot: Position & Timer
            for( i = 0; i < f.slot.ver; i++ ) {
                for( j = 0; j < f.slot.hor; j++ ) {

                    // Position for Image-item at beginning
                    that.PosBeginImgItem(f, j, i);


                    /**
                     * TRANSFORM BEGINNING - ENDING FOR $FX-FRONT-CLONE
                     */
                    var $fxClone = f.$front.clone(),
                        xy       = PositionRandom(M.R(M.Ra()*3)),
                        xyBegin  = { 'x': xy.x +'%', 'y': xy.y +'%' },
                        xyEnd    = { 'x': 0, 'y': 0 },
                        tfBegin  = f.isNext ? xyBegin : xyEnd,
                        tfEnd    = f.isNext ? xyEnd : xyBegin

                        speedCur = M.Rm(100, speed[idCur] / 2),
                        delayCur = M.Ra() * (speed[idCur] - speedCur);


                    // Transform for $fxFront-clone at beginning
                    va.tweenMath
                        .css($fxClone.find('.{ns}imgback-wrap'.replace(/\{ns\}/, va.ns)), tfBegin);


                    // Position at beginning & properties transform-end stored on Data fxFront-clone
                    $fxClone
                        .css({ 'left': j * f.wFront, 'top': i * f.hFront })
                        .appendTo(f.$frontWrap);

                    M.Data($fxClone, { 'tfEnd': tfEnd, 'speed': speedCur, 'delay': delayCur });
                }
            }

            // Transform-end for $fxFront
            f.animateBy = 'imgwrap';
            that.TransformEnd(f);
        },

        rubyRun : function(f) {
            VariableModule(this);

            /**
             * GET 'SLOT' & INITIALIZE EFFECT
             */
            var slotCur = va.slot[idCur];
            f.slot = (slotCur == 'auto') ? M.R(M.Rm(2,5)) : M.PInt(slotCur);

            // Initialize effect
            that.FirstSetup(f, {
                'isSizeSquare' : true
            });


            // FxSlot & Image Slot: position & timer
            var xy = {}, tfBegin, tfEnd;
            for( i = 0; i < f.slot.ver; i++ ) {
                for( j = 0; j < f.slot.hor; j++ ) {

                    // Position for Image-item at beginning
                    that.PosBeginImgItem(f, j, i);


                    /**
                     * GET X/Y RANDOM AT BEGINNING
                     */
                    var x, y;
                    switch ( M.R(M.Ra() * 3) ) {
                        case 0:
                            x = 0;
                            y = -2000;
                            break;
                        case 1:
                            x = 2000;
                            y = 0;
                            break;
                        case 2:
                            x = 0;
                            y = 2000;
                            break;
                        case 3:
                            x = -2000;
                            y = 0;
                            break;
                    }




                    /**
                     * TRANSFORM BEGINNING - ENDING FOR FX-FRONT
                     */
                    var $fxClone = f.$front.clone(),
                        xyBegin  = { 'x': x, 'y': y },
                        xyEnd    = { 'x': 0, 'y': 0 },
                        tfBegin  = f.isNext ? xyBegin : xyEnd,
                        tfEnd    = f.isNext ? xyEnd : xyBegin,

                        speedCur = M.Rm(100, 300),   // For the effect more beautiful than the above
                        delayCur = M.Ra() * (speed[idCur] - speedCur);


                    // Transform-begin for Image-fxFront
                    va.tweenMath
                        .css($fxClone.find('.{ns}imgback-wrap'.replace(/\{ns\}/, va.ns)), tfBegin);


                    // Position at beginning & properties transform-end stored on Data fxFront-clone
                    $fxClone
                        .css({ 'left': j * f.wFront, 'top': i * f.hFront })
                        .appendTo(f.$frontWrap);

                    M.Data($fxClone, { 'tfEnd': tfEnd , 'speed' : speedCur, 'delay' : delayCur });
                }
            }

            // Transform-end for $fxFront
            f.animateBy = 'imgwrap';
            that.TransformEnd(f);
        },

        rubyScale : function(f) {
            VariableModule(this);

            /**
             * GET 'SLOT' & INITIALIZE EFFECT
             */
            var slotCur = va.slot[idCur];
            f.slot = (slotCur == 'auto') ? M.R(M.Rm(2,5)) : M.PInt(slotCur);

            // First setup for effect
            that.FirstSetup(f, {
                'isSizeSquare'   : true,
                'isFxBackFading' : false
            });


            /**
             * TRANSFORM BEGINNING - ENDDING FOR IMAGE FX-FRONT
             * @param mixed scaleEnd
             */
            var scaleBegin = { 'perspectiveTF': 800, 'z': -1000, 'opacity': 0 },
                scaleEnd   = { 'perspectiveTF': 800, 'z': 0, 'opacity': 1 },
                tfBegin    = f.isNext ? scaleBegin : scaleEnd,
                tfEnd      = f.isNext ? scaleEnd : scaleBegin;


            // FxSlot & Image Slot: position & timer
            for( i = 0; i < f.slot.ver; i++ ) {
                for( j = 0; j < f.slot.hor; j++ ) {

                    // Position for Image-item at beginning
                    that.PosBeginImgItem(f, j, i);



                    /**
                     * TRANSFORM BEGINNING - ENDING FOR FX-FRONT
                     */
                    var $fxClone = f.$front.clone(),
                        speedCur = ~~ M.Rm(100, speed[idCur]),
                        delayCur = M.Ra() * (speed[idCur] - speedCur);



                    // Transform for Image fxFront at beginning
                    va.tweenMath
                        .css($fxClone.find('.{ns}imgback-wrap'.replace(/\{ns\}/, va.ns)), tfBegin);


                    // Position at beginning & properties of stransform-end stored on Data fxFront-clone
                    $fxClone
                        .css({ 'left': j * f.wFront, 'top': i * f.hFront })
                        .appendTo(f.$frontWrap);

                    M.Data($fxClone, { 'tfEnd': tfEnd, 'speed' : speedCur, 'delay' : delayCur });
                }
            }

            // Transform-end for $fxFront
            f.animateBy = 'imgwrap';
            that.TransformEnd(f);
        },











        /**
         * EFFECT 'ZIGZAG'
         */
        zigzagRun : function(f) {
            VariableModule(this);

            /**
             * GET 'SLOT' & INITIALIZE EFFECT
             */
            var slotCur = va.slot[idCur];
            f.slot = (slotCur == 'auto') ? M.R(M.Rm(2,5)) : M.PInt(slotCur);

            // First setup for effect
            that.FirstSetup(f, {
                'isSizeSquare' : true
            });


            // FxSlot & Image Slot: position & timer
            var itemID  = 0,
                jBegin, xBegin, xEnd;

            for( i = 0; i < f.slot.ver; i++ ) {
                for( j = 0; j < f.slot.hor; j++ ) {

                    // Position for Image-item at beginning
                    that.PosBeginImgItem(f, j, i);


                    /**
                     * ID-ITEM AT BEGINNING
                     */
                    var jBegin, itemID;

                    jBegin = f.slot.hor - j;
                    jBegin = (M.R(jBegin / 2) > jBegin / 2) ? i : (f.slot.ver - i - 1);
                    itemID = jBegin + (f.slot.ver * (f.slot.hor - j - 1));



                    /**
                     * TRANSFORM BEGINNING - ENDING FOR FX-FRONT
                     */
                    var $fxClone = f.$front.clone(),
                        tfBegin  = f.isNext ? { 'x': -2000 } : { 'x': 0 },
                        tfEnd    = f.isNext ? { 'x': 0 } : { 'x': 2000 },

                        speedCur = ~~(speed[idCur] / (f.slot.ver * f.slot.hor) - 0.5),
                        delayCur = speedCur * itemID;

                    // Transform-begin for Image fxFront
                    va.tweenMath
                        .css($fxClone.find('.{ns}imgback-wrap'.replace(/\{ns\}/, va.ns)), tfBegin);


                    // Position at beginning & properties of stranform-end stored on Data fxFront-clone
                    $fxClone
                        .css({ 'left': j * f.wFront, 'top': i * f.hFront })
                        .appendTo(f.$frontWrap);

                    M.Data($fxClone, { 'tfEnd': tfEnd, 'speed' : speedCur, 'delay' : delayCur });
                }
            }

            // Transform-end for fxFront
            f.animateBy = 'imgwrap';
            that.TransformEnd(f);
        },










        /**
         * FIRST SETUP FOR EFFECT
         */
        FirstSetup : function(f, opts) {
            VariableModule(this);
            var ns = va.ns;


            /**
             * REMOVE RESEDUAL ELEMENTS OF OLD-EFFECT
             *  + Remove css 'visibility' on current slide of old-effect
             *  + Remove fxOverlay of old-effect
             */
            va.tweenMath.reset(true);
            va.$s.removeClass(ns + 'hide');
            !!f.$fxOverlay && f.$fxOverlay.remove();




            /**
             * THE OPTIONS FOR CURRENT EFFECT
             */
            var optsDefault = {
                'isMask'         : false,
                'isNoInvert'     : false,
                'isSizeSquare'   : false,
                'isFxBackFading' : true,
                'isNextNavFrontOfSlideNext' : true,     // Next navigation : FxFront take Imageback on next slide
                'isPrevNavFrontOfSlidePrev' : true      // Prev navigation : FxFront take Imageback on previous slide
            };

            // Merge current options & default options
            opts = $.extend({}, optsDefault, opts);




            /**
             * INITIAL SETUP DEPENDING ON NEXT - PREV DIRECTION
             */
            if( opts.isNoInvert ) f.isNext = true;

            // Case: transform follow next direction
            if( f.isNext ) {
                f.mark       = -1;
                f.opacity    = 1;
                f.opaReverse = 0;
            }

            // Case: transform follow previous direction
            else {
                f.mark       = 1;
                f.opacity    = 0;
                f.opaReverse = 1;
            }



            /**
             * INITIALIZE VARIABLES
             */
            var isNext = f.isNext,
                wRuby  = va.wRuby,
                wSlide = va.wSlide,
                div    = '<div/>',

                // Shortcut
                $imgWrapSlCur  = f.$imgWrapSlCur,
                $imgWrapSlNext = f.$imgWrapSlNext;


            f.$imgItemSlCur  = $imgWrapSlCur.find('img');
            f.$imgItemSlNext = $imgWrapSlNext.find('img');
            f.hCur           = M.OuterHeight($imgWrapSlNext, true);

            f.$fxOverlay     = $(div, {'class': ns +'fx-overlay'});
            f.$back          = $(div, {'class': ns +'fx-back'});
            f.$frontWrap     = $(div, {'class': ns +'fx-front-wrap'});
            f.$front         = $(div, {'class': ns +'fx-front'});



            /**
             * IMAGE-BACK IN FX-BACK / FX-FRONT
             */
            if( isNext ) {
                if( opts.isNextNavFrontOfSlideNext ) {
                    f.$imgInBack  = $imgWrapSlCur.clone();
                    f.$imgInFront = $imgWrapSlNext.clone();
                }
                else {
                    f.$imgInBack  = $imgWrapSlNext.clone();
                    f.$imgInFront = $imgWrapSlCur.clone();
                }
            }

            else {
                if( opts.isPrevNavFrontOfSlidePrev ) {
                    f.$imgInBack  = $imgWrapSlNext.clone();
                    f.$imgInFront = $imgWrapSlCur.clone();
                }
                else {
                    f.$imgInBack  = $imgWrapSlCur.clone();
                    f.$imgInFront = $imgWrapSlNext.clone();
                }
            }

            // Remove the unnecessary elements
            f.$imgInBack
                .add(f.$imgInFront)
                .children(':not(img)')
                .remove();

            // Identify Imageback-item in FxFront
            f.$imgItemFront  = f.$imgInFront.find('img');





            /**
             * APPEND THE ELEMENTS OF EFFECT AT FIRST
             */
            // Append fxBack into fxOverlay
            f.$back
                .append(f.$imgInBack)
                .appendTo(f.$fxOverlay);


            // Hidden the current - next slide
            f.$slCur.add(f.$slNext).addClass(ns +'hide');

            // Append fxFrontWrap into fxOverlay
            f.$fxOverlay.append(f.$frontWrap);

            // FxFrontWrap: add height-css into height-fixed mode
            // In height-auto mode: is height of Imageback in current slide
            // Insert class 'Mask' to fxFront-wrap (if have)
            var hFrontWrap = is.heightFixed ? va.hRuby : f.hCur;
            f.$frontWrap.css('height', hFrontWrap);
            opts.isMask && f.$frontWrap.addClass(ns + 'math-mask');

            // FxFront: insert Image
            f.$imgInFront.appendTo(f.$front);

            // Store current position 'left' - 'top' of Image-item fxFront to Data
            // Support different position in position-image 'tile' mode
            f.$imgItemFront.each(function() {
                var $imgCur = $(this);

                M.Data($imgCur, {
                    'left' : M.PInt( $imgCur.css('left') ),
                    'top'  : M.PInt( $imgCur.css('top') )
                });
            });





            /**
             * EFFECT 'FADE' FOR IMAGE-BACK
             */
            if( opts.isFxBackFading ) {
                var opacityBegin   = isNext ? 1 : 0,
                    opacityEnd     = isNext ? 0.25 : 1,
                    $imgItemFxBack = f.$back.find('img');


                // Tween animate for Image-item fxBack
                va.tweenMath
                    .css($imgItemFxBack, { 'opacity': opacityBegin })
                    .animate($imgItemFxBack, { 'opacity': opacityEnd }, { 'duration': speed[idCur] }, false);
            }





            /**
             * SLOT SIZE OF THE SIZE SQUARE
             *  + Swap value width / height slot of slides
             *  + Standard : width > height
             */
            function GetSlot(width, height, nameVer, nameHor) {
                var a = {};

                // Store slot vertical
                a[nameVer] = f.slot;

                // Height value: get
                a['height'] = M.C(height / f.slot);

                // Number slot at horizontal, get width-slide larger
                a[nameHor] = M.C(width / a['height']);

                // Width front: combine slotHor and width-slide
                var nRemain = width - (a['height'] * a[nameHor]);           // Number remainder, compare to number slotHor & width slide
                a['width'] = a['height'] + M.C(nRemain / a[nameHor]);

                return a;
            }


            // Slot number
            if( opts.isSizeSquare ) {

                // Height of wrapFront: get sum all slide. In height-fixed: get height-ruby
                var height = is.heightFixed ? va.hRuby : f.hCur;

                // 'f.slot' convert to object{} -> get minimum value between width / height for 'f.slot'
                // Default case: width-slide > height-slide
                if( wSlide > height ) {
                    f.slot   = GetSlot(wSlide, height, 'ver', 'hor');
                    f.wFront = f.slot['width'];
                    f.hFront = f.slot['height'];
                }

                // Otherwise: reverse slot-number
                else {
                    f.slot   = GetSlot(height, wSlide, 'hor', 'ver');
                    f.wFront = f.slot['height'];
                    f.hFront = f.slot['width'];
                }


                // Front: size like squares
                f.$front.css({ 'width' : f.wFront, 'height' : f.hFront });
                f.$imgInFront.css({ 'width': '100%', 'height' : '100%' });
            }
            else {
                f.wFront = M.C(wSlide / f.slot);
                f.$front.css({ 'width': f.wFront, 'height': '100%' });
                f.$imgInFront.css({ 'width': f.wFront });
            }





            /**
             * POSITION 'TOP' : WHEN 2 SLIDES HAVE DIFFERENT HEIGHT
             *  + In height-auto: slide-current & slide-last have different height
             *  + In height-fixed: slide-current & slide-last have same height
             */
            f.top = M.R( (M.OuterHeight(f.$slNext, true) - M.OuterHeight(f.$slCur, true)) / 2 );
            if( !is.heightFixed ) {

                /**
                 * CASE: SIZE IS THE SQUARES
                 */
                if( opts.isSizeSquare ) {
                    if( isNext ) {
                        f.$back.css('top', f.top);
                        f.top = 0;
                    }
                }


                /**
                 * CASE: SIZE IS RECTANGLE
                 */
                else {
                    if( isNext ) {
                        if( opts.isNextNavFrontOfSlideNext ) {
                            f.$back.css('top', f.top);
                        }
                        else {
                            f.$imgInFront.css('top', f.top);
                        }
                    }
                    else {
                        if( opts.isPrevNavFrontOfSlidePrev ) {
                            f.$imgInFront.css('top', f.top);
                        }
                        else {
                            f.$back.css('top', f.top);
                        }
                    }
                }
            }


            // WrapFront: clear 'top' value in size-squares && height-fixed
            // CSS 'top' value to make the center slide && height-fixed
            if( opts.isSizeSquare && is.heightFixed ) {
                f.tImg = f.$imgInFront.css('top');

                // Value 'top': without value, Chrome return '', IE return 'auto'
                if( f.tImg !== '' && f.tImg !== 'auto' ) {

                    // Plus to 'f.top' variable
                    f.top += M.PInt(f.tImg);

                    // WrapFront: clear value 'top'
                    f.$imgInFront.css('top', '');
                }
            }
        },


        /**
         * POSITION OF IMAGE-ITEM AT FIRST -> FOR EFFECT 'RECT'
         */
        PosBeginImgItem : function(f, i, j) {
            VariableModule(this);

            f.$imgItemFront.each(function() {
                var $imgCur = $(this),
                    imgData = M.Data($imgCur);

                // Position 'left'
                $imgCur.css('left', -(i * f.wFront) + imgData['left']);

                // Position 'top'
                if( j !== undefined ) $imgCur.css('top', -(j * f.hFront) + f.top + imgData['top']);
            });
        },


        /**
         * TRANSFORM-END FOR FX-FRONT
         */
        TransformEnd : function(f) {
            var that = this;
            VariableModule(that);


            // Dragstart stop
            f.$frontWrap.on(va.ev.drag, function(e) { return false });
            va.fxTime0 = +new Date();

            // Easing
            var esIn  = f.easeIn  || 'easeOutCubic',
                esOut = f.easeOut || 'easeInCubic';
                es    = f.isNext ? esIn : esOut;



            /**
             * TRANSFORM-END FOR FX-FRONT
             */
            f.$front = f.$frontWrap.find('.'+ va.ns +'fx-front');
            f.$front.each(function() {

                var $eleCur = $(this),
                    eleData = M.Data($eleCur),
                    sp      = ~~ eleData['speed'],
                    tf      = eleData['tfEnd'],
                    $anim;

                if( f.animateBy == 'self' )    $anim = $eleCur;
                if( f.animateBy == 'imgwrap' ) $anim = $eleCur.find('.{ns}imgback-wrap'.replace(/\{ns\}/, va.ns));



                /**
                 * TWEEN ANIMATE FOR $FX-FRONT
                 */
                va.tweenMath
                    .animate($anim, tf, {
                        duration : sp,
                        delay    : ~~ eleData['delay'],
                        easing   : es
                    },
                    false);
            });




            /**
             * AFTER COMPLETE EFFECT
             */
            va.tweenMath
                .eventComplete(function() {
                    VariableModule(that);

                    // Status tween
                    va.fxMath.status = null;

                    // Restore & remove the unnecessary elements
                    va.$s.removeClass(va.ns +'hide');
                    !!f.$fxOverlay && f.$fxOverlay.remove();

                    // Setup after complete toggle new slide
                    that.TOSLIDE.End();
                });




            /**
             * OTHER SETUP
             */
            // Insert all $fx node in after slide-end -> speed up
            f.$fxOverlay.appendTo(va.$canvas);
        }
    };










    /**
     * VIEW MODULE OF MATH EFFECT
     */
    rt01MODULE.VIEWMATH = {

        /**
         * RESET TWEEN MATH
         */
        ResetTweenMath : function(idCur, idNext) {
            VariableModule(this);

            var f = va.fxMath;
            f.idCur   = idCur;
            f.idNext  = idNext;
            f.fx      = va.fx[f.idNext];
            f.$slCur  = va.$s.eq(idCur);
            f.$slNext = va.$s.eq(idNext);



            /**
             * RANDOM NAME OF EFFECT
             */
            var fxIDCur = f.fx;

            // If fxIDCur is 'randomMath' : random effect in fxMath[]
            if( fxIDCur == 'randomMath' ) {
                fxIDCur = M.RandomInArray2(o.fxMathName, va.fxMathRandom);
            }
            // If fxIDCur is array[] : random effect in array[]
            else if( $.isArray(fxIDCur) ) {
                fxIDCur = M.RandomInArray(fxIDCur, va.fxLast);
            }

            // Store name of current effect
            va.fxLast = fxIDCur;






            /**
             * CHECK & INITIALIZE EFFECT
             */
            // Store Imageback of current slide
            f.$imgWrapSlCur  = M.Data(f.$slCur)['$imgbackWrap'];
            f.$imgWrapSlNext = M.Data(f.$slNext)['$imgbackWrap'];

            // Conditonal to execute the math effects
            // Fixed for 1x1(px) size image have error in 'FXMATH.PosBeginImgItem()'
            if( f.$imgWrapSlCur && f.$imgWrapSlNext && (f.$imgWrapSlNext.height() > 1) && !!FXMATH[fxIDCur] ) {

                FXMATH[fxIDCur](f);
                return true;
            }

            // Not eligible for execute the effect
            else {
                that.TOSLIDE.End();
                return false;
            }
        },











        /**
         * BUFFER SWIPE FOR MATH EFFECTS
         */
        BufferMath : function(sign) {
            VariableModule(this);
            var fxMath = va.fxMath;


            /**
             * ID CURRENT - NEXT
             */
            var idCur  = cs.idCur,
                idNext = idCur + sign;

            if     ( idNext < 0 ) idNext = cs.num - 1;
            else if( idNext > cs.num - 1 ) idNext = 0;

            // Check change ID-next
            var isIDNextChange = (fxMath.idNext != idNext);




            /**
             * UPDATE TWEEN 'MATH' WHEN CHANAGES VALUE
             */
            if( !fxMath.status || isIDNextChange ) {
                fxMath.isNext = sign > 0;

                // Reset Tween animate effect
                that.ResetTweenMath(idCur, idNext);
            }

            // Update variable to recognize current status
            fxMath.status = 'buffer';



            /**
             * THE CURRENT VALUE OF TWEEN
             */
            var movePercent = M.A(va.xOffset) / va.wSlide * 100;
            va.tweenMath.go( movePercent );
        },


        /**
         * RESTORE TRANSFORM OF MATH EFFECT
         */
        RestoreMath : function() {
            VariableModule(this);

            /**
             * VARIABLE 'STATUS' ACTION
             */
            va.fxMath.status = 'restore';


            /**
             * REVERSE EFFECT
             */
            va.tweenMath.reverse();
        },


        /**
         * PERFECT EFFECT AFTER TRANSLATE-BUFFER & TOGGLE SLIDE BY NAVIGATION - PAGINATION
         */
        ToSlideMath : function() {
            VariableModule(this);
            var fxMath = va.fxMath;


            /**
             * CASE: CONTINUE THE BEFORE EFFECT
             */
            if( fxMath.status == 'buffer' ) {
                fxMath.status = 'play';

                // Tween-math resume
                va.tweenMath.resume();
            }




            /**
             * CASE: THE INITIAL EFFECT EXECUTE BY NAV - PAG
             */
            else {

                /**
                 * ID CURRENT - NEXT
                 */
                var idCur  = cs.idLast,
                    idNext = cs.idCur;


                /**
                 * RESET TWEEN ANIMATE
                 */
                fxMath.isNext = va.nMove > 0;
                var isTweenValid = that.ResetTweenMath(idCur, idNext);

                if( isTweenValid ) {

                    // Variable 'status' of action
                    fxMath.status = 'play';

                    // Restart the tween-math effect
                    va.tweenMath.restart();
                }
            }
        }
    };
})(jQuery);










/**
 * MODULE CSS EFFECTS
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M, FX, i, j;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        ti   = self.ti;
        M    = self.M;
        FX   = self.FX;
    }


    /**
     * MODULE CSS EFFECTS
     */
    rt01MODULE.VIEWCSS = {

        /**
         * GET CURRENT CSS EFFECTS
         */
        GetFxCss : function(fxType, optsCur) {
            VariableModule(this);

            var keyframes = va.rubyAnimateKeyframes,
                animOne   = va.rubyAnimateOne,
                fxCur     = [];


            /**
             * FUNCTION: REMOVE THE EFFECT DO NOT EXIST IN SYSTEM
             */
            function RemoveFxNotExist(aFx) {

                // Convert to array[] if that is not array
                if( !$.isArray(aFx) ) aFx = [aFx];

                // Each effect
                $.each(aFx, function(i) {
                    if( !keyframes[aFx[i]] ) aFx.splice(i, 1);
                });

                // Return the array effect
                return aFx;
            }





            /**
             * CHECK THE EFFECT IN THE CASES:
             */
            switch(fxType) {

                /**
                 * CASE: EFFECT CSS 'ONE'
                 */
                case 'cssOne' :
                    var cssOne = optsCur.cssOne;

                    // Mandatory witch to array[]
                    if( !$.isArray(cssOne) ) cssOne = [cssOne];


                    /**
                     * SETUP EACH EFFECT
                     */
                    $.each(cssOne, function(i) {

                        // Store each effect if name is exist on system
                        if( animOne[cssOne[i]] ) {
                            fxCur.push( animOne[cssOne[i]] );
                        }
                    });
                    break;



                /**
                 * CASE: EFFECT CSS 'TWO'
                 */
                case 'cssTwo' :
                    var cssTwoOut = RemoveFxNotExist(optsCur.cssTwoOut),
                        cssTwoIn  = RemoveFxNotExist(optsCur.cssTwoIn);


                    // Check the array effect 'out' - 'in' exist
                    if( cssTwoOut.length && cssTwoIn.length ) {
                        fxCur = [{
                            'next' : [cssTwoOut, cssTwoIn],
                            'prev' : [cssTwoOut, cssTwoIn]
                        }];
                    }
                    break;



                /**
                 * CASE: EFFECT CSS 'THREE'
                 */
                case 'cssThree' :
                    var cssThreeNext = RemoveFxNotExist(optsCur.cssThreeNext),
                        cssThreePrev = RemoveFxNotExist(optsCur.cssThreePrev);


                    // Check the effect is exist
                    if( cssThreeNext.length && cssThreePrev.length ) {
                        fxCur = [{
                            'next' : [['slideShortLeftOut'], cssThreeNext],
                            'prev' : [['slideShortRightOut'], cssThreePrev]
                        }];
                    }
                    break;



                /**
                 * CASE: EFFECT CSS 'FOUR'
                 */
                case 'cssFour' :
                    var cssFourNextOut = RemoveFxNotExist(optsCur.cssFourNextOut),
                        cssFourNextIn  = RemoveFxNotExist(optsCur.cssFourNextIn),
                        cssFourPrevOut = RemoveFxNotExist(optsCur.cssFourPrevOut),
                        cssFourPrevIn  = RemoveFxNotExist(optsCur.cssFourPrevIn);


                    // Check the effect is exist
                    if( cssFourNextOut.length && cssFourNextIn.length && cssFourPrevOut.length && cssFourPrevIn.length ) {
                        fxCur = [{
                            'next' : [cssFourNextOut, cssFourNextIn],
                            'prev' : [cssFourPrevOut, cssFourPrevIn]
                        }];
                    }
                    break;
            }




            /**
             * FALLBACK EFFECT CSS IF RUBY-ANIMATE KEYFRAMES DO NOT EXIST
             */
            if( !fxCur.length ) {
                fxCur = [animOne['fade']];

                // Change type effect
                va.fxType = 'cssOne';

                // Display the error message
                M.Message('effect CSS need RubyAnimate object and keyframes');
            }

            // Return the current effect
            return fxCur;
        },











        /**
         * UPDATE TWEEN-ANIMATE FOR SLIDE
         */
        UpdateTweenFromCss : function($slCur, fxName) {
            VariableModule(this);


            /**
             * CONVERT CSS-ANIMATE TO TWEEN-ANIMATE
             */
            var idNext    = va.fxCSS.idNext,
                speedCur  = va.speed[idNext],
                easingCur = M.Data(va.$s.eq(idNext))['opts']['cssEasing'],
                cssTween  = M.Module('RUBYANIMATE').Tween(fxName, speedCur, undefined, easingCur);



            /**
             * TWEEN-ANIMATE FOR CURRENT SLIDE
             */
            if( !!cssTween ) {

                for( var i = 0, len = cssTween.length; i < len; i++ ) {
                    var animCur = cssTween[i];

                    // Case: the first animate
                    if( i == 0 ) {
                        va.tweenSlide.css($slCur, animCur);
                    }

                    // Case: the rest aniamte
                    else {
                        va.tweenSlide.animate($slCur, animCur.prop, animCur.opts, false);
                    }
                }
            }


            /**
             * CASE: RUBY-ANIAMTE NOT EXIST
             */
            else {
                va.tweenSlide.animate($slCur, {}, { duration: speedCur }, false);
            }




            /**
             * CLASS 'MASK' FOR VIEWPORT IN 'CSS-ONE' EFFECT
             */
            if( va.fxCSS.isMask ) va.$viewport.addClass(va.ns + 'css-mask');
        },

        /**
         * RESET TRANSFORM FOR SLIDE AFTER COMPLETE EFFECT
         */
        ResetTFSlideCss : function() {
            VariableModule(this);


            /**
             * REMOVE STYLE + CLASS ON THE 'NEXT' / 'PREVIOUS' SLIDE
             */
            var fxCSS     = va.fxCSS,
                $slCur    = va.$s.eq( fxCSS.idCur ),
                $slNext   = va.$s.eq( fxCSS.idNext ),
                $slCur2   = va.$s.eq( cs.idLast ),
                $slNext2  = va.$s.eq( cs.idCur ),

                $twoSlide = $('').add($slCur).add($slNext).add($slCur2).add($slNext2),
                strClass  = '{ns}css-prev {ns}css-next'.replace(/\{ns\}/g, va.ns);


            $twoSlide
                // Remove css-style
                .css('opacity', '')
                .css(va.cssTf, '')
                .css(va.prefix +'transform-origin', '')
                .css('z-index', '')

                // Remove class
                .removeClass(strClass);



            /**
             * REMOVE CLASS 'MASK' ON VIEWPORT
             */
            va.$viewport.removeClass(va.ns + 'css-mask');
        },

        /**
         * RESET TWEEN-ANIMATE OF SLIDE
         */
        ResetTweenCss : function(idCur, idNext) {
            VariableModule(this);

            var fxCSS  = va.fxCSS,
                $slOut = va.$s.eq(idCur),
                $slIn  = va.$s.eq(idNext);


            /**
             * EFFECT 'OUT' / 'IN'
             * + Support get effect in array[]
             */
            var fxCur  = M.RandomInArray(va.fx[idNext], va.fxCssLast),
                isMask = !!fxCur.isMask,
                fxOut, fxIn;


            // Setup in 'cssOne' effect
            fxCur = fxCur[fxCSS.isNext ? 'next' : 'prev'];
            fxOut = va.fxCssOutLast = M.RandomInArray(fxCur[0], va.fxCssOutLast);
            fxIn  = va.fxCssInLast  = M.RandomInArray(fxCur[1], va.fxCssInLast);


            // Reset Style & Transform for slide
            // Use 'fxCSS' variable with old-value
            that.ResetTFSlideCss();

            // Update the properties in 'fxCSS'
            fxCSS.idCur  = idCur;
            fxCSS.idNext = idNext;
            fxCSS.fxOut  = fxOut;
            fxCSS.fxIn   = fxIn;
            fxCSS.isMask = isMask;




            /**
             * THE START NEW EFFECT
             */
            // Reset tween-slide
            va.tweenSlide.reset(true);

            // Add class on slide when start swipe
            $slOut.addClass(va.ns +'css-prev');
            $slIn.addClass(va.ns +'css-next');

            // Setup Tween-animate for slide
            that.UpdateTweenFromCss($slOut, fxOut);
            that.UpdateTweenFromCss($slIn, fxIn);
        },












        /**
         * THE SLIDE IS BUFFER TRANSLATE
         */
        BufferCss : function(sign) {
            VariableModule(this);
            var fxCSS = va.fxCSS;


            /**
             * ID CURRENT - NEXT
             */
            var idCur  = cs.idCur,
                idNext = idCur + sign;

            if     ( idNext < 0 ) idNext = cs.num - 1;
            else if( idNext > cs.num - 1 ) idNext = 0;

            // Check change on ID-next
            var isIDNextChange = (fxCSS.idNext != idNext);




            /**
             * UPDATE TWEEN-SLIDE WHEN CHANGE VALUE
             */
            if( !fxCSS.status || isIDNextChange ) {

                // Reset Tween-animate of slide
                fxCSS.isNext = sign > 0;
                that.ResetTweenCss(idCur, idNext);
            }

            // Update variable 'status'
            fxCSS.status = 'buffer';



            /**
             * THE CURRENT VALUE OF TWEEN
             */
            var movePercent = M.A(va.xOffset) / va.wSlide * 100;
            va.tweenSlide.go( movePercent );
        },

        /**
         * RESTORE TRANSFORM OF SLIDE IN SWIPE-GESTURES
         */
        RestoreCss : function() {
            VariableModule(this);


            /**
             * UPDATE VARIABLE 'STATUS' TO RECOGNIZE THE TYPE ACTION
             */
            va.fxCSS.status = 'restore';


            /**
             * REVERSE DIRECTION OF TWEEN & RESET TRANSFORM OF SLIDE
             */
            that.ToSlideCss();
        },

        /**
         * COMPLETE EFFECT AFTER MOVE BUFFER || TOGGLE SLIDE BY NAG - PAG
         */
        ToSlideCss : function() {
            VariableModule(this);
            var that       = this,      // Support use correct the variables in event 'complete' of tween
                fxCSS      = va.fxCSS,
                tweenSlide = va.tweenSlide;


            /**
             * FUNCTION : COMPLETE EFFECT
             */
            function TweenComplete() {
                tweenSlide.eventComplete(function() {

                    // Reset 'style' & 'transform' for slide
                    that.ResetTFSlideCss();

                    // Update the variable in toggle-end
                    that.TOSLIDE.End();
                    fxCSS.status = null;
                });
            }




            /**
             * TWEEN-ANIMATE EXECUTE CONTINUOUS AFTER SWIPE BUFFER
             */
            if( fxCSS.status == 'buffer' ) {
                fxCSS.status = 'play';

                // Event 'complete' when complete effect
                TweenComplete();

                // Continue execute the effect
                tweenSlide.resume();
            }



            /**
             * CASE: RESTORE TWEEN-ANIMATE AFTER SWIPE BUFFER
             */
            else if( fxCSS.status == 'restore' ) {

                // Event 'complete' when complete tween
                TweenComplete();

                // Reverse effect
                va.tweenSlide.reverse();
            }



            /**
             * CASE: TOGGLE SLIDE BY NAV - PAG
             */
            else {

                // ID of current - next slide
                var idCur  = cs.idLast,
                    idNext = cs.idCur;

                // Reset Tween-animate of slide
                fxCSS.isNext = va.nMove > 0;
                that.ResetTweenCss(idCur, idNext);

                // Event 'complete'
                TweenComplete();

                // Start play Tween-animate
                fxCSS.status = 'play';
                tweenSlide.restart();
            }
        }
    };
})(jQuery);











/**
 * MODULE RUBYANIMATE KEYFRAMES
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, va;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        va   = self.va;
    }


    /**
     * RUBY ANIMATE KEYFRAMES
     */
    rt01MODULE.RUBYANIMATE = {

        /**
         * ANIMATE DEFAULT KEYFRAME
         */
        keyframeDefault : {
            duration : 400,
            easing   : 'easeOutQuad',
            animEnd  : {
                pos     : 100,
                x       : 0,
                y       : 0,
                z       : 0,
                scale   : 1,
                skew    : 0,
                rotate  : 0,
                rotateX : 0,
                rotateY : 0,
                rotateZ : 0,
                opacity : 1
            }
        },

        /**
         * COPY ALL PROPERTY FROM THIS OBJECT TO THAT OBJECT
         */
        CopyData : function(source) {
            var copy = {};
            for( var name in source ) {

                if( name != 'pos' ) copy[name] = source[name];
            }
            return copy;
        },











        /**
         * UPDATE & COMPLETE PARTICULAR KEYFRAME
         */
        UpdateDataToKeyframe : function(animate) {
            VariableModule(this);
            var keyframes = window.__rubyAnimateKeyframes__ || {};

            // Conditional execution
            if( !($.isArray(animate) && animate.length) ) return false;




            /**
             * SPLIT INTO PARTICULAR ANIAMTE IF POSITION IS ARRAY[]
             */
            var deleteID = [];
            for( var i = 0, len = animate.length; i < len; i++ ) {
                var animCur = animate[i];


                /**
                 * CASE: ARRAY[]
                 */
                if( $.isArray(animCur['pos']) ) {

                    /**
                     * COPY ANIMATE WITH DIFFERENT POSITION
                     */
                    for( var j = 0, lenJ = animCur.pos.length; j < lenJ; j++ ) {

                        var animAdd = that.CopyData(animCur);
                        animAdd.pos = animCur.pos[j];

                        // Insert to current Animate
                        animate.push(animAdd);
                    }


                    /**
                     * STORE ID NEED DELETE
                     */
                    deleteID.push(i);
                }
            }




            /**
             * DELETE ANIMATE WITH ID STORED ABOVE
             */
            var iPlus = 0;
            for( var i = 0, len = deleteID.length; i < len; i++ ) {

                animate.splice(deleteID[i] - iPlus, 1);
                iPlus++;
            }





            /**
             * ARRANGE POSITION IN ORDER INCREASE IN ANIMATION
             */
            var animNew = [];
            for( var i = 0, len = animate.length; i < len; i++ ) {

                /**
                 * RESET PROPERTIES AT FIRST
                 */
                var posCur = Number.MAX_VALUE,
                    jCur   = 0;



                /**
                 * LOOP TO GET SMALLEST IN CURRENT ARRAY[]
                 */
                for( var j = 0, lenJ = animate.length; j < lenJ; j++ ) {
                    if( animate[j].pos < posCur ) {
                        posCur = animate[j].pos;
                        jCur = j;
                    }
                }

                // Store into new array[]
                animNew.push( animate[jCur] );

                // Remove aniamte with smallest position
                animate.splice(jCur, 1);
            }

            keyframes[name] = animate = animNew;




            /**
             * UPDATE ANIMATE BEGIN FOR KEYFRAME
             */
            var animBegin = animate[0];

            // Additional position-end if Keyframe only 1 animation & without property 'position'
            if( animBegin.pos === undefined && animate.length == 1 ) {
                animBegin.pos = 100;
            }

            // Additional empty property with position-begin no exist
            if( animBegin.pos !== 0 ) {
                animate.unshift({ pos: 0 });
            }



            /**
             * UPDATE ANIMATE-END FOR KEYFRAME IF THERE IS NOT
             */
            var animEnd = animate[animate.length - 1];

            if( animEnd.pos != 100 ) {
                animate.push( that.keyframeDefault.animEnd );
            }

            return animate;
        },

        /**
         * UPDATE ALL KEYFRAMES IN SYSTEM
         *  + Support call function from outside
         */
        UpdateAllKeyframes : function() {
            VariableModule(this);


            /**
             * SETUP ALL KEYFRAMES TRONG PARTICULAR RUBY & DEFAULT KEYFRAME IN SYSTEM
             */
            var keyframes = $.extend(true, {}, o.rubyAnimateKeyframes, window.__rubyAnimateKeyframes__);



            /**
             * SETUP EACH RUBY-ANIMATE KEYFRAME
             */
            for( var name in keyframes ) {

                // Get animate of current keyframe
                var animate = keyframes[name];

                // Add data into animate keyframe
                keyframes[name] = that.UpdateDataToKeyframe(animate);
            }

            // Store into ruby system
            va.rubyAnimateKeyframes = keyframes;




            /**
             * UPDATE RUBY-ANIMATE ONE
             *  + Update RubyAnimate window
             */
            va.rubyAnimateOne = $.extend(true, {}, o.rubyAnimateOne, window.__rubyAnimateOne__);
        },










        /**
         * SETUP RUBY-ANIMATE TO TWEEN-ANIAMTE
         */
        Tween : function(nameKey, duration, delay, easing, keyframes) {
            VariableModule(this);
            var tween, animate;


            /**
             * SETUP KEYFRAMES: SUPPORT KEYFRAMES OUTSIDE
             */
            keyframes = keyframes || va.rubyAnimateKeyframes;




            /**
             * GET KEYFRAME AT FIRST
             */
            // Case normal: namekey is string
            if( typeof nameKey === 'string' ) {
                animate = keyframes[nameKey];
            }

            // Case: namekey is array[] -> Animate custom
            else if( $.isArray(nameKey) && nameKey.length ) {

                // Copy array to new array
                var keyframe = nameKey.slice();

                // Update data into keyframe
                animate = that.UpdateDataToKeyframe(keyframe);
            }



            /**
             * CONDITIONAL EXECUTION
             */
            if( !animate ) return;
            tween = [];



            /**
             * VALUE TRANSFORM AT FIRST
             */
            tween[0] = that.CopyData(animate[0]);



            /**
             * CONVERT DURATION-TIME IN ANIAMTION
             */
            var posLast = 0;
            for( var i = 1, len = animate.length; i < len; i++ ) {

                var animCur  = animate[i],
                    tweenCur = { prop: that.CopyData(animCur), opts: {} };



                /**
                 * PROPERTY 'DURATION'
                 */
                var optsCur = tweenCur.opts,
                    posCur  = animCur.pos;

                optsCur.duration = (posCur - posLast) / 100 * duration;
                posLast = posCur;



                /**
                 * GET PROPERTY 'DELAY'
                 *  + Only setup first property
                 */
                if( delay !== undefined && delay !== null && i == 1 ) {
                    optsCur.delay = delay;
                }



                /**
                 * PROPERTY 'EASING'
                 *  + Only setup first property
                 */
                if( easing !== undefined && easing !== null && i == 1 ) {
                    optsCur.easing = easing;
                }



                /**
                 * INSERT CURRENT TWEEN INTO SYSTEM
                 */
                tween.push(tweenCur);
            }

            // Return Tween-animate after setup
            return tween;
        },










        /**
         * CONVERT RUBY-ANIMATE ONE TO 4 PARTICULAR NAME
         */
        OneConvertFour : function(nameKey) {
            var animateOne = this.va.rubyAnimateOne;

            // Return keyframe
            return animateOne[nameKey] || animateOne['_default_'];
        }
    };
})(jQuery);











/**
 * MODULE SLIDESHOW
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, oo, cs, va, is, ti, M, TIMER;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that  = self;
        o     = self.o;
        oo    = self.oo;
        cs    = self.cs;
        va    = self.va;
        is    = self.is;
        ti    = self.ti;
        M     = self.M;
        TIMER = M.Module('TIMER');
    }


    /**
     * MODULE SLIDESHOW
     * @param int va.tDelay
     */
    rt01MODULE.SLIDESHOW = {

        /**
         * RENDER BUTTON PLAY-PAUSE
         */
        RenderControl : function() {
            VariableModule(this);


            /**
             * CASE: CREATE NEW 'CONTROL' MARKUP
             */
            if( is.ssControl && !is.$ssControl ) {

                /**
                 * SEARCH 'CONTROL' MARKUP AT OUTSIDE
                 */
                var classes      = '.'+ va.ns + 'ss-control',
                    $controlHTML = that.RENDER.SearchNode(classes);

                if( $controlHTML.length ) {
                    va.$ssControl = $controlHTML;
                    is.ssControlOutside = true;
                }
                else {
                    // Create markup by take in option
                    var $controlWrap = $( M.NS(o.markup.ssControl) );

                    // Check 'control' markup inside control-wrap
                    va.$ssControl   = $controlWrap.hasClass(va.ns + 'ss-control')
                                    ? $controlWrap
                                    : $controlWrap.find(classes);

                    // Render 'control' to insdie ruby
                    that.RENDER.Into(o.markup.ssControlInto, $controlWrap);
                }

                // Update variable
                is.$ssControl = true;

                // Start play slideshow if create new control in 'api.update()'
                if( va.optsUpdate ) {
                    that.Pause(true);
                    that.Init();
                }
            }


            /**
             * CASE: REMOVE 'CONTROL' MARKUP
             */
            else if( !is.ssControl && is.$ssControl ) {
                va.$ssControl[ is.ssControlOutside ? 'empty' : 'remove' ]();
                is.$ssControl = false;
            }










            /**
             * CASE: CREATE NEW 'PLAY-PAUSE' MARKUP
             */
            if( is.playpause && !is.$playpause ) {

                /**
                 * SERACH MARKUP OF PLAY-PAUSE AT OUTSIDE
                 */
                var classes   = '.'+ va.ns + o.namePlay,
                    $playHTML = that.RENDER.SearchNode(classes);

                if( $playHTML.length ) {
                    va.$playpause = $playHTML;
                    is.playpauseOutside = true;
                }
                else {
                    // Create new $playPause
                    va.$playpause = $('<div/>', {'class' : va.ns + o.namePlay, 'text' : 'play-pause'});

                    // Add play-pause into target
                    that.RENDER.Into(o.markup.playInto, va.$playpause);
                }

                // Update variable
                is.$playpause = true;



                /**
                 * TOGGLE CLASS 'ACTIVED' ON PLAY-PAUSE DENPENDING ON 'AUTORUN' OPTION
                 */
                if( !is.autoRun ) {
                    is.ssPauseAbsolute = true;
                    va.$playpause.addClass(va.actived);
                }
            }


            /**
             * CASE: REMOVE 'PLAY-PAUSE' MARKUP
             */
            else if( !is.playpause && is.$playpause ) {
                !is.playpauseOutside && va.$playpause.remove();
                is.$playpause = false;
            }
        },

        /**
         * INITIALIZE SLIDESHOW
         */
        Init : function() {
            VariableModule(this);

            // Register events on slideshow
            M.Scroll.Setup();

            // Play slideshow at first
            that.Go('init');
        },

        /**
         * CONTROL SLIDESHOW
         */
        Go : function(status) {
            VariableModule(this);


            /**
             * CONDITIONAL EXECUTION
             */
            if( is.stop ) return;
            // console.log('SLIDESHOW.Go', status);




            /**
             * PAUSE SLIDESHOW WHEN ORDERED TO PAUSE
             */
            var slCurData = M.Data(cs.idCur),
                actionCur = null,
                PLAY      = 'play',
                PAUSE     = 'pause';


            if( is.ssPauseAbsolute ) {

                // Only pause slideshow when playing
                if( is.ssPlaying ) {
                    that.Pause();
                    actionCur = PAUSE;
                }
            }
            else {

                /**
                 * PAUSE SLIDESHOW:
                 *  + Ruby placed outside display area of window-browser
                 *  + Is being mouse-hover on ruby
                 *  + The current slide have video playing
                 *  + The effect running has command 'go'
                 *  + The current slide not loaded
                 */
                if( (is.ssRunInto && !is.into) || is.mouseHover || va.nVideoOpen || is.fxRun || !slCurData.isLoaded ) {

                    // 'is.ssPlaying' : recognize timer have running
                    if( is.ssPlaying ) {
                        that.Pause();
                        actionCur = PAUSE;
                    }
                }

                /**
                 * CASE: HAVE 'GO' COMMAND BUT NOT TOGGLE SLIDE
                 */
                else if( !is.fxRun ) {

                    // Only for first case without 'autoRun' slideshow
                    if( !$.isNumeric(va.tDelay)) {
                        that.ResetPropThenPlay();
                        actionCur = PLAY;
                    }
                    else if( is.hoverAction ) {
                        if( !is.ssPlaying ) {
                            that.ResetPropThenPlay();
                            actionCur = PLAY;
                        }
                    }
                    else {
                        if( !is.ssPlaying ) {
                            that.Play();
                            actionCur = PLAY;
                        }
                    }
                }
            }



            /**
             * EXECUITE BY 'STATUS' OPTION
             */
            if( status == 'slideToBegin' ) {

                // Complete timer slideshow by 'fade' effect
                is.TIMER && TIMER[M.ProperCase(va.timer) +'AnimationEnd']();
            }
        },











        /**
         * RE-CALCULATE PROPERTIES OF TIMER -> CONTINUE TO PLAY SLIDEHOSW
         */
        ResetPropThenPlay : function() {
            VariableModule(this);

            // Reset value of variables
            if( va.tDelay != va.delay[cs.idCur] ) va.tDelay = va.delay[cs.idCur];

            if( is.TIMER ) {
                if     ( va.timer == 'line' && va.xTimer != 100 )  va.xTimer     = 100;
                else if( va.timer == 'arc' )                       va.arc.angCur = 0;
            }

            // Continue to calculate in 'play()'
            that.Play();
        },

        /**
         * PLAY NEXT SLIDE IN SLIDESHOW
         * @param int va.tDelay Variable is very important, control to slideshow
         */
        Play : function() {
            var that = this;
            VariableModule(that);


            va.tTimer0 = +new Date();
            is.ssPlaying = true;
            is.timer && TIMER[M.ProperCase(va.timer) +'Animation']();


            // Toggle to next slide
            clearTimeout(ti.play);
            ti.play = setTimeout(function() {
                VariableModule(that);

                var num      = cs.num,
                    idCur    = cs.idCur,
                    isRandom = o.slideshow.isRandom && num >= 1,
                    idNext   = isRandom ? M.RandomInArray2(va.idMap, va.ssIDRandom, idCur)
                                        : (idCur >= num-1 ? 0 : idCur + 1);


                /**
                 * CHECK TO TOGGLE NEXT SLIDE
                 */
                var $slNext         = va.$s.eq(idNext),
                    slData          = M.Data($slNext),
                    isLazy          = slData.opts.load.isLazy,
                    isGotoNextSlide = isLazy || (!isLazy && slData.isLoaded);



                /**
                 * PLAY - PAUSE SLIDEHSOW IN THE CASES
                 */
                // Case: allow to toggle next slide
                if( isGotoNextSlide ) {
                    if     ( isRandom )                   that.TOSLIDE.Run(idNext, true);
                    else if( !is.loop && idCur == num-1 ) that.TOSLIDE.Run(0, true);
                    else                                  that.EVENTS.Next(true);
                }

                // Case: stop, not allow to toggle next slide
                else cs.stop();

            }, va.tDelay);
        },

        /**
         * PAUSE || STOP SLIDESHOW
         */
        Pause : function(isStop) {
            VariableModule(this);
            var idCur = cs.idCur;

            // Reset the variables at first
            is.ssPlaying = is.hoverAction = false;


            /**
             * CASE: 'STOP'
             */
            if( !!isStop ) {
                va.tDelay = va.delay[idCur];
            }

            /**
             * CASE: 'PAUSE'
             */
            else {

                var t0 = va.tDelay;
                va.tTimer1 = +new Date();
                va.tDelay  = va.delay[idCur] - (va.tTimer1 - va.tTimer0);

                if( va.delay[idCur] != t0 ) va.tDelay -= va.delay[idCur] - t0;
                if( va.tDelay < 0 ) {
                    va.tDelay = 0;

                    // !important to solve hover slideshow when fxRunning
                    is.hoverAction = true;
                }
            }


            /**
             * OTHER SETUP
             * + Stop & remove timer playing
             */
            is.timer && TIMER.Stop();
            clearTimeout(ti.play);
        },












        /**
         * EVENT 'HOVER' ON SLIDEHOSW
         */
        EventHover : function() {
            var that = this;
            VariableModule(that);

            // Remove event on slideshow at first
            va.$ruby.off(va.ev.mouseenter +' '+ va.ev.mouseleave);

            // Re-register event depneding on option
            if( o.slideshow.isHoverPause ) {
                is.mouseHover = false;

                va.$ruby
                    .on(va.ev.mouseenter, function() {
                        that.is.mouseHover = true;
                        that.Go('mouseenter');
                    })
                    .on(va.ev.mouseleave, function() {
                        that.is.mouseHover = false;
                        that.Go('mouseleave');
                    });
            }
        },

        /**
         * EVENT 'TAP' ON THE ELEMENTS OF SLIDESHOW
         */
        EventTap : function() {
            VariableModule(this);
            var that   = this,
                evName = va.ev.click;       // Not event 'touch' -> conflict with event 'click' on IE10+


            /**
             * EVENT 'TAP' ON PLAY-PAUSE
             */
            if( !!va.$playpause ) {

                // Remove event 'tap' at first
                va.$playpause.off(evName);

                // Re-register event depending on option
                if( is.playpause ) {

                    va.$playpause.on(evName, function(e) {
                        VariableModule(that);

                        // Calculate position of ruby
                        M.Scroll.Check(true);

                        // Execute 'play - pause' depending on class 'actived'
                        if( va.$playpause.hasClass(va.actived) ) that.Api('play');
                        else that.Api('pause');

                        return false;
                    });
                }
            }
        },

        /**
         * API PLAY - PAUSE - STOP
         */
        Api : function(action) {
            var that = this;
            VariableModule(that);


            /**
             * API 'PLAY'
             *  + Only execute when not running slideshow
             */
            if( action == 'play' ) {

                // Initialize slideshow if option have not
                if( !o.isSlideshow ) {
                    o.isSlideshow = true;
                    that.Init();
                }

                // Add 'is.ssPauseAobsolute' condition -> avoid play command in the pause mode
                if( is.ssPauseAbsolute ) {

                   // Remove class 'actived' on PlayPause button
                    !!va.$playpause && va.$playpause.removeClass(va.actived);
                    // Remove variale prevent play slideshow
                    is.stop = is.ssPauseAbsolute = false;
                    // Execute 'go' command when not play slideshow
                    !is.fxRun && that.Go('apiPlay');
                    // Trigger event 'slideshowPlay'
                    cs.ev.trigger('slideshowPlay');
                }
            }



            /**
             * API 'PAUSE'
             */
            else if( action == 'pause' ) {
                if( !is.ssPauseAbsolute ) {

                    // Add class 'actived' on PlayPause button
                    !!va.$playpause && va.$playpause.addClass(va.actived);
                    // Other setup
                    is.ssPauseAbsolute = true;
                    that.Go('apiPause');
                    // Trigger event 'slideshowPause'
                    cs.ev.trigger('slideshowPause');
                }
            }



            /**
             * API 'STOP'
             */
            else if( action == 'stop' ) {
                if( !is.stop ) {

                    // Add class 'actived' on PlayPause button
                    !!va.$playpause && va.$playpause.addClass(va.actived);

                    // Notice pause slideshow
                    is.stop = is.ssPauseAbsolute = true;
                    that.Pause(true);
                    // Trigger event 'slideshowStop'
                    cs.ev.trigger('slideshowStop');
                }
            }
        },










        /**
         * UPDATE THE ALL SLIDESHOW & TIMER
         */
        UpdateAll : function() {
            VariableModule(this);

            // Toggle 'timer' markup
            var slideshow0 = oo.slideshow,
                slideshow1 = o.slideshow;


            /**
             * CONDITIONAL EXECUTION
             */
            if( slideshow0 === undefined ) return;



            /**
             * THE PROPERTIES OF TIMER
             */
            if( is.timer ) {

                // Update property of Timer-arc
                if( va.timer == 'arc' ) TIMER.ArcSetupInit();

                // Update markup of Timer
                TIMER[ M.ProperCase(va.timer) + 'Animation' ]();
            }




            /**
             * UPDATE PROPERTY SLIDE IF IT IS CHANGES
             *  + Update slideshow after update Timer
             */
            if( oo.isSlideshow != o.isSlideshow ) {

                // Initialize slideshow
                if( o.isSlideshow ) {
                    that.Init();
                }

                // Pause slideshow
                else {
                    that.Pause(true);

                    va.$w.off(va.ev.scroll);
                    va.$ruby.off(va.ev.mouseenter +' '+ va.ev.mouseleave);
                }
            }
        }
    };
})(jQuery);










/**
 * MODULE TIMER
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        ti   = self.ti;
        M    = self.M;
    }


    /**
     * MODULE TIMER FOR SLIDESHOW
     */
    rt01MODULE.TIMER = {

        /**
         * RENDER 'TIMER' MARKUP
         */
        Render : function() {
            VariableModule(this);


            /**
             * FUNCTION : REMOVE TIMER
             */
            function TimerRemove() {
                va.$timer[ is.timerOutside ? 'empty' : 'remove' ]();
                is.$timer = false;
            }


            /**
             * REMOVE TIMER IF THE 'SLIDESHOW.TIMER' OPTION CHANGES
             */
            var oo = that.oo;
            if( !!oo.slideshow && oo.slideshow.timer != o.slideshow.timer ) {
                !!va.$timer && TimerRemove();
            }




            /**
             * CASE: CREATE NEW 'TIMER' MARKUP
             */
            if( is.timer && !is.$timer ) {

                /**
                 * SEARCH $TIMER MARKUP AT OUTSIDE
                 */
                var className  = va.ns + o.nameTimer,
                    classType  = className + '-' + va.timer,
                    $timerHTML = that.RENDER.SearchNode('.'+ className);

                if( $timerHTML.length ) {
                    va.$timer = $timerHTML.addClass(classType);
                    is.timerOutside = true;
                }
                else {
                    va.$timer = $('<div/>', {'class' : className +' '+ classType});
                    that.RENDER.Into(o.markup.timerInto, va.$timer);
                }

                // Update variable
                is.$timer = true;



                /**
                 * MARKUP & PROPERTY OF TIMER-ITEM
                 */
                // TIMER LINE
                if( va.timer == 'line' ) {
                    va.$timerItem = $('<div/>', {'class' : className +'item'});
                    va.$timer.append(va.$timerItem);

                    // Initialize setup
                    that.LineSetupInit();
                }

                // TIMER ARC
                else if( va.timer == 'arc' ) {
                    va.$timerItem = $('<canvas></canvas>');
                    va.$timer.append(va.$timerItem);

                    // Initialize setup
                    that.ArcSetupInit();
                }
            }



            /**
             * CASE: REMOVE 'TIMER' MARKUP
             */
            else if( !is.timer && is.$timer ) {
                TimerRemove();
            }
        },











        /**
         * TIMER-LINE AFTER RENDER
         */
        LineSetupInit : function() {
            VariableModule(this);

            // Tween-css for $timer-item
            M.GetTween(va.$timerItem).css(va.$timerItem, {
                'x' : '-100%'
            });
        },

        /**
         * ANIMATION ON TIMER-ITEM
         */
        LineAnimation : function() {
            VariableModule(this);


            // At first, remove transition & reset position for Timer
            that.LineAnimationReset(va.xTimer);

            // Reset transform for Timer
            M.GetTween(va.$timerItem)
                .animate(va.$timerItem, { 'x': 0 }, {

                    isNew    : true,
                    duration : va.tDelay,
                    easing   : 'linear'
                });
        },

        /**
         * REMOVE TRANSITION & RESET POSITION FOR TIMER-LINE
         */
        LineAnimationReset : function(xReset) {
            VariableModule(this);


            // Tween-css for $timer-item
            M.GetTween(va.$timerItem).css(va.$timerItem, {
                'x' : - xReset.toFixed(2) + '%'
            });
        },

        /**
         * THE ANIMATION AFTER COMPLETE TIMER
         */
        LineAnimationEnd : function() {
            var that = this;
            VariableModule(that);


            // ID-next slide -> to get 'speed' of next slide
            var idNext = cs.idCur + 1;
            if( idNext > cs.num - 1 ) idNext = 0;


            // 'Fade' effect for Timer-item
            M.GetTween(va.$timerItem)
                .animate(va.$timerItem, { 'opacity': 0 }, {

                    isNew    : true,
                    duration : va.speed[idNext] - 100,
                    complete : function() {
                        VariableModule(that);

                        // Remove 'opacity' css after complete Tween
                        va.$timerItem.css({ 'opacity': '' });

                        // Remove transition & reset position for Timer
                        that.LineAnimationReset(100);
                    }
                });
        },










        /**
         * TIMER ARC AT FIRST AFTER RENDER
         */
        ArcSetupInit : function() {
            VariableModule(this);
            var timerArc = o.timerArc;

            // The properties of timer-arc
            var PropSetup = {
                    angCur : (!!va.arc && !!va.arc.angCur) ? va.arc.angCur : 0,     // Angle Current, get angle last if update by api
                    pi     : Math.PI / 180,
                    width  : (timerArc.width === null)  ? M.Width(va.$timer)  : timerArc.width,
                    height : (timerArc.height === null) ? M.Height(va.$timer) : timerArc.height,
                    speed  : ~~(1000 / timerArc.fps)
                };

            // Merge all properties above with default properties
            va.arc = $.extend(true, {}, o.timerArc, PropSetup);

            // The size of timer-arc
            va.$timerItem.attr({'width' : va.arc.width, 'height' : va.arc.height});




            /**
             * STYLE FOR TIMER-ARC
             */
            va.tContext = va.$timerItem[0].getContext('2d');

            function ArcSet() {
                var c = va.tContext;
                c.setTransform(1, 0, 0, 1, 0, 0);
                c.translate( va.arc.width / 2, va.arc.height / 2 );
                c.rotate( - va.arc.pi * (90 - va.arc.rotate) );

                c.strokeStyle = va.arc.stroke;
                c.fillStyle   = va.arc.fill;
                c.lineWidth   = va.arc.weight;
            }
            ArcSet();
        },

        /**
         * ANIMATTION ON TIMER-ARC
         */
        ArcAnimation : function(isRunOne) {
            VariableModule(this);
            var that   = this,
                ctx    = va.tContext,
                ARC    = va.arc,
                inFill = Math.ceil((ARC.radius - ARC.weight) / 2);



            /**
             * DRAW TIMER-ARC
             */
            function ArcDraw(angPlus) {

                // Clear the before draw canvas at first
                ctx.clearRect(-ARC.width / 2, - ARC.height / 2, ARC.width, ARC.height);
                ctx.globalAlpha = 1;

                // Draw arc-line outside
                ctx.beginPath();
                ctx.lineCap = 'round';      // Make head line round

                ctx.arc(0, 0, ARC.radiusOuter, 0, ARC.pi * 360, false);
                ctx.lineWidth   = ARC.weightOuter;
                ctx.strokeStyle = ARC.strokeOuter;
                ctx.fillStyle   = ARC.fillOuter;
                ctx.stroke();
                ctx.fill();

                // Draw line-fill inside
                ctx.beginPath();
                ctx.arc(0, 0, inFill + 1, 0, ARC.pi * Math.ceil(ARC.angCur * 10) / 10, false);
                ctx.lineWidth   = inFill * 2 + 2;
                ctx.strokeStyle = ARC.fill;
                ctx.stroke();

                // Draw line-stroke inside
                ctx.beginPath();
                ctx.arc(0, 0, ARC.radius, 0, ARC.pi * ARC.angCur, false);
                ctx.lineWidth   = ARC.weight;
                ctx.strokeStyle = ARC.stroke;
                ctx.stroke();

                // The angle of current timer-arc
                ARC.angCur += angPlus;

                // Remove 'interval' after draw complete Timer
                if( va.arc.angCur > 370 ) clearInterval(ti.timer);
            }



            /**
             * LOOP TO DRAW TIMER-ARC
             *  + At first, remove timer-interval
             */
            clearInterval(ti.timer);
            is.enableTimerAnimEnd = true;

            if( !!isRunOne ) {
                ArcDraw(0);
            }

            else {
                // Get time at first
                var tsBegin = +new Date();

                // Create loop to draw timer-arc
                ti.timer = setInterval(function() {
                    VariableModule(that);

                    /**
                     * THE ANGLE NECESSARY PLUS INTO TIMER-ARC
                     */
                    var tsCur   = +new Date(),
                        tCur    = tsCur - tsBegin,
                        angPlus = tCur * 360 / va.delay[cs.idCur];

                    // Reset lai thoi gian luc ban dau
                    // Reset the initial time-duration
                    tsBegin = tsCur;

                    // Start draw timer-arc
                    ArcDraw(angPlus);
                }, ARC.speed);
            }
        },


        /**
         * ANIMATION FOR TIMER-ARC AFTER COMPLETE
         */
        ArcAnimationEnd : function() {
            VariableModule(this);
            var fps        = 30,                                        // 'Frame per second' to refresh draw timer-acr
                delay      = 1000 / fps,
                speedMinus = va.speed[cs.idCur] >= 600 ? 400 : 100,     // Time minus
                speedCur   = va.speed[cs.idCur] - speedMinus,
                nStep      = speedCur / delay - 1,
                alphaCur   = 1,
                delayCur   = 0,
                alphaMinus;



            /**
             * FUNCTION : DRAW THE LINE-ARC OF TIMER
             */
            var ctx    = va.tContext,
                ARC    = va.arc,
                inFill = Math.ceil((ARC.radius - ARC.weight) / 2);

            function ArcDraw() {

                // Clear the draw canvas before at first
                ctx.clearRect(-ARC.width / 2, - ARC.height / 2, ARC.width, ARC.height);

                // Draw line-arc outside
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.arc(0, 0, ARC.radiusOuter, 0, ARC.pi * 360, false);
                ctx.lineWidth   = ARC.weightOuter;
                ctx.strokeStyle = ARC.strokeOuter;
                ctx.fillStyle   = ARC.fillOuter;
                ctx.stroke();
                ctx.fill();

                // Draw line-fill-arc inside
                ctx.globalAlpha = parseFloat(alphaCur.toFixed(3));
                ctx.beginPath();
                ctx.arc(0, 0, inFill + 1, 0, ARC.pi * Math.ceil(ARC.angCur * 10) / 10, false);
                ctx.lineWidth   = inFill * 2 + 2;
                ctx.strokeStyle = ARC.fill;
                ctx.stroke();

                // Draw line-stroke-arc inside
                ctx.beginPath();
                ctx.arc(0, 0, ARC.radius, 0, ARC.pi * ARC.angCur, false);
                ctx.lineWidth   = ARC.weight;
                ctx.strokeStyle = ARC.stroke;
                ctx.stroke();

                // 'Alpha' angle need to minus
                delayCur  += delay;
                alphaMinus = $.GSGDEasing.easeOutQuad(null, delayCur, 0, 1, speedCur);
                alphaCur   = 1 - alphaMinus;
                nStep--;

                // 'Alpha' angle of line-arc
                if( alphaCur <= 0.01 || nStep < 0  ) {
                    clearInterval(ti.timer);
                    is.enableTimerAnimEnd = true;
                    va.arc.angCur = 0;
                }
            }




            /**
             * LOOP OF ANIMATION
             *  + Variable 'enableTimerAnimEnd' : fixed when swap slide continuous but Animation-end of Timer still loop
             */
            if( is.enableTimerAnimEnd ) {
                is.enableTimerAnimEnd = false;

                clearInterval(ti.timer);
                ti.timer = setInterval(ArcDraw, delay);
            }
        },










        /**
         * STOP TIMER
         */
        Stop : function() {
            VariableModule(this);


            /**
             * STOP SLIDESHOW ON THE TIMERS
             */
            switch(va.timer) {
                case 'line' :
                    // Value transform
                    va.xTimer = va.tDelay / va.delay[cs.idCur] * 100;

                    // Tween-css for $timer-item
                    M.GetTween(va.$timerItem).css(va.$timerItem, {
                        'x' : - va.xTimer.toFixed(2) + '%'
                    });
                    break;


                case 'arc' :
                    // The current angle of Timer
                    va.arc.angCur = 360 - (va.tDelay / va.delay[cs.idCur] * 360);

                    // Re-draw Timer
                    that.ArcAnimation(true);

                    // Remove timer-interval of draw line-arc in Timer
                    clearInterval(ti.timer);
                    break;
            };
        }
    };
})(jQuery);










/**
 * MODULE FULLSCREEN
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE FULLSCREEN
     */
    rt01MODULE.FULLSCREEN = {

        Variable : function() {
            var that = this,
                va   = that.va,
                M    = that.M;

            // Get retio of Width / height content
            va.wContent = va.wRuby - (va.pa.left * 2);
            va.hContent = M.R(va.wContent / va.rRes);

            // Case: height-content < height-page
            if( va.hContent < va.hRuby ) {

                va.pa.top = M.R( (va.hRuby - va.hContent) / 2 );
            }

            // Case: height-content > height-page
            // -> Setup: height-content = height-page, re-calculate 'va.rate' & padding
            else {
                va.pa.top = 0;
                va.hContent = va.hRuby;
                va.wContent = M.R(va.hContent * va.rRes);

                va.rate = va.wContent / va.wRes;
                va.pa.left = M.R( (va.wRuby - va.wContent)/2 );
            }
        }
    };
})(jQuery);










/**
 * MODULE NESTED
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE NESTED
     */
    rt01MODULE.NESTED = {

        /**
         * REMOVE RUBY-NESTED IN CURRENT SLIDE WHEN USE 'API.REMOVE()'
         */
        Destroy : function($slCur) {
            var that = this;

            // Check ruby-nested exist
            var $nested = $slCur.find('.'+ that.va.ns);
            if( $nested.length ) {

                // Check ruby already initialized & have 'api.destroy()'
                var nestedData = $nested.data(rt01VA.rubyName);
                nestedData && nestedData.destroy && nestedData.destroy(true);
            }
        },


        /**
         * REFRESH THE VARIABLE IN RUBY-NESTED IN CURRENT SLIDE
         */
        RefreshInSlide : function($slCur) {
            var that = this,
                va   = that.va,
                $rubyNested = $slCur.find('.'+ va.ns);


            // Check in each ruby-nested (if have)
            $rubyNested.each(function() {
                var $self = $(this),
                    ruby  = $self.data(rt01VA.rubyName);

                // Only apply for ruby active
                if( !!ruby ) {

                    // Refresh ruby-nested for width / height < 10px
                    if( ruby.one.va.wRuby < 10 || ruby.one.va.hRuby < 10 ) ruby.refresh();
                }
            });
        }
    };
})(jQuery);










/**
 * MODULE CLASSADD
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE CLASSADD
     */
    rt01MODULE.CLASSADD = {

        // Check & store 'classAdd' of each slide
        Filter : function(opt) {

            var classAdd = '';
            if( opt.classAdd !== undefined ) {

                // Mark sure convert 'classAdd' to string
                classAdd = opt.classAdd.toString();
            }
            return classAdd;
        },


        // Toggle class on ruby when swap slide
        Toggle : function() {
            var va = this.va,
                cs = this.cs;

            var classLast = va.classAdd[cs.idLast],
                classCur  = va.classAdd[cs.idCur];

            // Remove class-old & add class-new
            if( classLast !== undefined && classLast != '' ) va.$ruby.removeClass(classLast);
            if( classCur  !== undefined && classCur  != '' ) va.$ruby.addClass(classCur);
        }
    };
})(jQuery);










/**
 * MODULE DISPLAY
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, va, is;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        va   = self.va;
        is   = self.is;
    }


    /**
     * MODULE DISPLAY RUBY
     */
    rt01MODULE.DISPLAY = {

        /**
         * INITIAZLIZE IN RUBY
         *  + Check ruby is 'sleep' mode (option 'show', 'showInRange')
         */
        SetupInit : function() {
            VariableModule(this);

            /**
             * DISPLAY ON THE DEVICE: 'DESKTOP' & 'MOBILE'
             */
            var isShowRuby = true;
            if( (is.mobile && o.showBy == 'desktop')
            ||  (!is.mobile && o.showBy == 'mobile') ) isShowRuby = false;

            if( isShowRuby ) {

                /**
                 * CONTINUE WITH OPTION 'SHOW-FROM'
                 */
                that.SetupVars();
                that.Check();

                // Swap to 'INIT.Ready' || event 'resize'
                is.awake ? that.INIT.Ready() : that.ResizeON();
            }

            // Remove ruby if that is unvalid device
            else va.$ruby.remove();
        },



        /**
         * VARIABLES OF 'SHOW-HIDE'
         * @param array va.showInRange
         * @param boolean is.showRuby
         */
        SetupVars : function() {
            VariableModule(this);
            var M = that.M;


            /**
             * VARIABLE 'SHOW-FROM'
             */
            if( !!o.showInRange ) {

                /**
                 * FUNCTION: CONVERT VARIABLE TO RANGE{}
                 * @return object chain
                 */
                function Chain2(val) {

                    if( $.isNumeric(val) )            val = [[val, 100000]];
                    else if( M.ElesIsNumber(val, 2) ) val = [val];

                    // Check value is array[] to continue
                    if( !$.isArray(val) ) return false;


                    var chain = { num : val.length };
                    for( i = chain.num-1; i >= 0; i-- ) {
                        var a = val[i];

                        // Additonal value is missing
                        if( $.isNumeric(a) ) a = [a, 100000];

                        // Convert value to other elements of 'chain'
                        chain[i] = { 'from': M.PInt(a[0]), 'to': M.PInt(a[1]) };
                    }
                    return chain;
                }

                // Convert 'showInRange' to Range{}
                va.showInRange = Chain2(o.showInRange);
            }

            // Default setup: if no showInRange value
            else {
                is.showInRange = is.awake = true;
            }
        },




        /**
         * KIEM RUBY DISPLAY IN CURRENT VISIBLE AREA WINDOW
         * @param boolean is.showInRange
         * @param boolean is.wake
         */
        Check : function() {
            VariableModule(this);
            var range = va.showInRange;


            /**
             * VARIABLE 'IS.SHOWINRANGE'
             */
            if( $.isPlainObject(va.showInRange) ) {
                is.showInRange = false;

                // Check continue in va.showInRange[]
                for( i = range.num - 1; i >= 0; i-- ) {
                    if( that.M.MatchMedia(range[i].from, range[i].to) ) {
                        is.showInRange = true;
                        break;
                    }
                }
            }


            /**
             * VARIABLE 'IS.AWAKE'
             *  + Ruby is sleeping -> ruby not initialize -> continue setup
             */
            if( is.awake === undefined && is.showInRange ) is.awake = true;
        },




        /**
         * TOGGLE CLASS 'NONE' ON RUBY
         */
        Toggle : function() {
            VariableModule(this);

            // Show: check
            that.Check();

            // Toggle class 'none' on ruby
            var hide = va.ns + 'none';
            va.$ruby[(is.showInRange ? 'remove' : 'add') + 'Class'](hide);
        },




        /**
         * EVENT RESIZE
         */
        ResizeON : function() {
            var that = this,
                va   = that.va,
                is   = that.is,
                ti   = that.ti;

            va.$ruby.addClass(va.ns + 'none');
            va.$w.on('resize.rubyShow' + va.rubykey, function() {

                clearTimeout(ti.showResize);
                ti.showResize = setTimeout(function() {

                    that.Check();
                    is.awake && that.ResizeOFF();
                }, 200);
            });
        },

        ResizeOFF : function() {
            VariableModule(this);

            va.$w.off('resize.rubyShow' + va.rubykey);
            va.$ruby.removeClass(va.ns + 'none');

            // Init ready when Ruby awake
            that.INIT.Ready();
        }
    };
})(jQuery);










/**
 * MODULE DEEPLINKING
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        ti   = self.ti;
    }


    /**
     * MODULE DEEPLINGING
     */
    rt01MODULE.DEEPLINKING = {

        /**
         * RETURN ALL VALUE HAST (ID) ON ADDRESS ON WEBPAGE
         */
        HashReturn : function(isIDReturn) {
            VariableModule(this);

            var that      = this,
                oDeeplink = o.deeplinking,

                // Choose prefix-custom & prefix-default -> priority prefix-custom
                prefix0   = oDeeplink.prefixDefault[0] + va.rubyID + oDeeplink.prefixDefault[1],
                rubyName  = (oDeeplink.prefix !== null) ? oDeeplink.prefix : prefix0,

                reStr     = rubyName +'\\d+',
                re        = new RegExp(reStr, 'g'),
                hash      = window.location.hash,
                linkCheck = hash.match(re),
                IDReturn;


            /**
             * PARSE STRING 'HASH' TO PARTICULAR HASHS
             */
            // Remove '#' character at first string
            hash = hash.replace(/^#/, '');

            // Split string 'hash' by '+' character
            var aHash = hash.split('+');




            /**
             * FUNCTION CHECK & RETURN ID-TEXT OF LAST SLIDE ON HASH
             */
            function IDTextOnHash() {
                if( oDeeplink.isIDConvert ) {
                    for( i = 0; i < va.IDsOnNode.length; i++ ) {

                        // ID current
                        var IDCur = va.IDsOnNode[i];

                        // Check ID match in Hast[] on browser
                        if( IDCur !== undefined && $.inArray(IDCur, aHash) !== -1 ) {
                            return i;
                        }
                    }
                }

                // Return 'null' value if not found on Hash
                return null;
            }




            // Return ID receive from Hash
            if( isIDReturn ) {

                // Priority read ID on node first
                IDReturn = IDTextOnHash();
                if( IDReturn !== null ) return IDReturn;


                // If not ID on node, continue check in format 'rubyID_slideID'
                if( linkCheck !== null ) {
                    IDReturn = that.M.PInt( linkCheck[0].substr(rubyName.length) );

                    // Re-setup 'idBegin' if IDReturn < cs.num
                    if( IDReturn < cs.num ) return IDReturn;
                }
                // Return 'null' value if invalid
                return null;
            }



            // Check & return new value of Hash, replace for current hash
            // 1. First check 'hashLast' exist on Hash
            // 2. Get 'hashCur'
            // 3. Replace 'hashLast' by 'hashCur' or 'hashLast' not exist then add 'hashCur' into Hash
            else {

                var hashCur = null, hashLast = null;


                /**
                 * PART 1: GET HASH-LAST
                 * @param string hashLast
                 */
                // Get ID on Hash have match with ID-Node of the slides
                IDReturn = IDTextOnHash();
                if( IDReturn !== null ) hashLast = va.IDsOnNode[IDReturn];

                // If does not 'hashLast' id-text, search continues with format 'rubyID_slideID'
                if( hashLast === null && linkCheck !== null ) hashLast = linkCheck[0];



                /**
                 * PART 2: GET HASH-CUR
                 * @param string hashCur
                 */
                var idTextCur = va.IDsOnNode[cs.idCur];
                if( !!oDeeplink.isIDConvert && idTextCur !== undefined ) {
                    hashCur = idTextCur;
                }

                if( hashCur === null ) {
                    hashCur = !!oDeeplink.isOnlyShowID ? '' : (rubyName + cs.idCur);
                }



                /**
                 * PART 3: REPLACE 'HASH-LAST' BY 'HASH-CUR'
                 * @param string hash
                 */
                // If 'hashLast' not exist: plus 'hasCur' into Hash browser
                // HashCur !== empty
                if( hashLast === null ) {
                    if( hashCur != '' ) {

                        // If have not hash -> add '#' character
                        // If hash at end place -> add to next
                        // Add '+' character for multiple hash -> read easier
                        if( hash == '' )            hash = '#'+ hashCur;
                        else if( hash == '#' )      hash += hashCur;
                        else if( /\+$/.test(hash) ) hash += hashCur;
                        else                        hash += '+'+ hashCur;
                    }
                }

                // If 'hashLast' exist: replace 'hashLast' by 'hashCur'
                else {
                    hash = hash.replace(hashLast, hashCur);
                }

                /**
                 * ELEEMENTS OF HASH IF IN THE CASES
                 *  + Replace '#+' at first place by '#'
                 +  + Replace '+' at end place by ''
                 *  + Replace '++' by '+'
                 */
                hash = hash.replace(/^#\+/g, '#').replace(/\+$/g, '').replace(/\++/g, '+');

                // Add '#' character at first place if not exist
                if( !/^#/.test(hash) ) hash = '#' + hash;

                // Return value hash
                return hash;
            }
        },



        /**
         * READ ID FROM ADDRESS PAGE -> GO TO THAT SLIDE
         */
        Read : function() {
            VariableModule(this);
            var idCur = that.HashReturn(true);


            if( idCur !== null ) {

                // Get ID-last from ID-cur
                if( cs.idLast !== cs.idCur ) cs.idLast = cs.idCur;

                // Get ID-current from Hash-URL
                cs.idCur = va.idBegin = idCur;

                // Update value in properties: reset 'idCenterMap', 'LoadWay()'
                that.PROP.Ruby();
            }
        },


        /**
         * WRITE NEW HASH IN BROWSER
         */
        Write : function() {
            VariableModule(this);

            // Get value new Hash from address browser
            var that    = this,
                hashNew = that.HashReturn(false);



            /**
             * FUNCTION: CHANGE HASH
             */
            function HashChange() {

                /**
                 * SETUP FOR ALLOW CHANGE HASH ONLY ONCE -> AVOID REPEAT
                 */
                rt01VA.isStopHashChange = true;

                // Add timer to restore available change on Hash browser
                clearTimeout(ti.hashReset);
                ti.hashReset = setTimeout(function() { rt01VA.isStopHashChange = false }, 200);




                /**
                 * SETUP NEW ADDRESS ON BROWSER
                 *  + Support api 'History PushState' -> not scroll to Node
                 */
                if( !!window.history && !!window.history.pushState ) {
                    try      { window.history.pushState(null, null, hashNew); }
                    catch(e) {}
                }
                else {
                    // Not support change URL hash for browser not support 'PushState'
                    // Ver 1.4 - 21/09/2016 : get error when swap slide in IE9
                    // window.location.hash = hashNew;
                }
            }



            /**
             * CHECK NEW HASH NOT MATCH WITH OLD HASH
             */
            (window.location.hash !== hashNew) && HashChange();
        },



        /**
         * EVENTS HASH CHANGE
         */
        Events : function() {
            var that = this;
            VariableModule(that);


            /**
             * REFRESH EVENT 'HASH CHANGE'
             */
            va.$w.off(va.ev.hash);
            o.isDeeplinking && va.$w.on(va.ev.hash, function(e) {
                VariableModule(that);


                // Prevent browser reload page
                e.preventDefault();
                if( !rt01VA.isStopHashChange ) {

                    // Check hash change by current Ruby
                    // -> If yes, toggle to other slide
                    var idCur = that.HashReturn(true);
                    if( idCur !== null ) that.TOSLIDE.Run(idCur, true, false, true);
                }
            });
        }
    };
})(jQuery);










/**
 * MODULE COOKIE
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE COOKIE
     */
    rt01MODULE.COOKIE = {

        Write : function() {
            var that = this,
                date = new Date(),
                name = rt01VA.rubyName + that.va.rubyID + that.o.cookie.name;

            // Plus the days storage & convert to GTM standard
            date.setTime( date.getTime() + (that.o.cookie.days * 24 * 60 * 60 * 1000) );
            var expires = '; expires='+ date.toGMTString();

            // Write or update new value of cookie
            document.cookie = name +'='+ that.cs.idCur + expires +'; path=/';
        },


        Read : function() {

            var that    = this,
                aCookie = document.cookie.replace(/\s+/g, '').split(';'),
                name    = rt01VA.rubyName + that.va.rubyID + that.o.cookie.name +'=',
                idCur   = null;

            // Check all cookies
            for( i = 0; i < aCookie.length; i++ ) {
                if( aCookie[i].indexOf(name) === 0 ) idCur = that.M.PInt( aCookie[i].substr(name.length) );
            }

            // Setup idCur if cookie have store value in the past
            if( idCur !== null ) that.cs.idCur = that.va.idBegin = idCur;
        }
    };
})(jQuery);










/**
 * MODULE API MORE
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, cs, one, o, va, is, M;

    /**
     * FUNCTION NGOAI API
     */
    var FN = {

        /**
         * KIEM TRA VA CONVERT THANH NUMBER CHO INDEX
         */
        ParseIndex : function(index, isAddSlide) {
            VariableModule(this);
            var num = cs.num;

            // Kiem tra co phai number
            if( /^\-?\d+/g.test(index) ) index = M.PInt(index);

            // Kiem tra index, neu gia tri index khong hop le --> index se la id slide cuoi
            // Slide cuoi cua addSlide khac voi removeSlide
            if( !($.isNumeric(index) && (index >= 0 && index < num)) )
                index = isAddSlide ? num : num-1;

            return index;
        },


        /**
         * SETUP CORE CHEN THEM SLIDE MOI VAO`
         *  + Mac dinh 'html' la` Array[]
         */
        CoreAddSlide : function(aHTML, index) {
            VariableModule(this);
            var that = this, PAG = M.Module('PAG'), $sl = $();


            /**
             * SETUP VI TRI INDEX CHEN` SLIDE VAO
             */
            index = FN.ParseIndex(index, true);



            /**
             * SETUP SELECTOR SLIDE LUC BAN DAU
             */
            for( var i = 0, len = aHTML.length; i < len; i++ ) {
                if( typeof aHTML[i] == 'string' || aHTML[i] instanceof jQuery ) {

                    var $slCur = that.RENDER.Slide( $(aHTML[i]) );
                    if( $slCur !== false ) $sl = $sl.add($slCur);
                }
            }



            /**
             * CHEN SLIDE VAO RUBY VOI INDEX
             */
            var isIDEnd = (index === cs.num);

            // Neu ID end : chen` slide vao vi tri cuoi cung
            // Nguoc lai : chen` slide vao phia truoc slide index
            if( isIDEnd ) va.$canvas.append($sl);
            else          va.$s.eq(index).before($sl);

            // Reset lai gia tri va thu' tu cua Slide trong bien $s
            va.$s = va.$canvas.children('.' + va.ns + o.nameSlide);





            /**
             * TIEP TUC SETUP TUNG SLIDE
             */
            $sl.each(function() {
                var $slCur = $(this);

                // Cap nhat lai thuoc tinh tren Data
                M.Data($slCur, { 'loadBy': 'apiAdd' });



                /**
                 * PAGITEM SETUP
                 */
                if( is.pag ) {

                    // Lay noi dung ben trong cua capitem va PagItem
                    that.RENDER.CapPagHTML($slCur);

                    // Them PagItem vao pagination
                    var $pagAdd = PAG.RenderPagItem($slCur);

                    // Add PagItem vao pagination
                    if( isIDEnd ) va.$pagInner.append($pagAdd);
                    else {
                        // Mac dinh them PagItem moi phia truoc PagItem index
                        va.$pagItem.eq(index).before($pagAdd);

                        // Variable va.$pagItem reset thu tuong
                        va.$pagItem = va.$pagInner.children('.'+ va.ns +'pagitem');
                    }

                    // Setup event tap tren PagItem
                    PAG.EventTap();
                }



                /**
                 * KHOI TAO RUBY NESTED TRONG SLIDE CHE`N VAO
                 */
                var $rubyNested = $slCur.find('.' + va.ns);
                rt01MODULE.AUTOINIT($rubyNested);
            });




            /**
             * SETUP OTHERS
             */
            // Reset lai ID Cur neu Ruby chua co' slide nao`
            if( cs.num === 0 && cs.idCur < 0 ) cs.idCur = 0;

            // ID toggle class actived --> Ho tro khi index trung voi idCur
            if( index === cs.idCur ) cs.idLast = cs.idCur + 1;

            // Cap nhat lai vi tri' cua Slide va Pagination bang Refresh
            cs.refresh();

            // Setup lai thu tu load cac slide
            that.LOAD.Way();

            // Load slide ke tiep
            !o.load.isLazy && that.LOAD.Next();
        },


        /**
         * LAY NOI DUNG TU URL
         */
        GetFromURL : function(url, index) {
            var that = this,
                FN   = $.extend({}, FN, that);

            // Bien khoi tao ban dau
            var settings = {
                    type    : 'GET',
                    cache   : false,
                    crossDomain : true,
                    success : function(data) { FN.CoreAddSlide([data], index); },
                    error   : function()     { that.M.Message('ajax load failed', url); }
                };

            // Setup ajax
            $.ajax(url, settings);
        }
    };


    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModuleMaster(self) {
        one = self.one;
        o   = self.one.o;
        cs  = self.one.cs;
        va  = self.one.va;
        is  = self.one.is;
        M   = self.one.M;
        FN  = $.extend({}, FN, one);
    }

    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        M    = self.M;
    }










    /**
     * MODULE APIS MORE FUNCTION
     */
    rt01MODULE.APIMORE = {

        /**
         * API ADD - REMOVE SLIDE
         *  + Api add slide : default support insert multiple slide in same time
         */
        addSlide : function(obj, index) {
            VariableModuleMaster(this);

            // Function add slide : shortcut
            function AddSlide(aHTML) {
                FN.CoreAddSlide(aHTML, index)
            }



            /**
             * CASE: 'OBJ' IS STRING -> CONVERT TO JQUERY-SELECTOR
             */
            if( typeof obj === 'string' && obj !== '' ) AddSlide([obj]);


            /**
             * CASE: 'OBJ' IS JQUERY-OBJECT
             */
            else if( obj instanceof jQuery ) AddSlide([obj]);


            /**
             * CASE: 'OBJ' IS ARRAY[]
             *  + Support add multiple slide in ruby
             */
            else if( $.isArray(obj) && obj.length ) AddSlide(obj);


            /**
             * CASE: 'OBJ' IS OBJECT{}
             */
            else if( $.isPlainObject(obj) ) {

                // Add slide by ajax -> load ajax first
                if( obj.ajax !== undefined && typeof obj.ajax == 'string' ) FN.GetFromURL(obj.ajax, index);

                // Add slide by html
                else if( obj.html !== undefined && typeof obj.html == 'string' ) AddSlide([obj.html]);
            }
        },

        removeSlide : function(aIndex) {
            VariableModuleMaster(this);


            // Variable to recognize is api remove activing
            is.apiRemove = true;



            /**
             * SETUP 'ID-CUR' OF CURRENT SLIDE
             */
            // Case: aIndex is not array[] - undefined
            if( !$.isArray(aIndex) ) {

                // Convert to array has 1 value
                aIndex = [aIndex];

                // idCur : idCur at end, remove will reduce -> idCur switch to ID ahead
                if( cs.idCur == cs.num - 1 ) {
                    cs.ev.trigger('beforeSwapIDCur');
                    cs.idCur = cs.num - 2;
                    cs.ev.trigger('afterSwapIDCur');
                }
            }

            // Case: aIndex is array[]
            else {
                // idCur switch to the first slide
                cs.ev.trigger('beforeSwapIDCur');
                cs.idLast = cs.idCur = 0;
                cs.ev.trigger('afterSwapIDCur');

                // Toggle slide: remove actived on current slide
                M.ToggleSlide();
            }




            /**
             * LOOP: IDS OF SLIDE
             */
            for( var i = 0, len = aIndex.length; i < len; i++ ) {
                // Convert 'index' to number
                var index  = FN.ParseIndex(aIndex[i], false),
                    $slCur = va.$s.eq(index);

                // Check ruby-nested into current slide -> remove event-resize first
                is.NESTED && M.Module('NESTED').Destroy($slCur);

                // Remove slide out ruby
                $slCur.remove();

                // Remove pagItem out pagination
                if( is.pag ) va.$pagItem.eq(index).remove();
            }




            /**
             * OTHER SETUP
             */
            // Reset variables : $slide & $pagItem
            va.$s = va.$canvas.children('.'+ va.ns + o.nameSlide);
            if( is.pag ) va.$pagItem = va.$pag.find('.'+ va.ns +'pagitem');

            // Refresh other variables in ruby
            cs.refresh();
            is.apiRemove = false;
        },











        /**
         * ARRANGE BY ORDER THE SLIDES
         */
        orderSlide : function(inOrder) {
            VariableModuleMaster(this);
            var num = cs.num,
                isRightOrder = true;    // Variable used to identify sorted order validly


            /**
             * CASE: 'IN-ORDER' IS OBJECT{}
             */
            if( num > 1 && $.isPlainObject(inOrder)) {

                // Initialize variables
                var aCheck = [];

                // Function: to check for a valid number
                function CheckNum(n) {
                    return (/^\d+/g.test(n) && M.PInt(n) >= 0 && M.PInt(n) < num);
                }

                // Function: switch to value in array
                function SwapValueInAarray(arr, pOld, pNew) {
                    var temp = arr[pNew];
                    arr[pNew] = arr[pOld];
                    arr[pOld] = temp;
                }


                // Step 1: create initial position-array of slide have ascending order
                for( var i = 0; i < num; i++ ) { aCheck.push(i) }

                // Step 2: loop to get item-key in object
                for( var key in inOrder ) {
                    var val = inOrder[key], pOld, pNew;
                    if( CheckNum(key) && CheckNum(val) ) {

                        // Search position of key: switch to posiiton old & new
                        pOld = $.inArray(M.PInt(key), aCheck);
                        SwapValueInAarray(aCheck, pOld, M.PInt(val));
                    }
                }

                // Step 3: convert 'object' to array[]
                inOrder = aCheck;
            }


            /**
             * CASE: 'IN-ORDER' IS ARRAY[]
             */
            else if( num > 1 && $.isArray(inOrder) && inOrder.length == num ) {
                var aCheck = $.extend([], inOrder);

                for( var i = 0, poped; i < num; i++ ) {
                    poped = aCheck.pop();
                    if( !$.isNumeric(poped) || $.inArray(poped, aCheck) !== -1 || poped < 0 || poped >= num ) {
                        isRightOrder = false;
                        break;
                    }
                }
            }
            else isRightOrder = false;



            // Check before arrange
            if( isRightOrder ) {

                // First: remove all slides
                va.$s.detach();
                is.pag && va.$pagItem.detach();

                // After: insert slide in new order
                for( var i = 0; i < num; i++ ) {
                    var idSwap = inOrder[i];
                    va.$canvas.append(va.$s.eq(idSwap));
                    is.pag && va.$pagInner.append(va.$pagItem.eq(idSwap));
                }

                // Reset $s
                va.$s = va.$canvas.children('.'+ va.ns + o.nameSlide);
                // Reset $pagItem
                if( is.pag ) va.$pagItem = va.$pag.find('.'+ va.ns +'pagitem');
                // Reset id-current
                cs.ev.trigger('beforeSwapIDCur');
                cs.idCur = $.inArray(cs.idCur, inOrder);
                cs.ev.trigger('afterSwapIDCur');

                // Reset & update variables & properties
                cs.update();
            }

            // Display message error if invalid
            else M.Message('array or object order not right');
        },










        /**
         * TOGGLE EVENT 'SWIPE'
         */
        swipeEvent : function(status) {
            var that = this;

            typeof status === 'string'
            && ('onBody onPag offBody offPag').indexOf(status) !== -1
            && that.is.SWIPE && that.SWIPE.Events(status);
        }
    };
})(jQuery);










/**
 * MODULE API REMOTE CONTROL
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, M;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that  = self;
        o     = self.o;
        cs    = self.cs;
        va    = self.va;
        is    = self.is;
        M     = self.M;
    }


    /**
     * MODULE APIS REMOTE CONTROL
     */
    rt01MODULE.APIREMOTE = {

        /**
         * INITIALIZE API REMOTE CONTROL
         */
        Init : function() {
            VariableModule(this);


            /**
             * REMOVE OBJECT API REMOTE CONTROL OLD (IF HAVE)
             */
            if( !!va.$apiRemote ) {

                // Remove event 'click'
                // Remove class 'api' on object
                va.$apiRemote
                    .off(va.ev.click)
                    .removeClass(va.ns + 'api');
            }

            // Reset $api-remote
            va.$apiRemote = $();




            /**
             * SETUP EACH OBECT API-REMOTE
             */
            var dataName = rt01VA.rubyName + '-api';
            $('[data-NAME]'.replace(/NAME/, dataName)).each(function() {

                var $api     = $(this),
                    dataStr  = $api.data(dataName),
                    dataNode = (typeof dataStr === 'string') ? dataStr : M.StringToJson(dataStr);

                // Conditional execution
                if( !dataNode ) return;


                /**
                 * UPDATE DATA ON API OBJECT
                 */
                var apiData = M.Data($api, {
                    $api      : $api,
                    apiRemote : [],
                    isInRuby  : !!M.Find(va.$ruby, $api).length
                });




                /**
                 * SETUP CONTENT IN DATA-NODE
                 *  + Return array[] : support for multiple api-remote-control
                 */
                // Case: initial dataNode is 'object' or 'string'
                // console.log(JSON.stringify(dataNode));
                if( $.isPlainObject(dataNode) || typeof dataNode === 'string' ) {
                    dataNode = [dataNode];
                }

                // Store into system
                apiData.dataNode = dataNode;




                /**
                 * CHECK EACH COMMAND IS VALID FOR CURRENT RUBY
                 */
                that.ApiCheckValid(apiData);



                /**
                 * SETUP EVENT 'TAP' FOR OBJECT
                 */
                that.Events(apiData);
            });
        },

        /**
         * CHECK EACH COMMAND LINE IS VALID FOR CURRENT RUBY
         */
        ApiCheckValid : function(apiData) {
            VariableModule(this);

            var i           = 0,
                dataNode    = apiData.dataNode,
                len         = dataNode.length,
                dataNodeNew = [],
                isInRuby    = apiData.isInRuby;


            /**
             * LOOP TO CHECK
             */
            for( ; i < len; i++ ) {
                var dataNodeCur = dataNode[i];


                /**
                 * CASE: VALUE DATA IS {}
                 *  + Support value 'markup' is ID-Ruby
                 *  + Support no property 'markup'
                 */
                if( $.isPlainObject(dataNodeCur) ) {

                    // Require 'name' property
                    if( !dataNodeCur.name ) continue;



                    /**
                     * CHECK COMMAND LINE VALID WITH CURRENT RUBY
                     */
                    var markup  = dataNodeCur.markup,
                        isSetup = false;

                    // Case: 'markup' start by '#' + value match with ID-Ruby
                    if( /^#/.test(markup) && markup.substr(1) === va.$ruby.attr('id') ) {
                        isSetup = true;
                    }

                    // Case: property 'markup' not exist & $api inside ruby
                    else if( markup === undefined && isInRuby ) {
                        isSetup = true;
                    }

                    // Case: value 'markup' === value 'name' property of ruby
                    else if( markup === va.name ) {
                        isSetup = true;
                    }


                    if( isSetup ) {
                        dataNodeCur.isSetup = isSetup;
                        dataNodeNew.push(dataNodeCur);
                    }
                }



                /**
                 * CASE: VALUE DATA IS 'STRING'
                  * + Support command line only 1 ruby on page browser
                 */
                else if( typeof dataNodeCur === 'string' ) {

                    dataNodeNew.push({
                        name    : dataNodeCur,

                        // Value 'checkRubyOne' -> check current page has only 1 ruby exist
                        isSetup : isInRuby ? true : 'checkRubyOne'
                    });
                }
            }

            // Update properties on Data
            apiData.apiRemote = dataNodeNew;
        },

        /**
         * SETUP EVENT ON OBJECT API-REMOTE
         */
        Events : function(apiData) {
            VariableModule(this);

            var that      = this,
                $api      = apiData.$api,
                lenRemote = apiData.apiRemote.length;


            // Conditional execution
            if( !lenRemote ) return;




            /**
             * UPDATE OBJECT API-REMOTE INTO SYSTEM
             */
            $api.addClass(va.ns + 'api');
            va.$apiRemote = va.$apiRemote.add($api);




            /**
             * SETUP EVENT 'TAP' ON EACH OBJECT
             */
            $api
                .off(va.ev.click)
                .on(va.ev.click, function() {
                    VariableModule(that);
                    var isReturn = true;


                    /**
                     * EXECUTE MULTI COMMAND LINES AT SAME TIME
                     */
                    for( var i = 0; i < lenRemote; i++ ) {

                        var apiCur  = apiData.apiRemote[i],
                            apiName = apiCur.name,
                            isSetup = apiCur.isSetup;


                        // Execute api if exist
                        if( (isSetup === true) || (isSetup === 'checkRubyOne' && rt01VA.$ruby.length === 1) ) {
                            !!cs[apiName] && cs[apiName](apiCur.param1 || apiCur.param, apiCur.param2);
                        }

                        // Setup $return
                        if( apiCur.isReturn === false ) isReturn = false;
                    }

                    if( !isReturn ) return false;
                });
        }
    };
})(jQuery);
