import * as config from '../../src/lib/config';

jest.mock(
  '../../src/config/settings.js',
  () => ({
    someKey: 'someValue'
  }),
  { virtual: true }
);

describe('config', () => {
  test('should return config value if it exists', () => {
    const conf = config.get('someKey');
    expect(conf).toEqual('someValue');
  });
  test('should return default value if config does not exist', () => {
    const conf = config.get('missingKey', 'default');
    expect(conf).toEqual('default');
  });
  test('should return null value if config does not exist and no default', () => {
    const conf = config.get('missingKey');
    expect(conf).toBeNull();
  });
});
