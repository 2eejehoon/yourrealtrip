import styled from "styled-components";
import Wish from "./Wish";

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

const WishContainer = styled.ul`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function WishListContainer() {
  return (
    <>
      <DescText>작성자님의 좋아요 목록</DescText>
      <WishContainer>
        <Wish />
        <Wish />
        <Wish />
        <Wish />
        <Wish />
        <Wish />
      </WishContainer>
    </>
  );
}
