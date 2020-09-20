import React from 'react';
import {Route} from 'react-router-dom';
import SignIn from '../signIn';
import Login from '../login';

class Home extends React.Component{
  constructor(props){
    super();
  }
  render(){
    return (
      <div className="flex flex-col md:flex-col-reverse lg:flex-row w-full">
        <div className="flex flex-1 flex-row justify-center min-h-screen text-white bg-gradient-to-br from-teal-400 to-green-600">
          <div className="flex flex-col max-w-xs justify-center">
            <h1 className="font-semibold text-4xl" style={{textShadow:'2px 2px 0px rgba(0,0,0,0.2)'}}>ENUPE</h1>
            <h2 className="text-xl" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>Sistema de Apoio ao Ensino</h2>
            <br/>
            <p>Bem vindo ao portal de comunicação entre os estudantes, responsáveis e servidores.</p>
            <br/>
            <i className="arrow down arrow-hide self-center"></i>
          </div>
        </div>
        <div className="flex flex-1 min-h-screen flex-row bg-gray-100 justify-center">
          <div className="flex flex-col justify-center w-full max-w-lg p-4">
            <div className=" flex w-full max-w-lg">
              <Route path="/" exact><Login/></Route>
              <Route path="/cadastro" exact><SignIn /></Route>
            </div>
            <span className="flex justify-center w-full max-w-lg text-gray-700 mt-3">Instituto Federal Catarinense</span>
            <span className="flex justify-center w-full max-w-lg text-gray-700">Câmpus Rio do Sul</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;