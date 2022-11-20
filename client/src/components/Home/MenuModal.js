/* eslint-disable */
import styled from "styled-components";

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
  width: 60px;
  border: 1px solid darkgray;
  border-radius: 5px;
  position: absolute;
  box-shadow: 0.5px 0.5px lightgray;
  right: 15px;
  top: 40px;
  background-color: white;
  z-index: 2000;

  & li {
    width: 100%;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;

    &:hover {
      background-color: lightgray;
      transition: 0.5s;
    }
  }
`;

export default function MenuModal({ setIsModalOpen }) {
  return (
    <>
      <ModalContainer>
        <li>로그인</li>
        <li>회원가입</li>
      </ModalContainer>
      <BackgroundDiv onClick={() => setIsModalOpen(false)} />
    </>
  );
}
