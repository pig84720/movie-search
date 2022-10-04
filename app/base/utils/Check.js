define(function (e) {
    //-----------------------------------------------------------------------------------------
    //判斷所輸入的日期是否正確，正確則傳回YYYYMMDD/YYMMDD格式，錯誤傳回空白 
    //-----------------------------------------------------------------------------------------  
    var N003 = '日期格式输入错误，请重新输入！',
        convDate = function (strDATE, Kind) {
            //Date Check and Convert
            //strDATE:國曆日期 or 西元日期
            //Kind: 1.轉成國曆 2.轉成西曆
            var strDATE1
            var L
            var K
            var Datestring

            if (strDATE.length <= 5) {
                return "";
            }

            L = strDATE.indexOf("/")
            K = strDATE.indexOf("/", L + 1)

            if (K > L) {
                if (L > 4) {
                    strDATE1 = left(strDATE, L - 1) + "/" + right("0" + strDATE.substring(L, K - 2), 2) + "/" + right("0" + strDATE.substring(K, strDATE.length), 2);
                } else {
                    strDATE1 = (parseInt(left(strDATE, L - 1), 10) + 1911) + "/" + right("0" + strDATE.substring(L, K - 2), 2) + "/" + right("0" + strDATE.substring(K, strDATE.length), 2);
                }
                if (isDate(strDATE1) == false) {
                    return "";
                }
            } else {
                if (strDATE.length == 6) {
                    strDATE1 = (parseInt(left(strDATE, 2), 10) + 1911) + "/" + strDATE.substring(2, 4) + "/" + right(strDATE, 2);
                } else {
                    if (strDATE.length == 7) {
                        strDATE1 = parseInt(left(strDATE, 3), 10) + 1911 + "/" + strDATE.substring(3, 5) + "/" + right(strDATE, 2);
                    } else {
                        strDATE1 = left(strDATE, 4) + "/" + strDATE.substring(4, 6) + "/" + right(strDATE, 2);
                    }
                }
                if (isDate(strDATE1) == false) {
                    return "";
                }
            }
            strDATE1 = strDATE1.replace("/", "");
            strDATE1 = strDATE1.replace("/", "");
            //--Input 國曆日期
            if (strDATE1.length == 6) {
                if (Kind == 1) {
                    Datestring = left(strDATE1, 2) + "/" + strDATE1.substring(2, 4) + "/" + right(strDATE1, 2)
                    return Datestring;
                } else {
                    Datestring = (parseInt(left(strDATE1, 2), 10) + 1911) + "/" + strDATE1.substring(2, 4) + "/" + right(strDATE1, 2)
                    return Datestring;
                }

            } else {
                if (strDATE1.length == 7) {
                    if (Kind == 1) {
                        Datestring = left(strDATE1, 3) + "/" + strDATE1.substring(3, 5) & "/" + right(strDATE1, 2);
                        return Datestring;
                    } else {
                        Datestring = (parseInt(left(strDATE1, 3), 10) + 1911) + "/" & strDATE1.substring(3, 5) + "/" + right(strDATE1, 2);
                        return Datestring;
                    }
                } else {
                    if (strDATE1.length == 8) {
                        //--Input 西曆日期
                        if (Kind == 1) {
                            Datestring = (parseInt(left(strDATE1, 4), 10) - 1911) + "/" + strDATE1.substring(4, 6) + "/" + right(strDATE1, 2);
                            return Datestring;
                        } else {
                            Datestring = left(strDATE1, 4) + "/" + strDATE1.substring(4, 6) + "/" + right(strDATE1, 2);
                            return Datestring;
                        }
                    }
                }
            }
        },
    //-----------------------------------------------------------------------------------------
    //判斷所輸入的時間是否正確，正確則傳回HH:MM格式，錯誤傳回空白
    //-----------------------------------------------------------------------------------------
        timeCheck = function (strTime) {
            var strValue;
            var intMM;
            var intHH;
            var str;

            intMM = 0;
            intHH = 0;
            strValue = strTime.replace(":", "");

            for (var i = 1; i <= 4; i++) {
                if (strValue.indexOf(" ") > 0) {
                    strValue = strValue.replace(" ", "");
                }
            }

            if (strValue.length != 4 || strValue == "") {
                return "";
            }

            var strHH = left(strValue, 2);
            var strMM = right(strValue, 2);

            intHH = parseInt(strHH, 10)
            intMM = parseInt(strMM, 10)

            //***If intHH > 24 Or intMM > 60 Then
            if (intHH > 23 || intMM > 60 || isNaN(intHH) || isNaN(intMM)) {
                return "";
            } else {
                str = right("0" + intHH, 2) + ":" + right("0" + intMM, 2);
                return str;
            }
        },
        left = function (str, n) {
            if (n <= 0)
                return "";
            else if (n > String(str).length)
                return str;
            else
                return String(str).substring(0, n);
        },
        right = function (str, n) {
            if (n <= 0)
                return "";
            else if (n > String(str).length)
                return str;
            else {
                var iLen = String(str).length;
                return String(str).substring(iLen, iLen - n);
            }
        },
        isDate = function (dateStr) {
            var datePat = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
            var matchArray = dateStr.match(datePat); // is the format ok?

            if (matchArray == null) {
                //alert("Please enter date as either mm/dd/yyyy or mm-dd-yyyy.");
                return false;
            }

            month = matchArray[3]; // p@rse date into variables
            day = matchArray[5];
            year = matchArray[1];

            if (month < 1 || month > 12) { // check month range
                //alert("Month must be between 1 and 12.");
                return false;
            }

            if (day < 1 || day > 31) {
                //alert("Day must be between 1 and 31.");
                return false;
            }

            if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
                //alert("Month "+month+" doesn`t have 31 days!")
                return false;
            }

            if (month == 2) { // check for february 29th
                var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
                if (day > 29 || (day == 29 && !isleap)) {
                    alert("February " + year + " doesn`t have " + day + " days!");
                    return false;
                }
            }
            return true; // date is valid
        },
    //*----------onlyNum----------*//
        OnlyNumPress = function (e) {
            if (parseInt(window.event.keyCode) < 48 || parseInt(window.event.keyCode) >= 58) {
                window.event.keyCode = 0
                return false;
            } else {
                return true;
            }
        },
        OnlyEngNumPress = function (e) {
            if ((parseInt(window.event.keyCode) > 122 || parseInt(window.event.keyCode) < 48) ||
                (parseInt(window.event.keyCode) >= 58 && parseInt(window.event.keyCode) < 65) ||
                (parseInt(window.event.keyCode) >= 91 && parseInt(window.event.keyCode) < 97)
            ) {
                window.event.keyCode = 0
                return false;
            } else {
                return true;
            }
        },
        OnlyEngPress = function (e) {
            if ((parseInt(window.event.keyCode) > 122 || parseInt(window.event.keyCode) < 65) ||
                (parseInt(window.event.keyCode) >= 91 && parseInt(window.event.keyCode) < 97)
            ) {
                window.event.keyCode = 0
                return false;
            } else {
                return true;
            }
        },
        OnlyNumDotPress = function (e) {
            if (parseInt(window.event.keyCode) == 46) return true;
            if (parseInt(window.event.keyCode) < 48 || parseInt(window.event.keyCode) >= 58) {
                window.event.keyCode = 0
                return false;
            } else {
                return true;
            }
        },
    //*----------P=身分證檢測/U=統一編號檢核----------*//
        PUIdCheck = function (sTyp, CHKVALUE) {
            sTyp = sTyp.toUpperCase();
            switch (sTyp) {
                case "P":
                    if (CHKVALUE.length != 10) {
                        return false;
                    }
                    if (checkPId(CHKVALUE) == true) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case "U":
                    if (CHKVALUE.length != 8) {
                        return false;
                    }
                    if (checkUId(CHKVALUE) == true) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                default:
                    return true;
                    break;
            }
        },
    //*----------身分證檢測----------*//
        checkPId = function (id) {
            if (firstlettererr(id) == false) {
                return false;
            }
            if (chfastid(id) == false) {
                return false;
            }
            if (ch12fastid(id) == false) {
                return false;
            }
            if (idmanber(id) == false) {
                return false;
            }
            if (idchackok(id) == false) {
                return false;
            }
            return true;
        },
        firstlettererr = function (id) {
            var fl = id.substr(0, 1);
            var T = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //*24個*//
            var smp = id.substr(0, 1)
            if (T.indexOf(smp) == -1) {
                return false;
            } else {
                return true;
            }
        },
        chfastid = function (id) {
            var c = id.charAt(0);
            if (c < "A" || c > "Z") {
                return false;
            } else {
                return true;
            }
        },
        ch12fastid = function (id) {
            var c = id.charAt(1);
            if (c != "1" && c != "2") {
                return false;
            } else {
                return true;
            }
        },
        idmanber = function idmanber(id) { //=====後九碼為數字//
            var bmp;
            var d = "0123456789";
            var bab = id.length - 1;
            for (var i = 1; i <= bab; i++) {
                bmp = id.substr(i, 1)
                if (d.indexOf(bmp) == -1) {
                    return false;
                }
            }
            if (id != "0") {
                return true;
            } else {
                return false;
            }
        },
        idchackok = function (id) { //規則//
            var alph = new Array("A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "W", "Z", "I", "O");
            var num = new Array("10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35");
            var n = 0;
            for (i = 0; i < alph.length; i++)
                if (id.charAt(0) == alph[i])
                    n = i;
            var tot1 = parseFloat(num[n].charAt(0)) + (parseFloat(num[n].charAt(1)) * 9);
            var tot2 = 0;
            for (i = 1; i < id.length - 1; i++)
                tot2 = tot2 + parseFloat(id.charAt(i)) * (9 - i);
            var tot3 = parseFloat(id.charAt(9));
            var tot4 = tot1 + tot2 + tot3;
            if ((tot4 % 10) != 0) {
                return false;
            } else {
                return true;
            }
        },
    //*----------統一編號檢核----------*//
        checkUId = function (id) {
            if (id.length != 8) {
                return false;
            } else {
                D = new Array();

                for (var i = 0; i < 8; i++) {
                    D[i] = id.substr(i, 1);
                    if (isNaN(D[i]) == true) {
                        return false;
                    }
                    switch (i) {
                        case 0:
                            c1 = parseInt(D[i]);
                            break;
                        case 1:
                            a1 = parseInt(parseInt(D[i]) * 2 / 10);
                            b1 = parseInt(parseInt(D[i]) * 2 % 10);
                            break;
                        case 2:
                            c2 = parseInt(D[i]);
                            break;
                        case 3:
                            a2 = parseInt(parseInt(D[i]) * 2 / 10);
                            b2 = parseInt(parseInt(D[i]) * 2 % 10);
                            break;
                        case 4:
                            c3 = parseInt(D[i]);
                            break;
                        case 5:
                            a3 = parseInt(parseInt(D[i]) * 2 / 10);
                            b3 = parseInt(parseInt(D[i]) * 2 % 10);
                            break;
                        case 6:
                            a4 = parseInt(parseInt(D[i]) * 4 / 10);
                            b4 = parseInt(parseInt(D[i]) * 4 % 10);
                            break;
                        case 7:
                            c4 = parseInt(D[i]);
                            break;
                    }
                }

                r1 = c1 + c2 + c3 + c4 + a1 + a2 + a3 + a4 + b1 + b2 + b3 + b4;
                if (r1 % 10 == 0) {
                    return true;
                } else {
                    if (D[6] == 7) {
                        a5 = parseInt((a4 + b4) / 10);
                        r2 = a1 + b1 + c1 + a2 + b2 + c2 + a3 + b3 + c3 + a5 + c4;
                        if (r2 % 10 == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return false;
                }
            }
        },
        mid = function (str, start, len) {
            if (start < 0 || len < 0) {
                return '';
            }

            var iEnd, iLen = String(str).length;
            if (start + len > iLen) {
                iEnd = iLen;
            } else
                iEnd = start + len;

            return String(str).substring(start, iEnd);
        },
        inStr = function (strSearch, charSearchFor) {
            for (i = 0; i < strSearch.length; i++) {
                if (charSearchFor == mid(strSearch, i, 1)) {
                    return i;
                }
            }
            return -1;
        },
    //--去空白--//
        trim = function (strValue) {
            strValue = strValue.replace(/^\s+|\s+$/g, '');
            strValue = strValue.replace(/^\u3000+|\u3000+$/g, '');
            return strValue;
        },
    //--email_check--//
        isEmailFormatValid = function (emailSrc) {
            var email = emailSrc.replace(/^\s+|\s+$/g, '');
            if (email == '') {
                return false;
            }

            var regex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if (regex.test(email)) {
                var str = " !#$%^&*()+=|\{[]}:;'<,>?/";
                var str2 = '"';
                var result = true;
                for (var j = 0; j < email.length; j++) {
                    if (str.indexOf(email.charAt(j)) != -1 || str2.indexOf(email.charAt(j)) != -1) {
                        result = false;
                        break;
                    }
                }
                if (result == true) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
    //--最大位數限制--//
        doKeypress = function (control, maxLength) {
            var element = control
            if (!isNaN(maxLength)) {
                maxLength = parseInt(maxLength)
                var oTR = element.document.selection.createRange()
                if (oTR.text.length >= 1)
                    event.returnValue = true
                else if (element.value.length > maxLength - 1)
                    event.returnValue = false
            }
        },
        doKeydown = function (control, maxLength) {
            var element = control
            setTimeout(function () {
                maxLength = parseInt(maxLength)
                if (!isNaN(maxLength)) {
                    if (element.value.length > maxLength - 1) {
                        var oTR = window.document.selection.createRange()
                        oTR.moveStart("character", -1 * (element.value.length - maxLength))
                        oTR.text = ""
                    }
                }
            }, 1)
        },
        doBeforePaste = function (control, maxLength) {
            if (!isNaN(maxLength))
                event.returnValue = false
        },
        doPaste = function (control, maxLength) {
            var element = control
            if (!isNaN(maxLength)) {
                event.returnValue = false
                maxLength = parseInt(maxLength)
                var oTR = element.document.selection.createRange()
                var iInsertLength = maxLength - element.value.length + oTR.text.length
                var sData = window.clipboardData.getData("Text").substr(0, iInsertLength)
                oTR.text = sData;
            }
        },
    //get only number part
        getNumStr = function (str) {
            var dataString = "0123456789";
            var new_str = "";
            for (var i = 0; i < str.length; i++) {
                s = str.substring(i, i + 1);
                if (dataString.indexOf(s) >= 0) {
                    new_str += s.toString();
                }
            }
            return new_str;
        },
    //set only number part
        setNumStr = function (id) {
            if (window.document.getElementById(id)) {
                var dataString = "0123456789";
                var str = window.document.getElementById(id).value;
                var new_str = "";
                for (var i = 0; i < str.length; i++) {
                    s = str.substring(i, i + 1);
                    if (dataString.indexOf(s) >= 0) {
                        new_str += s.toString();
                    }
                }
                window.document.getElementById(id).value = new_str;
                setTimeout('if(window.document.getElementById("' + id + '")) window.document.getElementById("' + id + '").select();', 100);
            }
        },
    //date start and end check
        dateCheckSE = function (S_id, S_nm, E_id, E_nm, SE, Kind)
            //S_id：clientid
            //S_nm：
            //E_id：clientid
            //E_nm：
            //SE：which onblur flag
            //Kind：1 show chinese format 2 show west formaat
        {
            if (SE == "S") {
                var S_value = trim(window.document.getElementById(S_id).value);
                if (S_value == "") {
                    return;
                }
                //check start
                if (convDate(S_value, Kind) == "") {
                    alert("<" + S_nm + ">\u8F38\u5165\u932F\u8AA4!!");
                    window.document.getElementById(S_id).value = "";
                    window.document.getElementById(S_id).focus();
                    return;
                } else {
                    window.document.getElementById(S_id).value = convDate(S_value, Kind);
                    //check start and end logic
                    var E_value = trim(window.document.getElementById(E_id).value);
                    if (E_value == "") {
                        return;
                    }
                    var s_num = getNumStr(convDate(getNumStr(window.document.getElementById(S_id).value), Kind));
                    var e_num = getNumStr(convDate(getNumStr(window.document.getElementById(E_id).value), Kind));
                    if (s_num > e_num) {
                        alert("<" + S_nm + ">\u4E0D\u53EF\u5927\u65BC<" + E_nm + ">!!");
                        window.document.getElementById(S_id).value = "";
                        window.document.getElementById(S_id).focus();
                        return;
                    }
                }
            }
            if (SE == "E") {
                var E_value = trim(window.document.getElementById(E_id).value);
                if (E_value == "") {
                    return;
                }
                //check end
                if (convDate(E_value, Kind) == "") {
                    alert("<" + E_nm + ">\u8F38\u5165\u932F\u8AA4!!");
                    window.document.getElementById(E_id).value = "";
                    window.document.getElementById(E_id).focus();
                    return;
                } else {
                    window.document.getElementById(E_id).value = convDate(E_value, Kind);
                    //check start and end logic
                    var S_value = trim(window.document.getElementById(S_id).value);
                    if (S_value == "") {
                        return;
                    }
                    var s_num = getNumStr(convDate(getNumStr(window.document.getElementById(S_id).value), Kind));
                    var e_num = getNumStr(convDate(getNumStr(window.document.getElementById(E_id).value), Kind));
                    if (s_num > e_num) {
                        alert("<" + E_nm + ">\u4E0D\u53EF\u5C0F\u65BC<" + S_nm + ">!!");
                        window.document.getElementById(E_id).value = "";
                        window.document.getElementById(E_id).focus();
                        return;
                    }
                }
            }
        },
        dateCheckSE_A = function (S_id, S_nm, E_id, E_nm, SE, Kind)
            //S_id：clientid
            //S_nm：
            //E_id：clientid
            //E_nm：
            //SE：which onblur flag
            //Kind：1 show chinese format 2 show west formaat
        {
            if (SE == "S") {
                var S_value = trim(window.document.getElementById(S_id).value);
                if (S_value == "") {
                    return;
                }
                //check start
                if (convDate(S_value, Kind) == "") {
                    alert("<" + S_nm + ">\u8F38\u5165\u932F\u8AA4!!");
                    window.document.getElementById(S_id).value = "";
                    window.document.getElementById(S_id).focus();
                    return;
                } else {
                    window.document.getElementById(S_id).value = convDate(S_value, Kind);
                    //check start and end logic
                    var E_value = trim(window.document.getElementById(E_id).value);
                    if (E_value == "") {
                        window.document.getElementById(E_id).value = window.document.getElementById(S_id).value
                        return;
                    }
                    var s_num = getNumStr(convDate(getNumStr(window.document.getElementById(S_id).value), Kind));
                    var e_num = getNumStr(convDate(getNumStr(window.document.getElementById(E_id).value), Kind));
                    if (s_num > e_num) {
                        alert("<" + S_nm + ">\u4E0D\u53EF\u5927\u65BC<" + E_nm + ">!!");
                        window.document.getElementById(S_id).value = "";
                        window.document.getElementById(S_id).focus();
                        return;
                    }
                }
            }
            if (SE == "E") {
                var E_value = trim(window.document.getElementById(E_id).value);
                if (E_value == "") {
                    return;
                }
                //check end
                if (convDate(E_value, Kind) == "") {
                    alert("<" + E_nm + ">\u8F38\u5165\u932F\u8AA4!!");
                    window.document.getElementById(E_id).value = "";
                    window.document.getElementById(E_id).focus();
                    return;
                } else {
                    window.document.getElementById(E_id).value = convDate(E_value, Kind);
                    //check start and end logic
                    var S_value = trim(window.document.getElementById(S_id).value);
                    if (S_value == "") {
                        window.document.getElementById(S_id).value = window.document.getElementById(E_id).value
                        return;
                    }
                    var s_num = getNumStr(convDate(getNumStr(window.document.getElementById(S_id).value), Kind));
                    var e_num = getNumStr(convDate(getNumStr(window.document.getElementById(E_id).value), Kind));
                    if (s_num > e_num) {
                        alert("<" + E_nm + ">\u4E0D\u53EF\u5C0F\u65BC<" + S_nm + ">!!");
                        window.document.getElementById(E_id).value = "";
                        window.document.getElementById(E_id).focus();
                        return;
                    }
                }
            }
        },
        DateAdd = function (interval, number, date) {
            switch (interval.toLowerCase()) {
                case "y":
                    return new Date(date.setFullYear(date.getFullYear() + number));
                case "m":
                    return new Date(date.setMonth(date.getMonth() + number));
                case "d":
                    return new Date(date.setDate(date.getDate() + number));
                case "w":
                    return new Date(date.setDate(date.getDate() + 7 * number));
                case "h":
                    return new Date(date.setHours(date.getHours() + number));
                case "n":
                    return new Date(date.setMinutes(date.getMinutes() + number));
                case "s":
                    return new Date(date.setSeconds(date.getSeconds() + number));
                case "l":
                    return new Date(date.setMilliseconds(date.getMilliseconds() + number));
            }
        },
        DateDiff = function (interval, sdate, edate) {
            if (arguments.length < 3) {
                return undefined;
            }
            if (sdate.constructor != Date) {
                return undefined;
            }
            if (edate.constructor != Date) {
                return undefined;
            }
            switch (interval.toLowerCase()) {
                //計算秒差
                case "s":
                    return parseInt((edate - sdate) / 1000);
                //計算分差
                case "n":
                    return parseInt((edate - sdate) / 60000);
                //計算時差
                case "h":
                    return parseInt((edate - sdate) / 3600000);
                //計算日差
                case "d":
                    return parseInt((edate - sdate) / 86400000);
                //計算週差
                case "w":
                    return parseInt((edate - sdate) / (86400000 * 7));
                //計算月差
                case "m":
                    return (edate.getMonth() + 1) + ((edate.getFullYear() - sdate.getFullYear()) * 12) - (sdate.getMonth() + 1);
                //計算年差
                case "y":
                    return edate.getFullYear() - sdate.getFullYear();
                //輸入有誤
                default:
                    return undefined;
            }
        },
    //date start and end check with condition
        dateCheckSE_C = function (S_id, S_nm, E_id, E_nm, SE, Kind, Cdt_string, Cdt_MSG)
            //S_id：clientid
            //S_nm：
            //E_id：clientid
            //E_nm：
            //SE：which onblur flag
            //Kind：1 show chinese format 2 show west formaat
            //Cdt_string：condition string --> string like "interval|number|date"
        {
            if (SE == "S") {
                var S_value = trim(window.document.getElementById(S_id).value);
                if (S_value == "") {
                    return;
                }
                //check start
                if (convDate(S_value, Kind) == "") {
                    alert("<" + S_nm + ">\u8F38\u5165\u932F\u8AA4!!");
                    window.document.getElementById(S_id).value = "";
                    window.document.getElementById(S_id).focus();
                    return;
                } else {
                    window.document.getElementById(S_id).value = convDate(S_value, Kind);
                    //check start and end logic
                    var E_value = trim(window.document.getElementById(E_id).value);
                    if (E_value != "") {
                        var s_num = getNumStr(convDate(getNumStr(window.document.getElementById(S_id).value), Kind));
                        var e_num = getNumStr(convDate(getNumStr(window.document.getElementById(E_id).value), Kind));
                        if (s_num > e_num) {
                            alert("<" + S_nm + ">\u4E0D\u53EF\u5927\u65BC<" + E_nm + ">!!");
                            window.document.getElementById(S_id).value = "";
                            window.document.getElementById(S_id).focus();
                            return;
                        }
                    }
                }

                if (Cdt_string != "") {
                    var Cdt_ary = Cdt_string.split("|");
                    var c_dt;
                    if (Cdt_ary[2] == null || Cdt_ary[2] == "") {
                        c_dt = new Date();
                    } else {
                        c_dt = new Date(Cdt_ary[2]);
                    }
                    var l_dt = DateAdd(Cdt_ary[0], -1, c_dt);
                    var txt_dt = new Date(convDate(S_value, "2"));
                    if (DateDiff("d", l_dt, txt_dt) >= 0) {
                        alert(Cdt_MSG);
                        window.document.getElementById(S_id).value = "";
                        window.document.getElementById(S_id).focus();
                        return;
                    }
                }
            }
            if (SE == "E") {
                var E_value = trim(window.document.getElementById(E_id).value);
                if (E_value == "") {
                    return;
                }
                //check end
                if (convDate(E_value, Kind) == "") {
                    alert("<" + E_nm + ">\u8F38\u5165\u932F\u8AA4!!");
                    window.document.getElementById(E_id).value = "";
                    window.document.getElementById(E_id).focus();
                    return;
                } else {
                    window.document.getElementById(E_id).value = convDate(E_value, Kind);
                    //check start and end logic
                    var S_value = trim(window.document.getElementById(S_id).value);
                    if (S_value != "") {
                        var s_num = getNumStr(convDate(getNumStr(window.document.getElementById(S_id).value), Kind));
                        var e_num = getNumStr(convDate(getNumStr(window.document.getElementById(E_id).value), Kind));
                        if (s_num > e_num) {
                            alert("<" + E_nm + ">\u4E0D\u53EF\u5C0F\u65BC<" + S_nm + ">!!");
                            window.document.getElementById(E_id).value = "";
                            window.document.getElementById(E_id).focus();
                            return;
                        }
                    }
                }
                if (Cdt_string != "") {
                    var Cdt_ary = Cdt_string.split("|");
                    var c_dt;
                    if (Cdt_ary[2] == null || Cdt_ary[2] == "") {
                        c_dt = new Date();
                    } else {
                        c_dt = new Date(Cdt_ary[2]);
                    }
                    var l_dt = DateAdd(Cdt_ary[0], -1, c_dt);
                    var txt_dt = new Date(convDate(E_value, "2"));
                    if (DateDiff("d", l_dt, txt_dt) >= 0) {
                        alert(Cdt_MSG);
                        window.document.getElementById(E_id).value = "";
                        window.document.getElementById(E_id).focus();
                        return;
                    }
                }
            }
        },
        keyDown = function () {
            //console.log(this.tagName);
            //if ($(this)[0].nodeName == '#document' && $(this).prop('tagName') != 'INPUT') {
            //    return false;
            //}
            //event.preventDefault();
            var keycode = event.keyCode;
            var keyChar = String.fromCharCode(keycode);
            if (keycode == 13){
                event.keyCode = 9;
                if(!window.attachEvent) event.preventDefault();
            }
        },
    //取得無斜線的日期
        getDate = function (dt) {
            dt.value = dt.value.replace('/', '')
            dt.value = dt.value.replace('/', '')
            dt.select();
        },
    //離開欄位時檢核日期是否正確
        setDate = function (dt, SDTID, EDTID, SDTNM, EDTNM) {
            var sdt = document.getElementById(SDTID);
            var edt = document.getElementById(EDTID);
            if (dt.value == '') {
                return;
            }
            var ss = dt.value;
            ss = convDate(ss, 2);
            if (ss == '') {
                alert('請輸入正確日期格式！');
                dt.value = '';
                dt.focus();
                return;
            } else {
                dt.value = ss;
            }
            if (edt.value == '') {
                //edt.value = sdt.value;
                edt.value = sdt.value.replace('/', '').replace('/', '');
                setTimeout('document.getElementById("' + edt.id + '").select()', 300);
            }
            if (edt.value != '') {
                var ss1 = sdt.value;
                var ss2 = edt.value;
                ss1 = ss1.replace('/', '')
                ss1 = ss1.replace('/', '')
                ss2 = ss2.replace('/', '')
                ss2 = ss2.replace('/', '')

                if (ss1 > ss2) {
                    alert('[' + SDTNM + ']不能大於[' + EDTNM + ']！');
                    dt.value = '';
                    dt.select();
                    return;
                }
                if (edt.id != dt.id) {
                    setTimeout('document.getElementById("' + edt.id + '").select()', 300);
                }
            } else {
                dt.value = ss.replace('/', '').replace('/', '');
                dt.select();
            }
        },
    //離開欄位時檢核日期是否正確
        setDateVM = function (dtId, sdt, edt, NM) {
            var SDTNM = NM + '起',
                EDTNM = NM + '迄';
            if ($('#' + dtId).jqxDateTimeInput('getDate') == null) {
                return;
            }
            if (edt() == null) {
                edt(sdt());
                $('#' + dtId).jqxDateTimeInput('focus');
            }
            if (edt() != null) {
                if (sdt() > edt()) {
                    alert('[' + SDTNM + ']不能大於[' + EDTNM + ']！');
                    $('#' + dtId).jqxDateTimeInput('setDate', null);
                    $('#' + dtId).jqxDateTimeInput('focus');
                    return;
                } else {
                    $('#' + dtId).jqxDateTimeInput('focus');
                }
            } else {
                $('#' + dtId).jqxDateTimeInput('focus');
            }
        },
    //離開欄位時檢核日期是否正確
        setDateOne = function (dt, SDTID, SDTNM) {
            var sdt = document.getElementById(SDTID);
            if (dt.value == '') {
                return;
            }
            var ss = dt.value;
            ss = convDate(ss, 2);
            if (ss == '') {
                alert('請輸入正確日期格式！');
                dt.value = '';
                dt.focus();
                return;
            } else {
                dt.value = ss;
            }
        },
    //離開欄位時檢核年月是否正確
        setMonthOne = function (dt, SDTID, SDTNM) {
            var sdt = document.getElementById(SDTID);
            if (dt.value == '') {
                return;
            }
            var ss = dt.value + "01";
            ss = convDate(ss, 2);
            if (ss == '') {
                alert('請輸入正確年月格式！');
                dt.value = '';
                dt.focus();
                return;
            } else {
                dt.value = left(ss, 7);
            }
        },
    //取得無逗點分隔的數值
        getNumber = function (nb) {
            nb.value = nb.value.replace(',', '')
            nb.value = nb.value.replace(',', '')
            nb.value = nb.value.replace(',', '')
            nb.value = nb.value.replace(',', '')
            nb.value = nb.value.replace(',', '')
            nb.value = nb.value.replace(',', '')
            nb.value = nb.value.replace(',', '')
            nb.value = nb.value.replace(',', '')
            nb.value = nb.value.replace(',', '')
            nb.value = nb.value.replace(',', '')
            nb.select();
        },
    //離開欄位時檢核數值格式是否正確
        setNumber = function (nb, SNBID, ENBID, SNBNM, ENBNM) {
            var snb = document.getElementById(SNBID);
            var enb = document.getElementById(ENBID);
            if (nb.value == '') {
                return;
            }
            var ss = nb.value;
            ss = getNumStr(ss);
            if (ss == '') {
                alert('請輸入正確數值格式！');
                nb.value = '';
                nb.focus();
                return;
            } else {
                nb.value = addCommas(ss);
            }
            if (enb.value == '') {
                enb.value = snb.value;
            }
            if (enb.value != '') {
                var ss1 = snb.value;
                var ss2 = enb.value;
                ss1 = ss1.replace(',', '')
                ss1 = ss1.replace(',', '')
                ss1 = ss1.replace(',', '')
                ss1 = ss1.replace(',', '')
                ss1 = ss1.replace(',', '')
                ss1 = ss1.replace(',', '')
                ss1 = ss1.replace(',', '')
                ss1 = ss1.replace(',', '')
                ss1 = ss1.replace(',', '')
                ss1 = ss1.replace(',', '')

                ss2 = ss2.replace(',', '')
                ss2 = ss2.replace(',', '')
                ss2 = ss2.replace(',', '')
                ss2 = ss2.replace(',', '')
                ss2 = ss2.replace(',', '')
                ss2 = ss2.replace(',', '')
                ss2 = ss2.replace(',', '')
                ss2 = ss2.replace(',', '')
                ss2 = ss2.replace(',', '')
                ss2 = ss2.replace(',', '')

                if (ss1 > ss2) {
                    alert('[' + SNBNM + ']不能小於[' + ENBNM + ']！');
                    nb.value = '';
                    nb.focus();
                    return;
                }
            } else {
                nb.value = ss;
            }
        },
    //離開欄位時檢核數值格式是否正確
        setNumberVM = function (trCd, SNBID, ENBID) {
            if (SNBID() > ENBID()) {
                if (trCd == 'S') {
                    ENBID(SNBID());
                } else {
                    SNBID(ENBID());
                }
            }
        },
    //離開欄位時檢核數值格式是否正確
        setNumberOne = function (nb, SNBID, SNBNM) {
            var snb = document.getElementById(SNBID);
            if (nb.value == '') {
                return;
            }
            var ss = nb.value;
            ss = getNumStr(ss);
            if (ss == '') {
                alert('請輸入正確數值格式！');
                nb.value = '0';
                nb.focus();
                return;
            } else {
                nb.value = addCommas(ss);
            }
        },
    //將數值加上千分位逗號
        addCommas = function (nStr) {
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },
        checkBlank = function (vm, vmId, message) {
            if (vm() == null || vm() == '' || vm() == '0') {
                alert('請輸入【' + message + '】!');
                $('#' + vmId).focus();
                return true;
            }
            return false;
        },
        checkValueSE = function (targetId, startVM, endVM, columnName) {
            var returnObject = {
                input: '#' + targetId,
                message: '『' + columnName + '起』不可大於『' + columnName + '迄』',
                action: 'valuechanged,blur',
                rule: function (input, commit) {
                    if (startVM() == '' || endVM() == '' || startVM() == null || endVM() == null) return true;
                    var result = ((startVM() == '' ? '0' : strToNumber(startVM())) <= (endVM() == '' ? '0' : strToNumber(endVM())));
                    return result;
                }
            }
            return returnObject;
        },
        checkNumSE = function (targetId, startVM, endVM, columnName) {
            var returnObject = {
                input: '#' + targetId,
                message: '『' + columnName + '起』不可大於『' + columnName + '迄』',
                action: 'valuechanged,blur',
                rule: function (input, commit) {
                    var result = ((startVM() == '' ? '0' : strToNumber(startVM())) <= (endVM() == '' ? '0' : strToNumber(endVM())));
                    return result;
                }
            }
            return returnObject;
        },
        checkRequire = function (targetId, vm, columnName) {
            var returnObject = {
                input: '#' + targetId,
                message: '『' + columnName + '』為必要輸入欄位！',
                action: 'valuechanged, blur',
                rule: function (input, commit) {
                    //console.log(vm());
                    //console.log($('#'+targetId).val());
                    var result = vm() != null && vm() != '';
                    return result;
                }
            }
            return returnObject;
        },
        checkSysDate = function (targetId, vm, columnName) {
            var returnObject = {
                input: '#' + targetId,
                message: '『' + columnName + '』不可小於系統日！',
                action: 'valuechanged, blur',
                rule: function (input, commit) {

                    var result = parseInt((vm() == null || $.trim(vm()) == '') ? 0 : vm().replace(/\//ig, '')) >= parseInt(moment().format('YYYYMMDD'));
                    return result;
                }
            }
            return returnObject;
        },
        checkNumberRequire = function (targetId, vm, columnName) {
            var returnObject = {
                input: '#' + targetId,
                message: '『' + columnName + '』為必要輸入欄位！',
                action: 'valuechanged, blur',
                rule: function (input, commit) {
                    var result = vm() != null && vm() != 0;
                    return result;
                }
            }
            return returnObject;
        },
        checkDate = function (c_id, Kind) {
            var _value = trim(window.document.getElementById(c_id).value).replace(/\//ig, '');
            if (_value == "") {
                return;
            }

            if (convDate(_value, Kind) == "") {
                alert(N003);
                window.document.getElementById(c_id).value = "";
                window.document.getElementById(c_id).focus();
                return;
            }
            else {
                window.document.getElementById(c_id).value = convDate(_value, Kind);
            }
        },
        /**
         * Converts number into currency format
         * @param {number} number   Number that should be converted.
         * @param {string} [decimalSeparator]    Decimal separator, defaults to '.'.
         * @param {string} [thousandsSeparator]    Thousands separator, defaults to ','.
         * @param {int} [nDecimalDigits]    Number of decimal digits, defaults to `2`.
         * @return {string} Formatted string (e.g. numberToCurrency(12345.67) returns '12,345.67')
         */
        numberToCurrency = function (number, decimalSeparator, thousandsSeparator, nDecimalDigits) {
            //default values
            decimalSeparator = decimalSeparator || '.';
            thousandsSeparator = thousandsSeparator || ',';
            nDecimalDigits = nDecimalDigits || 2;
            var fixed = number.toFixed(nDecimalDigits), //limit/add decimal digits
                parts = RegExp('^(-?\\d{1,3})((\\d{3})+)\\.(\\d{' + nDecimalDigits + '})$').exec(fixed); //separate begin [$1], middle [$2] and decimal digits [$4]

            if (parts) { //number >= 1000 || number <= -1000
                return parts[1] + parts[2].replace(/\d{3}/g, thousandsSeparator + '$&') + decimalSeparator + parts[4];
            } else {
                return fixed.replace('.', decimalSeparator);
            }
        },
    //20111104 add by ss benhsu for caculate float number
    //除法函数，用来得到精确的除法结果
    //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
    //调用：accDiv(arg1,arg2)
    //返回值：arg1除以arg2的精确结果
        accDiv = function (arg1, arg2) {
            var t1 = 0, t2 = 0, r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length
            } catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length
            } catch (e) {
            }
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""))
                r2 = Number(arg2.toString().replace(".", ""))
                return (r1 / r2) * pow(10, t2 - t1);
            }
        },
        strToNumber = function (str) {
            if (str == null) {
                return 0;
            }
            return Number(str.replace(/[^0-9\.]+/g, ""));
        },
        getNumVal = function (val, digit) {
            return numberToCurrency(strToNumber(val.toString()), null, null, digit);
        },
    //get only number part and minus
        getNumFromStr = function (str) {
            var dataString = "0123456789-.";
            var new_str = "";
            for (var i = 0; i < str.length; i++) {
                s = str.substring(i, i + 1);
                if (dataString.indexOf(s) >= 0) {
                    new_str += s.toString();
                }
            }
            return parseFloat(new_str);
        },
        OnlyNumPressPlus = function (plus) {
            if (window.event.keyCode < 48 || window.event.keyCode >= 58) {
                for (idx = 0; idx < plus.length; idx++) {
                    if (window.event.keyCode == plus[idx]) {
                        return;
                    }
                }
                window.event.keyCode = 0
            }
        };
    //document.onkeydown = keyDown;

    var CheckLib = {
        OnlyNumPress: OnlyNumPress,
        OnlyNumDotPress: OnlyNumDotPress,
        convDate: convDate,
        timeCheck: timeCheck,
        isDate: isDate,
        left: left,
        right: right,
        mid: mid,
        inStr: inStr,
        PUIdCheck: PUIdCheck,
        checkPId: checkPId,
        checkUId: checkUId,
        trim: trim,
        isEmailFormatValid: isEmailFormatValid,
        doKeypress: doKeypress,
        doKeydown: doKeypress,
        doBeforePaste: doKeypress,
        doPaste: doKeypress,
        getNumStr: getNumStr,
        setNumStr: setNumStr,
        dateCheckSE: dateCheckSE,
        dateCheckSE_A: dateCheckSE_A,
        DateAdd: DateAdd,
        DateDiff: DateDiff,
        dateCheckSE_C: dateCheckSE_C,
        getDate: getDate,
        setDate: setDate,
        setDateVM: setDateVM,
        setDateOne: setDateOne,
        setMonthOne: setMonthOne,
        getNumber: getNumber,
        setNumber: setNumber,
        setNumberVM: setNumberVM,
        setNumberOne: setNumberOne,
        addCommas: addCommas,
        checkBlank: checkBlank,
        checkValueSE: checkValueSE,
        checkRequire: checkRequire,
        checkNumberRequire: checkNumberRequire,
        checkDate: checkDate,
        numberToCurrency: numberToCurrency,
        accDiv: accDiv,
        strToNumber: strToNumber,
        checkNumSE: checkNumSE,
        getNumVal: getNumVal,
        getNumFromStr: getNumFromStr,
        OnlyNumPressPlus: OnlyNumPressPlus,
        checkSysDate: checkSysDate,
        OnlyEngPress: OnlyEngPress,
        OnlyEngNumPress: OnlyEngNumPress
    };

    SS.namespace("SS.CheckLib");
    SS.CheckLib = CheckLib;
    return CheckLib;
});