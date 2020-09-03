import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';

import './tailwind.css';

function App() {
  let logged = localStorage.getItem('authenticated');

  if (logged !== 'true') {
    return <Home></Home>;  
  }

  return(
    <Router>
      <Route path="/">
        <Header />
        <Route path="/responsavel" exact><p>responsavel</p></Route>
        <Route path="/servidor" exact><p>servidor</p></Route>
      </Route>
    </Router>
  );
}

export default App;
