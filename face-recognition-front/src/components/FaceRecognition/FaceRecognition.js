import React from 'react';
import './FaceRecognition.css'

//
// <div className='absolute mt2'>

function FaceRecognition (props) {

  const imageURL = props.imageURL;
  const box = props.boxStyling;

  return(
    <div className='center-flex ma '>
      <div className=' absolute mt2 pb3'>
        <img alt='Input to run face recognition on' src={imageURL} id='inputImage' className='inputImage hide-text' />
        <div className='bounding-box' style={{top:box.topRow, right: box.right, bottom:box.bottomRow, left:box.left}}>
        </div>
      </div>
    </div>
  );
}

export default FaceRecognition;
