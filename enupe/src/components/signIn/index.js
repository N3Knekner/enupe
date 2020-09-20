import React from 'react';
import Axios from "../../api.js";

import Tip from '../tip';

import { Link } from 'react-router-dom';

class SignIn extends React.Component {
    constructor(props) {
        super();
        this.state = { name: "", email: "", matricula: "", password: "", passwordConfirm: "", incorrect: [false, false], requiriments: [true,true]};
    }
    render(){
        return (
            <form className="flex flex-col w-full bg-white shadow-md rounded p-8" onSubmit={this.submitForm}>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 text-md font-bold mb-2" htmlFor="name">Nome</label>
                    <input value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value})}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-600" name="name" id="name" type="text" placeholder="Digite seu nome completo" />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 text-md font-bold mb-2" htmlFor="email">Email</label>
                    <input value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value})}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-600" name="email" id="email" type="email" placeholder="meuemail@mail.com" />
                </div>
                <div className="flex flex-col mb-4">
                    <div className="flex flex-row mb-2 justify-between">
                        <label className="text-gray-700 text-md font-bold" htmlFor="matricula">Matrícula</label>
                        <Tip tip="Se você é pai/responsável utilize a matrícula do aluno." direction="left"/>
                    </div>
                        
                    <input value={this.state.matricula} onChange={(e) => { this.setState({ matricula: e.target.value})}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-600" name="matricula" id="matricula" type="number" placeholder="0000000000" />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row mb-2 justify-between">
                        <label className="text-gray-700 text-md font-bold" htmlFor="matricula">Senha</label>
                        <Tip tip="A senha deve conter no mínimo 8 caracteres dentre letras e números." direction="left" />
                    </div>
                    <input value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }, this.checkPassowrdCharacters); }} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:" + (!this.state.requiriments[0] ? "border-red-600" : "border-gray-600")} name="password" id="password" type="password" placeholder="Digite sua senha" />
                    <span className="text-red-600 mb-3 text-sm">{(!this.state.requiriments[0] ? "Senha inválida." : "")}</span>
                    <input value={this.state.passwordConfirm} onChange={(e) => { this.setState({ passwordConfirm: e.target.value }, this.checkPassowrdEquals); }} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:" + (!this.state.requiriments[1] ? "border-red-600" : "border-gray-600")} name="passwordComfirm" id="passwordComfirm" type="password" placeholder="Comfirme sua senha" />
                    <span className="text-red-600 mb-3 text-sm">{(!this.state.requiriments[1] ? "As senhas não coincidem." : "")}</span>
                </div>
                <div className="flex items-center justify-between">
                    <input type="submit" value="Cadastrar" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-gray-600" />
                    <span className="text-gray-600 text-left">Já tem uma conta? <Link className="text-blue-500 hover:underline shadow rounded md:shadow-none px-2 md:px-0" to="/">Entre!</Link></span>
                </div>
            </form>
        );
    }
    async submitForm(e){
        e.preventDefault();

        const { data } = await Axios.post(Axios.defaults.baseUrl + "/signin", { a: this.state.email, b: this.state.password });
        if (data.correct !== false) { 
            localStorage.setItem('authenticated', data.correct);
            window.location.reload(false);
        }
        else this.setState({incorrect:data.incorrect});
    }
    checkPassowrdCharacters(){
        const r = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/; //Regexp que determina se a string tem 8+ caracteres entre letras e numeros
        if (!r.exec(this.state.password) && this.state.password!=="") this.setState((state, props) => ({ requiriments: [false, state.requiriments[1]] }));
        else this.setState({ requiriments: [true, true] });
    }
    checkPassowrdEquals() {
        if (!this.state.password.startsWith(this.state.passwordConfirm)) this.setState((state, props) => ({ requiriments: [state.requiriments[0],false] }));
        else this.setState((state, props) => ({ requiriments: [state.requiriments[0], true] }));
    }
}

export default SignIn;