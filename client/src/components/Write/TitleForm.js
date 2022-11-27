import styled from "styled-components";
import { useRecoilState } from "recoil";
import { titleState } from "../../atoms/write";

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
  align-items: start;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

export default function TitleForm() {
  const [title, setTitle] = useRecoilState(titleState);

  return (
    <TitleContainer>
      <DescText>장소 이름을 입력해주세요.</DescText>
      <TitleInput
        placeholder=""
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></TitleInput>
    </TitleContainer>
  );
}
