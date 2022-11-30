/* eslint-disable */
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 250px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & a {
    text-decoration: none;
  }
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
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
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
  const navigate = useNavigate();
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

  const emailInput = useRef();
  const passwordInput = useRef();

  const login = useMutation(
    (loginInfo) => {
      axios.post(`${process.env.REACT_APP_BASE_API}/users/login`, loginInfo);
    },
    {
      onSuccess: () => {
        setLoginInfo({
          email: "",
          password: "",
        });
        navigate("/");
      },
      onError: () => {
        return alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      },
    }
  );

  const handleLogin = () => {
    if (loginInfo.email === "") {
      alert("이메일을 입력해주세요.");
      return emailInput.current.focus();
    }
    if (loginInfo.password === "") {
      alert("비밀번호를 입력해주세요.");
      return passwordInput.current.focus();
    }
    login.mutate(loginInfo);
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  return (
    <LoginContainer>
      <DescText>로그인 또는 회원가입</DescText>
      <LoginInputContainer>
        <div>이메일</div>
        <input
          ref={emailInput}
          autoComplete="off"
          type="text"
          name={"email"}
          value={email}
          onChange={handleInputChange}
          onKeyUp={(e) => {
            e.key === "Enter" && passwordInput.current.focus();
          }}
        />
        <div>비밀번호</div>
        <input
          ref={passwordInput}
          autoComplete="off"
          type="password"
          name={"password"}
          value={password}
          onChange={handleInputChange}
        />
      </LoginInputContainer>
      <ButtonContainer>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        <Link to="/signup">
          <SignUpButton>회원가입</SignUpButton>
        </Link>
      </ButtonContainer>
    </LoginContainer>
  );
}
