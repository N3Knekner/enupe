import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component{
    constructor(props){
        super();
        const hash = localStorage.getItem('authenticated') || sessionStorage.getItem('authenticated');
        if(hash == null) props.history.push('/');
    }
    render() {
        return <Link to="/" className="text-lg font-bold hover:underline" onClick={() => { localStorage.removeItem('authenticated'); sessionStorage.removeItem('authenticated'); }}>SAIR</Link>
    }
}

export default Profile;