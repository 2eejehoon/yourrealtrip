import styled from "styled-components";

const CategoryButton = styled.div`
  width: 45px;
  height: 45px;
  border: 1px solid lightgray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
`;

const CategoryButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: solid 1px lightgray;
  padding: 10px;
`;

export default function CategoryTag() {
  return (
    <CategoryButtonContainer>
      <CategoryButton>서울</CategoryButton>
      <CategoryButton>제주</CategoryButton>
      <CategoryButton>부산</CategoryButton>
      <CategoryButton>인천</CategoryButton>
      <CategoryButton>대구</CategoryButton>
      <CategoryButton>광주</CategoryButton>
      <CategoryButton>대전</CategoryButton>
    </CategoryButtonContainer>
  );
}
