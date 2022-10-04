/**
 * MODULE IFRAME
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, va, is, M;

    /**
     * CAP NHAT BIET TOAN CUC
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        va   = self.va;
        is   = self.is;
        M    = self.M;
    }


    /**
     * MODULE IFRAME LAZY
     */
    rt01MODULE.IFRAME = {

        /**
         * INITIAL SETUP IFRAME-LAZY
         */
        Init : function($slCur) {
            VariableModule(this);

            /**
             * SERACH LINK IFRAME IN CURRENT SLIDE
             */
            var selectorIframe = M.NS('a.{ns}iframe'),
                $iframe        = M.Find($slCur, selectorIframe);


            // Case: Iframe-lazy exist
            if( $iframe.length ) {

                // Store Iframe into current Data-slide
                M.Data($slCur, { 'isIframe': true, '$iframe': $iframe });

                // Convert link <a> to <iframe> tag
                that.ConvertTag($slCur);

                // Update $iframe in current slide
                M.Data($slCur, { '$iframe': M.Find($slCur, M.NS('iframe.{ns}iframe')) });
            }
        },


        /**
         * CONVERT LINK <A> TO <IFRAME> TAG
         */
        ConvertTag : function($slCur) {
            VariableModule(this);
            var slData = M.Data($slCur);

            // Conditional execution
            if( !slData.isIframe ) return;



            /**
             * FUNCTION: CONVERT LINK TO IFRAME
             *  + Copy all properties in link to Iframe node
             */
            function ConvertToIframe($link) {

                /**
                 * CREATE NEW $IFRAME
                 */
                var $iframe = $('<iframe/>');

                // Copy all properties on link to new Iframe node
                var attrs = {};
                $.each($link[0].attributes, function(key, attr) {

                    var nameCur  = attr.name,
                        valueCur = attr.value;

                    $iframe.attr(nameCur, valueCur);
                    attrs[nameCur] = valueCur;
                });

                // Replace link by Iframe node
                $link.after($iframe).remove();
            }



            /**
             * SETUP IFRAME IN CURRENT SLIDE
             */
            slData.$iframe.each(function() {
                ConvertToIframe( $(this) );
            });
        },


        /**
         * TOGGLE ADDRESS URL ON IFRAME
         */
        ToggleSource : function($slCur) {
            VariableModule(this);
            var slData = M.Data($slCur);

            // Conditional execution
            if( !slData.isIframe ) return;



            /**
             * SETUP EACH IFRAME
             */
            slData.$iframe.each(function() {
                var $iframe = $(this),
                    href    = $iframe.attr('href');

                // Change 'href' to 'src' property
                if( href && !/^\s*$/g.test(href) ) {
                    $iframe.attr('src', href).removeAttr('href');
                }
            });

            // Variable to recognize $iframe exist in slide
            slData.isFrame = false;
        }
    };
})(jQuery);
