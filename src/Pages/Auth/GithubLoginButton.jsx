import React from "react";
import GitHubLogin from "react-github-login";
import GithubButton from "react-github-login-button";

function GitHubLoginButton({ clientId, onSuccess, onFailure, label }) {
  function onSuccess(response) {
    console.log(response);
    // Handle successful login response here
  }

  function onFailure(response) {
    console.error(response);
    // Handle failed login response here
  }

  return (
    <div>
      <GithubButton
        type="dark"
        label={label}
        onClick={() => console.log("Github button clicked")}
        disabled={false}
      />
    </div>
  );
}

export default GitHubLoginButton;
