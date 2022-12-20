/**
 * MODULE API REMOTE CONTROL
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, o, cs, va, is, M;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that  = self;
        o     = self.o;
        cs    = self.cs;
        va    = self.va;
        is    = self.is;
        M     = self.M;
    }


    /**
     * MODULE APIS REMOTE CONTROL
     */
    rt01MODULE.APIREMOTE = {

        /**
         * INITIALIZE API REMOTE CONTROL
         */
        Init : function() {
            VariableModule(this);


            /**
             * REMOVE OBJECT API REMOTE CONTROL OLD (IF HAVE)
             */
            if( !!va.$apiRemote ) {

                // Remove event 'click'
                // Remove class 'api' on object
                va.$apiRemote
                    .off(va.ev.click)
                    .removeClass(va.ns + 'api');
            }

            // Reset $api-remote
            va.$apiRemote = $();




            /**
             * SETUP EACH OBECT API-REMOTE
             */
            var dataName = rt01VA.rubyName + '-api';
            $('[data-NAME]'.replace(/NAME/, dataName)).each(function() {

                var $api     = $(this),
                    dataStr  = $api.data(dataName),
                    dataNode = (typeof dataStr === 'string') ? dataStr : M.StringToJson(dataStr);

                // Conditional execution
                if( !dataNode ) return;


                /**
                 * UPDATE DATA ON API OBJECT
                 */
                var apiData = M.Data($api, {
                    $api      : $api,
                    apiRemote : [],
                    isInRuby  : !!M.Find(va.$ruby, $api).length
                });




                /**
                 * SETUP CONTENT IN DATA-NODE
                 *  + Return array[] : support for multiple api-remote-control
                 */
                // Case: initial dataNode is 'object' or 'string'
                // console.log(JSON.stringify(dataNode));
                if( $.isPlainObject(dataNode) || typeof dataNode === 'string' ) {
                    dataNode = [dataNode];
                }

                // Store into system
                apiData.dataNode = dataNode;




                /**
                 * CHECK EACH COMMAND IS VALID FOR CURRENT RUBY
                 */
                that.ApiCheckValid(apiData);



                /**
                 * SETUP EVENT 'TAP' FOR OBJECT
                 */
                that.Events(apiData);
            });
        },

        /**
         * CHECK EACH COMMAND LINE IS VALID FOR CURRENT RUBY
         */
        ApiCheckValid : function(apiData) {
            VariableModule(this);

            var i           = 0,
                dataNode    = apiData.dataNode,
                len         = dataNode.length,
                dataNodeNew = [],
                isInRuby    = apiData.isInRuby;


            /**
             * LOOP TO CHECK
             */
            for( ; i < len; i++ ) {
                var dataNodeCur = dataNode[i];


                /**
                 * CASE: VALUE DATA IS {}
                 *  + Support value 'markup' is ID-Ruby
                 *  + Support no property 'markup'
                 */
                if( $.isPlainObject(dataNodeCur) ) {

                    // Require 'name' property
                    if( !dataNodeCur.name ) continue;



                    /**
                     * CHECK COMMAND LINE VALID WITH CURRENT RUBY
                     */
                    var markup  = dataNodeCur.markup,
                        isSetup = false;

                    // Case: 'markup' start by '#' + value match with ID-Ruby
                    if( /^#/.test(markup) && markup.substr(1) === va.$ruby.attr('id') ) {
                        isSetup = true;
                    }

                    // Case: property 'markup' not exist & $api inside ruby
                    else if( markup === undefined && isInRuby ) {
                        isSetup = true;
                    }

                    // Case: value 'markup' === value 'name' property of ruby
                    else if( markup === va.name ) {
                        isSetup = true;
                    }


                    if( isSetup ) {
                        dataNodeCur.isSetup = isSetup;
                        dataNodeNew.push(dataNodeCur);
                    }
                }



                /**
                 * CASE: VALUE DATA IS 'STRING'
                  * + Support command line only 1 ruby on page browser
                 */
                else if( typeof dataNodeCur === 'string' ) {

                    dataNodeNew.push({
                        name    : dataNodeCur,

                        // Value 'checkRubyOne' -> check current page has only 1 ruby exist
                        isSetup : isInRuby ? true : 'checkRubyOne'
                    });
                }
            }

            // Update properties on Data
            apiData.apiRemote = dataNodeNew;
        },

        /**
         * SETUP EVENT ON OBJECT API-REMOTE
         */
        Events : function(apiData) {
            VariableModule(this);

            var that      = this,
                $api      = apiData.$api,
                lenRemote = apiData.apiRemote.length;


            // Conditional execution
            if( !lenRemote ) return;




            /**
             * UPDATE OBJECT API-REMOTE INTO SYSTEM
             */
            $api.addClass(va.ns + 'api');
            va.$apiRemote = va.$apiRemote.add($api);




            /**
             * SETUP EVENT 'TAP' ON EACH OBJECT
             */
            $api
                .off(va.ev.click)
                .on(va.ev.click, function() {
                    VariableModule(that);
                    var isReturn = true;


                    /**
                     * EXECUTE MULTI COMMAND LINES AT SAME TIME
                     */
                    for( var i = 0; i < lenRemote; i++ ) {

                        var apiCur  = apiData.apiRemote[i],
                            apiName = apiCur.name,
                            isSetup = apiCur.isSetup;


                        // Execute api if exist
                        if( (isSetup === true) || (isSetup === 'checkRubyOne' && rt01VA.$ruby.length === 1) ) {
                            !!cs[apiName] && cs[apiName](apiCur.param1 || apiCur.param, apiCur.param2);
                        }

                        // Setup $return
                        if( apiCur.isReturn === false ) isReturn = false;
                    }

                    if( !isReturn ) return false;
                });
        }
    };
})(jQuery);
