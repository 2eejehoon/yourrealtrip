/* eslint-disable */
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
  display: ${(props) => (props.page === 0 ? "none" : "block")};
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
