///// 2. axios.js /////
 //✅ This file creates an Axios instance with TMDb’s base URL.

 import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default instance;
