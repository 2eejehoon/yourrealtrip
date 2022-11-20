import styled from "styled-components";
import MenuModal from "./MenuModal";
import { AiOutlineMenu } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import { useState } from "react";

const MenuButton = styled(AiOutlineMenu)``;

const SearchContainer = styled.div`
  width: calc(100% - 35px);
  height: 35px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: solid 1px darkgray;
  border-radius: 15px;
  box-shadow: 0.5px 0.5px lightgray;

  &:focus-within {
    border: solid 2px black;
  }
`;

const Searchbar = styled.input`
  width: calc(100% - 40px);
  border: none;
  font-size: 0.75em;

  &:focus {
    outline: none;
  }
`;

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: solid 1px lightgray;
  padding: 15px;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HeaderContainer>
      <SearchContainer>
        <SlMagnifier size={20} onClick={() => {}} />
        <Searchbar placeholder="검색" />
      </SearchContainer>
      <MenuButton size={25} color="gray" onClick={() => setIsModalOpen(true)} />
      {isModalOpen ? <MenuModal setIsModalOpen={setIsModalOpen} /> : null}
    </HeaderContainer>
  );
}
