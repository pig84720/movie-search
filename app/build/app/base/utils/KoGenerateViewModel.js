/**
 * Created by jerryhuang on 15/8/26.
 */

define(function (require) {
    return {
        koExcludeAttributeList: {optionsText: true, optionsValue: true},
        koRejectAttributeList: {value: true, errors: true, validator: true},
        objectToViewModel: function (object) {
            var returnObject;
            if ($.isArray(object)) {
                returnObject = ko.observableArray(object);
            } else if (typeof(object) == 'function') {
                returnObject = object;
            } else {
                returnObject = ko.observable(object);
            }
            return returnObject;
        }
    };
});