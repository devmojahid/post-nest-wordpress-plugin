import axios from 'axios';

const client = axios.create({
    baseURL: window.postNestSettings.apiUrl,
    headers: {
        'X-WP-Nonce': window.postNestSettings.nonce,
        'Content-Type': 'application/json',
    },
});

export default client; 