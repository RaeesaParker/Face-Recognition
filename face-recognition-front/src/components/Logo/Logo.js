import React from 'react';
import './Logo.css'
import Tilty from 'react-tilty';
import logo from './logo_transparent.png'

function Logo(){


  return (
    <div className='mt0 center-flex'>
      <Tilty  className= 'logo-card' axis="null" scale={1.2} perspective={900} reset={true}>
        <div className='logo-img' >
          <img  src={logo} alt='Logo' />
        </div>
      </Tilty>
    </div>


  )

};


export default Logo;
