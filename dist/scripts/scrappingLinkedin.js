// src/utils/selectors.js
var $ = (selector, node = document) => node.querySelector(selector);

// src/scripts/scrappingLinkedin.js
var Profile = {
  name: $("h1").textContent()
};
