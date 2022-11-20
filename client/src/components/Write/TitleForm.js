import styled from "styled-components";

const TitleContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 25px;
  border: none;
  border-bottom: 1px solid lightgray;
  font-size: 1em;
  display: flex;
  justify-content: start;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

export default function TitleForm() {
  return (
    <TitleContainer>
      <DescText>이번 여행의 제목을 만들어주세요.</DescText>
      <TitleInput placeholder="제목을 입력하세요."></TitleInput>
    </TitleContainer>
  );
}
