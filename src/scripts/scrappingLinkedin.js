/* eslint-disable no-undef */
import { autoScroll } from '../utils/autoScroll';
import {waitForElement} from '../utils/waitForElement';
import { selectors } from './scrapper.config';
const {main} = selectors;
import axios from 'axios';
import {$, $$ } from '../utils/selectors';

const resolveIsReady = async () => {
    await waitForElement(main.profileImage);
    await autoScroll();

};

const scrap = async () => {
    await waitForElement(main.contactInfoA);
    let response;
    const user = window.location.href.split('/')[4];
    console.log(user);
    response = await axios(`https://www.linkedin.com/voyager/api/identity/profiles/${user}/profileContactInfo`,{
        headers:{
            'csrf-token': 'ajax:8655455109788390906'
        }
    });

    const arrayExperience = [];
    //Experiencia
    $$(main.generalContainer('experience')).forEach(element => {
        const fields =($$('span[aria-hidden="true"]', element));
        let experience = {
            title: fields[0]?.innerText || '',
            enterprise: fields[1]?.innerText || '',
            period: fields[2]?.innerText.split('·')[0] || '',
            duration: fields[2]?.innerText.split('·')[1] || '',
            location: fields[3]?.innerText || '',
            description: $(main.descriptions, element)?.innerText || '',
        };
        arrayExperience.push(experience);
    });

    const arrayEducation = [];
    //Educación
    $$(main.generalContainer('education')).forEach(element => {
        let education = {
            title: $('span[aria-hidden="true"]', element).innerText,
            description: $(main.descriptions, element)?.innerText,
        };
        arrayEducation.push(education);
    });

    // eslint-disable-next-line no-undef
    const port = chrome.runtime.connect({name: 'scrapper'});
    port.postMessage({
        contactInfo: response.data,
        experience: arrayExperience,
        education: arrayEducation
    });
};

const start = async () => {
    await resolveIsReady();
    await scrap();
};


start();

