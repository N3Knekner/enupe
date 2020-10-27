import React from 'react';

// import { Container } from './styles';

function DevelopersCard(props) {
    return (
        <div className="flex flex-col pb-20 m-4">
            <center className="bg-white rounded shadow p-4">
                <div className="w-56 h-56 rounded-full bg-gray-500 m-4 bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + props.imageName+")"}}></div>
                <h1 className="text-gray-900 font-bold text-lg">{props.name}</h1>
                <p className="text-gray-900 mb-4">{props.function}</p>
                <hr/>
                <p className="text-gray-800">{(props.description.__proto__ === String.prototype ? <br/>:<></>)}{props.description}</p>
            </center>
        </div>
    );
}

export default DevelopersCard;