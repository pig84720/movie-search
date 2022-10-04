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
