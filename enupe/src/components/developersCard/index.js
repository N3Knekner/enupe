import React from 'react';

// import { Container } from './styles';

function DevelopersCard() {
    return (
        <div className="flex flex-col pb-20">
            <center>
                <div className="w-56 h-56 rounded-full bg-gray-500 m-4 bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL+"/andre.png)"}}></div>
                <h1 className="text-gray-900 font-bold text-lg">André Luís Felber Renken</h1>
                <p className="text-gray-900 mb-4">Responsável pelo Frontend, React developer</p>
                <hr/>
                <p className="text-gray-800">Tais vendo o site? Olha bem... <br/> então, fui eu que fiz! XD</p>
            </center>
        </div>
    );
}

export default DevelopersCard;