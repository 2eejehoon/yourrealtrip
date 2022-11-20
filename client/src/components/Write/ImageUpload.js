import styled from "styled-components";
import { BsImage } from "react-icons/bs";

const ImageIcon = styled(BsImage)`
  opacity: 75%;
`;

const UploadContainer = styled.div`
  width: 300px;
  height: 350px;
  border: dotted 1px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const UploadText = styled.p`
  width: 100%;
  position: absolute;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  bottom: 80px;
  text-decoration: underline;
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
  return (
    <>
      <DescText>사진을 업로드 해주세요.</DescText>
      <UploadContainer>
        <ImageIcon size={50} color="black"></ImageIcon>
        <StyledText>여기에 사진을 놓아주세요.</StyledText>
        <UploadText>기기에서 업로드</UploadText>
      </UploadContainer>
    </>
  );
}
