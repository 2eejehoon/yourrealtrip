import styled from "styled-components";
import WishListContainer from "../components/WishList/WishListContainer";
import WishHeader from "../components/WishList/WishHeader";

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;

  @media screen and (min-width: 400px) {
    width: 410px;
  }
  @media screen and (min-width: 800px) {
    width: 810px;
  }
  @media screen and (min-width: 1200px) {
    width: 1210px;
  }
`;

export default function Wishlist() {
  return (
    <>
      <WishHeader />
      <Wrapper>
        <WishListContainer />
      </Wrapper>
    </>
  );
}
