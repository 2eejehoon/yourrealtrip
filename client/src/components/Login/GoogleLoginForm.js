/* eslint-disable */
import styled from "styled-components";
import { gapi } from "gapi-script";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { useEffect } from "react";

const GoogleButton = styled(FcGoogle)`
  position: absolute;
  left: 5px;
`;

const SocialLoginButton = styled.button`
  font-size: 0.75em;
  color: gray;
  position: relative;
  width: 250px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: 0.5px 0.5px gray;

  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function GoogleLoginForm() {
  const onSuccess = (response) => {
    console.log(response);
  };

  const onFailure = (response) => {
    console.log(response);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => {
        return (
          <SocialLoginButton onClick={renderProps.onClick}>
            <GoogleButton size={25} />
            구글 로그인
          </SocialLoginButton>
        );
      }}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}
