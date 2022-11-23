import styled from "styled-components";
import LikeStarScore from "./StarScore";

const ReviewContainer = styled.li`
  width: 100%;
  height: 135px;
  display: flex;
  justify-content: start;
  align-items: center;

  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const ReivewImage = styled.img`
  width: 130px;
  height: 130px;
  border: 1px solid lightgray;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  margin-left: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  & span {
    font-size: 0.75em;
  }

  & p {
    font-size: 0.75em;
    color: gray;
  }

  & :last-child {
    height: 70px;
    font-size: 0.75em;
    color: black;
  }
`;

export default function Wish() {
  return (
    <ReviewContainer>
      <ReivewImage src="http://infor515.cafe24.com/data/file/gallery02/3695747573_0oqRySMm_c0233900223a6c07c902469675421072cd90f0d9.jpg" />
      <ContentContainer>
        <span>제목</span>
        <p>장소명, 주소</p>
        <LikeStarScore />
        <p>내용</p>
      </ContentContainer>
    </ReviewContainer>
  );
}
