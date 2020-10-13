import Axios from '../api.js';

export default class VerifyExistence {
    constructor(callback){
        //Private
        this.callback = callback;
    }
    //Public
    parser = async (text) => {
        const o = {};
        if(text.length === 0){return;}
        o[(text.includes('@') ? 'email' : 'user')] = text;
        const { data } = await Axios.post(Axios.defaults.baseUrl + "/user/exists", o);
        this.callback(data);
    }
}