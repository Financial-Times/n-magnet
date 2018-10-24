import {getEventpromoFromApi} from '../components/eventpromo/main';

export async function getMagnetData (conceptIds)
{
    // check user counts and preferences
    // apply high level rules to select first target

    try {
        const eventPromoData = await getEventpromoFromApi(conceptIds);

        // call more services, apply fallback rules

        return { type: 'eventpromo', data: eventPromoData };
    }
    catch (err) {
        throw new Error(`error on getMagnetData, caused by ${err.toString()}`);
    }
}