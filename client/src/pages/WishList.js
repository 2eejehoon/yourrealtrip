import styled from "styled-components";
import WishListContainer from "../components/WishList/WishListContainer";
import WishHeader from "../components/WishList/WishHeader";
import WishMap from "../components/WishList/WishMap";
import { useState } from "react";

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  margin: auto;
  display: flex;
  flex-direction: row;
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
  @media screen and (min-width: 1600px) {
    width: 1610px;
  }
`;

export default function Wishlist() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <WishHeader />
      <Wrapper>
        <WishListContainer setSelected={setSelected} />
        <WishMap selected={selected} setSelected={setSelected} />
      </Wrapper>
    </>
  );
}
