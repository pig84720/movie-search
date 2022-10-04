/**
 * MODULE CLASSADD
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE CLASSADD
     */
    rt01MODULE.CLASSADD = {

        // Check & store 'classAdd' of each slide
        Filter : function(opt) {

            var classAdd = '';
            if( opt.classAdd !== undefined ) {

                // Mark sure convert 'classAdd' to string
                classAdd = opt.classAdd.toString();
            }
            return classAdd;
        },


        // Toggle class on ruby when swap slide
        Toggle : function() {
            var va = this.va,
                cs = this.cs;

            var classLast = va.classAdd[cs.idLast],
                classCur  = va.classAdd[cs.idCur];

            // Remove class-old & add class-new
            if( classLast !== undefined && classLast != '' ) va.$ruby.removeClass(classLast);
            if( classCur  !== undefined && classCur  != '' ) va.$ruby.addClass(classCur);
        }
    };
})(jQuery);
