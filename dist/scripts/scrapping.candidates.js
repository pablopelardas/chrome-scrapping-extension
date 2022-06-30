(() => {
  // src/utils/selectors.js
  var $ = (selector, node = document) => node.querySelector(selector);
  var $$ = (selector, node = document) => node.querySelectorAll(selector);

  // src/utils/waitForElement.js
  var waitForElement = (selector) => new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if ($(selector)) {
        clearInterval(interval);
        resolve($(selector));
      }
    }, 10);
    setTimeout(() => {
      reject();
    }, 5500);
  });

  // src/scripts/scrapping.candidates.js
  var urls = [];
  var start = async () => {
    await waitForElement(".entity-result__item");
    $$(".entity-result__title-text a").forEach((element) => {
      urls.push(element.href.split("?")[0]);
    });
    const port = chrome.runtime.connect({ name: "scrapCandidates" });
    port.postMessage({
      urls
    });
  };
  start();
})();
