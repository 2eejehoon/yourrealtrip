import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../../atoms/search";
import MenuModal from "../MenuModal";

const MenuButton = styled(AiOutlineMenu)`
  position: absolute;
  right: 25px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const SearchContainer = styled.div`
  width: 280px;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: solid 1px darkgray;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 2px;

  &:focus-within {
    width: 300px;
    transition: 0.5s;
    outline: solid 1.5px black;
  }
`;

const Searchbar = styled.input`
  width: calc(100% - 45px);
  border: none;

  &:focus {
    outline: none;
  }
`;

const HeaderContainer = styled.header`
  margin: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 15px;
  top: 0;
  background-color: white;

  @media screen and (min-width: 400px) {
    max-width: 410px;
  }
  @media screen and (min-width: 800px) {
    max-width: 810px;
  }
  @media screen and (min-width: 1200px) {
    max-width: 1210px;
  }
  @media screen and (min-width: 1600px) {
    max-width: 1610px;
  }
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
