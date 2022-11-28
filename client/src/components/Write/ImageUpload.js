import styled from "styled-components";
import { BsImage } from "react-icons/bs";
import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { imagesState } from "../../atoms/write";
import { ImCancelCircle } from "react-icons/im";

const ProfileDeleteButton = styled(ImCancelCircle)`
  position: absolute;
  top: 7px;
  right: 7px;
`;

const PreviewImageContainter = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    border-radius: 10px;
    padding: 1px;
    width: 95px;
    height: 95px;
    object-fit: cover;
  }
`;

const PreviewContainer = styled.div`
  width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: dotted 1px gray;
  border-top: none;
`;

const ImageIcon = styled(BsImage)`
  opacity: ${(props) => (props.drag === "drag" ? "50%" : "70%")};
`;

const UploadContainer = styled.div`
  opacity: ${(props) => (props.drag === "drag" ? "70%" : "100%")};
  width: 300px;
  height: 300px;
  border: dotted 1px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  & input {
    display: none;
  }
`;

const UploadButton = styled.button`
  width: 100%;
  position: absolute;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  bottom: 20px;
  text-decoration: underline;
  border: none;
  background-color: white;
`;

const DescText = styled.p`
  width: 100%;
  height: 50px;
  color: gray;
  font-size: 1em;
  text-align: center;
  bottom: 80px;
`;

const StyledText = styled.p`
  width: 100%;
  color: gray;
  font-size: 1em;
  text-align: center;
  bottom: 80px;
`;

export default function ImageUpload() {
  const [images, setImages] = useRecoilState(imagesState);
  const [drag, setDrag] = useState(false);
  const imageRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let imageFiles = e.dataTransfer.files;
    handleFile(imageFiles);
  };

  const handleFile = (files) => {
    setImages([...images, ...files]);
  };

  const handleDelete = (index) => {
    const deletedImages = [];
    for (let i = 0; i < images.length; i++) {
      if (i === index) continue;
      else deletedImages.push(images[i]);
    }
    setImages([...deletedImages]);
  };

  return (
    <>
      <DescText>사진을 업로드 해주세요.</DescText>
      <UploadContainer
        drag={drag ? "drag" : null}
        onDragEnter={() => setDrag(true)}
        onDragLeave={() => setDrag(false)}
        onDragOver={handleDragOver}
        onDrop={(e) => {
          handleDrop(e);
          setDrag(false);
        }}
      >
        <ImageIcon
          drag={drag ? "drag" : null}
          size={50}
          color="black"
        ></ImageIcon>
        <StyledText>여기에 사진을 놓아주세요.</StyledText>
        <UploadButton onClick={() => imageRef.current.click()}>
          기기에서 업로드
        </UploadButton>
        <input
          ref={imageRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            setImages([...images, ...e.target.files]);
          }}
        />
      </UploadContainer>
      <PreviewContainer>
        {images.map((image, index) => {
          return (
            <PreviewImageContainter key={index}>
              <ProfileDeleteButton
                color="black"
                onClick={() => {
                  handleDelete(index);
                }}
              />
              <img src={URL.createObjectURL(image)} alt="미리보기" />
            </PreviewImageContainter>
          );
        })}
      </PreviewContainer>
    </>
  );
}
