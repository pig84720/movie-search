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
