/* eslint-disable */
import styled from "styled-components";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

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

const ButtonContainer = styled.div`
  width: 250px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 123px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  color: gray;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: 0.5px 0.5px gray;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const SignUpButton = styled.button`
  width: 123px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  color: gray;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: 0.5px 0.5px gray;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginInputContainer = styled.div`
  background-color: white;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 20px;
  box-shadow: 0.5px 0.5px gray;

  &:focus-within {
    border: 1px solid black;
  }

  & div {
    width: 200px;
    font-size: 0.75em;
    color: gray;
    padding: 5px;
  }

  & input {
    width: 200px;
    height: 40px;
    border: 1px solid lightgray;
    border-radius: 10px;
    font-size: 0.75em;
    padding: 5px;
    box-shadow: 0.5px 0.5px gray;

    &:focus {
      outline: 1px solid black;
    }
  }
`;

export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginInfo;

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  return (
    <LoginContainer>
      <DescText>로그인 또는 회원가입</DescText>
      <LoginInputContainer>
        <div>이메일</div>
        <input
          autoComplete="off"
          type="text"
          name={"email"}
          value={email}
          onChange={handleInputChange}
        />
        <div>비밀번호</div>
        <input
          autoComplete="off"
          type="password"
          name={"password"}
          value={password}
          onChange={handleInputChange}
        />
      </LoginInputContainer>
      <ButtonContainer>
        <LoginButton>로그인</LoginButton>
        <SignUpButton>회원가입</SignUpButton>
      </ButtonContainer>
      <SocialLoginButton>
        <GoogleButton size={25} />
        구글 로그인
      </SocialLoginButton>
    </LoginContainer>
  );
}
