/**
 *
 */
var Model = {
    STATE_WAITING: 'Waiting',
    STATE_IN_PROCESS: 'InProcess',
    STATE_DONE: 'Done'
};

/**
 *
 * @returns {*[]}
 */
Model.getCollection = function() {
    return [{
        name: Model.STATE_WAITING,
        accepts: ['Done', 'InProcess'],
        collection : ko.observableArray(Storage.getJson(Model.STATE_WAITING))
    }, {
        name: Model.STATE_IN_PROCESS,
        accepts: ['Waiting', 'Done'],
        collection : ko.observableArray(Storage.getJson(Model.STATE_IN_PROCESS))
    },{
        name: Model.STATE_DONE,
        accepts: ['Waiting', 'InProcess'],
        collection : ko.observableArray(Storage.getJson(Model.STATE_DONE))
    }];
};

/**
 *
 * @param {String} state
 * @returns {Array}
 */
Model.get = function(state) {
    var _data = Storage.getJson('issues'),
        _grouped = [];

    for(var i=0; i < _data.length; i++) {
        if(_data[i].type === state) {
            _grouped.push(_data[i]);
        }
    }

    return _grouped;
};