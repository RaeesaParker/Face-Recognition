import React from 'react';
import './Register.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'


function Register(props){




  // -------------------------------------------------- //
  // Props
  // -------------------------------------------------- //

  const routeChange = props.onRouteChange;

  const loadUser = props.onLoadUser;


  // -------------------------------------------------- //
  // States
  // -------------------------------------------------- //

  // States for the registration email and password and name 
  const [registerEmail, setRegisterEmail] = React.useState('');

  const [registerPassword, setRegisterPassword] = React.useState('');

  const [registerName, setRegisterName] = React.useState('');



  //  State for form validation
  const [registerValidated, setRegisterValidated] = React.useState(false);

  //  State to check if user already exists
  const [userExists, setUserExists] = React.useState(false);



  // -------------------------------------------------- //
  // Functions
  // -------------------------------------------------- //

  function onEmailChange(event) {
    setRegisterEmail(event.target.value);
  }

  function onPasswordChange(event) {
    setRegisterPassword(event.target.value);
  }


  function onNameChange(event) {
    setRegisterName(event.target.value);
  }



 // Function to fetch the register page and then add the new user to the array of users 
  async function onSubmitRegister(event){
    
    // This will stop the submit button from submitting UNTIL the authorisation checks have been 
    // carries out
    event.preventDefault();
    
    // Send the sign in data to the server
    try{
      let registerData = await fetch('http://localhost:4000/register', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
          name: registerName
        })
      })
      // Convert the response to a JSON object
      .then(response => { return response.json()})
      .then(user => {
        if (user.id){
          loadUser(user);
          routeChange('home');
        }else{
          setUserExists(true)
        }
      })
    }catch(error){
      console.log('There is an error registering the user', error)
    }
  }




  // -------------------------------------------------- //
  // Form Validation
  // -------------------------------------------------- //

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }


    if (form.checkValidity() === true) {
    onSubmitRegister(event)
    }

    setRegisterValidated(true);

  };




  // -------------------------------------------------- //
  // Return
  // -------------------------------------------------- //



  return (
    <div className='mt4'>
      <article className="br3 ba  b--white-10 mv4  w-50-m w-25-l mw6 shadow-3 center box-widths">
        <main className="pt3 pb3  ">

          <Form className="measure"  noValidate validated={registerValidated} onSubmit={handleSubmit}>
          
            <legend className="f3 fw6 ph0 mh0">Register</legend>

             <div className="mt3 center-flex">              
              <Row className="mb-3 column-widths ">
                <Form.Group as={Col} controlId="validationCustom01" >
                  <Form.Label className='db fw6 lh-copy f5' >Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    className = 'pa2 input-reset ba input-btn f5 b '
                    onChange={onNameChange}
                  />
                  <Form.Control.Feedback  className='invalid-user' type='invalid'>Please enter your name</Form.Control.Feedback>
                </Form.Group>
               </Row>
            </div>


            <div className="mt3 center-flex">              
              <Row className="mb-3 column-widths ">
                <Form.Group as={Col} controlId="validationCustom01" >
                  <Form.Label className='db fw6 lh-copy f5' >Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    className = 'pa2 input-reset ba input-btn f5 b '
                    onChange={onEmailChange}
                  />
                  <Form.Control.Feedback  className='invalid-user' type='invalid'>Please enter a valid email</Form.Control.Feedback>
                </Form.Group>
               </Row>
            </div>




            <div className="mt3 center-flex">              
              <Row className="mb-4 column-widths ">
                <Form.Group as={Col} controlId="validationCustom01" className='column-widths' >
                  <Form.Label className='db fw6 lh-copy f5'>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    className = 'pa2 input-reset ba input-btn f5 b '
                    onChange={onPasswordChange}
                  />
                  <Form.Control.Feedback  className='invalid-user' type='invalid'>Please enter a password</Form.Control.Feedback>
                </Form.Group>
               </Row>
            </div>




            {userExists === true &&
            <div className="mt1 mb3 center-flex">              
                <p className= 'f5 invalid-user'>  User already exists </p>
            </div>}



            <div className="mw5 center">
              <Button
                variant='dark'
                className='f5 w-50  center grow dib bolden-white'
                type='submit'
                > Sign Up
                </Button>
            </div>


          </Form>

        </main>
      </article>
    </div>
  )
};


export default Register;
