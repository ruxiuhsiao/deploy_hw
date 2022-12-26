import axios from 'axios';

// const instance = axios.create({
//   baseURL: `http://localhost:4000/`,
// });

// export default instance;

const API_ROOT = 
    process.env.NODE_ENV == "production" ?
    "/api" :
    "http://localhost:4000/api";

export default const api = axios.create({baseURL: API_ROOT})

// instance.get('/hi').then((data) => console.log(data));
