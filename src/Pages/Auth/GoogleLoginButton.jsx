import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const API_BASE_URL = "http://localhost:8080";
export const OAUTH2_REDIRECT_URI = "http://localhost:5173/oauth2/redirect";
const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorization/google";
const CLIENT_ID =
  "967690221322-dsvnfd0q6b0o3tk6m3akq59nteidgaqd.apps.googleusercontent.com";
import { GoogleLogin } from "react-google-login";
// import { GoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GoogleLoginButton({ label }) {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  function redirect(event) {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }
  return (
    <div>
      {/* <GoogleLogin
        // theme="filled_blue"
        // size="large"
        // shape="rectangular"
        // login_uri="http://localhost:5173/oauth2/authorization/google"
        // contxt="signin"
        // height={400}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        clientId={CLIENT_ID}
        render={(renderProps) => (
          <GoogleButton onClick={renderProps.onClick} label={label}>
            Login with Google
          </GoogleButton>
        )}
      /> */}
      <GoogleButton onClick={redirect}>Login with Google</GoogleButton>
    </div>
  );
}
