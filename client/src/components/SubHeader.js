import styled from "styled-components";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FiShare } from "react-icons/fi";
import { BsFillSuitHeartFill } from "react-icons/bs";
import ShareModal from "./ShareModal";
import { useState } from "react";

const WishlistButton = styled(BsFillSuitHeartFill)`
  position: absolute;
  right: 5px;
`;

const GoBack = styled(RiArrowGoBackFill)`
  position: absolute;
  left: 5px;
`;

const Share = styled(FiShare)`
  position: absolute;
  right: 35px;
`;

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function SubHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <HeaderContainer>
      <GoBack size={25} color="gray" />
      <Share size={25} color="gray" onClick={() => setIsModalOpen(true)} />
      <WishlistButton size={23} fill="gray" />
      {isModalOpen ? <ShareModal setIsModalOpen={setIsModalOpen} /> : null}
    </HeaderContainer>
  );
}
