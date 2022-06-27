let scrollUnit = 40;
export const autoScroll = () => new Promise(resolve =>{
    const intervalId = setInterval(() => {
        window.scrollTo(0,scrollUnit);
        scrollUnit += 80;
        if (scrollUnit>document.body.scrollHeight){
            clearInterval(intervalId);
            resolve();
        } 
    },50);
});
