/* eslint-disable */
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const Star = styled(AiFillStar)``;

const StarContainer = styled.div`
  width: 70px;
  height: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export default function LikeStarScore({ score }) {
  return (
    <StarContainer>
      {[1, 2, 3, 4, 5].map((num) => {
        return (
          <Star
            key={num}
            size={20}
            fill={score >= num ? "gold" : "lightgray"}
          />
        );
      })}
    </StarContainer>
  );
}
