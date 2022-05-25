import React from 'react';
import './Navigation.css'

function Navigation(props){

  const routeChange = props.onRouteChange;

  const signedIn = props.onSignedIn


  if (signedIn === true){
    return(
      <nav className='navigation '>
        <div className='position'>
          <h2
            onClick={ () => routeChange('signin')}
            className='f6 link dim underline pa4 pointer mb0 bolden-pink'
            >Sign Out
          </h2>
        </div>
      </nav>
    )
  }else {
    return(
      <nav className='navigation '>
        <div className='position'>
          <h2
            onClick={ () => routeChange('signin')}
            className='f6 link dim underline pa4 pointer mb0 bolden-pink'
            >Sign In
          </h2>
        </div>
        <div className='position'>
          <h2
            onClick={ () => routeChange('register')}
            className='f6 link dim underline pa4 pointer mb0 bolden-pink'
            > Register
          </h2>
        </div>
      </nav>
    )
  }
};


export default Navigation;
