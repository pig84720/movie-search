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
