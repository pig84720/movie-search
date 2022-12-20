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
