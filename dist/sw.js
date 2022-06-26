// src/sw.js
chrome.action.onClicked.addListener((tab) => {
  console.log("console");
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./scripts/scrappingLinkedin.js"]
  });
});
