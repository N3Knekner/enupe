import React from 'react';
import TwoConfirmPasswords from '../twoConfirmPasswords';
import { Link } from 'react-router-dom';
import Axios from '../../api.js';
import ModalAlert from '../modalAlert';
import { withRouter } from 'react-router-dom'

class UpdatePassowrd extends React.Component {
    constructor() {
        super();
        const urlParams = new URLSearchParams(window.location.search);
        this.state = { password: "", hash: urlParams.get("hash"), success: false };
    }
    componentDidMount() {
        if (this.state.hash === null) this.props.history.push("/");
        const type = this.state.hash.substr(Math.ceil(this.state.hash.length - 1) / 2, 1);
        if (type !== '5') this.props.history.push("/");
    }
    render() {
        return (
            <form className="flex flex-col w-full bg-white shadow-md rounded p-8 min-w-25" onSubmit={this.submitForm}>
                <TwoConfirmPasswords update={(pass) => { this.setState({ password: pass }); console.log(pass); }} />
                <div className="flex items-center justify-between text-sm md:text-base">
                    <input type="submit" value="Alterar" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-gray-600" />
                    <span className="text-gray-600 text-left ml-4"> <Link className="text-blue-500 hover:underline shadow rounded md:shadow-none px-2 md:px-0" to="/">Voltar a tela inicial</Link></span>
                </div>
                <ModalAlert onConfirm={() => this.props.history.push("/")} open={this.state.success} value="Sua senha foi alterada com sucesso!" close={() => this.setState({ success: false })}></ModalAlert>
            </form>
        );
    }
    submitForm = async (e) => {
        e.preventDefault();
        const { data } = await Axios.post(Axios.defaults.baseUrl + "/user/updatePassword", {
            password: this.state.password,
            hash: this.state.hash
        });
        this.setState({ success: data.correct });
    }
}

export default withRouter(UpdatePassowrd);