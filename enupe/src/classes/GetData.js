import Axios from '../api.js';

export default async function(url){
    const hash = localStorage.getItem('authenticated') || sessionStorage.getItem('authenticated');
    const { data } = await Axios.post(Axios.defaults.baseUrl + url, { hash: hash });
    if (data.correct === false) {
        localStorage.removeItem('authenticated'); 
        sessionStorage.removeItem('authenticated');
    }
    return data;
}