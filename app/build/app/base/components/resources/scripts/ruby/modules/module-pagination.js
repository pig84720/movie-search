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
