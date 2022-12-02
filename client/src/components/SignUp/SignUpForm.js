/* eslint-disable */
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
  justify-content: center;
  align-items: center;
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

const SignUpContainer = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpInputContainer = styled.div`
  position: relative;
  background-color: white;
  width: 250px;
  height: 380px;
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
      border: none;
    }
  }
`;

const ErrorText = styled.div`
  color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
  width: 100%;
  height: 30px;
  position: absolute;
  font-size: 0.75em;
`;

export default function SignUpForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const signUp = useMutation(
    (userInfo) => {
      return axios.post(`${process.env.REACT_APP_BASE_API}/users`, userInfo);
    },
    {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
        return queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const handleSignUp = () => {
    if (name === "") {
      alert("닉네임을 입력해주세요.");
      return nameInput.current.focus();
    }
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return emailInput.current.focus();
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return passwordInput.current.focus();
    }

    signUp.mutate({
      id: uuidv4(),
      name: name,
      email: email,
      password: password,
    });
  };

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const passwordCheckInput = useRef(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(`숫자 + 영문자 + 특수문자 + 8자리 이상`);
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  useEffect(() => {
    if (password === passwordCheck) {
      setPasswordCheckError("");
    } else {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
    }
  }, [password, passwordCheck]);

  return (
    <SignUpContainer>
      <DescText>회원가입</DescText>
      <SignUpInputContainer>
        <ErrorText>
          {emailError !== ""
            ? emailError
            : passwordError !== ""
            ? passwordError
            : passwordCheckError !== ""
            ? passwordCheckError
            : null}
        </ErrorText>
        <div>닉네임</div>
        <input
          ref={nameInput}
          autoComplete="off"
          type="text"
          value={name}
          onChange={handleNameChange}
          onKeyUp={(e) => {
            e.key === "Enter" && emailInput.current.focus();
          }}
        />
        <div>이메일</div>
        <input
          ref={emailInput}
          autoComplete="off"
          type="text"
          value={email}
          onChange={handleEmailChange}
          onKeyUp={(e) => {
            e.key === "Enter" && passwordInput.current.focus();
          }}
        />
        <div>비밀번호</div>
        <input
          ref={passwordInput}
          autoComplete="off"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onKeyUp={(e) => {
            e.key === "Enter" && passwordCheckInput.current.focus();
          }}
        />
        <div>비밀번호 확인</div>
        <input
          ref={passwordCheckInput}
          autoComplete="off"
          type="password"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
        />
      </SignUpInputContainer>
      <ButtonContainer>
        <SignUpButton
          disabled={
            emailError !== "" ||
            passwordError !== "" ||
            passwordCheckError !== "" ||
            true
          }
          onClick={handleSignUp}
        >
          회원가입
        </SignUpButton>
      </ButtonContainer>
    </SignUpContainer>
  );
}
