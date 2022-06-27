/* eslint-disable no-undef */
import {db} from './config/connection';
import {links} from './links';

let index = 0;
let extract = [];
let count = 1;
let totalLinks = links.length;
console.log(totalLinks);

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
        .catch(err => db.delete());

};

const downloadFile = async () => {
    await chrome.downloads.download({
        url: 'http://localhost:3001/download',
        filename: 'profiles.json',
    });
};

chrome.action.onClicked.addListener(async () => {
    try{
        scrap();
    }catch(err){
        console.log(err);
        db.delete();
    }
});


chrome.runtime.onConnect.addListener(port => {if (port.name === 'scrapper') {
    port.onMessage.addListener(async message => {
        //guardamos en la base de datos
        try{
            db.profiles.add(message);
            console.log(message);
            chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
                await chrome.tabs.remove(tabs[0].id);
                count++;
            });
            if (count === 5 && index < totalLinks) {
                count = 1;
                scrap();
            }
            const registers = await db.profiles.count();
            console.log(registers);
            if (registers === totalLinks) {
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


