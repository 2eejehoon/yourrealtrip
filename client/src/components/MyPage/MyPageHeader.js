import styled from "styled-components";
import { RiArrowGoBackFill } from "react-icons/ri";

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

export default function MyPageHeader() {
  return (
    <HeaderContainer>
      <GoBack size={25} color="gray" />
    </HeaderContainer>
  );
}
