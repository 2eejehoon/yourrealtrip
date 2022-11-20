/* eslint-disable */
import styled from "styled-components";
import { AiOutlineCopy } from "react-icons/ai";

const ShareIcon = styled(AiOutlineCopy)``;

const BackgroundDiv = styled.div`
  inset: 0;
  position: fixed;
  z-index: 1000;
`;

const ModalContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  width: 80px;
  border: 1px solid darkgray;
  border-radius: 5px;
  position: absolute;
  box-shadow: 0.5px 0.5px lightgray;
  right: 10px;
  top: 45px;
  background-color: white;
  z-index: 2000;

  & li {
    width: 100%;
    background: none;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
    padding: 5px;

    &:hover {
      background-color: lightgray;
      transition: 0.5s;
    }
  }
`;

export default function ShareModal({ setIsModalOpen }) {
  return (
    <>
      <ModalContainer>
        <li>
          <ShareIcon size={20} />
          링크복사
        </li>
      </ModalContainer>
      <BackgroundDiv onClick={() => setIsModalOpen(false)} />
    </>
  );
}
