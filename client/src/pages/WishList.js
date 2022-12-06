import styled from "styled-components";
import WishListContainer from "../components/WishList/WishListContainer";
import SubHeader from "../components/SubHeader";

const Wrapper = styled.div`
  max-width: 390px;
  min-height: calc(100vh - 50px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default function Wishlist() {
  return (
    <>
      <SubHeader />
      <Wrapper>
        <WishListContainer />
      </Wrapper>
    </>
  );
}
