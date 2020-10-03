import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Home from './components/home';
import Sides from './components/sides';
import './tailwind.css';

function App() {
  //let logged = localStorage.getItem('authenticated');

  return (
    <Router basename="/equipe4">
      <Sides.L orientation="col">
        <Home.L />
      </Sides.L>
      <Sides.R orientation="col">
        
          <Home.R/>
        <div className="flex flex-row justify-end">
            <Link to="/desenvolvedores" className="text-gray-700 text-sm hover:underline m-5">Sobre os desenvolvedores</Link>
          </div>
      </Sides.R>
    </Router>
  );

}

export default App;
