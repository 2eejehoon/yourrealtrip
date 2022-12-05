/* eslint-disable */
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PasswordModal from "./PasswordModal";

const UpdateButton = styled.button`
  position: absolute;
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  right: 0;

  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const UserInfoContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const InputContainer = styled.div`
  width: 350px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  position: relative;

  & div {
    width: 100%;
    font-size: 1em;
    padding: 5px;
  }
  & p {
    padding: 5px;
    width: 100%;
    font-size: 0.75em;
    color: gray;
    border-bottom: 1px solid lightgray;
  }
  & input {
    padding: 5px;
    width: 100%;
    font-size: 0.75em;
    color: gray;
    border: none;
    border-bottom: 1px solid lightgray;
    &:disabled {
      background-color: white;
    }
    &:focus {
      outline: none;
      border-bottom: 1px solid black;
    }
  }
`;

const SaveButton = styled.button`
  position: absolute;
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  right: 0px;

  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

export default function UserInfo() {
  const queryClient = useQueryClient();
  const user = useRecoilValue(userState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameUpdateShow, setNameUpdateShow] = useState(false);
  const [nameUpdate, setNameUpdate] = useState(false);
  const [emailUpdateShow, setEmailUpdateShow] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(false);
  const [passUpdateShow, setpassUpdateShow] = useState(false);
  const [passwordModalShow, setPasswordModalShow] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const { data, isLoading } = useQuery(["user", user.id], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/users/${user.id}`);
  });

  const updateUser = useMutation(
    (userInfo) => {
      return axios.patch(
        `${process.env.REACT_APP_BASE_API}/users/${user.id}`,
        userInfo
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["user", user.id]);
      },
    }
  );

  const handleNameSave = (e) => {
    const userInfo = {
      ...data?.data,
      name: e.target.value,
    };
    updateUser(userInfo);
  };
  const handleEmailSave = (e) => {
    const userInfo = {
      ...data?.data,
      email: e.target.value,
    };
    updateUser(userInfo);
  };

  useEffect(() => {
    if (!isLoading) {
      setName(data?.data.name);
      setEmail(data?.data.email);
    }
  }, [data]);
  useEffect(() => {
    if (nameUpdate === true) {
      nameRef.current.focus();
    }
  }, [nameUpdate]);

  useEffect(() => {
    if (emailUpdate === true) {
      emailRef.current.focus();
    }
  }, [emailUpdate]);

  return (
    <>
      {passwordModalShow ? (
        <PasswordModal setPasswordModalShow={setPasswordModalShow} />
      ) : null}
      <UserInfoContainer>
        <InputContainer
          onMouseEnter={() => setNameUpdateShow(true)}
          onMouseLeave={() => setNameUpdateShow(false)}
        >
          <div>닉네임</div>
          {nameUpdate ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={nameUpdate ? false : true}
              ref={nameRef}
            />
          ) : (
            <p>{data?.data.name}</p>
          )}

          {nameUpdateShow && !nameUpdate ? (
            <UpdateButton
              onClick={() => {
                setNameUpdate(true);
              }}
            >
              수정
            </UpdateButton>
          ) : nameUpdate ? (
            <SaveButton
              onClick={(e) => {
                handleNameSave(e);
                setNameUpdate(false);
              }}
            >
              저장
            </SaveButton>
          ) : null}
        </InputContainer>
        <InputContainer
          onMouseEnter={() => setEmailUpdateShow(true)}
          onMouseLeave={() => setEmailUpdateShow(false)}
        >
          <div>이메일</div>
          {emailUpdate ? (
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailUpdate ? false : true}
              ref={emailRef}
            />
          ) : (
            <p>{data?.data.email}</p>
          )}

          {emailUpdateShow && !emailUpdate ? (
            <UpdateButton
              onClick={() => {
                setEmailUpdate(true);
              }}
            >
              수정
            </UpdateButton>
          ) : emailUpdate ? (
            <SaveButton
              onClick={(e) => {
                handleEmailSave(e);
                setEmailUpdate(false);
              }}
            >
              저장
            </SaveButton>
          ) : null}
        </InputContainer>
        {user.password === "" ? null : (
          <InputContainer
            onMouseEnter={() => setpassUpdateShow(true)}
            onMouseLeave={() => setpassUpdateShow(false)}
          >
            <div>비밀번호</div>
            <input type="password" disabled></input>
            {passUpdateShow ? (
              <UpdateButton onClick={() => setPasswordModalShow(true)}>
                수정
              </UpdateButton>
            ) : null}
          </InputContainer>
        )}
      </UserInfoContainer>
    </>
  );
}
