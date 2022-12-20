/**
 * Created by jerryhuang on 15/7/29.
 */

define(function (require) {
    var modelToViewModel = require('ModelToViewModel'),
        favorite = require('components/datacontexts/Favorite'),
        session = require('datacontexts/Session'),
        base;

    var model = {
        init: function (id, params) {
            base = params.viewModel;
        },
        titleSection: {
            type: 'section',
            addFav: {
                type: 'button',
                label: '加入最愛',
                width: '70px',
                ui: 'btn-default btn-sm',
                event: {
                    click: function () {
                        session.getSession({
                            userId: base.userId(),
                            programId: base.programId()
                        }).done(function (data) {
                            favorite.addFavorite({
                                USERID: data.USERID,
                                SYSCD: data.SYSCD,
                                SUBSCD: data.SUBSCD,
                                MENU_SER: data.MENU_SER,
                                TRCD: 'A'
                            }).done(function (data) {
                                alert('加入我的最愛成功！');
                            }).fail(function (message) {
                                alert(message);
                            });
                        }).fail(function (message) {
                            alert(message);
                        });

                    }
                }
            }
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    //console.log(viewModel);
    return viewModel;
});