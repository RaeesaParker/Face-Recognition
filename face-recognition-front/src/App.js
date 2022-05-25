import React from 'react';
import './App.css';
// Import components
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'

// Import styles and other
import ParticlesBackground from './components/ParticlesBackground.js'




function App() {



  // -------------------------------------------------- //
  // States
  // -------------------------------------------------- //


  // Set the state for the input box
  const [imageInput, setImageInput] = React.useState('');

  // Set the state for the URL to be processsed by Clarifai
  const [imageURL, setImageURL] = React.useState('');

  // set the state for the bounding box
  const [boxCoordinates, setBoxCoordinates] = React.useState({});

  // Set the state for the route
  const [route, setRoute] = React.useState('signin');

  // Set the state to check if we are signed in or not
  const [signedIn, setSignedIn] = React.useState(false);

  // Set the state of the current user 
  const [user, setUser] = React.useState({
    id:'',
    name:'',
    email:'',
    password:'',
    entries:'', 
    joined:''
  })




  // -------------------------------------------------- //
  // Connect the back-end to front-end
  // -------------------------------------------------- //

  //  This is just a check to see if CORS is working - comment out when actually connecting to back-end
  // async function componentDidMount(){
  //   const response = await fetch('http://localhost:4000');
  //   const data = await response.json();
  //   console.log(data);
  // };

// componentDidMount()




  // -------------------------------------------------- //
  // Clarifai
  // -------------------------------------------------- //

  const USER_ID = 'db3xohvxnvya';
  const PAT = 'e804e72eab0e4cf48156d278546272eb';
  const APP_ID = 'ea7c94f8f6cb4875ab927985914e15a3';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
  // Change this to whatever image input you want to process
  const IMAGE_URL = imageInput;


  // Code from Clarifai
  function faceRecognitionFunction(){

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
                "url": IMAGE_URL
              }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)

      .then(response => response.text())
      .then(result => {displayFaceBox( calculateFaceLocation(result) ) ;
      })
      .catch(error => console.log('error', error));

  }




  // -------------------------------------------------- //
  // Functions
  // -------------------------------------------------- //


  // Calculates the location of the face
  function calculateFaceLocation(data) {
    const dataObject = JSON.parse(data)
    const boundingBox = dataObject.outputs[0].data.regions[0].region_info.bounding_box;

    // Get the height and width of the input image
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('Height and Width are - ' + height , width)

    // Calculate the location of the box
    return {
      left : (boundingBox.left_col * width) ,
      right : width - ( boundingBox.right_col * width ),
      topRow: boundingBox.top_row * height ,
      bottomRow: height - ( boundingBox.bottom_row * height )
    }

  };




  //  Function to save the coordinates of the box 
  function displayFaceBox(output) {
    let outputObject = output;
    console.log(outputObject)
    setBoxCoordinates(outputObject);
  };



  // Function to store the saved keypresses of the image link form 
  function onInputChange (event) {
    console.log(event.target.value)
    setImageInput(event.target.value)
  }


  //  Function to detect a click and start the Clarifai API 
  function onDetectClick (event) {
    console.log('Detect has been clicked');
    setImageURL(imageInput);
    faceRecognitionFunction()
  }


  // Function to change the route from signin/register to the home page 
  function routeChange(newRoute){
    if (newRoute === 'home'){
      setSignedIn(true)
    }else{
      setSignedIn(false)
    }
    setRoute(newRoute)
  }


  // Function to update the user to the current data 
  function loadUser(inputUserData){
    console.log(inputUserData.name);
    setUser({
      id:inputUserData.id,
      name:inputUserData.name,
      email:inputUserData.email,
      entries:inputUserData.entries, 
      joined:inputUserData.joined
    })
  }



  // -------------------------------------------------- //
  // Return
  // -------------------------------------------------- //


  return (
    <div className="App">
       {/* <ParticlesBackground /> /*}
      
       {/*Render the sign in page if the state of the webpage is sign in*/}
      
      <Navigation onRouteChange={routeChange} onSignedIn={signedIn} />
      {route === 'home'
        ? <div>
          <Logo />
          <Rank rankData={user}/>
          <ImageLinkForm onChange={onInputChange} onClick={onDetectClick}/>
          <FaceRecognition boxStyling={boxCoordinates} imageURL={imageURL} />
         </div>
        : ( route === 'signin'
        ?  <Signin onLoadUser={loadUser} onRouteChange={routeChange}/>
        : <Register onLoadUser={loadUser} onRouteChange={routeChange} />
        )
       }
    </div>
    );

}

export default App;
