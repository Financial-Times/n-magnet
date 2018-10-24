import {getEventpromoFromApi} from '../components/eventpromo/main';
import {hasValidConcepts} from './hasValidConcepts';

export async function getMagnetData (conceptIds)
{
    const validConcepts = hasValidConcepts(conceptIds) ? conceptIds : {};

    // check user counts and preferences
    // apply high level rules to select first target

    try {
        const eventPromoData = await getEventpromoFromApi(validConcepts);

        // call more services, apply fallback rules

        return { type: 'eventpromo', data: eventPromoData };
    }
    catch (err) {
        throw new Error(`error on getMagnetData, caused by ${err.toString()}`);
    }
}