/**
 * MODULE FULLSCREEN
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE FULLSCREEN
     */
    rt01MODULE.FULLSCREEN = {

        Variable : function() {
            var that = this,
                va   = that.va,
                M    = that.M;

            // Get retio of Width / height content
            va.wContent = va.wRuby - (va.pa.left * 2);
            va.hContent = M.R(va.wContent / va.rRes);

            // Case: height-content < height-page
            if( va.hContent < va.hRuby ) {

                va.pa.top = M.R( (va.hRuby - va.hContent) / 2 );
            }

            // Case: height-content > height-page
            // -> Setup: height-content = height-page, re-calculate 'va.rate' & padding
            else {
                va.pa.top = 0;
                va.hContent = va.hRuby;
                va.wContent = M.R(va.hContent * va.rRes);

                va.rate = va.wContent / va.wRes;
                va.pa.left = M.R( (va.wRuby - va.wContent)/2 );
            }
        }
    };
})(jQuery);
