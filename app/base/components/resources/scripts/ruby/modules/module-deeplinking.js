/**
 * MODULE DEEPLINKING
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti;

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
    }


    /**
     * MODULE DEEPLINGING
     */
    rt01MODULE.DEEPLINKING = {

        /**
         * RETURN ALL VALUE HAST (ID) ON ADDRESS ON WEBPAGE
         */
        HashReturn : function(isIDReturn) {
            VariableModule(this);

            var that      = this,
                oDeeplink = o.deeplinking,

                // Choose prefix-custom & prefix-default -> priority prefix-custom
                prefix0   = oDeeplink.prefixDefault[0] + va.rubyID + oDeeplink.prefixDefault[1],
                rubyName  = (oDeeplink.prefix !== null) ? oDeeplink.prefix : prefix0,

                reStr     = rubyName +'\\d+',
                re        = new RegExp(reStr, 'g'),
                hash      = window.location.hash,
                linkCheck = hash.match(re),
                IDReturn;


            /**
             * PARSE STRING 'HASH' TO PARTICULAR HASHS
             */
            // Remove '#' character at first string
            hash = hash.replace(/^#/, '');

            // Split string 'hash' by '+' character
            var aHash = hash.split('+');




            /**
             * FUNCTION CHECK & RETURN ID-TEXT OF LAST SLIDE ON HASH
             */
            function IDTextOnHash() {
                if( oDeeplink.isIDConvert ) {
                    for( i = 0; i < va.IDsOnNode.length; i++ ) {

                        // ID current
                        var IDCur = va.IDsOnNode[i];

                        // Check ID match in Hast[] on browser
                        if( IDCur !== undefined && $.inArray(IDCur, aHash) !== -1 ) {
                            return i;
                        }
                    }
                }

                // Return 'null' value if not found on Hash
                return null;
            }




            // Return ID receive from Hash
            if( isIDReturn ) {

                // Priority read ID on node first
                IDReturn = IDTextOnHash();
                if( IDReturn !== null ) return IDReturn;


                // If not ID on node, continue check in format 'rubyID_slideID'
                if( linkCheck !== null ) {
                    IDReturn = that.M.PInt( linkCheck[0].substr(rubyName.length) );

                    // Re-setup 'idBegin' if IDReturn < cs.num
                    if( IDReturn < cs.num ) return IDReturn;
                }
                // Return 'null' value if invalid
                return null;
            }



            // Check & return new value of Hash, replace for current hash
            // 1. First check 'hashLast' exist on Hash
            // 2. Get 'hashCur'
            // 3. Replace 'hashLast' by 'hashCur' or 'hashLast' not exist then add 'hashCur' into Hash
            else {

                var hashCur = null, hashLast = null;


                /**
                 * PART 1: GET HASH-LAST
                 * @param string hashLast
                 */
                // Get ID on Hash have match with ID-Node of the slides
                IDReturn = IDTextOnHash();
                if( IDReturn !== null ) hashLast = va.IDsOnNode[IDReturn];

                // If does not 'hashLast' id-text, search continues with format 'rubyID_slideID'
                if( hashLast === null && linkCheck !== null ) hashLast = linkCheck[0];



                /**
                 * PART 2: GET HASH-CUR
                 * @param string hashCur
                 */
                var idTextCur = va.IDsOnNode[cs.idCur];
                if( !!oDeeplink.isIDConvert && idTextCur !== undefined ) {
                    hashCur = idTextCur;
                }

                if( hashCur === null ) {
                    hashCur = !!oDeeplink.isOnlyShowID ? '' : (rubyName + cs.idCur);
                }



                /**
                 * PART 3: REPLACE 'HASH-LAST' BY 'HASH-CUR'
                 * @param string hash
                 */
                // If 'hashLast' not exist: plus 'hasCur' into Hash browser
                // HashCur !== empty
                if( hashLast === null ) {
                    if( hashCur != '' ) {

                        // If have not hash -> add '#' character
                        // If hash at end place -> add to next
                        // Add '+' character for multiple hash -> read easier
                        if( hash == '' )            hash = '#'+ hashCur;
                        else if( hash == '#' )      hash += hashCur;
                        else if( /\+$/.test(hash) ) hash += hashCur;
                        else                        hash += '+'+ hashCur;
                    }
                }

                // If 'hashLast' exist: replace 'hashLast' by 'hashCur'
                else {
                    hash = hash.replace(hashLast, hashCur);
                }

                /**
                 * ELEEMENTS OF HASH IF IN THE CASES
                 *  + Replace '#+' at first place by '#'
                 +  + Replace '+' at end place by ''
                 *  + Replace '++' by '+'
                 */
                hash = hash.replace(/^#\+/g, '#').replace(/\+$/g, '').replace(/\++/g, '+');

                // Add '#' character at first place if not exist
                if( !/^#/.test(hash) ) hash = '#' + hash;

                // Return value hash
                return hash;
            }
        },



        /**
         * READ ID FROM ADDRESS PAGE -> GO TO THAT SLIDE
         */
        Read : function() {
            VariableModule(this);
            var idCur = that.HashReturn(true);


            if( idCur !== null ) {

                // Get ID-last from ID-cur
                if( cs.idLast !== cs.idCur ) cs.idLast = cs.idCur;

                // Get ID-current from Hash-URL
                cs.idCur = va.idBegin = idCur;

                // Update value in properties: reset 'idCenterMap', 'LoadWay()'
                that.PROP.Ruby();
            }
        },


        /**
         * WRITE NEW HASH IN BROWSER
         */
        Write : function() {
            VariableModule(this);

            // Get value new Hash from address browser
            var that    = this,
                hashNew = that.HashReturn(false);



            /**
             * FUNCTION: CHANGE HASH
             */
            function HashChange() {

                /**
                 * SETUP FOR ALLOW CHANGE HASH ONLY ONCE -> AVOID REPEAT
                 */
                rt01VA.isStopHashChange = true;

                // Add timer to restore available change on Hash browser
                clearTimeout(ti.hashReset);
                ti.hashReset = setTimeout(function() { rt01VA.isStopHashChange = false }, 200);




                /**
                 * SETUP NEW ADDRESS ON BROWSER
                 *  + Support api 'History PushState' -> not scroll to Node
                 */
                if( !!window.history && !!window.history.pushState ) {
                    try      { window.history.pushState(null, null, hashNew); }
                    catch(e) {}
                }
                else {
                    // Not support change URL hash for browser not support 'PushState'
                    // Ver 1.4 - 21/09/2016 : get error when swap slide in IE9
                    // window.location.hash = hashNew;
                }
            }



            /**
             * CHECK NEW HASH NOT MATCH WITH OLD HASH
             */
            (window.location.hash !== hashNew) && HashChange();
        },



        /**
         * EVENTS HASH CHANGE
         */
        Events : function() {
            var that = this;
            VariableModule(that);


            /**
             * REFRESH EVENT 'HASH CHANGE'
             */
            va.$w.off(va.ev.hash);
            o.isDeeplinking && va.$w.on(va.ev.hash, function(e) {
                VariableModule(that);


                // Prevent browser reload page
                e.preventDefault();
                if( !rt01VA.isStopHashChange ) {

                    // Check hash change by current Ruby
                    // -> If yes, toggle to other slide
                    var idCur = that.HashReturn(true);
                    if( idCur !== null ) that.TOSLIDE.Run(idCur, true, false, true);
                }
            });
        }
    };
})(jQuery);
