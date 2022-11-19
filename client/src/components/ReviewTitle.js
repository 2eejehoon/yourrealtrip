import styled from "styled-components";

const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;

  & h3 {
    font-size: 1em;
    font-weight: normal;
  }
  & p {
    font-size: 0.75em;
    font-weight: lighter;
    color: grey;
  }
`;

export default function ReviewTitle() {
  return (
    <TitleContainer>
      <h3>제목</h3>
      <p>장소명, 주소</p>
    </TitleContainer>
  );
}
