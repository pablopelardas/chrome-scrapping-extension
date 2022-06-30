/* eslint-disable no-undef */
document.querySelector('button').addEventListener('click', function() {
    const keyword = document.querySelector('#keyword');
    const _pages = document.querySelector('#pages');
    let pages = parseInt(_pages.value);
    if (pages < 1 || Number.isNaN(pages)) pages = 1;
    pages++;
    const port = chrome.runtime.connect({name: 'scrapHtml'});
    port.postMessage({
        key: keyword.value,
        max_pages: pages
    });
});
