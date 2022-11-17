import styled from "styled-components";

import Menu from "./Menu";
import Searchbar from "./Searchbar";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 50px;
  border-bottom: solid 1px lightgray;
  padding: 15px;
`;

export default function Header() {
  return (
    <Wrapper>
      <Searchbar></Searchbar>
      <Menu></Menu>
    </Wrapper>
  );
}
