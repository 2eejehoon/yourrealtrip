import styled from "styled-components";

const ContentContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

const DateContainer = styled.p`
  width: 100%;
  font-size: 0.75em;
`;

const TextContainter = styled.div`
  width: 100%;
  font-size: 0.75em;
  color: gray;
`;

export default function ReviewContent() {
  return (
    <ContentContainer>
      <DateContainer>2022년 11월 19일 토요일</DateContainer>
      <TextContainter>내용</TextContainter>
    </ContentContainer>
  );
}
