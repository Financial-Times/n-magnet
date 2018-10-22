import config from '../config/settings.js';

function get (key, defaultValue = null) {
	const item = config[key];

	return (typeof item !== 'undefined') ? item : defaultValue;
}

module.exports = {
	get
};
