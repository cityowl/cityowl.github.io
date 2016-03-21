/**
 *
 * @param {Object} options
 * @constructor
 */
function ModalAbstract(options) {
    this.isModalOpened = ko.observable(true);
    this.options = options;
}

/**
 * Closes modal dialog
 */
ModalAbstract.prototype.close = function() {
    this.isModalOpened(false);
};

/**
 * Returns list of buttons necessary to append
 * @returns {*[]}
 * @private
 */
ModalAbstract.prototype._getDefaultButton = function() {
    var _this = this;

    return [{
        btnName: 'Close',
        btnClass: '',
        onClick: function() {
            _this.close();
        }
    }];
};