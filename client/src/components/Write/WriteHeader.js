import styled from "styled-components";
import { RiArrowGoBackFill } from "react-icons/ri";

const GoBack = styled(RiArrowGoBackFill)`
  position: absolute;
  left: 5px;
`;

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function WriteHeader() {
  return (
    <HeaderContainer>
      <GoBack size={25} color="gray" />
    </HeaderContainer>
  );
}
