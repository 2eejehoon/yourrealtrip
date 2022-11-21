import styled from "styled-components";
import Review from "./Review";

const ReviewListContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  padding: 10px;
`;

export default function ReviewList() {
  return (
    <ReviewListContainer>
      <Review></Review>
      <Review></Review>
      <Review></Review>
      <Review></Review>
    </ReviewListContainer>
  );
}
