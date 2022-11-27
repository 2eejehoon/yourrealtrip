import styled from "styled-components";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FiShare } from "react-icons/fi";
import { BsFillSuitHeartFill } from "react-icons/bs";
import ShareModal from "./ShareModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const WishlistButton = styled(BsFillSuitHeartFill)`
  position: absolute;
  top: 10px;
  right: 5px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const GoBack = styled(RiArrowGoBackFill)`
  position: absolute;
  top: 10px;
  left: 5px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const Share = styled(FiShare)`
  position: absolute;
  top: 10px;
  right: 35px;
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
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

export default function DetailHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <HeaderContainer>
      <Link to="/reviews">
        <GoBack size={25} color="gray" />
      </Link>
      <Share size={25} color="gray" onClick={() => setIsModalOpen(true)} />
      <WishlistButton size={23} fill="gray" />
      {isModalOpen ? <ShareModal setIsModalOpen={setIsModalOpen} /> : null}
    </HeaderContainer>
  );
}
