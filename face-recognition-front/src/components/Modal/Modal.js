import React from 'react';
import './Modal.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



function Modal(props){

	// Import the states for the open and close
	const open = props.open;

	const closeModal = props.onClose;



	return(
		<div>
			<Popup open={open} closeOnDocumentClick onClose={closeModal}> 
              <div className='center-flex popup-box' >   
                <a className="close " onClick={closeModal}> &times;</a>         
                <p className = 'popup-text '> Face not found. Please try another picture. </p>       
              </div>     
            </Popup>    
		</div>
	)

}

export default Modal;