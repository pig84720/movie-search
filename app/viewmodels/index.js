define(function (require) {
    'use strict';
    var modelToViewModel = require('ModelToViewModel');
    var Swiper = require('swiper');

    var model = {
        id: '',
        init: function (programId, initVar, callback) {
            var swiper = new Swiper(".mySwiper", {
                slidesPerView: 3,
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
            callback();
        },
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});