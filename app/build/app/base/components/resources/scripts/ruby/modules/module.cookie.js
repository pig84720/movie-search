/**
 * MODULE COOKIE
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    /**
     * MODULE COOKIE
     */
    rt01MODULE.COOKIE = {

        Write : function() {
            var that = this,
                date = new Date(),
                name = rt01VA.rubyName + that.va.rubyID + that.o.cookie.name;

            // Plus the days storage & convert to GTM standard
            date.setTime( date.getTime() + (that.o.cookie.days * 24 * 60 * 60 * 1000) );
            var expires = '; expires='+ date.toGMTString();

            // Write or update new value of cookie
            document.cookie = name +'='+ that.cs.idCur + expires +'; path=/';
        },


        Read : function() {

            var that    = this,
                aCookie = document.cookie.replace(/\s+/g, '').split(';'),
                name    = rt01VA.rubyName + that.va.rubyID + that.o.cookie.name +'=',
                idCur   = null;

            // Check all cookies
            for( i = 0; i < aCookie.length; i++ ) {
                if( aCookie[i].indexOf(name) === 0 ) idCur = that.M.PInt( aCookie[i].substr(name.length) );
            }

            // Setup idCur if cookie have store value in the past
            if( idCur !== null ) that.cs.idCur = that.va.idBegin = idCur;
        }
    };
})(jQuery);
