import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import PasswordModal from "./PasswordModal";
import { ImCancelCircle } from "react-icons/im";

const ProfileDeleteButton = styled(ImCancelCircle)`
  position: absolute;
  top: -13px;
  right: 8px;
`;

const UserProfileContainer = styled.div`
  position: relative;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & input {
    display: none;
  }
  & button {
    margin-top: 2px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 2px;
    background-color: white;
    font-size: 0.75em;
    &:hover {
      opacity: 70%;
      transition: 0.5s;
    }
  }
`;

const UserProfileImage = styled.img`
  opacity: ${(props) => (props.drag === "drag" ? "70%" : "100%")};
  width: 100px;
  height: 100px;
  border: 1px solid lightgray;
  object-fit: cover;
  border-radius: 10px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

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
  height: calc(100vh - 50px);
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
  const [nameUpdateShow, setNameUpdateShow] = useState(false);
  const [nameUpdate, setNameUpdate] = useState(false);
  const [emailUpdateShow, setEmailUpdateShow] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(false);
  const [passUpdateShow, setpassUpdateShow] = useState(false);
  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png"
  );
  const [profileImageDeleteButtonShow, setProfileImageDeleteButtonShow] =
    useState(false);
  const [drag, setDrag] = useState(false);

  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let imageFile = e.dataTransfer.files[0];
    handleFile(imageFile);
  };

  const handleFile = (file) => {
    setImage(URL.createObjectURL(file));
  };

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
        <DescText>작성자님의 정보</DescText>
        <UserProfileContainer
          onMouseEnter={() => setProfileImageDeleteButtonShow(true)}
          onMouseLeave={() => setProfileImageDeleteButtonShow(false)}
        >
          {profileImageDeleteButtonShow ? (
            <ProfileDeleteButton
              size={15}
              color="darkgray"
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  setImage(
                    "https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png"
                  );
                }
              }}
            />
          ) : null}
          <UserProfileImage
            drag={drag ? "drag" : null}
            src={image}
            onDragEnter={() => setDrag(true)}
            onDragLeave={() => setDrag(false)}
            onDragOver={handleDragOver}
            onDrop={(e) => {
              handleDrop(e);
              setDrag(false);
            }}
          />
          <input
            type="file"
            ref={imageRef}
            accept="image/*"
            onChange={(e) => {
              const imageFile = e.target.files[0];
              setImage(URL.createObjectURL(imageFile));
            }}
          />
          <button onClick={() => imageRef.current.click()}>
            사진 업데이트
          </button>
        </UserProfileContainer>
        <InputContainer
          onMouseEnter={() => setNameUpdateShow(true)}
          onMouseLeave={() => setNameUpdateShow(false)}
        >
          <div>닉네임</div>
          <input
            type="text"
            disabled={nameUpdate ? false : true}
            ref={nameRef}
          />
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
              onClick={() => {
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
          <input
            type="text"
            disabled={emailUpdate ? false : true}
            ref={emailRef}
          />
          {emailUpdateShow && !emailUpdate ? (
            <UpdateButton
              onClick={() => {
                setEmailUpdate(true);
              }}
            >
              수정
            </UpdateButton>
          ) : emailUpdate ? (
            <SaveButton onClick={() => setEmailUpdate(false)}>저장</SaveButton>
          ) : null}
        </InputContainer>
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
      </UserInfoContainer>
    </>
  );
}
