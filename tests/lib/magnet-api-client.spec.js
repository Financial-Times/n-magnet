import {getMagnetData} from '../../src/lib/magnet-api-client';
import {getEventpromoFromApi} from '../../src/components/eventpromo/main';
import conceptFixture from '../fixtures/conceptFixture';

jest.mock('../../src/components/eventpromo/main');

describe('magnet-api-client', () => {
    describe('geDataFromApi', () => {
        test('should throw error when data source fails', async () => {
            const fakeErrorMessage = 'Some error occurred';
            getEventpromoFromApi.mockImplementation(() => {
                throw new Error(fakeErrorMessage);
            });

            const conceptIds = {};

            let hasError = false;
            try {
                await getMagnetData(conceptIds);
            }
            catch (err) {
                hasError = true;
                expect(err.message).toMatch(/error on getMagnetData/);
                expect(err.message).toMatch(fakeErrorMessage);
            }
            expect(hasError).toEqual(true);
        });
        describe('should return data on success', () => {
            test('when called with valid conceptIds', async () => {
                const fakeData = {someKey: 'someValue'};
                getEventpromoFromApi.mockImplementation(() => {
                    return fakeData;
                });

                const conceptIds = conceptFixture;

                let hasError = false;
                try {
                    const response = await getMagnetData(conceptIds);
                    expect(getEventpromoFromApi).toBeCalledWith(conceptFixture);
                    expect(response.type).toEqual('eventpromo');
                    expect(response.data).toEqual(fakeData);
                }
                catch (err) {
                    hasError = true;
                }
                expect(hasError).toEqual(false);
            });
            test('when called with invalid concept ids', async () => {
                const fakeData = {someKey: 'someValue'};
                getEventpromoFromApi.mockImplementation(() => {
                    return fakeData;
                });

                const conceptIds = 'invalidValue';

                let hasError = false;
                try {
                    const response = await getMagnetData(conceptIds);
                    expect(getEventpromoFromApi).toBeCalledWith({});
                    expect(response.type).toEqual('eventpromo');
                    expect(response.data).toEqual(fakeData);
                }
                catch (err) {
                    hasError = true;
                }
                expect(hasError).toEqual(false);
            });
        });
    });
});

