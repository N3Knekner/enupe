import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './components/home';
import Sides from './components/sides';
import AnimationHandler from './components/animationHandler';
import './tailwind.css';

class App extends React.Component {
  //let logged = localStorage.getItem('authenticated');
  constructor(props) {
    super();
    this.state = { haveHeader: false, invertOrientation:false, fadeIn: false};
  }

  render(){
    document.getElementById('root').setAttribute('header', this.state.invertOrientation);
    return (
      <Router basename="/equipe4">
        <Sides.L isHeader={this.state.haveHeader} fadeIn={this.state.fadeIn}>
          <Switch>
            <Route path="/desenvolvedores">
              <AnimationHandler 
                onConstruct={() => { this.setState({ fadeIn: true }); }}
                onStart =   {() => { this.setState({ haveHeader: true }); }}
                offset  = {500} 
                timeout = {600} 
                onTimeout = {() => { this.setState({ invertOrientation: true }); }} 
                callback={() => { this.setState({ haveHeader: false, invertOrientation: false, fadeIn: false }); }}
              >
                <p>TESTE LEFT</p>
              </AnimationHandler>
            </Route>
            <Route path="/" component={Home.L}/>
          </Switch>
        </Sides.L>
        <Sides.R isBody={this.state.haveHeader} fadeIn={this.state.fadeIn}>
          <Switch>
            <Route path="/desenvolvedores">
              <p>TESTE RIGHT</p>
            </Route>
            <Route path="/" component={Home.R}/>
          </Switch>
          <Switch>
            <Route path="/desenvolvedores"><div/></Route>
            <Route path="/">
              <div className="flex flex-row justify-end">
                <Link to="/desenvolvedores" className="text-gray-700 text-sm hover:underline m-5">Sobre os desenvolvedores</Link>
              </div>
            </Route>
          </Switch>
          
        </Sides.R>
      </Router>
    );
  }

}

export default App;
