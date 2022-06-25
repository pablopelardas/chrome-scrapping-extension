(() => {
  // src/modulo.js
  var constanteRandom = Math.ceil(Math.random() * 100);

  // src/sw.js
  chrome.action.onClicked.addListener(() => console.log("clicked", constanteRandom));
})();
