import settings from '../config/settings.js';

export function get (key, defaultValue = null) {
  const item = settings[key];
  return typeof item !== 'undefined' ? item : defaultValue;
}
