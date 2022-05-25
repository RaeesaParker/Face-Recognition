import React from 'react';
import './Signin.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'


function Signin(props){


  // -------------------------------------------------- //
  // Props
  // -------------------------------------------------- //

  const routeChange = props.onRouteChange;

  const loadUser = props.onLoadUser;


  // -------------------------------------------------- //
  // States
  // -------------------------------------------------- //

  // States for the signin email and password
  const [signInEmail, setSignInEmail] = React.useState('');

  const [signInPassword, setSignInPassword] = React.useState('');


  //  State for form validation
  const [validated, setValidated] = React.useState(false);

  //  State for correct password
  const [userValid, setUserValid] = React.useState(true);






  // -------------------------------------------------- //
  // Functions
  // -------------------------------------------------- //

  function onEmailChange(event) {
    setSignInEmail(event.target.value);
  }

  function onPasswordChange(event) {
    setSignInPassword(event.target.value);
  }




  // Function to fetch the signin page and then post the email and password
  async function onSubmitSignIn(event){
    
    // This will stop the submit button from submitting UNTIL the authorisation checks have been 
    // carries out
    event.preventDefault();
    
    // Send the sign in data to the server
    try{
      let signInData = await fetch('http://localhost:4000/signin', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword
        })
      })
      // Convert the response to a JSON object
      .then(response => { return response.json()})

      // Do the authorisation check 
      .then(function (user){
        if (user.id){
          setUserValid(true)
          loadUser(user);
          routeChange('home');
        }else{
          setUserValid(false)
        }
      })
    }catch(error){
      console.log('There is an error signing in the user', error)
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

    setValidated(true);
    onSubmitSignIn(event)
  };


  // -------------------------------------------------- //
  // Return
  // -------------------------------------------------- //

  return (
    <div className='mt4'>
      
      <article className="br3 ba  b--white-10 mv4  w-50-m w-25-l mw6 shadow-3 center box-widths">
        <main className="pt3 pb3  ">

          <Form className="measure"  noValidate validated={validated} onSubmit={handleSubmit}>

            <legend className="f3 fw6 ph0 mh0">Sign In</legend>

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
                  <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
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
                  <Form.Control.Feedback type='invalid'>Please enter your password</Form.Control.Feedback>
                </Form.Group>
               </Row>
            </div>


            {userValid === false &&
            <div className="mt1 mb3 center-flex">              
                <p className= 'f5 red'>  E-mail or password is incorrect </p>
            </div>}


            <div className="mw5 center">
              <Button
                variant='dark'
                className='f5 w-50  center grow dib bolden-white'
                type='submit'
                > Sign In
                </Button>
            </div>



            <div className="lh-copy mt3 mw5 center">
              <a
                href="#0"
                className="f5 link dim transparent db black hover-pink"
                onClick={() => routeChange('register')}
                > Register
                </a>
            </div>


          </Form>

        </main>
      </article>
    </div>
  )
};


export default Signin;
