import {renderModule} from '../../src/lib/magnet-renderer';
import {renderEventpromo} from '../../src/components/eventpromo/main';

jest.mock('../../src/components/eventpromo/main');

describe('magnet-renderer', () => {
    describe('renderModule', () => {
        test('should throw error when rendering fails', async () => {
            const fakeErrorMessage = 'Some error occurred';
            renderEventpromo.mockImplementation(() => {
                throw new Error(fakeErrorMessage);
            });

            const magnetData = {
                type: 'eventpromo'
            };
            const magnetPlaceholderSelector = {};

            let hasError = false;
            try {
                await renderModule(magnetPlaceholderSelector,magnetData);
            }
            catch (err) {
                hasError = true;
                expect(err.message).toMatch(/magnet failed to load module/);
                expect(err.message).toMatch(magnetData.type);
                expect(err.message).toMatch(fakeErrorMessage);
            }
            expect(hasError).toEqual(true);
        });
        describe('on success', () => {
            test('should call rendering on component with data', async () => {
                renderEventpromo.mockImplementation(() => {
                    return true;
                });

                const magnetData = {
                    type: 'eventpromo',
                    data: {someKey: 'someData'}
                };
                const magnetPlaceholderSelector = {};

                let hasError = false;
                try {
                    await renderModule(magnetPlaceholderSelector,magnetData);
                    expect(renderEventpromo).toBeCalledWith(magnetPlaceholderSelector, magnetData.data);
                }
                catch (err) {
                    hasError = true;
                }
                expect(hasError).toEqual(false);
            });
        });
    });
});

