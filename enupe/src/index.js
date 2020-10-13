import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { createBrowserHistory } from "history";

import App from './App';

import './index.css';

// Nota: todos os States são privados, portanto pertencem apenas ao seu componente,
// já os Props são "setters", portanto são funções publicas que iniciam variáveis privadas dentro de um objeto Props;
// As únicas coisas públicas são as exportadas, operador: export.
// As demais variaveis, por experiência, prefiro definir getters e setters.

const history = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <Router basename="/equipe4">
      <App history={history} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);