/**
 * MODULE CAPTION
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, va, is, M;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        va   = self.va;
        is   = self.is;
        M    = self.M;
    }


    /**
     * MODULE CAPTION
     */
    rt01MODULE.CAPTION = {

        /**
         * RENDER CAPTION ELEMENT
         */
        Render : function() {
            VariableModule(this);


            /**
             * CASE: CREATE NEW CAPTION MARKUP
             */
            if( o.isCap && !is.$cap ) {

                /**
                 * SEARCH CAPTION MARKUP AT OUTSIDE
                 */
                var divdiv   = '<div/>',
                    classes  = '.'+ va.ns + o.nameCap,
                    $capHTML = that.RENDER.SearchNode(classes);

                // setup markup for Caption
                is.capOutside = !!$capHTML.length;
                va.$cap       = is.capOutside ? $capHTML
                                              : $(divdiv, {'class' : va.ns + o.nameCap});



                /**
                 * CREATE OTHER ELEMENTS MARKUP OF CAPTION
                 */
                va.$capCur   = $(divdiv, { 'class': va.ns +'cap-cur' });
                va.$capLast  = $(divdiv, { 'class': va.ns +'cap-last' });
                va.$capInner = $(divdiv, { 'class': va.ns +'capinner' });
                va.$capInner.append(va.$capCur, va.$capLast).appendTo(va.$cap);

                // Append caption into ruby
                !is.capOutside && va.$ruby.append(va.$cap);

                // Variable to recognize $caption exist
                is.$cap = true;
            }



            /**
             * CASE: REMOVE CAPTION MARKUP
             */
            else if( !o.isCap && is.$cap ) {

                // Remove caption markup
                va.$cap[ is.capOutside ? 'empty' : 'remove' ]();

                // Update variable
                is.$cap = false;
            }
        },


        Toggle : function($slCur, $slLast) {
            VariableModule(this);

            // Initialize variables
            var capCur  = M.Data($slCur)['htmlCap'],
                capLast = $slLast.length ? M.Data($slLast)['htmlCap'] : '';

            // Change content between current & last caption
            va.$capCur.html(capCur);




            /**
             * SETUP EFFECT
             *  + Not support on mobile -> unnecessary
             *  + Effect between current & last caption is Fade
             *  + Support effect-height for caption
             */
            if( !is.mobile && !is.ie7 ) {

                // Content of last caption
                va.$capLast.html(capLast);

                // Get height of caption
                var hCur  = M.OuterHeight(va.$capCur, true),
                    hLast = M.OuterHeight(va.$capLast, true) || hCur;      // Fixed at first = 0



                /**
                 * SETUP AFTER END ANIMATION
                 */
                function AnimComplete() {

                    // Add timer to mark sure at end place
                    setTimeout(function() {
                        VariableModule(that);

                        va.$capLast.css('visibility', '');
                        va.$capInner.css('height', '');
                    }, 10);
                }




                /**
                 * SETUP EFFECT WHEN TOGGLE CAPTION
                 */
                va.tweenCaption
                    .css(va.$capCur, { 'opacity': 0 })
                    .animate(va.$capCur, { 'opacity': 1 }, {

                        isNew    : true,
                        duration : o.speedHeight,
                        complete : AnimComplete
                    })

                    .css(va.$capLast, { 'opacity': 1, 'visibility': 'visible' })
                    .animate(va.$capLast, { 'opacity': 0 }, {
                        duration : o.speedHeight
                    });

                (hLast !== hCur) &&
                va.tweenCaption
                    .css(va.$capInner, { 'height': hLast })
                    .animate(va.$capInner, { 'height': hCur }, {
                        duration : o.speedHeight
                    });
            }
        }
    };
})(jQuery);
