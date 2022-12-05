import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../../atoms/search";
import MenuModal from "../MenuModal";

const MenuButton = styled(AiOutlineMenu)`
  position: absolute;
  right: 5px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const SearchContainer = styled.div`
  max-width: 768px;
  width: calc(100% - 20px);
  height: 35px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: solid 1px darkgray;
  border-radius: 15px;
  box-shadow: 0.5px 0.5px lightgray;

  &:focus-within {
    outline: solid 1.5px black;
  }
`;

const Searchbar = styled.input`
  width: calc(100% - 45px);
  border: none;
  font-size: 0.75em;

  &:focus {
    outline: none;
  }
`;

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 15px;
  top: 0;
  background-color: white;
`;

export default function MainHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <HeaderContainer>
      <SearchContainer>
        <SlMagnifier size={20} />
        <Searchbar
          placeholder="검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchContainer>
      <MenuButton size={25} color="gray" onClick={() => setIsModalOpen(true)} />
      {isModalOpen ? <MenuModal setIsModalOpen={setIsModalOpen} /> : null}
    </HeaderContainer>
  );
}
