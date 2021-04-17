import React from 'react';
import { Link } from 'react-router-dom';
import GetData from '../../classes/GetData.js';
import { Route, withRouter, matchPath } from 'react-router';

class UserMenu extends React.Component {
    constructor(props) {
        super();
        this.state = { data: { username: "Carregando..."} }
        this.linkCss = "flex flex-1 text-base p-2 justify-center hover:text-white hover:bg-gradient-to-tl from-teal-300 to-green-500 ";
        this.fastScroll = props.fastScroll;
        this.scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
        this.executeScroll = () => this.scrollToRef(this.fastScroll);
    }
    async componentDidMount() {
        const hash = localStorage.getItem('authenticated') || sessionStorage.getItem('authenticated');
        if (hash == null) this.props.history.push('/');

        const instantUrl = window.location.pathname;

        let x = 0;
        if (matchPath( instantUrl, { path: "/equipe4/ocorrencias" })) x = 1; else
        if (matchPath( instantUrl, { path:"/equipe4/agenda" }))       x = 2; else
        if (matchPath( instantUrl, { path:"/equipe4/notas" }))        x = 3; //else
        //if (matchPath("/equipe4")) x = 1;
        this.setState({ data: await GetData("/user/hash"), selected:x });

    }
    componentDidUpdate(){
        this.executeScroll();
    }
    render() {
        return (
            <div className="flex flex-col">
                <center>
                    <div className="bg-gray-100 rounded shadow-md my-10 p-2">
                        <div className="w-32 h-32 text-6 md:w-56 md:h-56 rounded-full bg-gray-500 m-4 bg-cover bg-center border-4 border-gradient-green" />
                        <h1 className="text-lg text-gray-800 mb-4">{this.state.data.username}</h1>
                    </div>
                    <div className="flex flex-1 flex-col bg-gray-100 text-gray-700 rounded shadow-md px-1">
                        <hr className="my-2 border-4 border-gradient-green rounded"/>
                        <Link to="/perfil/estudante" className={this.linkCss + (this.state.selected === 0 ? "bg-gray-300" : "")} onClick={() => {this.setState({selected:0})}}>Perfil</Link>
                        <hr />
                        <Link to="/ocorrencias/estudante" className={this.linkCss + (this.state.selected === 1 ? "bg-gray-300" : "")} onClick={() => { this.setState({ selected: 1 })}}>Ocorrências</Link>
                        <Route path="/(.*)/servidor">
                            <hr />
                            <Link to="/agenda/servidor" className={this.linkCss + (this.state.selected === 2 ? "bg-gray-300" : "")} onClick={() => { this.setState({ selected: 2 })}}>Agenda</Link>
                        </Route>
                        <Route path="/(.*)/(estudante)?/(responsavel)?">
                            <hr />
                            <Link to="/notas/estudante" className={this.linkCss + (this.state.selected === 3 ? "bg-gray-300" : "")} onClick={() => { this.setState({ selected: 3 })}}>Notas</Link>
                        </Route>
                        <hr/>
                        <Link to="/" className="flex flex-1 text-sm my-1 text-blue-500 justify-center hover:text-white hover:bg-gradient-to-tl from-teal-400 to-blue-600" onClick={() => { localStorage.removeItem('authenticated'); sessionStorage.removeItem('authenticated'); this.props.history.push('/')}}>SAIR</Link>
                    </div>
                </center>
            </div>
        );
    }
}

export default withRouter(UserMenu);