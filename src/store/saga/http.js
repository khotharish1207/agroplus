import axios from 'axios';

const http = axios.create({
    baseURL: 'https://api.agroplus.co.in/api/',
    headers: { 'X-agroplus-header': 'web' }
});

export default http;
