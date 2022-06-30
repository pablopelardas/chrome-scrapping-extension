/* eslint-disable no-console */
/* eslint-disable no-undef */
import {db} from './config/connection';
let index = 0;
let page = 1;
let extract = [];
let count = 1;
let links = [];
let keyword = '';


const goToUrl = async (url, tab) => {
    await chrome.tabs.update({ url });
    return new Promise(resolve => {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
            if (tabId === tab.id && changeInfo.status === 'complete') {
                resolve(tabId);
            }
        });
    });

};

const getCandidates = async (key, page) => {
 
    chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
        goToUrl(`https://www.linkedin.com/search/results/people/?keywords=${key}&origin=CLUSTER_EXPANSION&page=${page}&sid=yUQ`, tabs[0]).then((tabId) => {
            chrome.scripting.executeScript(
                {
                    target: {tabId},
                    files: ['./scripts/scrapping.candidates.js'],
                }
            );
        });
        
    });

    
};

const scrap = async () => {
    extract = links.slice(index, index + 5);
    index += 5;
    try{
        extract.forEach(async link => {
            await chrome.tabs.create({url: link}).then(tab => {
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id},
                        files: ['./scripts/scrappingLinkedin.js'],
                    }
                );
            });
        });
    }catch(err){
        console.log(err);
        db.delete();
    }
};

const sendFile = async () => {
    const profiles = await db.profiles.toArray();
    await fetch('http://localhost:3001/saveFile', {
        method: 'POST',
        body: JSON.stringify(profiles),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.text())
        .then(data => console.log(data))
        .catch(() => db.delete());

};

const downloadFile = async () => {
    await chrome.downloads.download({
        url: 'http://localhost:3001/download',
        filename: 'profiles.json',
    });
};

chrome.runtime.onConnect.addListener(port => {if (port.name === 'scrapper') {
    port.onMessage.addListener(async message => {
        //guardamos en la base de datos
        try{
            db.profiles.add(message);
            chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
                await chrome.tabs.remove(tabs[0].id);
                count++;
            });
            if (count === 5 && index < links.length) {
                count = 1;
                scrap();
            }
            const registers = await db.profiles.count();
            console.log(registers);
            if (registers === links.length) {
                await sendFile();
                await downloadFile();
                await db.delete();
            }
        }catch(err){
            console.log(err);
            db.delete();
        }
    }
    );
}});

chrome.runtime.onConnect.addListener(port => {if (port.name === 'scrapHtml') {
    port.onMessage.addListener(async message => {
        keyword = message.key;
        max_pages = message.max_pages;
        await getCandidates(keyword, page);
        page++;
    });
}});
chrome.runtime.onConnect.addListener(port => {if (port.name === 'scrapCandidates') {
    port.onMessage.addListener(async message => {
        links = [...links, ...message.urls];  
        if (page < max_pages) {
            await getCandidates(keyword, page);
            page++;
        }
        else {
            try{
                scrap();
            }catch(err){
                console.log(err);
                db.delete();
            }
        }
    });
}});
