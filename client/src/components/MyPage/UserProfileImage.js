/* eslint-disable */
import styled from "styled-components";
import S3 from "react-aws-s3";
import { useState, useRef } from "react";
import { ImCancelCircle } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";
import axios from "axios";

window.Buffer = window.Buffer || require("buffer").Buffer;

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

const ProfileDeleteButton = styled(ImCancelCircle)`
  position: absolute;
  top: -11px;
  right: 14px;
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

const defaultImage =
  "https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png";

export default function UserProfile() {
  const user = useRecoilValue(userState);
  const [image, setImage] = useState(null);
  const [profileImageDeleteButtonShow, setProfileImageDeleteButtonShow] =
    useState(false);
  const [drag, setDrag] = useState(false);
  const imageRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let imageFile = e.dataTransfer.files[0];
    handleFile(imageFile);
  };

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS,
    secretAccessKey: process.env.REACT_APP_SECRET,
  };

  const handleFile = async (file) => {
    const ReactS3Client = new S3(config);
    const fileName = file.name + uuidv4();
    ReactS3Client.uploadFile(file, fileName)
      .then((data) => {
        console.log(data.location);
        setImage(data.location);
      })
      .catch((err) => console.error(err));
  };

  const { data } = useQuery(["user", user.id], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/users/${user.id}`);
  });

  const updateProfileImage = useMutation((userInfo) => {
    return axios.patch(
      `${process.env.REACT_APP_BASE_API}/users/${id}`,
      userInfo
    );
  });

  return (
    <>
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
                setImage(defaultImage);
              }
            }}
          />
        ) : null}
        <UserProfileImage
          drag={drag ? "drag" : null}
          src={image || data?.data.profileImg || defaultImage}
          referrerpolicy="no-referrer"
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
            handleFile(imageFile);
          }}
        />
        <button onClick={() => imageRef.current.click()}>사진 업데이트</button>
      </UserProfileContainer>
    </>
  );
}
