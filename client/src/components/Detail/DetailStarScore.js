/* eslint-disable */
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const Star = styled(AiFillStar)``;

const StarContainer = styled.div`
  position: absolute;
  width: 70px;
  height: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  right: 10px;
  top: 7px;
`;

export default function DetailStarScore({ score }) {
  return (
    <StarContainer>
      {[1, 2, 3, 4, 5].map((num) => {
        return <Star key={num} fill={score >= num ? "gold" : "lightgray"} />;
      })}
    </StarContainer>
  );
}
