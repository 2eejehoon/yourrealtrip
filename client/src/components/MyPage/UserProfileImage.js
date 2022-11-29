import { ImCancelCircle } from "react-icons/im";
import styled from "styled-components";
import { useState, useRef } from "react";

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
  right: 11px;
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

export default function UserProfile() {
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png"
  );
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

  const handleFile = (file) => {
    setImage(URL.createObjectURL(file));
  };
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
        <button onClick={() => imageRef.current.click()}>사진 업데이트</button>
      </UserProfileContainer>
    </>
  );
}
