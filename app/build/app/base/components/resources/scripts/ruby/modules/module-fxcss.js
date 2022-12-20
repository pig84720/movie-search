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
