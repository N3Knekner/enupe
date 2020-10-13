import React from 'react';
import {Route, Switch, Link } from 'react-router-dom';

import Home from './components/home';
import Sides from './components/sides';
import AnimationHandler from './components/animationHandler';
import DevelopersCard from './components/developersCard';

import AuthRouting from './classes/AuthRouting.js';

import './tailwind.css';

class App extends React.Component {
  constructor(props) {
    super();
    AuthRouting(props.history.push);
    this.state = { haveHeader: false, invertOrientation:false, fadeIn: false};
  }

  render(){
    document.getElementById('root').setAttribute('header', this.state.invertOrientation);
    return (
      <>
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
                <div className="flex w-full flex-col justify-center"><div className="flex w-full flex-row justify-center"><h1 className="text-white font-bold">EQUIPE DE DESENVOLVIMENTO</h1></div></div>
              </AnimationHandler>
            </Route>
            <Route path="/" component={Home.L}/>
          </Switch>
        </Sides.L>
        <Sides.R isBody={this.state.haveHeader} fadeIn={this.state.fadeIn}>
          <Switch>
            <Route path="/desenvolvedores">
              <div className="flex w-full flex-col justify-center"><div className="flex flex-row justify-center"><DevelopersCard/></div></div>
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
      </>
    );
  }

}

export default App;
