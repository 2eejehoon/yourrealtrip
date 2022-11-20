import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const PrevButton = styled.button`
  position: absolute;
  color: white;
  font-size: 0.75em;
  border: none;
  width: 40px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: gray;
  left: 10px;
`;

const NextButton = styled.button`
  position: absolute;
  color: white;
  font-size: 0.75em;
  border: none;
  width: 40px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: gray;
  right: 10px;
`;

export default function WriteFooter() {
  return (
    <FooterContainer>
      <PrevButton>이전</PrevButton>
      <NextButton>다음</NextButton>
    </FooterContainer>
  );
}
