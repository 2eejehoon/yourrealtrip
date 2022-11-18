import styled from "styled-components";
import Review from "./Review";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewListContainer = styled.div`
  width: 100%;
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
