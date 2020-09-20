import React from 'react';
import Axios from '../../api.js';
//import axios from 'axios';

import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {email:"",password:"",incorrect:[false,false]};
    }
    render(){
        return (
            <form className="flex flex-col w-full bg-white shadow-md rounded p-8" onSubmit={this.submitform}>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 text-md font-bold mb-2" htmlFor="email">Nome ou Email</label>
                    <input value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value,incorrect:[false,false]});}} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-600"+(this.state.incorrect[0]?" border-red-600":"")} id="email" type="text" placeholder="__" />
                    <span className="text-red-600">{(this.state.incorrect[0] ? "Nome ou email incorretos." : "")}</span>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 text-md font-bold mb-2" htmlFor="password">Senha</label>
                    <input value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value, incorrect: [false, false]}); }} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-gray-600"+(this.state.incorrect[1]?" border-red-600":"")} id="password" type="password" placeholder="_" />
                    <span className="text-red-600">{(this.state.incorrect[1] ? "Senha incorreta." : "")}</span>
                </div>
                <div className="flex items-center justify-between">
                    <input type="submit" value="Entrar" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-gray-600" />
                    <span className="text-gray-600 ml-4">Não tem uma conta? <Link className="text-blue-500 hover:underline shadow rounded md:shadow-none px-2 md:px-0" to="/cadastro">Cadastre-se!</Link></span>
                </div>
            </form>
        );
    }
    submitform = async (e)=>{
        e.preventDefault();

        const { data } = await Axios.post(Axios.defaults.baseUrl+"/login", { a:this.state.email, b:this.state.password});

        if(data.correct !== false){
            localStorage.setItem('authenticated', data.correct);
            window.location.reload(false); //Precisa mesmo disso, eu tentei de todas as formas evitar
        }else
        if (data.incorrect[0]) { 
            this.setState({ incorrect:[true,false]});
        }else
        if (data.incorrect[1]) { this.setState({ incorrect: [false, true]})}
    }
}

export default Login;

