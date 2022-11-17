import styled from "styled-components";
import { SlMagnifier } from "react-icons/sl";

const SearchContainer = styled.div`
  width: calc(100vw - 70px);
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

const SearchInput = styled.input`
  width: calc(100vw - 120px);
  border: none;
  font-size: 1em;

  &:focus {
    outline: none;
  }
`;

export default function Searchbar() {
  return (
    <>
      <SearchContainer>
        <SlMagnifier size={25} />
        <SearchInput placeholder="검색" />
      </SearchContainer>
    </>
  );
}
