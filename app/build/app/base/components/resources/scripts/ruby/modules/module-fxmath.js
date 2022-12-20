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
