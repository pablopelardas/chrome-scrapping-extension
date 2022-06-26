// src/utils/autoScroll.js
var scrollUnit = 40;
var autoScroll = () => new Promise((resolve) => {
  const intervalId = setInterval(() => {
    window.scrollTo(0, scrollUnit);
    scrollUnit += 80;
    if (scrollUnit > document.body.scrollHeight) {
      clearInterval(intervalId);
      resolve();
    }
  }, 150);
});

// src/scripts/scrappingLinkedin.js
var start = async () => {
  await autoScroll();
  console.log("termine de scrollear");
};
start();
