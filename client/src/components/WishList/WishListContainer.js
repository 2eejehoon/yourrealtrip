import styled from "styled-components";
import WishListReview from "./WishListReview";

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

const WishListWrapper = styled.ul`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function WishListContainer() {
  return (
    <>
      <DescText>작성자님의 위시리스트</DescText>
      <WishListWrapper>
        <WishListReview />
        <WishListReview />
        <WishListReview />
        <WishListReview />
        <WishListReview />
        <WishListReview />
        <WishListReview />
      </WishListWrapper>
    </>
  );
}
