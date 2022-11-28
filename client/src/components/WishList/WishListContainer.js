import styled from "styled-components";
import Wish from "./Wish";

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const WishContainer = styled.ul`
  padding: 10px;
  width: 100%;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

export default function WishListContainer() {
  return (
    <WishContainer>
      <DescText>작성자님의 위시리스트</DescText>
      <Wish />
      <Wish />
      <Wish />
      <Wish />
      <Wish />
      <Wish />
    </WishContainer>
  );
}
