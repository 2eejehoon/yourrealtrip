/* eslint-disable */
import styled from "styled-components";
import { gapi } from "gapi-script";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const googleLogin = useMutation(
    async (loginInfo) => {
      return axios
        .post(`${process.env.REACT_APP_BASE_API}/users/login`, loginInfo)
        .then((userInfo) => localStorage.setItem("user", userInfo))
        .catch((err) => console.error(err));
    },
    {
      onSuccess: () => {
        alert("로그인 되었습니다.");
        navigate("/reviews");
      },
      onError: () => {
        alert("로그인에 실패했습니다.");
      },
    }
  );

  const onSuccess = (response) => {
    console.log(response);
    const loginInfo = {
      id: uuidv4(),
      name: response.profileObj.name,
      email: response.profileObj.email,
      profileImage: response.profileObj.imageUrl,
      token: response.tokenId,
    };
    googleLogin.mutate(loginInfo);
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
      onSuccess={onSuccess}
      onFailure={onFailure}
      render={(renderProps) => {
        return (
          <SocialLoginButton onClick={renderProps.onClick}>
            <GoogleButton size={25} />
            구글 로그인
          </SocialLoginButton>
        );
      }}
    />
  );
}
