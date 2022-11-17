import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";

const MenuBtn = styled.button`
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function MenuButton() {
  return (
    <>
      <MenuBtn>
        <AiOutlineMenu size={30} />
      </MenuBtn>
    </>
  );
}
