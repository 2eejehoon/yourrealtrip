/* eslint-disable */
import styled from "styled-components";
import { Link } from "react-router-dom";

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

  & a {
    outline: none;
    text-decoration: none;

    &:visited {
      text-decoration: none;
      color: black;
    }
  }

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
        <li>
          <Link to="login">로그인 </Link>
        </li>
        <li>
          <Link to="signup">회원가입</Link>
        </li>
        <li>
          <Link to="signup">로그아웃</Link>
        </li>
        <li>
          <Link to="mypage">마이페이지</Link>
        </li>
        <li>
          <Link to="wishlist">위시리스트</Link>
        </li>
        <li>
          <Link to="write">작성하기 </Link>
        </li>
      </ModalContainer>
      <BackgroundDiv onClick={() => setIsModalOpen(false)} />
    </>
  );
}
