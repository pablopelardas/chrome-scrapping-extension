import { autoScroll } from '../utils/autoScroll';
import {waitForElement} from '../utils/waitForElement';
import { selectors } from './scrapper.config';
const {main} = selectors;
import axios from 'axios';
import {$, $$ } from '../utils/selectors';

const resolveIsReady = async () => {
    await waitForElement(main.profileImage);
    await autoScroll();


    console.log('termine de scrollear');
};

const scrap = async () => {
    await waitForElement(main.contactInfoA);
    const response = await axios('https://www.linkedin.com/voyager/api/identity/profiles/lucaspose/profileContactInfo',{
        headers:{
            'csrf-token': 'ajax:8655455109788390906'
        }
    });
    console.log(response.data);

    const arrayExperience = [];
    //Experiencia
    $$(main.generalContainer('experience')).forEach(element => {
        arrayExperience.push($('span[aria-hidden="true"]', element).textContent);
    });
    console.log(arrayExperience);

    const arrayEducation = [];
    //Educación
    $$(main.generalContainer('education')).forEach(element => {
        arrayEducation.push($('span[aria-hidden="true"]', element).textContent);
    });
    console.log(arrayEducation);

};

const start = async () => {
    await resolveIsReady();
    await scrap();
};


start();

