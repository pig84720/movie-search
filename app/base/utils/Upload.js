define(
    function () {
        var baseUrl = '',
            setBsaeUrl = function (url) {
                baseUrl = url;
            },
            doUpload = function (url, uploadId, success, failure) {
                $.support.cors = true;
                url = baseUrl + url;
                //console.log(url);
                var files = $("#" + uploadId).get(0).files;
                if (files.length > 0) {
                    var data = new FormData();
                    for (i = 0; i < files.length; i++) {
                        data.append("file" + i, files[i]);
                    }
                    $.ajax({
                        type: "POST",
                        url: url,
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (messages) {
                            //for (i = 0; i < messages.length; i++) {
                            //	alert(messages[i]);
                            //}
                            success(messages);
                        },
                        error: function () {
                            //alert("Error while invoking the Web API");
                            failure();
                        }
                    });
                }
            },
            doUploadiFrame = function (uploadFormId) {
                var dfd1 = $.Deferred();

                try {

                    if ($('#uploadExcelToJsonFrame')[0] == null) {
                        $('<iframe>', {
                            src: 'about:blank',
                            id: 'uploadExcelToJsonFrame',
                            name: 'uploadExcelToJsonFrame',
                            frameborder: 0,
                            scrolling: 'no',
                            width: 200,
                            height: 200
                        }).appendTo(uploadFormId != null ? '#' + uploadFormId : 'form');
                    }

                    $(uploadFormId != null ? '#' + uploadFormId : 'form')
                        .attr('method', 'post')
                        .attr('target', 'uploadExcelToJsonFrame')
                        .attr('enctype', 'multipart/form-data')
                        .attr('encoding', 'multipart/form-data')
                        .attr('action', baseUrl + 'api/Excel/ExcelToJsonIE');


                    $('#uploadExcelToJsonFrame').load(function () {
                        SS.mask.hide();
                        var response = $("#uploadExcelToJsonFrame").contents().find("body").html() || '{}';
                        if (response.indexOf('<div') > -1) {
                            response = response.substr(0, response.indexOf('<div'));
                        }
                        var data = $.parseJSON(response);
                        dfd1.resolve(data);
                    });

                    SS.mask.show();
                    $(uploadFormId != null ? '#' + uploadFormId : 'form').submit();

                } catch (ex) {
                    SS.mask.hide();
                    dfd1.reject(ex);
                }
                return dfd1.promise();
            },
            transExcelToJsonOleDB = function (uploadFormId) {
                var dfd1 = $.Deferred();

                try {

                    if ($('#uploadExcelToJsonFrame')[0] == null) {
                        $('<iframe>', {
                            src: 'about:blank',
                            id: 'uploadExcelToJsonFrame',
                            name: 'uploadExcelToJsonFrame',
                            frameborder: 0,
                            scrolling: 'no',
                            width: 200,
                            height: 200
                        }).appendTo(uploadFormId != null ? '#' + uploadFormId : 'form');
                    }

                    $(uploadFormId != null ? '#' + uploadFormId : 'form')
                        .attr('method', 'post')
                        .attr('target', 'uploadExcelToJsonFrame')
                        .attr('enctype', 'multipart/form-data')
                        .attr('encoding', 'multipart/form-data')
                        .attr('action', baseUrl + 'api/Excel/OleDBExcelToJsonIE');


                    $('#uploadExcelToJsonFrame').load(function () {
                        SS.mask.hide();
                        var data = $.parseJSON($("#uploadExcelToJsonFrame").contents().find("body").html() || '{}');
                        dfd1.resolve(data);
                    });

                    SS.mask.show();
                    $(uploadFormId != null ? '#' + uploadFormId : 'form').submit();

                } catch (ex) {
                    SS.mask.hide();
                    dfd1.reject(ex);
                }
                return dfd1.promise();
            },
            uploadFile = function (inVar) {
                var dfd1 = $.Deferred(),
                    uploadFrameId = 'uploadFileFrame';

                try {
                    if ($('#' + uploadFrameId)[0] == null) {
                        $('<iframe>', {
                            src: 'about:blank',
                            id: uploadFrameId,
                            name: uploadFrameId,
                            frameborder: 0,
                            scrolling: 'no',
                            width: 0,
                            height: 0
                        }).appendTo(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form');
                    }

                    $(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form')
                        .attr('method', 'post')
                        .attr('target', uploadFrameId)
                        .attr('enctype', 'multipart/form-data')
                        .attr('encoding', 'multipart/form-data')
                        .attr('action', baseUrl + 'api/Upload/UploadFile');

                    if (!document.getElementById('uploadFileParams')) {
                        $('#' + inVar.uploadFormId).append(
                            '<input id="uploadFileParams" ' +
                            'name="uploadFileParams" ' +
                            'value=\'' + JSON.stringify(inVar.uploadFileParams) + '\' ' +
                            'type="hidden" />'
                        );
                    }
                    if (inVar.isScale == true) {
                        var files = $('input[type=file]', inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form')[0].files,
                            dfdAry = [],
                            // fd = new FormData($(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form')[0]);
                            formData = new FormData(),
                            //重新排上傳檔案
                            formAry = [],
                            dfd = $.Deferred(),
                            i = 0,
                            t = 0;
                        // console.dir(formData);
                        formData.append('uploadFileParams', JSON.stringify(inVar.uploadFileParams));
                        dfdAry.push(dfd.promise());

                        for (var x = 0; x < files.length; x++) {
                            var file = files[x];
                            // Ensure it's an image
                            if (file.type.match(/image.*/)) {
                                t++;
                                // Load the image
                                var reader = new FileReader();
                                var readerEvent = function (readerEvent) {
                                    var image = new Image();
                                    var imageLoadEvent = function (imageEvent) {

                                        // Resize the image
                                        var canvas = document.createElement('canvas'),
                                            max_size = inVar.scaleSetting.maxSize,
                                            width = image.width,
                                            height = image.height;
                                        if (width > height) {
                                            if (width > max_size) {
                                                height *= max_size / width;
                                                width = max_size;
                                            }
                                        } else {
                                            if (height > max_size) {
                                                width *= max_size / height;
                                                height = max_size;
                                            }
                                        }
                                        canvas.width = width;
                                        canvas.height = height;
                                        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                                        resizedImage = canvas.toDataURL('image/jpeg', inVar.scaleSetting.quality);

                                        var blob = dataURItoBlob(resizedImage);
                                        // formData.append("canvasImage", blob, 'pic' + i + '.jpg');
                                        //重新排上傳檔案
                                        formAry.push({
                                            id: this.index,
                                            blob: blob
                                        });

                                        if (i + 1 == t) {
                                            dfd.resolve();
                                        }
                                        i++;
                                    };
                                    image.onload = imageLoadEvent;
                                    image.src = readerEvent.target.result;
                                    image.index = this.onload.index;
                                };
                                readerEvent['index'] = x;
                                reader.onload = readerEvent;
                                reader.readAsDataURL(file);
                            }

                        }

                        $.when.apply(this, dfdAry).then(function () {
                            SS.mask.show();
                            // $(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form').submit();
                            //重新排上傳檔案
                            formAry = formAry.sort(function (a, b) {
                                return a.id > b.id ? 1 : -1;
                            });
                            for (var x = 0; x < formAry.length; x++) {
                                formData.append("canvasImage", formAry[x].blob, 'pic' + formAry[x].id + '.jpg');
                            }

                            $.ajax({
                                url: baseUrl + 'api/Upload/UploadFile',
                                data: formData,
                                cache: false,
                                contentType: false,
                                processData: false,
                                type: 'POST',
                                success: function (data) {
                                    SS.mask.hide();
                                    //data = $.parseJSON($("#" + uploadFrameId).contents().find("body").html() || '{}');
                                    //console.log(data);
                                    dfd1.resolve($.parseJSON(data));
                                }
                            });

                        });

                    } else {

                        SS.mask.show();
                        $(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form').submit();
                    }
                    $('#' + uploadFrameId).load(function () {
                        SS.mask.hide();
                        data = $.parseJSON($("#" + uploadFrameId).contents().find("body").html() || '{}');
                        //console.log(data);
                        dfd1.resolve(data);

                    });


                } catch (ex) {
                    SS.mask.hide();
                    dfd1.reject(ex);
                }
                return dfd1.promise();
            },
            uploadFileData = function (i) {
                var dfd1 = $.Deferred(),
                    formData = new FormData();
                try {
                    SS.mask.show();
                    formData.append('uploadFileParams', JSON.stringify(i.params.uploadFileParams));

                    for (var x = 0; x < i.params.imgData.length; x++) {
                        var blob = dataURItoBlob(i.params.imgData[x].src);
                        formData.append("canvasImage", blob, i.params.imgData[x].fileName);
                    }
                    $.ajax({
                        url: baseUrl + i.url,
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'POST',
                        success: function (data) {
                            SS.mask.hide();
                            // dfd1.resolve($.parseJSON(data));
                            dfd1.resolve(data);
                        }
                    });
                } catch (ex) {
                    SS.mask.hide();
                    dfd1.reject(ex);
                }
                return dfd1.promise();
            },
            uploadFileToApi = function (inVar) {
                var dfd1 = $.Deferred(),
                    uploadFrameId = 'uploadFileFrame';

                try {
                    if ($('#' + uploadFrameId)[0] == null) {
                        $('<iframe>', {
                            src: 'about:blank',
                            id: uploadFrameId,
                            name: uploadFrameId,
                            frameborder: 0,
                            scrolling: 'no',
                            width: 0,
                            height: 0
                        }).appendTo(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form');
                    }

                    $(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form')
                        .attr('method', 'post')
                        .attr('target', uploadFrameId)
                        .attr('enctype', 'multipart/form-data')
                        .attr('encoding', 'multipart/form-data')
                        .attr('action', baseUrl + inVar.api);

                    if (!document.getElementById('uploadFileParams')) {
                        $('#' + inVar.uploadFormId).append(
                            '<input id="uploadFileParams" ' +
                            'name="uploadFileParams" ' +
                            'value=\'' + JSON.stringify(inVar.uploadFileParams) + '\' ' +
                            'type="hidden" />'
                        );
                    }
                    //20190213 ADD BY SS ADAM REASON.補上縮圖處理
                    if (inVar.isScale == true) {
                        var files = $('input[type=file]', inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form')[0].files,
                            dfdAry = [],
                            // fd = new FormData($(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form')[0]);
                            formData = new FormData(),
                            //重新排上傳檔案
                            formAry = [],
                            dfd = $.Deferred(),
                            i = 0,
                            t = 0;
                        // console.dir(formData);
                        formData.append('uploadFileParams', JSON.stringify(inVar.uploadFileParams));
                        dfdAry.push(dfd.promise());

                        for (var x = 0; x < files.length; x++) {
                            var file = files[x];
                            // Ensure it's an image
                            if (file.type.match(/image.*/)) {
                                t++;
                                // Load the image
                                var reader = new FileReader();
                                var readerEvent = function (readerEvent) {
                                    var image = new Image();
                                    var imageLoadEvent = function (imageEvent) {

                                        // Resize the image
                                        var canvas = document.createElement('canvas'),
                                            max_size = inVar.scaleSetting.maxSize,
                                            width = image.width,
                                            height = image.height;
                                        if (width > height) {
                                            if (width > max_size) {
                                                height *= max_size / width;
                                                width = max_size;
                                            }
                                        } else {
                                            if (height > max_size) {
                                                width *= max_size / height;
                                                height = max_size;
                                            }
                                        }
                                        canvas.width = width;
                                        canvas.height = height;
                                        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                                        resizedImage = canvas.toDataURL('image/jpeg', inVar.scaleSetting.quality);

                                        var blob = dataURItoBlob(resizedImage);
                                        // formData.append("canvasImage", blob, 'pic' + i + '.jpg');
                                        //重新排上傳檔案
                                        formAry.push({
                                            id: this.index,
                                            blob: blob
                                        });

                                        if (i + 1 == t) {
                                            dfd.resolve();
                                        }
                                        i++;
                                    };
                                    image.onload = imageLoadEvent;
                                    image.src = readerEvent.target.result;
                                    image.index = this.onload.index;
                                };
                                readerEvent['index'] = x;
                                reader.onload = readerEvent;
                                reader.readAsDataURL(file);
                            }

                        }

                        $.when.apply(this, dfdAry).then(function () {
                            SS.mask.show();
                            // $(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form').submit();
                            //重新排上傳檔案
                            formAry = formAry.sort(function (a, b) {
                                return a.id > b.id ? 1 : -1;
                            });
                            // console.log(formAry);
                            for (var x = 0; x < formAry.length; x++) {
                                formData.append("canvasImage", formAry[x].blob, 'pic' + formAry[x].id + '.jpg');
                            }

                            $.ajax({
                                url: baseUrl + inVar.api,
                                data: formData,
                                cache: false,
                                contentType: false,
                                processData: false,
                                type: 'POST',
                                success: function (data) {
                                    SS.mask.hide();
                                    //data = $.parseJSON($("#" + uploadFrameId).contents().find("body").html() || '{}');
                                    //console.log(data);
                                    dfd1.resolve($.parseJSON(data));
                                }
                            });

                        });

                    } else {

                        SS.mask.show();
                        $(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form').submit();
                    }

                    $('#' + uploadFrameId).load(function () {
                        SS.mask.hide();
                        var response = $("#" + uploadFrameId).contents().find("body").html() || '{}';
                        //console.log(response);
                        if (response.indexOf('<div') > -1) {
                            response = response.substr(0, response.indexOf('<div'));
                        }
                        data = $.parseJSON(response);
                        //console.log(data);
                        dfd1.resolve(data);

                    });

                    //SS.mask.show();
                    //$(inVar.uploadFormId != null ? '#' + inVar.uploadFormId : 'form').submit();

                } catch (ex) {
                    SS.mask.hide();
                    dfd1.reject(ex);
                }
                return dfd1.promise();
            };

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type: mimeString});
        }

        var UploadLib = {
            setBsaeUrl: setBsaeUrl,
            doUpload: doUpload,
            doUploadiFrame: doUploadiFrame,
            uploadFile: uploadFile,
            transExcelToJsonOleDB: transExcelToJsonOleDB,
            uploadFileToApi: uploadFileToApi,
            uploadFileData: uploadFileData
        };

        SS.namespace("SS.UploadLib");
        SS.UploadLib = UploadLib;
        return UploadLib;
    });