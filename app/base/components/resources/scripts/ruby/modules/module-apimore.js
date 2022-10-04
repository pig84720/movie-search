/**
 * MODULE API MORE
 */
(function($) {

    // Check variable module
    window.rt01MODULE = window.rt01MODULE || {};

    // Global variables
    var that, cs, one, o, va, is, M;

    /**
     * FUNCTION NGOAI API
     */
    var FN = {

        /**
         * KIEM TRA VA CONVERT THANH NUMBER CHO INDEX
         */
        ParseIndex : function(index, isAddSlide) {
            VariableModule(this);
            var num = cs.num;

            // Kiem tra co phai number
            if( /^\-?\d+/g.test(index) ) index = M.PInt(index);

            // Kiem tra index, neu gia tri index khong hop le --> index se la id slide cuoi
            // Slide cuoi cua addSlide khac voi removeSlide
            if( !($.isNumeric(index) && (index >= 0 && index < num)) )
                index = isAddSlide ? num : num-1;

            return index;
        },


        /**
         * SETUP CORE CHEN THEM SLIDE MOI VAO`
         *  + Mac dinh 'html' la` Array[]
         */
        CoreAddSlide : function(aHTML, index) {
            VariableModule(this);
            var that = this, PAG = M.Module('PAG'), $sl = $();


            /**
             * SETUP VI TRI INDEX CHEN` SLIDE VAO
             */
            index = FN.ParseIndex(index, true);



            /**
             * SETUP SELECTOR SLIDE LUC BAN DAU
             */
            for( var i = 0, len = aHTML.length; i < len; i++ ) {
                if( typeof aHTML[i] == 'string' || aHTML[i] instanceof jQuery ) {

                    var $slCur = that.RENDER.Slide( $(aHTML[i]) );
                    if( $slCur !== false ) $sl = $sl.add($slCur);
                }
            }



            /**
             * CHEN SLIDE VAO RUBY VOI INDEX
             */
            var isIDEnd = (index === cs.num);

            // Neu ID end : chen` slide vao vi tri cuoi cung
            // Nguoc lai : chen` slide vao phia truoc slide index
            if( isIDEnd ) va.$canvas.append($sl);
            else          va.$s.eq(index).before($sl);

            // Reset lai gia tri va thu' tu cua Slide trong bien $s
            va.$s = va.$canvas.children('.' + va.ns + o.nameSlide);





            /**
             * TIEP TUC SETUP TUNG SLIDE
             */
            $sl.each(function() {
                var $slCur = $(this);

                // Cap nhat lai thuoc tinh tren Data
                M.Data($slCur, { 'loadBy': 'apiAdd' });



                /**
                 * PAGITEM SETUP
                 */
                if( is.pag ) {

                    // Lay noi dung ben trong cua capitem va PagItem
                    that.RENDER.CapPagHTML($slCur);

                    // Them PagItem vao pagination
                    var $pagAdd = PAG.RenderPagItem($slCur);

                    // Add PagItem vao pagination
                    if( isIDEnd ) va.$pagInner.append($pagAdd);
                    else {
                        // Mac dinh them PagItem moi phia truoc PagItem index
                        va.$pagItem.eq(index).before($pagAdd);

                        // Variable va.$pagItem reset thu tuong
                        va.$pagItem = va.$pagInner.children('.'+ va.ns +'pagitem');
                    }

                    // Setup event tap tren PagItem
                    PAG.EventTap();
                }



                /**
                 * KHOI TAO RUBY NESTED TRONG SLIDE CHE`N VAO
                 */
                var $rubyNested = $slCur.find('.' + va.ns);
                rt01MODULE.AUTOINIT($rubyNested);
            });




            /**
             * SETUP OTHERS
             */
            // Reset lai ID Cur neu Ruby chua co' slide nao`
            if( cs.num === 0 && cs.idCur < 0 ) cs.idCur = 0;

            // ID toggle class actived --> Ho tro khi index trung voi idCur
            if( index === cs.idCur ) cs.idLast = cs.idCur + 1;

            // Cap nhat lai vi tri' cua Slide va Pagination bang Refresh
            cs.refresh();

            // Setup lai thu tu load cac slide
            that.LOAD.Way();

            // Load slide ke tiep
            !o.load.isLazy && that.LOAD.Next();
        },


        /**
         * LAY NOI DUNG TU URL
         */
        GetFromURL : function(url, index) {
            var that = this,
                FN   = $.extend({}, FN, that);

            // Bien khoi tao ban dau
            var settings = {
                    type    : 'GET',
                    cache   : false,
                    crossDomain : true,
                    success : function(data) { FN.CoreAddSlide([data], index); },
                    error   : function()     { that.M.Message('ajax load failed', url); }
                };

            // Setup ajax
            $.ajax(url, settings);
        }
    };


    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModuleMaster(self) {
        one = self.one;
        o   = self.one.o;
        cs  = self.one.cs;
        va  = self.one.va;
        is  = self.one.is;
        M   = self.one.M;
        FN  = $.extend({}, FN, one);
    }

    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        M    = self.M;
    }










    /**
     * MODULE APIS MORE FUNCTION
     */
    rt01MODULE.APIMORE = {

        /**
         * API ADD - REMOVE SLIDE
         *  + Api add slide : default support insert multiple slide in same time
         */
        addSlide : function(obj, index) {
            VariableModuleMaster(this);

            // Function add slide : shortcut
            function AddSlide(aHTML) {
                FN.CoreAddSlide(aHTML, index)
            }



            /**
             * CASE: 'OBJ' IS STRING -> CONVERT TO JQUERY-SELECTOR
             */
            if( typeof obj === 'string' && obj !== '' ) AddSlide([obj]);


            /**
             * CASE: 'OBJ' IS JQUERY-OBJECT
             */
            else if( obj instanceof jQuery ) AddSlide([obj]);


            /**
             * CASE: 'OBJ' IS ARRAY[]
             *  + Support add multiple slide in ruby
             */
            else if( $.isArray(obj) && obj.length ) AddSlide(obj);


            /**
             * CASE: 'OBJ' IS OBJECT{}
             */
            else if( $.isPlainObject(obj) ) {

                // Add slide by ajax -> load ajax first
                if( obj.ajax !== undefined && typeof obj.ajax == 'string' ) FN.GetFromURL(obj.ajax, index);

                // Add slide by html
                else if( obj.html !== undefined && typeof obj.html == 'string' ) AddSlide([obj.html]);
            }
        },

        removeSlide : function(aIndex) {
            VariableModuleMaster(this);


            // Variable to recognize is api remove activing
            is.apiRemove = true;



            /**
             * SETUP 'ID-CUR' OF CURRENT SLIDE
             */
            // Case: aIndex is not array[] - undefined
            if( !$.isArray(aIndex) ) {

                // Convert to array has 1 value
                aIndex = [aIndex];

                // idCur : idCur at end, remove will reduce -> idCur switch to ID ahead
                if( cs.idCur == cs.num - 1 ) {
                    cs.ev.trigger('beforeSwapIDCur');
                    cs.idCur = cs.num - 2;
                    cs.ev.trigger('afterSwapIDCur');
                }
            }

            // Case: aIndex is array[]
            else {
                // idCur switch to the first slide
                cs.ev.trigger('beforeSwapIDCur');
                cs.idLast = cs.idCur = 0;
                cs.ev.trigger('afterSwapIDCur');

                // Toggle slide: remove actived on current slide
                M.ToggleSlide();
            }




            /**
             * LOOP: IDS OF SLIDE
             */
            for( var i = 0, len = aIndex.length; i < len; i++ ) {
                // Convert 'index' to number
                var index  = FN.ParseIndex(aIndex[i], false),
                    $slCur = va.$s.eq(index);

                // Check ruby-nested into current slide -> remove event-resize first
                is.NESTED && M.Module('NESTED').Destroy($slCur);

                // Remove slide out ruby
                $slCur.remove();

                // Remove pagItem out pagination
                if( is.pag ) va.$pagItem.eq(index).remove();
            }




            /**
             * OTHER SETUP
             */
            // Reset variables : $slide & $pagItem
            va.$s = va.$canvas.children('.'+ va.ns + o.nameSlide);
            if( is.pag ) va.$pagItem = va.$pag.find('.'+ va.ns +'pagitem');

            // Refresh other variables in ruby
            cs.refresh();
            is.apiRemove = false;
        },











        /**
         * ARRANGE BY ORDER THE SLIDES
         */
        orderSlide : function(inOrder) {
            VariableModuleMaster(this);
            var num = cs.num,
                isRightOrder = true;    // Variable used to identify sorted order validly


            /**
             * CASE: 'IN-ORDER' IS OBJECT{}
             */
            if( num > 1 && $.isPlainObject(inOrder)) {

                // Initialize variables
                var aCheck = [];

                // Function: to check for a valid number
                function CheckNum(n) {
                    return (/^\d+/g.test(n) && M.PInt(n) >= 0 && M.PInt(n) < num);
                }

                // Function: switch to value in array
                function SwapValueInAarray(arr, pOld, pNew) {
                    var temp = arr[pNew];
                    arr[pNew] = arr[pOld];
                    arr[pOld] = temp;
                }


                // Step 1: create initial position-array of slide have ascending order
                for( var i = 0; i < num; i++ ) { aCheck.push(i) }

                // Step 2: loop to get item-key in object
                for( var key in inOrder ) {
                    var val = inOrder[key], pOld, pNew;
                    if( CheckNum(key) && CheckNum(val) ) {

                        // Search position of key: switch to posiiton old & new
                        pOld = $.inArray(M.PInt(key), aCheck);
                        SwapValueInAarray(aCheck, pOld, M.PInt(val));
                    }
                }

                // Step 3: convert 'object' to array[]
                inOrder = aCheck;
            }


            /**
             * CASE: 'IN-ORDER' IS ARRAY[]
             */
            else if( num > 1 && $.isArray(inOrder) && inOrder.length == num ) {
                var aCheck = $.extend([], inOrder);

                for( var i = 0, poped; i < num; i++ ) {
                    poped = aCheck.pop();
                    if( !$.isNumeric(poped) || $.inArray(poped, aCheck) !== -1 || poped < 0 || poped >= num ) {
                        isRightOrder = false;
                        break;
                    }
                }
            }
            else isRightOrder = false;



            // Check before arrange
            if( isRightOrder ) {

                // First: remove all slides
                va.$s.detach();
                is.pag && va.$pagItem.detach();

                // After: insert slide in new order
                for( var i = 0; i < num; i++ ) {
                    var idSwap = inOrder[i];
                    va.$canvas.append(va.$s.eq(idSwap));
                    is.pag && va.$pagInner.append(va.$pagItem.eq(idSwap));
                }

                // Reset $s
                va.$s = va.$canvas.children('.'+ va.ns + o.nameSlide);
                // Reset $pagItem
                if( is.pag ) va.$pagItem = va.$pag.find('.'+ va.ns +'pagitem');
                // Reset id-current
                cs.ev.trigger('beforeSwapIDCur');
                cs.idCur = $.inArray(cs.idCur, inOrder);
                cs.ev.trigger('afterSwapIDCur');

                // Reset & update variables & properties
                cs.update();
            }

            // Display message error if invalid
            else M.Message('array or object order not right');
        },










        /**
         * TOGGLE EVENT 'SWIPE'
         */
        swipeEvent : function(status) {
            var that = this;

            typeof status === 'string'
            && ('onBody onPag offBody offPag').indexOf(status) !== -1
            && that.is.SWIPE && that.SWIPE.Events(status);
        }
    };
})(jQuery);
