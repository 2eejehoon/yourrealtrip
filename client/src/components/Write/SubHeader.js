import styled from "styled-components";
import { useState } from "react";
import MenuModal from "../Home/MenuModal";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";

const GoBack = styled(RiArrowGoBackFill)`
  position: absolute;
  left: 5px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuButton = styled(AiOutlineMenu)`
  right: 5px;
  position: absolute;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

export default function SubHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <HeaderContainer>
      <GoBack size={25} color="gray" />
      <MenuButton size={25} color="gray" onClick={() => setIsModalOpen(true)} />
      {isModalOpen ? <MenuModal setIsModalOpen={setIsModalOpen} /> : null}
    </HeaderContainer>
  );
}
