import { $ } from './selectors';

// Muchas veces hay lazy loading, el elemento todavía no está cargado. Esta función permite que nuestro scrapper espere a que el elemento esté cargado.
export const waitForElement = selector => new Promise((resolve, reject) => {
    const interval = setInterval(() => {
        if ($(selector)){
            clearInterval(interval);
            resolve($(selector));
        }
    }, 10);

    setTimeout(() => {reject();}, 5500);
});