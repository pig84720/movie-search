/**
 * MODULE NESTED
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE NESTED
     */
    rt01MODULE.NESTED = {

        /**
         * REMOVE RUBY-NESTED IN CURRENT SLIDE WHEN USE 'API.REMOVE()'
         */
        Destroy : function($slCur) {
            var that = this;

            // Check ruby-nested exist
            var $nested = $slCur.find('.'+ that.va.ns);
            if( $nested.length ) {

                // Check ruby already initialized & have 'api.destroy()'
                var nestedData = $nested.data(rt01VA.rubyName);
                nestedData && nestedData.destroy && nestedData.destroy(true);
            }
        },


        /**
         * REFRESH THE VARIABLE IN RUBY-NESTED IN CURRENT SLIDE
         */
        RefreshInSlide : function($slCur) {
            var that = this,
                va   = that.va,
                $rubyNested = $slCur.find('.'+ va.ns);


            // Check in each ruby-nested (if have)
            $rubyNested.each(function() {
                var $self = $(this),
                    ruby  = $self.data(rt01VA.rubyName);

                // Only apply for ruby active
                if( !!ruby ) {

                    // Refresh ruby-nested for width / height < 10px
                    if( ruby.one.va.wRuby < 10 || ruby.one.va.hRuby < 10 ) ruby.refresh();
                }
            });
        }
    };
})(jQuery);
