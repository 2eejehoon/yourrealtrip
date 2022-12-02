/* eslint-disable */
import styled from "styled-components";
import { gapi, loadAuth2 } from "gapi-script";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleButton = styled(FcGoogle)`
  position: absolute;
  left: 5px;
`;

const GoogleLoginButton = styled.button`
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

const GoogleLogoutButton = styled.button`
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

export default function GoogleLoginForm() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const googleLogin = useMutation(
    async (loginInfo) => {
      return axios
        .post(`${process.env.REACT_APP_BASE_API}/users/signIn`, loginInfo)
        .then((response) => setUser(response.data));
    },
    {
      onSuccess: () => {
        alert("로그인");
        navigate("/reviews");
      },
    }
  );

  const updateUser = (currentUser) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    const email = currentUser.getBasicProfile().getEmail();
    const { id_token } = currentUser.getAuthResponse();
    const loginInfo = {
      data: {
        name,
        email,
        profileImg: profileImg,
        password: "",
      },
      idToken: id_token,
    };
    googleLogin.mutate(loginInfo);
  };

  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  };

  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        process.env.REACT_APP_GOOGLE_CLIENT_ID,
        ""
      );
      attachSignin(document.getElementById("customBtn"), auth2);
    };
    setAuth2();
  }, []);

  useEffect(() => {
    if (!user) {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(
          gapi,
          process.env.REACT_APP_GOOGLE_CLIENT_ID,
          ""
        );
        attachSignin(document.getElementById("customBtn"), auth2);
      };
      setAuth2();
    }
  }, [user]);

  return (
    <GoogleLoginButton id="customBtn">
      <GoogleButton size={25} />
      구글 로그인
    </GoogleLoginButton>
  );
}
