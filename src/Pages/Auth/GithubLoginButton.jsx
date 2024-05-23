import React from "react";
import GitHubLogin from "react-github-login";
import GithubButton from "react-github-login-button";
import { useEffect, useState } from "react";

const CLIENT_ID = "84659ae62c71d33f6e3f";
function GitHubLoginButton({ clientId, onSuccess, onFailure, label }) {
  const [isClicked, setIsClicked] = useState(false);

  function onClick() {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
    setIsClicked(true);
  }

  return (
    <div>
      <GithubButton
        clientId={CLIENT_ID}
        type="dark"
        label={label}
        disabled={false}
        onClick={onClick}
      />
    </div>
  );
}

export default GitHubLoginButton;
