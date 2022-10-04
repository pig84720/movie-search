define(function (require) {
    'use strict';
    var modelToViewModel = require('ModelToViewModel');
    var Swiper = require('swiper');
    // 依據參數產生對應url，把para的每一個參數寫入到http get的後方，para為一個物件，key為要帶入http的參數，value為值
    // 像是https://hostname?para1=value1&para2=value2
    var url_maker = (url, para) => {
        let first_item = true;
        for (let key of Object.keys(para)) {
        let prefix = '&'
        if (first_item) {
            prefix = '?'
            first_item = false
        }
        url += `${prefix}${key}=${para[key]}`
        }
        return url
    };
    var getData = function(url, data) {
        return fetch(url_maker(url, data), {
          method: 'GET',
        })
        .then(response => response.json());
    };

    var model = {
        id: '',
        init: function (programId, initVar, callback) {
            getData(SS.service.baseUrl + "popular", {"api_key": SS.apiKey, "language": "zh-TW", "page": "1"})
                .then(data => {
                    let outputData = data.results.map((item)=> {
                        return {
                            backgroundImage: 'url("' + SS.image.baseUrl + item.backdrop_path + '")'
                        }
                    });
                    viewModel.slideSection.kSlideList.setData(outputData);
                    var swiper = new Swiper(".mySwiper", {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        pagination: {
                          el: ".swiper-pagination",
                          clickable: true,
                        },
                        on: {
                            click: function(swiper,event) {
                            }
                        }
                    });
                })
            
            callback();
        },
        slideSection: {
            type: "section",
            kSlideList: {
                type: 'templateList',
                template: {},
                list: []
            },
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});