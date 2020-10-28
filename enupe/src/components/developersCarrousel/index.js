import React, { useState } from 'react';
import DevelopersCard from '../developersCard';

export default function DevelopersCarrousel() {
  const [item, setItem] = useState(0);
  const developers = [
    <DevelopersCard imageName="/andre.png" name="André Luís Felber Renken" function="Responsável pelo Frontend, React developer" description={<><span>Tais vendo o site? Olha bem... </span><br/><span>então, fui eu que fiz! XD</span></>}/>,
    <DevelopersCard imageName="/evamdro.jpeg" name="Evandro Socrepa" function="Responsável pelo Backend, NodeJs developer" description="Faço o que você não vê"/>,
    <DevelopersCard imageName="/mayara.jpeg" name="Mayara Kauana" function="Responsável pela Papelada, Engenheira de software" description="A vergonha meu pai"/>,
    <DevelopersCard imageName="/jpeg" name="Milena Mazzini" function="Responsável pela Papelada, Engenheira de software" description="Lorem ipsum"/>,
    <DevelopersCard imageName="/julia.jpeg" name="Júlia Fitzlaff" function="Responsável pela Papelada, Engenheira de software" description="17 anos"/>,
    <DevelopersCard imageName="/caio.jpeg" name="Caio Algusto Ledra" function="Responsável pelo Banco de Dados, Database developer" description="17 anos"/>,
    <DevelopersCard imageName="/jpeg" name="Gabriel" function="Nunca nem vi" description="Lorem ipsum"/>,
  ];

  function setPointer(n){
    const next = item + n;
    if (next < 0 || next === developers.length) return;
    setItem(next);
  }

  return (
    <>
      <div className="flex flex-row justify-center">
        <button onClick={() => setPointer(-1)} className="bg-white text-sm hover:bg-gray-500 shadow rounded p-4 m-2">Anterior</button>
        {developers.map((e,i)=>{ return (
          <span onClick={() => setItem(i)} class={"flex flex-col cursor-pointer justify-center items-center text-4xl hover:text-blue-700 mx-2 " + (item === i ? "text-green-500" : "text-gray-500")}><span>•</span></span>
        )})}
        <button onClick={() => setPointer(1)} className="bg-white text-sm hover:bg-gray-500 shadow rounded p-4 m-2">Próximo</button>
      </div>
      {developers.map((e,i)=>{
        return <div className={"flex carousel-item flex-col md:flex-row justify-center " + (item === i ? "carousel-open":"")}>{e}</div>
      })}
    </>

  );
  
}

