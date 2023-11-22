import axios from 'axios';

export default axios.create({
   //baseURL: `http://0.0.0.0:80/`,
    baseURL: `https://api.metaguard.app`,

})

// //    headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
// }