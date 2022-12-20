/**
 * MODULE RESPONSIVE
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE RESPONSIVE
     */
    rt01MODULE.RESPONSIVE = {

        /**
         * UPDATE CAC GIA TRI CUA RESPONSIVE
         * @param object va.pa
         * @param int va.rate
         */
        UpdateVars : function() {
            var that = this,
                o    = that.o,
                va   = that.va;


            /**
             * FUNCTION GET VALUE OF 'PADDING' IN VARIABLE 'VA.PARANGE'
             */
            function GetPadding() {
                var pa = 0;
                if( !!va.paRange ) {

                    pa = that.M.GetValueInRange(va.paRange);
                    if( pa === null ) pa = 0;
                }
                return pa;
            }



            /**
             * RANGE SETUP
             *  + Padding : get
             *  + Padding only work : 'va.wRuby' < width-responsive
             */
            if( !!o.widthRange ) {

                /**
                 * CONDITION:
                 * Case 1: wMax < va.wRes -> priority for small width in Range
                 * Case 2: wMax > va.wRes -> priority for 'width' in Range
                 */
                var wMax   = va.sizeRange.wMax,
                    isCond = (wMax > va.wRes) ? (wMax >= va.wRuby) : (va.wRes > va.wSlide);

                if( isCond ) {
                    // Get size from Range[]
                    var sizeRange = that.M.GetValueInRange(va.sizeRange);

                    va.pa.left = (sizeRange === null) ? GetPadding() : (va.wSlide - sizeRange)/2;
                }
                else va.pa.left = (va.wSlide - va.wRes)/2;
            }

            // Not have option 'widthRange'
            else va.pa.left = (va.wRes > va.wSlide) ? GetPadding() : (va.wSlide - va.wRes)/2;

            // Round number
            va.pa.left = ~~(va.pa.left);



            /**
             * OTHER SETUP
             */
            // Because padding 'left' allways has value so always = width-content / width-responsive
            var rateCur = (va.wSlide - (va.pa.left * 2)) / va.wRes;
            va.rate = (rateCur > 1) ? 1 : rateCur;
        }
    };
})(jQuery);
