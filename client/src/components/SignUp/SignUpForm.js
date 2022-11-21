import styled from "styled-components";
import { useState } from "react";

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
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpInputContainer = styled.div`
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

export default function SignUpForm() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");

  const { name, email, password } = userInfo;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <SignUpContainer>
      <DescText>회원가입</DescText>
      <SignUpInputContainer>
        <div>닉네임</div>
        <input
          autoComplete="off"
          type="text"
          name={"name"}
          value={name}
          onChange={handleInputChange}
        />
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
        <div>비밀번호 확인</div>
        <input
          autoComplete="off"
          type="password"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
      </SignUpInputContainer>
      <ButtonContainer>
        <SignUpButton>회원가입</SignUpButton>
      </ButtonContainer>
    </SignUpContainer>
  );
}
