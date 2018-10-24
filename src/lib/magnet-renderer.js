import {renderEventpromo} from '../components/eventpromo/main';

export async function renderModule (magnetPlaceholderSelector, magnetData)
{
    try {
        if (magnetData.type === 'eventpromo') {
            await renderEventpromo(magnetPlaceholderSelector, magnetData.data);
        }
    }
    catch (err) {
        throw new Error(`magnet failed to load module of type ${magnetData.type}, cause: ${err.toString()}`);
    }
}