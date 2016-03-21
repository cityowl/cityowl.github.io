(function (Model) {

    /**
     *
     * @constructor
     */
    function View() {
        var _this = this;

        this.states = Model.getCollection();

        this.modals = ko.observableArray([]);

        for(var i = 0; i< this.states.length; i++) {
            var _state = this.states[i].name;

            this.states[i].drop = function (data, view) {
                var _activeState = this.element.attributes['data-target'].nodeValue,
                    _activeIndex = _this._getStateIndex(_activeState),
                    _index = _this._getStateIndex(data.type);

                _this.states[_index].collection.remove(data);

                Storage.setJson(data.type, _this.states[_index].collection());

                data.type = _activeState;

                _this.states[_activeIndex].collection.push(data);

                Storage.setJson(_activeState, _this.states[_activeIndex].collection());
            };

            this.states[i].remove = function (issue) {
                var _index = _this._getStateIndex(issue.type);

                _this.states[_index].collection.remove(issue);

                Storage.setJson(issue.type, _this.states[_index].collection());
            };
        }

        /**
         * Add new issue catcher
         */
        this.addIssue = function() {
            var _this = this,
                _index = _this._getStateIndex(Model.STATE_WAITING);

            this.modals.push(new AddIssueView({
                onAdd: function(newIssue) {
                    var _issue = {
                        type: Model.STATE_WAITING,
                        title: newIssue.name,
                        desc: newIssue.desc
                    };

                    _this.states[_index].collection.push(_issue);

                    Storage.setJson(Model.STATE_WAITING, _this.states[_index].collection());

                    _this.modals([]);
                }
            }));
        };

        /**
         *
         * @param {String} name
         * @returns {Number} number
         * @private
         */
        this._getStateIndex = function(name) {
            for(var i = 0; i< this.states.length; i++) {
                if(this.states[i].name === name) {
                    return i;
                }
            }
        };
    }

    ko.applyBindings(new View());
})(Model);