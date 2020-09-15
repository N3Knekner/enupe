import React from 'react';
import {Route,Link} from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col md:flex-col-reverse lg:flex-row w-full">
      <div className="flex flex-1 flex-row justify-center min-h-screen text-white bg-gradient-to-br from-teal-400 to-green-600">
        <div className="flex flex-col max-w-screen-sm justify-center">
          <h1 className="font-semibold text-4xl">ENUPE</h1>
          <h2 className="text-xl">Sistema de Apoio ao Ensino</h2>
          <br/>
          <p>Bem vindo bla bla</p>
          <br/>
        </div>
      </div>
      <div className="flex flex-1 min-h-screen flex-row bg-gray-100 justify-center">
        <div className="flex flex-col justify-center w-full max-w-lg p-4">
          <div className=" flex w-full max-w-lg">
            <Route path="/" exact><LoginForm/></Route>
            <Route path="/cadastro" exact><SignForm /></Route>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

function LoginForm() {
  return (
    <form className="flex flex-col w-full bg-white shadow-md rounded p-8">
      <div className="flex flex-col mb-4">
        <label className="text-gray-700 text-md font-bold mb-2" for="email">Email</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-600" id="email" type="text" placeholder="Josefino" />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 text-md font-bold mb-2" for="password">Senha</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-gray-600" id="password" type="password" placeholder="" />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-gray-600" type="button">Entrar</button>
        <span className="text-gray-600">Não tem uma conta? <Link className="text-blue-500 hover:underline" to="/cadastro">Cadastre-se!</Link></span>
      </div>
    </form>
  );
}
function SignForm() {
  return (
    <form className="flex flex-col w-full bg-white shadow-md rounded p-8">
      <div className="flex flex-col mb-4">
        <label className="text-gray-700 text-md font-bold mb-2" for="email">Email</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-600" id="email" type="text" placeholder="Josefino" />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 text-md font-bold mb-2" for="password">Senha</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-gray-600" id="password" type="password" placeholder="" />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-gray-600" type="button">Cadastrar</button>
        <span className="text-gray-600">Já tem uma conta? <Link className="text-blue-500 hover:underline" to="/">Entre!</Link></span>
      </div>
    </form>
  );
}