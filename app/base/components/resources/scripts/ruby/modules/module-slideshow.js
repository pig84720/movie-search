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
