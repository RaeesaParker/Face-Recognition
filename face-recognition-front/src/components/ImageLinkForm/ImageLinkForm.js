import React from 'react';
import Button from 'react-bootstrap/Button'
import './ImageLinkForm.css'


function ImageLinkForm(props){




// Import the props
const onInputChange = props.onChange;

const onDetectClick = props.onClick


  return (
    <div  className='mt2' >

      <div >
        <p className='f4 mt4  bolden-white'> {'This app will find faces in your pictures. Give it a try!'} </p>
      </div>

      <div className='center-flex'>
        <div className='form br3 shadow-2 pa2 pb3'>
          <input id='inputButton' type='text' className='f5 pa2 br1 w-70 centre' placeholder={'Paste URL here'} onChange={onInputChange}/>
          <Button variant='dark' className='f5 w-30 centre grow dib bolden-white' onClick={onDetectClick} > Detect </Button>
        </div>
      </div>

    </div>


  )

};


export default ImageLinkForm;
