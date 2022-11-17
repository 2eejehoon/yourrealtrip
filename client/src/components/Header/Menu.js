import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";

const MenuButton = styled.button`
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Menu() {
  return (
    <>
      <MenuButton>
        <AiOutlineMenu size={30} />
      </MenuButton>
    </>
  );
}
