import styled from "styled-components";
import { useState } from "react";
import WishMenuModal from "./WishMenuModal";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const GoBack = styled(RiArrowGoBackFill)`
  position: absolute;
  top: 10px;
  left: 25px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const HeaderContainer = styled.header`
  position: relative;
  margin: auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const MenuButton = styled(AiOutlineMenu)`
  right: 25px;
  position: absolute;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

export default function WishHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HeaderContainer>
      <Link to="/reviews">
        <GoBack size={25} color="gray" />
      </Link>
      <MenuButton size={25} color="gray" onClick={() => setIsModalOpen(true)} />
      {isModalOpen ? <WishMenuModal setIsModalOpen={setIsModalOpen} /> : null}
    </HeaderContainer>
  );
}
