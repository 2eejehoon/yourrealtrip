import styled from "styled-components";
// import MenuModal from "./MenuModal";
import { AiOutlineMenu } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";

const SearchContainer = styled.div`
  width: calc(100% - 40px);
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
  font-size: 1em;

  &:focus {
    outline: none;
  }
`;

const MenuButton = styled.button`
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: solid 1px lightgray;
  padding: 15px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <SearchContainer>
        <SlMagnifier size={25} />
        <Searchbar placeholder="검색" />
      </SearchContainer>
      <MenuButton>
        <AiOutlineMenu size={30} />
      </MenuButton>
      {/* <MenuModal></MenuModal> */}
    </HeaderContainer>
  );
}
