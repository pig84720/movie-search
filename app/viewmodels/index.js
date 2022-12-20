define(function (require) {
    'use strict';
    var modelToViewModel = require('ModelToViewModel');
    var Swiper = require('swiper');
    // 依據參數產生對應url
    var url_maker = (url, para) => {
        if(para) {
            let first_item = true;
            for (let key of Object.keys(para)) {
                let prefix = '&'
                if (first_item) {
                    prefix = '?'
                    first_item = false
                }
                url += `${prefix}${key}=${para[key]}`
            }
        };
        return url
    };
    var getData = function (url, data) {
        return fetch(url_maker(url, data), {
            method: 'GET',
        }).then(response => response.json());
    };

    var model = {
        id: '',
        init: function (programId, initVar, callback) {
            //設定背景圖(因背景圖檔較大,會延遲到js的載入)
            // $("body").css("background-image", "url('/image/pexels-pixabay-355887.jpg')");
            $("body").css("background-image", "url('/movie-search/image/pexels-pixabay-355887.jpg')");
            getData(SS.service.baseUrl + "popular")
                .then(data => {
                    $.jStorage.set("movie-list", data.results);
                    let outputData = data.results.map((item) => {
                        return {
                            imageSrc: SS.image.baseUrl + item.poster_path
                        }
                    });
                    viewModel.slideSection.kSlideList.setData(outputData);
                    var swiper = new Swiper(".mySwiper", {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                        on: {
                            click: function (swiper, event) {
                                var movieDtail = $.jStorage.get('movie-list')[swiper.clickedIndex];
                                viewModel.modalSection.modalBackgroundImage(`url('${SS.image.baseUrl + movieDtail.backdrop_path}')`);
                                viewModel.modalSection.posterSrc(SS.image.baseUrl + movieDtail.poster_path);
                                viewModel.modalSection.movieTitle(movieDtail.title);
                                viewModel.modalSection.releaseYear('(' + movieDtail.title + ')');
                                viewModel.modalSection.summaryContent(movieDtail.overview);
                                $(`.modal-movie-detail`).css(`display`,`flex`);
                                $(`.modal-movie-detail`).modal(`show`);
                            }
                        }
                    });
                    $("body").css("display", "block");
                    callback();
                });
        },
        navbarSection: {
            type: "section",
            searchBox: {
                type: '',
                value: ''
            },
            trending: function() {
                SS.mask.show();
                getData(SS.service.baseUrl + "trending")
                .then(data => {
                    $.jStorage.set("movie-list", data.results);
                    let outputData = data.results.map((item) => {
                        return {
                            imageSrc: SS.image.baseUrl + item.poster_path
                        }
                    });
                    viewModel.slideSection.kSlideList.setData(outputData);
                    var swiper = new Swiper(".mySwiper", {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                        on: {
                            click: function (swiper, event) {
                                var movieDtail = $.jStorage.get('movie-list')[swiper.clickedIndex];
                                viewModel.modalSection.modalBackgroundImage(`url('${SS.image.baseUrl + movieDtail.backdrop_path}')`);
                                viewModel.modalSection.posterSrc(SS.image.baseUrl + movieDtail.poster_path);
                                viewModel.modalSection.movieTitle(movieDtail.title);
                                viewModel.modalSection.releaseYear('(' + movieDtail.title + ')');
                                viewModel.modalSection.summaryContent(movieDtail.overview);
                                $(`.modal-movie-detail`).css(`display`,`flex`);
                                $(`.modal-movie-detail`).modal(`show`);
                            }
                        }
                    });
                    SS.mask.hide();
                });
            },
            upcoming: function() {
                SS.mask.show();
                getData(SS.service.baseUrl + "upcoming ")
                .then(data => {
                    $.jStorage.set("movie-list", data.results);
                    let outputData = data.results.map((item) => {
                        return {
                            imageSrc: SS.image.baseUrl + item.poster_path
                        }
                    });
                    viewModel.slideSection.kSlideList.setData(outputData);
                    var swiper = new Swiper(".mySwiper", {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                        on: {
                            click: function (swiper, event) {
                                var movieDtail = $.jStorage.get('movie-list')[swiper.clickedIndex];
                                viewModel.modalSection.modalBackgroundImage(`url('${SS.image.baseUrl + movieDtail.backdrop_path}')`);
                                viewModel.modalSection.posterSrc(SS.image.baseUrl + movieDtail.poster_path);
                                viewModel.modalSection.movieTitle(movieDtail.title);
                                viewModel.modalSection.releaseYear('(' + movieDtail.title + ')');
                                viewModel.modalSection.summaryContent(movieDtail.overview);
                                $(`.modal-movie-detail`).css(`display`,`flex`);
                                $(`.modal-movie-detail`).modal(`show`);
                            }
                        }
                    });
                    SS.mask.hide();
                });
            },
            clickSearch: function () {
                const searchBox = $(".search-box");
                const searchBtn = $(".search-icon");
                const cancelBtn = $(".cancel-icon");
                const searchInput = $("input");
                if(searchBtn.hasClass('active')) {
                    SS.mask.show();
                    if(viewModel.navbarSection.searchBox()) {
                        getData("https://api.themoviedb.org/3/search/" + "movie", { "api_key": SS.apiKey, "language": "zh-TW", "query": viewModel.navbarSection.searchBox(), "page": "1" })
                            .then(data => {
                                if(data.results.length === 0) {
                                    viewModel.slideSection.kSlideList.setData([]);
                                    SS.mask.hide();
                                    Swal.fire('查無資料。');
                                    return;
                                };
                                $.jStorage.set("movie-list", data.results);
                                let outputData = data.results.map((item) => {
                                    return {
                                        imageSrc: SS.image.baseUrl + item.poster_path
                                    }
                                });
                                viewModel.slideSection.kSlideList.setData(outputData);
                                var swiper = new Swiper(".mySwiper", {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                    pagination: {
                                        el: ".swiper-pagination",
                                        clickable: true,
                                    },
                                    on: {
                                        click: function (swiper, event) {
                                            var movieDtail = $.jStorage.get('movie-list')[swiper.clickedIndex];
                                            viewModel.modalSection.modalBackgroundImage(`url('${SS.image.baseUrl + movieDtail.backdrop_path}')`);
                                            viewModel.modalSection.posterSrc(SS.image.baseUrl + movieDtail.poster_path);
                                            viewModel.modalSection.movieTitle(movieDtail.title);
                                            viewModel.modalSection.releaseYear('(' + movieDtail.title + ')');
                                            viewModel.modalSection.summaryContent(movieDtail.overview);
                                            $(`.modal-movie-detail`).css(`display`,`flex`);
                                            $(`.modal-movie-detail`).modal(`show`);
                                        }
                                    }
                                });
                                SS.mask.hide();
                            })
                    } else {
                        return;
                    };
                };
                searchBox.addClass("active");
                searchBtn.addClass("active");
                searchInput.addClass("active");
                cancelBtn.addClass("active");
                searchInput.focus();
            },
            clickCancel: function () {
                const searchBox = $(".search-box");
                const searchBtn = $(".search-icon");
                const cancelBtn = $(".cancel-icon");
                const searchInput = $("input");
                searchBox.removeClass("active");
                searchBtn.removeClass("active");
                searchInput.removeClass("active");
                cancelBtn.removeClass("active");
            }
        },
        slideSection: {
            type: "section",
            kSlideList: {
                type: 'templateList',
                template: {},
                list: []
            },
        },
        modalSection: {
            type: "section",
            modalBackgroundImage: {
                type: '',
                value: ''
            },
            posterSrc: {
                type: '',
                value: ''
            },
            movieTitle: {
                type: '',
                value: ''
            },
            releaseYear: {
                type: '',
                value: ''
            },
            summaryContent: {
                type: '',
                value: ''
            }
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});