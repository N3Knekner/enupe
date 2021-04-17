import React from 'react';
import Tip from '../tip';

// import { Container } from './styles';

class TwoConfirmPasswords extends React.Component {
    constructor() {
        super();
        this.state = { password: "", passwordConfirm: "", requiriments: [true, true] }
    }
    render() {
        return (
            <div className="flex flex-col">
                <div className="flex flex-row mb-2 justify-between">
                    <label className="text-gray-700 text-base font-bold" htmlFor="passowrd">Nova Senha</label>
                    <Tip tip="A senha deve conter no mínimo 8 caracteres dentre letras e números, não caracteres especiais." direction="left" />
                </div>
                <input value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }, this.checkPassowrdCharacters); }} className={"shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:" + (!this.state.requiriments[0] ? "border-red-600" : "border-gray-600")} name="password" id="password" type="password" minLength="8" required placeholder="Digite sua senha" />
                <span className="text-red-600 mb-3 text-sm">{(!this.state.requiriments[0] ? "Senha inválida." : "")}</span>
                <input value={this.state.passwordConfirm} onChange={(e) => { this.setState({ passwordConfirm: e.target.value }, this.checkPassowrdEquals); }} className={"shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:" + (!this.state.requiriments[1] ? "border-red-600" : "border-gray-600")} name="passwordComfirm" id="passwordComfirm" type="password" minLength="8" required placeholder="Comfirme sua senha" />
                <span className="text-red-600 mb-3 text-sm">{(!this.state.requiriments[1] ? "As senhas não coincidem." : "")}</span>
            </div>
        );
    }
    sendPassowrd() {
        console.log("object");
        if (this.state.requiriments[0] && this.state.requiriments[1])
            this.props.update(this.state.password);
    }
    checkPassowrdCharacters() {
        const r = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/; //Regexp que determina se a string tem 8+ caracteres entre letras e numeros
        if (!r.exec(this.state.password) && this.state.password !== "")
            this.setState((state) => ({ requiriments: [false, state.requiriments[1]] }));
        else this.setState({ requiriments: [true, true] });
        this.sendPassowrd();
    }
    checkPassowrdEquals() {
        if (!this.state.password.startsWith(this.state.passwordConfirm))
            this.setState((state) => ({ requiriments: [state.requiriments[0], false] }));
        else this.setState((state) => ({ requiriments: [state.requiriments[0], true] }));
        this.sendPassowrd();
    }
}

export default TwoConfirmPasswords;