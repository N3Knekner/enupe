import React from 'react';
import {Link} from 'react-router-dom';

// import { Container } from './styles';

function Header() {
  return (
      <div className="">
          <label>E-NuPe</label>
          <Btn to='/responsavel' text='Responsavel'></Btn>
      </div>
  );
}

export default Header;

function Btn(props) {
return <Link to={props.to}>{props.text}</Link>;
}