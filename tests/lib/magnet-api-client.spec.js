const fetchMock = require('fetch-mock');
import {geDataFromApi} from '../../src/lib/magnet-api-client';
import conceptFixture from '../fixtures/conceptFixture';
import * as config from '../../src/lib/config';

const dataSourceUrl = config.get('magnetDataSourceUrl');
jest.mock('../../src/components/eventpromo/main');

afterEach(() => {
    fetchMock.restore();
});

describe('magnet-api-client', () => {
    describe('geDataFromApi', () => {
        test('should throw error when data source fails', async () => {
            const fakeErrorMessage = 'Some error occurred';
            const error = new Error(fakeErrorMessage);
            fetchMock.post(dataSourceUrl, {throws: error});

            const conceptIds = {};

            let hasError = false;
            try {
                await geDataFromApi(conceptIds);
            }
            catch (err) {
                hasError = true;
                expect(err.message).toMatch(/failed to get magnet data/);
                expect(err.message).toMatch(fakeErrorMessage);
            }
            expect(hasError).toEqual(true);
        });
        test('should throw error when data source response invalid', async () => {
            const fakeResponse = {status: 200, body: 'invalid json data'};
            fetchMock.post(dataSourceUrl, fakeResponse);

            const conceptIds = {};

            let hasError = false;
            try {
                await geDataFromApi(conceptIds);
            }
            catch (err) {
                hasError = true;
                expect(err.message).toMatch(/failed to get magnet data/);
            }
            expect(hasError).toEqual(true);
        });
        test('should return data on success', async () => {
            const fakeData = {type: 'someType', data: 'someData'};
            fetchMock.post(dataSourceUrl, fakeData);

            const conceptIds = conceptFixture;

            let hasError = false;
            try {
                const response = await geDataFromApi(conceptIds);
                expect(response).toEqual(fakeData);
            }
            catch (err) {
                hasError = true;
            }
            expect(hasError).toEqual(false);
        });
    });
});

