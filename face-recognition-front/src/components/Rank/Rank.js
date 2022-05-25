import React from 'react';
import './Rank.css'

function Rank(props){


const {name, entries} = props.rankData;


  return (
    <div className='mt5'>

      <div className='mb1'>
        <p className='f4 mb3 bolden-white'>{'Hi '} {name}, {'your rank is...'} </p>
      </div>

      <div>
        <p className='f3 mt4 rankNum bolden-pink' >{'#'}{entries} </p>
      </div>

    </div>
  )

};


export default Rank;
