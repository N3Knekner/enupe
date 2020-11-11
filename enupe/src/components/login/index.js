import React from 'react';
import Axios from '../../api.js';
import AntiSpam from '../../classes/AntiSpam.js';
import VerifyExistence from '../../classes/VerifyExistence.js';
import AuthRouting from '../../classes/AuthRouting.js';
import ModalAlert from '../modalAlert';

import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super();
        this.state = { email: "", password: "", stayConnection: false, incorrect: [false, false], recovery: false, sendEmail: false};
        this.emailHandler = new AntiSpam(() => {
            new VerifyExistence((data) => this.setState(
                { incorrect: [!data.exists[0], false] }
            )).parser(this.state.email); 
        });
    }
    componentDidMount(){
        AuthRouting(this.props.callback);
    }
    render(){
        return (
            <form className="flex flex-col w-full bg-white shadow-md rounded p-8 min-w-25" onSubmit={this.submitform}>
                <div className="flex flex-col mb-4">
                    <div className="flex flex-row mb-2 justify-between">
                        <label className="text-gray-700 text-md font-bold" htmlFor="email">Nome ou Email</label>
                        <span onClick={() => { this.setState({ recovery:true})}} className="text-blue-500 text-sm cursor-pointer hover:underline shadow rounded md:shadow-none px-2 md:px-0">{(!this.state.incorrect[0] && this.state.email.length > 0 ? "Esqueci a senha!" : "")}</span>
                    </div>
                    <input value={this.state.email} autoFocus onChange={(e) => { this.setState({ email: e.target.value }); this.emailHandler.restart(e)}} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-600" + (this.state.incorrect[0] ? " border-red-600" : "")} id="email" type="text" required placeholder="__" />
                    <span className="text-red-600">{(this.state.incorrect[0] ? "Nome ou email incorretos." : "")}</span>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 text-md font-bold mb-2" htmlFor="password">Senha</label>
                    <input value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value, incorrect: [false, false] }); }} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-gray-600" + (this.state.incorrect[1] ? " border-red-600" : "")} id="password" type="password" minLength="8" required placeholder="_" />
                    <span className="text-red-600">{(this.state.incorrect[1] ? "Senha incorreta." : "")}</span>
                </div>
                <div className="flex flex-row mb-2">
                    <div className="flex-col justify-center"><input type="checkbox" id="stayConnection" checked={this.state.stayConnection} onChange={(e) => this.setState(this.setState({ stayConnection: e.target.checked }))} /></div>
                    <label className="text-gray-700 text-md mx-2" htmlFor="stayConnection">Manter conectado</label>
                </div>
                <div className="flex items-center justify-between text-sm sm:text-base">
                    <input type="submit" value="Entrar" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-gray-600" />
                    <span className="text-gray-600 ml-4">Não tem uma conta? <Link className="text-blue-500 hover:underline shadow rounded md:shadow-none px-2 md:px-0" to="/cadastro">Cadastre-se!</Link></span>
                </div>
                <ModalAlert onConfirm={this.passwordRecovery} open={this.state.recovery} value="Esqueceu a senha? Podemos enviar um email de recuperação para você!" close={() => this.setState({ recovery: false })}></ModalAlert>
                <ModalAlert onConfirm={()=>{}} open={this.state.sendEmail} value="Email enviado com sucesso!" close={() => this.setState({ sendEmail: false })}></ModalAlert>
            </form>
        );
    }
    submitform = async (e)=>{
        e.preventDefault();
        const r = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/; //Regexp que determina se a string tem 8+ caracteres entre letras e numeros
        if (!r.exec(this.state.password)) { this.setState({ incorrect: [false, true] }); return;};
        
        const { data } = await Axios.post(Axios.defaults.baseUrl+"/login", { user:this.state.email, password:this.state.password});

        if(data.correct !== false){
            localStorage.removeItem('authenticated');
            sessionStorage.removeItem('authenticated');
            const storage = this.state.stayConnection ? localStorage : sessionStorage;
            storage.setItem('authenticated', data.correct);
            AuthRouting(this.props.callback);
        }else
        if (data.incorrect[0]) { 
            this.setState({ incorrect:[true,false]});
        }else
        if (data.incorrect[1]) { this.setState({ incorrect: [false, true]})}
    }
    passwordRecovery = async ()=>{
        console.log(this.state.email);
        const x = this.state.email;
        const { data } = await Axios.post(Axios.defaults.baseUrl + "/user/keyRecovery", { user:x});
        if (data.incorrect !== false) this.setState({sendEmail:true});
    }
}

export default Login;

