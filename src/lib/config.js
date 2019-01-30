const settings = require('../config/settings.js');

function get (key, defaultValue = null) {
	const item = settings[key];
	return (typeof item !== 'undefined') ? item : defaultValue;
}

module.exports = {
    get
};