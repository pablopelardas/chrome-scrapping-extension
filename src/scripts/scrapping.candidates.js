/* eslint-disable no-undef */
import { $$ } from '../utils/selectors';
import {waitForElement} from '../utils/waitForElement';
const urls = [];


const start = async () => {
    await waitForElement('.entity-result__item');
    $$('.entity-result__title-text a').forEach(element => {
        urls.push(element.href.split('?')[0]);
    });
    
    const port = chrome.runtime.connect({name: 'scrapCandidates'});
    port.postMessage({
        urls
    });
};
start();
