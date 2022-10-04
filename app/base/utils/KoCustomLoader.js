/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var registerComponents = require('RegisterComponents');
    registerComponents.init();

    //customize template loader
    var templateFromUrlLoader = {
        loadTemplate: function (name, templateConfig, callback) {
            if (templateConfig.fromUrl) {
                // Uses jQuery's ajax facility to load the markup from a file
                var fullUrl = SS.app.baseUrl +
                    (templateConfig.base ? 'app/base/components/templates/' : 'app/components/templates/') +
                    templateConfig.fromUrl +
                    (templateConfig.fromUrl.indexOf('.html') > -1 ? '' : '.html');
                $.get(fullUrl, function (markupString) {
                    ko.components.defaultLoader.loadTemplate(name, markupString, callback);
                });
            } else {
                // Unrecognized config format. Let another loader handle it.
                callback(null);
            }
        }
    };

    // Register template loader
    ko.components.loaders.unshift(templateFromUrlLoader);

    //customize viewmodel loader
    var viewModelCustomLoader = {
        loadViewModel: function (name, viewModelConfig, callback) {
            if (viewModelConfig.requireLoader) {
                var requireUrl = (viewModelConfig.base ? 'base/components/viewmodels/' : 'components/viewmodels/') +
                    viewModelConfig.requireLoader;

                require([requireUrl], function (viewModel) {
                    var requireViewModel = function (params) {
                        for (var exp in viewModel) {
                            //this[exp] = ko.mapping.fromJS(ko.toJS(viewModel[exp]));
                        }

                        if (viewModel['id']) {
                            var vm = {};
                            for (var exp in viewModel) {
                                vm[exp] = this[exp];
                            }
                            SS.namespace('viewModel.' + viewModel['id'] + (params.id != null ? '.' + params.id : ''), vm);
                        }
                        if (this['init']) {
                            setTimeout(function () {
                                var idArray = viewModel['id'].split('.');
                                var vmInit = SS.getViewModel(idArray[idArray.length - 1], params.id);
                                if (typeof(vmInit['init']) == 'function') {
                                    try {
                                        vmInit['init'].call(vmInit);
                                        //console.log(viewModel['id'] + (params.id != null ? '.' + params.id : '') + 'init');
                                    } catch (e) {
                                        SS.log('SpeedJS.define', '"' + viewModel['id'] + (params.id != null ? '.' + params.id : '') + '" init function execute fail, "' + e.message + '"!!');
                                    }
                                }
                            }, 50);
                        }
                    };
                    ko.components.defaultLoader.loadViewModel(name, requireViewModel, callback);
                });
            } else {
                if (viewModelConfig.fromParams) {
                    var requireUrl = (viewModelConfig.base ? 'base/components/viewmodels/' : 'components/viewmodels/') +
                        viewModelConfig.fromParams;
                    require([requireUrl], function (viewModel) {
                        var paramsViewModel = function (params) {
                            for (var exp in params) {
                                this[exp] = params[exp];
                            }
                            for (var exp in viewModel) {
                                //this[exp] = ko.mapping.fromJS(ko.toJS(viewModel[exp]));
                                this[exp] = viewModel[exp];
                            }
                            if (viewModel['init']) {
                                viewModel['init'](params['id'] == null ? 'noId' : params['id'](), params);
                            }
                        };
                        ko.components.defaultLoader.loadViewModel(name, paramsViewModel, callback);
                    });
                } else {
                    // Unrecognized config format. Let another loader handle it.
                    callback(null);
                }
            }
        }
    };

    // Register customize viewmodel loader
    ko.components.loaders.unshift(viewModelCustomLoader);

    var init = function () {
        if (SS.components.length > 0) {
            for (var i = 0; i < SS.components.length; i++) {
                var component = SS.components[i];
                if (component.config.viewModel) {
                    ko.components.register(component.id, {
                        template: component.config.template,
                        viewModel: component.config.viewModel,
                        synchronous: true
                    });
                } else {
                    ko.components.register(component.id, {
                        template: component.config.template
                    });
                }
            }
        }
    }

    return {
        init: init
    };
});