/* eslint-disable */
import styled from "styled-components";
import LikeStarScore from "./StarScore";
import { Link } from "react-router-dom";

const ReviewContainer = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;

  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const ReivewImage = styled.img`
  width: 70px;
  height: 70px;
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

  & textarea {
    background-color: white;
    border: none;
    resize: none;
    width: 100%;
    height: 80px;
    font-size: 0.75em;
    color: black;
  }
`;

export default function Wish({ wish }) {
  return (
    <ReviewContainer>
      <Link to={`/reviews/${wish.id}`}>
        <ReivewImage src={wish.photos[0]} />
      </Link>
      <ContentContainer>
        <span>{wish.title}</span>
        <p>{`${wish.city} ${wish.district} ${wish.street}`}</p>
        <LikeStarScore score={wish.score} />
      </ContentContainer>
    </ReviewContainer>
  );
}
