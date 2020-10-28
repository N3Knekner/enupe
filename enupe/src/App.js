import React from 'react';
import {Route, Switch, Link } from 'react-router-dom';

import Sides from './components/sides';
import Home from './components/home';
import Profile from './components/profile';
import DevelopersCarrousel from './components/developersCarrousel';

import Center from './components/center';
import AnimationHandler from './components/animationHandler';
import AuthRouting from './classes/AuthRouting.js';

import './tailwind.css';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = { haveHeader: false, invertOrientation:false, fadeIn: false};
  }
  componentDidMount() {
    AuthRouting((url)=>{this.props.history.push(url); this.forceUpdate();});
  }

  render(){
    document.getElementById('root').setAttribute('header', this.state.invertOrientation);
    return (
      <>
        <Sides.L isHeader={this.state.haveHeader} fadeIn={this.state.fadeIn}>
          <Switch>

            {/* Developers page header and animation trigger */}
            <Route path="/desenvolvedores">
              <AnimationHandler 
                onConstruct={() => { window.scrollTo(0,0); this.setState({ fadeIn: true }); }}
                onStart =   {() => { this.setState({ haveHeader: true }); }}
                offset  = {500} 
                timeout = {600} 
                onTimeout = {() => { this.setState({ invertOrientation: true }); }} 
                callback={() => { this.setState({ haveHeader: false, invertOrientation: false, fadeIn: false }); }}
              >
                <div className="flex flex-grow flex-row justify-center"><div className="flex flex-grow flex-col justify-center"><Link to="/" className="w-20 pl-3">{"< Voltar"}</Link></div><div className="flex flex-grow flex-col justify-center"><h1 className="text-white font-bold justify-center md:pr-20">EQUIPE DE DESENVOLVIMENTO</h1></div></div>
              </AnimationHandler>
            </Route>

            

            {/* Perfil section and childrens */}
            <Route path="/perfil">
              <Center customcss="max-w-xs"><Profile /></Center>
            </Route>


            {/* Always will be the last route */}
            <Route path="/" component={Home.L}/>
            
          </Switch>
        </Sides.L>
        {/* --------------- Right Side -------------- */}
        <Sides.R isBody={this.state.haveHeader} fadeIn={this.state.fadeIn}>

          {/* Body expander for footer */}
          <div className="flex flex-row w-full justify-center flex-grow">

            <Switch>
              {/* Developers page body */}
              <Route path="/desenvolvedores">
                <div className="flex w-full flex-col md:flex-col-reverse justify-center"><DevelopersCarrousel/></div>
              </Route>
              {/* Perfil page infos */}
              <Route path="/perfil">
                <Center customcss="max-w-xs">
                <h1>Irure elit aliquip veniam est. Et occaecat esse tempor velit. Ipsum adipisicing eu veniam commodo voluptate Lorem sit. Nostrud culpa laborum sunt est labore veniam ullamco sint est. Excepteur sit est est in sit ipsum. Aute ad consectetur non ea ea est. Consectetur occaecat Lorem Lorem esse occaecat dolor ut sunt adipisicing.</h1>
                </Center>
              </Route>
              
              {/* Always will be the last route */}
              <Route path="/" component={Home.R}/>

            </Switch>

          </div>

          {/* Places the link for developers page */}
          <Switch>
            {/* Black list     */}
            <Route path="/desenvolvedores"><div/></Route>
            
            {/* Black list End */}

            {/* Always will be the last route */}
            <Route path="/"><div className="flex flex-row justify-end"><Link to="/desenvolvedores" className="text-gray-700 text-sm hover:underline m-5">Sobre os desenvolvedores</Link></div></Route>
          </Switch>
          
        </Sides.R>
      </>
    );
  }

}

export default App;
