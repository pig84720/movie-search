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
