import React, { useRef } from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../signIn';
import Login from '../login';
import Center from '../center';

// Fast Scroll universal system
let fastScroll;
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const executeScroll = () => scrollToRef(fastScroll);
// End Fast Scroll

function R(props) {

  fastScroll = useRef(null); //Make the id for find an element to scroll

  return (
    <Center customcss="max-w-lg p-1 md:p-4" ref={fastScroll}>
      <div className="flex flex-row w-full justify-center flex-grow">
        <div className="flex flex-col justify-center w-full max-w-lg p-1 md:p-4">
          <div className="flex w-full max-w-lg lg:pt-10 justify-center">
            <Route path="/" exact><Login callback={(url) => { props.history.push(url);}} /></Route>
            <Route path="/cadastro" exact><SignIn callback={(url) => { props.history.push(url);}} /></Route>
          </div>
          <span className="flex justify-center w-full max-w-lg text-gray-700 mt-3">Instituto Federal Catarinense</span>
          <span className="flex justify-center w-full max-w-lg text-gray-700">Câmpus Rio do Sul</span>
        </div>
      </div>
    </Center>
  );
}
function L(props) {
  return (
    <Center customcss="max-w-xs">
      <h1 className="font-semibold text-4xl" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>ENUPE</h1>
      <h2 className="text-xl" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>Sistema de Apoio ao Ensino</h2>
      <br />
      <p>Bem vindo ao portal de comunicação entre os estudantes, responsáveis e servidores.</p>
      <br />
      <i className="arrow down arrow-hide self-center" onClick={executeScroll}></i>
    </Center>
  );
}

export default { R, L };