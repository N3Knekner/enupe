import Axios from '../api.js';

export default class VerifyExistence {
    constructor(callback){
        this.callback = callback;
    }
    parser = async (text) => {
        const o = {};
        o[(text.includes('@') ? 'email' : 'user')] = text;
        const { data } = await Axios.post(Axios.defaults.baseUrl + "/user/exists", o);
        this.callback(data);
    }
}