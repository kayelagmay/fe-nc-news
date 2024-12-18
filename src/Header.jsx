import React from 'react';
import { Link } from "react-router-dom";
import './index.css';

function Header() {
  return (
    <>
    <h1>Northcoders News</h1>
    <nav>
      <ul className='navLinks'>
        <li className='link'><Link to='/'>Home</Link></li>
        <li className='link'><Link to='/topics'>Topics</Link></li>
      </ul>
    </nav>
    </>
  );
};

export default Header;