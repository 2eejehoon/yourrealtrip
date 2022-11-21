import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";

const Star = styled(AiFillStar)``;

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

const RatingContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StarContainer = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Rating() {
  const [hover, setHover] = useState(null);
  const [click, setClick] = useState(null);

  const text = [
    "매우 나빴어요.",
    "나빴어요.",
    "보통이에요.",
    "좋았어요.",
    "아주 좋았어요.",
  ];

  return (
    <>
      <DescText>여행을 별점으로 평가해주세요.</DescText>
      <RatingContainer>
        {text[click] !== null ? (
          <StyledText>{text[click - 1]}</StyledText>
        ) : null}
        <StarContainer>
          {[1, 2, 3, 4, 5].map((num) => {
            return (
              <Star
                onMouseEnter={() => setHover(num)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setClick(num)}
                size={45}
                key={num}
                fill={(hover >= num) | (click >= num) ? "gold" : "lightgray"}
              />
            );
          })}
        </StarContainer>
      </RatingContainer>
    </>
  );
}
