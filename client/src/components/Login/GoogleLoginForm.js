/* eslint-disable */
import styled from "styled-components";
import { gapi, loadAuth2 } from "gapi-script";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const googleLogin = useMutation(async (loginInfo) => {
    return axios
      .post(`${process.env.REACT_APP_BASE_API}/users/signIn`, loginInfo)
      .catch((err) => console.error(err));
  });

  const updateUser = (currentUser) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    const email = currentUser.getBasicProfile().getEmail();
    const { id_token } = currentUser.getAuthResponse();
    setUser({
      name: name,
      profileImg: profileImg,
    });
    axios.post("http://localhost:3000/api/users/signIn", {
      data: {
        name,
        email,
        profileImg: profileImg,
        password: "",
      },
      idToken: id_token,
    });
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

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
      console.log("User signed out.");
    });
  };

  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        process.env.REACT_APP_GOOGLE_CLIENT_ID,
        ""
      );
      if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get());
      } else {
        attachSignin(document.getElementById("customBtn"), auth2);
      }
    };
    setAuth2();
  }, []);

  console.log(user);

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

  if (user) {
    return (
      <SocialLoginButton id="" onClick={signOut}>
        <GoogleButton size={25} />
        로그아웃
      </SocialLoginButton>
    );
  }

  return (
    <SocialLoginButton id="customBtn">
      <GoogleButton size={25} />
      구글 로그인
    </SocialLoginButton>
  );
}
