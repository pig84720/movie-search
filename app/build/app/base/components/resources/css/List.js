/**
 * Created by jerryhuang on 15/7/29.
 */
define(function () {
    return {
        list: [
            {
                id: 'title-bar',
                config: {
                    template: {fromUrl: 'TitleBar', base: true},
                    viewModel: {fromParams: 'TitleBar', base: true}
                }
            },
            {
                id: 'page-layout',
                config: {
                    template: {fromUrl: 'PageLayout', base: true},
                    viewModel: {fromParams: 'PageLayout', base: true}
                }
            },
            {
                id: 'error-message',
                config: {
                    template: {fromUrl: 'UIErrorMessageSection', base: true}
                }
            },
            {
                id: 'ui-textbox',
                config: {
                    template: {fromUrl: 'UITextBox', base: true},
                    viewModel: {fromParams: 'UITextBox', base: true}
                }
            },
            {
                id: 'ui-textarea',
                config: {
                    template: {fromUrl: 'UITextArea', base: true},
                    viewModel: {fromParams: 'UITextArea', base: true}
                }
            },
            {
                id: 'ui-button',
                config: {
                    template: {fromUrl: 'UIButton', base: true}
                }
            },
            {
                id: 'ui-date',
                config: {
                    template: {fromUrl: 'UIDate', base: true},
                    viewModel: {fromParams: 'UIDate', base: true}
                }
            },
            {
                id: 'ui-time',
                config: {
                    template: {fromUrl: 'UITime', base: true},
                    viewModel: {fromParams: 'UITime', base: true}
                }
            },
            {
                id: 'ui-date-from-to',
                config: {
                    template: {fromUrl: 'UIDateFromTo', base: true},
                    viewModel: {fromParams: 'UIDateFromTo', base: true}
                }
            },
            {
                id: 'ui-numeric',
                config: {
                    template: {fromUrl: 'UINumericBox', base: true},
                    viewModel: {fromParams: 'UINumericBox', base: true}
                }
            },
            {
                id: 'ui-numeric-from-to',
                config: {
                    template: {fromUrl: 'UINumericFromTo', base: true},
                    viewModel: {fromParams: 'UINumericFromTo', base: true}
                }
            },
            {
                id: 'ui-month',
                config: {
                    template: {fromUrl: 'UIMonth', base: true},
                    viewModel: {fromParams: 'UIMonth', base: true}
                }
            },
            {
                id: 'ui-month-from-to',
                config: {
                    template: {fromUrl: 'UIMonthFromTo', base: true},
                    viewModel: {fromParams: 'UIMonthFromTo', base: true}
                }
            },
            {
                id: 'ui-dropdownlist',
                config: {
                    template: {fromUrl: 'UIDropDownList', base: true}
                }
            },
            {
                id: 'ui-checkbox',
                config: {
                    template: {fromUrl: 'UICheckBox', base: true}
                }
            },
            {
                id: 'ui-radio-list',
                config: {
                    template: {fromUrl: 'UIRadioList', base: true}
                }
            },
            {
                id: 'ui-checkbox-list',
                config: {
                    template: {fromUrl: 'UICheckBoxList', base: true}
                }
            },
            {
                id: 'ui-jqxgrid',
                config: {
                    template: {fromUrl: 'UIJqxGrid', base: true},
                    viewModel: {fromParams: 'UIJqxGrid', base: true}
                }
            },
            {
                id: 'ui-control-button',
                config: {
                    template: {fromUrl: 'UIControlButtons', base: true}
                }
            },
            {
                id: 'ui-menu',
                config: {
                    template: {fromUrl: 'UIMenu', base: true},
                    viewModel: {fromParams: 'UIMenu', base: true}
                }
            },
            {
                id: 'ui-upload',
                config: {
                    template: {fromUrl: 'UIUpload', base: true},
                    viewModel: {fromParams: 'UIUpload', base: true}
                }
            },
            {
                id: 'web-watch',
                config: {
                    template: {fromUrl: 'WebWatch', base: true},
                    viewModel: {fromParams: 'WebWatch', base: true}
                }
            },
            {
                id: 'ui-jqxtree',
                config: {
                    template: {fromUrl: 'UIJqxTree', base: true},
                    viewModel: {fromParams: 'UIJqxTree', base: true}
                }
            },
            {
                id: 'ui-tab',
                config: {
                    template: {fromUrl: 'UITab', base: true},
                    viewModel: {fromParams: 'UITab', base: true}
                }
            },
            {
                id: 'ui-excel-to-json',
                config: {
                    template: {fromUrl: 'UIExcelToJson', base: true},
                    viewModel: {fromParams: 'UIExcelToJson', base: true}
                }
            },
            {
                id: 'ui-excel-to-json-oledb',
                config: {
                    template: {fromUrl: 'UIExcelToJsonOleDB', base: true},
                    viewModel: {fromParams: 'UIExcelToJsonOleDB', base: true}
                }
            },
            {
                id: 'ui-upload-file',
                config: {
                    template: {fromUrl: 'UIUploadFile', base: true},
                    viewModel: {fromParams: 'UIUploadFile', base: true}
                }
            },
            {
                id: 'ui-print-button',
                config: {
                    template: {fromUrl: 'UIPrintButton', base: true},
                    viewModel: {fromParams: 'UIPrintButton', base: true}
                }
            },
            {
                id: 'markdown-reader',
                config: {
                    template: {fromUrl: 'MarkdownReader', base: true},
                    viewModel: {fromParams: 'MarkdownReader', base: true}
                }
            },
            {
                id: 'ui-jqxcombobox',
                config: {
                    template: {fromUrl: 'UIJqxComboBox', base: true},
                    viewModel: {fromParams: 'UIJqxComboBox', base: true}
                }
            },
            {
                id: 'ui-smart-menu',
                config: {
                    template: {fromUrl: 'UISmartMenu', base: true},
                    viewModel: {fromParams: 'UISmartMenu', base: true}
                }
            },
            {
                id: 'ui-marquee',
                config: {
                    template: {fromUrl: 'UIMarquee', base: true},
                    viewModel: {fromParams: 'UIMarquee', base: true}
                }
            },
            {
                id: 'ui-link-item-base',
                config: {
                    template: {fromUrl: 'UILinkItemBase', base: true},
                    viewModel: {fromParams: 'UILinkItemBase', base: true}
                }
            },
            {
                id: 'ui-link-item',
                config: {
                    template: {fromUrl: 'UILinkItem', base: true}
                }
            },
            {
                id: 'ui-input-button-group',
                config: {
                    template: {fromUrl: 'UIInputButtonGroup', base: true}
                }
            },
            {
                id: 'ui-add-bookmark',
                config: {
                    template: {fromUrl: 'UIAddBookMark', base: true},
                    viewModel: {fromParams: 'UIAddBookMark', base: true}
                }
            },
            {
                id: 'ui-alert',
                config: {
                    template: {fromUrl: 'UIAlert', base: true},
                    viewModel: {fromParams: 'UIAlert', base: true}
                }
            },
            {
                id: 'ui-epaper',
                config: {
                    template: {fromUrl: 'UIePaper', base: true},
                    viewModel: {fromParams: 'UIePaper', base: true}
                }
            },
            {
                id: 'ui-carousel',
                config: {
                    template: {fromUrl: 'UICarousel', base: true}
                }
            },
            {
                id: 'ui-thumbnail',
                config: {
                    template: {fromUrl: 'UIThumbnail', base: true}
                }
            },
            {
                id: 'ui-youtube-player',
                config: {
                    template: {fromUrl: 'UIYoutubePlayer', base: true},
                    viewModel: {fromParams: 'UIYoutubePlayer', base: true}
                }
            },
            {
                id: 'ui-linkset',
                config: {
                    template: {fromUrl: 'UILinkSet', base: true}
                }
            },
            {
                id: 'ui-recaptcha',
                config: {
                    template: {fromUrl: 'UIReCaptcha', base: true},
                    viewModel: {fromParams: 'UIReCaptcha', base: true}
                }
            },
            {
                id: 'ui-dialog',
                config: {
                    template: {fromUrl: 'UIDialog', base: true},
                    viewModel: {fromParams: 'UIDialog', base: true}
                }
            },
            {
                id: 'ui-ckeditor',
                config: {
                    template: {fromUrl: 'UICKEditor', base: true},
                    viewModel: {fromParams: 'UICKEditor', base: true}
                }
            }
        ]
    };
});