import { $ } from '../utils/selectors';

const Profile = {
    name: $('h1').textContent()
};
