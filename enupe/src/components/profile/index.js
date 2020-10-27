import React from 'react';
import { Link } from 'react-router-dom';
import GetData from '../../classes/GetData.js';
import { withRouter } from 'react-router';

class Profile extends React.Component{
    constructor(props){
        super();
        this.state = {data:{}}
    }
    async componentDidMount(){
        const hash = localStorage.getItem('authenticated') || sessionStorage.getItem('authenticated');
        if(hash == null) this.props.history.push('/');

        this.setState({ data: await GetData("/user/hash")});

    }
    render() {
        return (
            <div className="flex flex-col">
                <center>
                    <h1 className="text-lg mb-4">{this.state.data.username}</h1>
                    <Link to="/" className="text-lg font-bold hover:underline" onClick={() => { localStorage.removeItem('authenticated'); sessionStorage.removeItem('authenticated'); }}>SAIR</Link>
                </center>
            </div>
        );
    }
}

export default withRouter(Profile);