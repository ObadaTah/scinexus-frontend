import React from "react";
import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";

function GoogleLoginButton({ label }) {
  function responseGoogle(response) {
    console.log(response);
  }

  return (
    <div>
      <GoogleLogin
        clientId="967690221322-m9uk62an2j2oa300nqdjjgph9ralj9ck.apps.googleusercontent.com"
        buttonText={label}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <GoogleButton onClick={renderProps.onClick} label={label}>
            Login with Google
          </GoogleButton>
        )}
      />
    </div>
  );
}

export default GoogleLoginButton;
