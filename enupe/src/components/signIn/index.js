import React from 'react';
import Axios from "../../api.js";
import ModalAlert from '../modalAlert';
import AntiSpam from '../../classes/AntiSpam.js';
import VerifyExistence from '../../classes/VerifyExistence.js';
import AuthRouting from '../../classes/AuthRouting.js';

import Tip from '../tip';

import { Link } from 'react-router-dom';

class SignIn extends React.Component {
    constructor(props) {
        super();
        this.state = { name: "", email: "", matricula: "", password: "", passwordConfirm: "",type : 0, incorrect: [false, false, false], requiriments: [true,true], alert:false};
        this.nameHandler = new AntiSpam(() => {
             new VerifyExistence((data) => this.setState(
                 { incorrect: [
                     (data.exists[1] === "username" ? data.exists[0]: false),
                     this.state.incorrect[1]]}
                 )).parser(this.state.name); 
            });
        this.emailHandler = new AntiSpam(() => {
            new VerifyExistence((data) => this.setState(
                { incorrect: [
                    this.state.incorrect[0],
                    (data.exists[1] === "email" ? data.exists[0] : false)] }
            )).parser(this.state.email); 
            });
    }
    componentDidMount() {
        AuthRouting(this.props.callback, "/cadastro");
    }
    render(){
        return (
            <form className="flex flex-col w-full bg-white shadow-md rounded p-8 min-w-25" onSubmit={this.submitForm}>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 text-base font-bold mb-2" htmlFor="name">Nome</label>
                    <input value={this.state.name} onChange={(e) => { this.nameHandler.restart(e); this.setState({ name: e.target.value }) }} className={"shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:" + (this.state.incorrect[0] ? "border-red-600" : "border-gray-600")} name="name" id="name" type="text" required placeholder="Digite seu nome completo" />
                    <span className="text-red-600 mb-3 text-sm">{(this.state.incorrect[0] ? "O nome já está em uso." : "")}</span>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 text-base font-bold mb-2" htmlFor="email">Email</label>
                    <input value={this.state.email} onChange={(e) => { this.emailHandler.restart(e); this.setState({ email: e.target.value }) }} className={"shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:" + (this.state.incorrect[1] ? "border-red-600" : "border-gray-600")} name="email" id="email" type="email" required placeholder="meuemail@mail.com" />
                    <span className="text-red-600 mb-3 text-sm">{(this.state.incorrect[1] ? "O email já está em uso." : "")}</span>
                </div>
                <div className="flex flex-col mb-4">
                    <div className="flex flex-row mb-2 justify-between">
                        <label className="text-gray-700 text-base font-bold" htmlFor="matricula">Matrícula</label>
                        <Tip tip="Se você é pai/responsável utilize a matrícula do aluno." direction="left"/>
                    </div>
                        
                    <input value={this.state.matricula} onChange={(e) => { this.setState({ matricula: e.target.value }) }} className={"shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:" + (this.state.incorrect[2] ? "border-red-600" : "border-gray-600")} name="matricula" id="matricula" min="999999" max="9999999999" type="number" required placeholder="0000000000" />
                    <span className="text-red-600 mb-3 text-sm">{(this.state.incorrect[2] ? "O matrícula já está em uso." : "")}</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row mb-2 justify-between">
                        <label className="text-gray-700 text-base font-bold" htmlFor="passowrd">Senha</label>
                        <Tip tip="A senha deve conter no mínimo 8 caracteres dentre letras e números." direction="left" />
                    </div>
                    <input value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }, this.checkPassowrdCharacters); }} className={"shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:" + (!this.state.requiriments[0] ? "border-red-600" : "border-gray-600")} name="password" id="password" type="password" minLength="8" required placeholder="Digite sua senha" />
                    <span className="text-red-600 mb-3 text-sm">{(!this.state.requiriments[0] ? "Senha inválida." : "")}</span>
                    <input value={this.state.passwordConfirm} onChange={(e) => { this.setState({ passwordConfirm: e.target.value }, this.checkPassowrdEquals); }} className={"shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:" + (!this.state.requiriments[1] ? "border-red-600" : "border-gray-600")} name="passwordComfirm" id="passwordComfirm" type="password" minLength="8" required placeholder="Comfirme sua senha" />
                    <span className="text-red-600 mb-3 text-sm">{(!this.state.requiriments[1] ? "As senhas não coincidem." : "")}</span>
                </div>
                <div className="flex items-center justify-between text-sm md:text-base">
                    <input type="submit" value="Cadastrar" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-gray-600" />
                    <span className="text-gray-600 text-left ml-4">Já tem uma conta? <Link className="text-blue-500 hover:underline shadow rounded md:shadow-none px-2 md:px-0" to="/">Entre!</Link></span>
                </div>
                <ModalAlert onConfirm={this.signIn} open={this.state.alert} value={this.alertTexts[this.state.type]} close={()=>this.setState({alert: false})}></ModalAlert>
            </form>
        );
    }

    alertTexts = [
        <div><b>ATENÇÃO!</b> <br /> Segundo os dados já coletados você é <b>ESTUDANTE</b>, continue o cadastro <span className="text-blue-500">Confirmando</span>. <br /> Caso você seja responsável clique em <span className="text-red-500">Cancelar</span> e prossiga criando a conta do aluno antes de voltar a cadastrar-se.</div>,
        <div><b>ATENÇÃO!</b> <br /> Segundo os dados já coletados você é <b>RESPONSÁVEL</b>, continue o cadastroem <span className="text-blue-500">Confirmando</span>. <br /> Caso você seja aluno aparentemente já existe alguem cadastrado com sua matrícula, prossiga <span className="text-red-500">Cancelando</span> e contate os admnistradores do sistema.</div>,
        <div><b>ATENÇÃO!</b> <br /> Segundo os dados já coletados você é <b>SERVIDOR</b>, continue o cadastro <span className="text-blue-500">Confirmando</span>. <br /> Caso você não seja servidor <span className="text-red-500">Cancele</span> e prossiga verificando a sua matrícula, caso encontre-se escrita corretamente contate os admnistradores do sistema.</div>
    ];

    submitForm = async (e)=>{
        e.preventDefault();
        await new VerifyExistence((data) => this.setState({incorrect: [(data.exists[1] === "username" ? data.exists[0] : false),this.state.incorrect[1]]})).parser(this.state.name);
        await new VerifyExistence((data) => this.setState({incorrect: [this.state.incorrect[0],(data.exists[1] === "email" ? data.exists[0] : false)]})).parser(this.state.email); 
        if(this.state.incorrect[0] || this.state.incorrect[1] || this.state.incorrect[2]) return;
        let t = 0;
        const length = this.state.matricula.toString().length;
        if (length !== 7 && length !== 10) return;
        const { data } = await Axios.post(Axios.defaults.baseUrl + "/user/matricula", {
            matricula: this.state.matricula
        });
        if (length === 7) {
            if (data.exists) {
                this.setState({incorrect:[false,false,true]});
                return;
            }
            t = 2;
        }else{
            if(data.exists){ t = 1;}
            else { t = 0;}
        }
        this.setState({type: t, alert:true});
    }
    signIn = async () =>{
        const { data } = await Axios.post(Axios.defaults.baseUrl + "/signin", {
            name: this.state.name,
            email: this.state.email,
            matricula: this.state.matricula,
            password: this.state.password,
            type: this.state.type
        });

        if (data.correct !== false) {
            localStorage.setItem('authenticated', data.correct);
            AuthRouting(this.props.callback);
        }
        else this.setState({ incorrect: data.incorrect });
    }
    checkPassowrdCharacters(){
        const r = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/; //Regexp que determina se a string tem 8+ caracteres entre letras e numeros
        if (!r.exec(this.state.password) && this.state.password!=="") 
             this.setState((state) => ({ requiriments: [false, state.requiriments[1]] }));
        else this.setState({ requiriments: [true, true] });
    }
    checkPassowrdEquals() {
        if (!this.state.password.startsWith(this.state.passwordConfirm)) 
             this.setState((state) => ({ requiriments: [state.requiriments[0],false] }));
        else this.setState((state) => ({ requiriments: [state.requiriments[0], true] }));
    }
}

export default SignIn;