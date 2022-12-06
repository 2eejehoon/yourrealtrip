/* eslint-disable */
import styled from "styled-components";

const FooterContainer = styled.footer`
  max-width: 410px;
  margin: auto;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: white;
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
  display: ${(props) => (props.page === 0 ? "none" : "block")};
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
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
  display: ${(props) => (props.page === 5 ? "none" : "block")};
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

export default function WriteFooter({ page, setPage }) {
  return (
    <FooterContainer>
      <PrevButton page={page} onClick={() => setPage(page - 1)}>
        이전
      </PrevButton>
      <NextButton page={page} onClick={() => setPage(page + 1)}>
        다음
      </NextButton>
    </FooterContainer>
  );
}
