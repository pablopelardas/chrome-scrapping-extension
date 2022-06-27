import Dexie from 'dexie';

export const db = new Dexie('scrapper');
db.version(1).stores({
    profiles: '++id, contactInfo, experience, education'
});