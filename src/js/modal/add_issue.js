/**
 * Add issue view model
 * @param {Object} options
 * @constructor
 */
function AddIssueView(options) {
    var _this = this;

    this.id = 'add-issue';
    this.title = 'Add issue';
    this.issue_name = ko.observable('').extend({ required: "Please enter a Name" });
    this.issue_desc = ko.observable('').extend({ required: "Please enter a Description" });

    this.buttons = Array.prototype.concat([{
        btnName: 'Add',
        btnClass: 'button-primary',
        onClick: function() {
            _this.issue_name.fa();
            _this.issue_desc.fa();

            if(!_this.issue_name.hasError() && !_this.issue_desc.hasError()) {
                _this.options.onAdd({
                    name: _this.issue_name(),
                    desc: _this.issue_desc()
                });

                _this.close();
            }
        }
    }], this._getDefaultButton());

    ModalAbstract.call(this, options);
}

AddIssueView.prototype = Object.create(ModalAbstract.prototype);