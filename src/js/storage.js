/**
 *  Localstorage simple library
 */
var Storage =  {
    /**
     *
     * @param key
     * @returns {*}
     */
    get: function (key) {
        return localStorage.getItem(key);
    },

    /**
     *
     * @param key
     * @param value
     */
    set: function (key, value) {
        localStorage.setItem(key, value);
    },

    /**
     * Prepare and set json
     *
     * @param key
     * @param value
     */
    setJson: function (key, value) {
        value = JSON.stringify(value);
        this.set(key, value);
    },

    /**
     * Get and unprepare json
     * @param key
     * @returns {*}
     */
    getJson: function (key) {
        if (this.isset(key)) {
            return JSON.parse(this.get(key));
        }
    },

    /**
     *
     * @param key
     * @returns {boolean}
     */
    isset: function (key) {
        return Object.prototype.hasOwnProperty.call(localStorage, key);
    },

    /**
     *
     * @param key
     */
    unset: function (key) {
        if (this.isset(key)) {
            localStorage.removeItem(key);
        }
    }
};
