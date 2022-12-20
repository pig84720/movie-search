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
