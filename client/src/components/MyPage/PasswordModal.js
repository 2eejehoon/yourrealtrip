/* eslint-disable */
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

const BackgroundDiv = styled.div`
  inset: 0;
  background-color: black;
  opacity: 50%;
  position: fixed;
  z-index: 1000;
`;

const UpdateButton = styled.button`
  top: 64%;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  width: 123px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  color: gray;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  z-index: 2000;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const ModalContainer = styled.div`
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  width: 250px;
  height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  border: 1px solid black;
  border-radius: 20px;
  background-color: white;
  z-index: 2000;

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

export default function PasswordModal({ setPasswordModalShow }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [newPasswordError, setNewPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError(`숫자 + 영문자 + 특수문자 + 8자리 이상`);
    } else {
      setNewPasswordError("");
    }
  };

  useEffect(() => {
    if (newPassword === passwordCheck) {
      setPasswordCheckError("");
    } else {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
    }
  }, [newPassword, passwordCheck]);

  return (
    <>
      <ModalContainer>
        <ErrorText>
          {newPasswordError !== ""
            ? newPasswordError
            : passwordCheckError !== ""
            ? passwordCheckError
            : null}
        </ErrorText>
        <div>비밀번호 확인</div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <div>새 비밀번호</div>
        <input
          value={newPassword}
          onChange={handlePasswordChange}
          type="password"
        />
        <div>새 비밀번호 확인</div>
        <input
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          type="password"
        />
      </ModalContainer>
      <UpdateButton
        disabled={
          password === "" ||
          newPassword === "" ||
          passwordCheck === "" ||
          newPasswordError !== "" ||
          passwordCheckError !== ""
        }
        onClick={() => setPasswordModalShow(false)}
      >
        업데이트
      </UpdateButton>
      <BackgroundDiv onClick={() => setPasswordModalShow(false)} />
    </>
  );
}
