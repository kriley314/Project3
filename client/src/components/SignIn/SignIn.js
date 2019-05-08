import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class SignIn extends Component {

    render() {
  
      const responseFacebook = (response) => {
        console.log(response);
      }
  
      const responseGoogle = (response) => {
        console.log(response);
      }
  
      return (
        <div className="App">
            style={{padding: 40}}>
              <br />
              <FacebookLogin
                appId="process.env.REACT_APP_FACEBOOK_LOGIN"
                fields="name,email,picture"
                callback={responseFacebook}
              />
              <br />
              <br />

              <GoogleLogin
                clientId="1011452329080-lrar235dvo4ko65h1u2nd3jojj2odll3.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </div>
      );
    }
  }
  
  export default SignIn;