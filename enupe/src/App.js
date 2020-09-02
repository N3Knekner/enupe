import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './tailwind.css';

function App() {
  return(
    <div>
      <Router>
        <Route path="/" exact><p>Home</p></Route>
        <Route path="/responsavel" exact><p>responsavel</p></Route>
        <Route path="/servidor" exact><p>servidor</p></Route>
      </Router>
    </div>
  )
}

export default App;
