/* eslint-disable */
import styled from "styled-components";
import { useState } from "react";

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

export default function PasswordModal({ setPasswordModalShow }) {
  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
  });

  const { password, newPassword } = passwords;

  const [passwordCheck, setPasswordCheck] = useState("");

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  return (
    <>
      <ModalContainer>
        <div>비밀번호 확인</div>
        <input
          name={"password"}
          value={password}
          onChange={handlePasswordInputChange}
          type="password"
        />
        <div>새 비밀번호</div>
        <input
          name={"newPassword"}
          value={newPassword}
          onChange={handlePasswordInputChange}
          type="password"
        />
        <div>새 비밀번호 확인</div>
        <input
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          type="password"
        />
      </ModalContainer>
      <UpdateButton onClick={() => setPasswordModalShow(false)}>
        업데이트
      </UpdateButton>
      <BackgroundDiv onClick={() => setPasswordModalShow(false)} />
    </>
  );
}
