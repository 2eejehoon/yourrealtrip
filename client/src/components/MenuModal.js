/* eslint-disable */
import styled from "styled-components";
import { useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";

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
  width: 120px;
  border: 1px solid darkgray;
  border-radius: 5px;
  position: absolute;
  box-shadow: 0.5px 0.5px lightgray;
  right: 25px;
  top: 55px;
  background-color: white;
  z-index: 2000;

  & a {
    outline: none;
    color: black;
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
    height: 40px;

    &:hover {
      background-color: lightgray;
      transition: 0.5s;
    }
  }
`;

export default function MenuModal({ setIsModalOpen }) {
  const [user, setUser] = useRecoilState(userState);

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
      alert("로그아웃");
    });
  };

  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        process.env.REACT_APP_GOOGLE_CLIENT_ID,
        ""
      );
    };
    setAuth2();
  }, []);

  return (
    <>
      {user ? (
        <ModalContainer>
          <li
            onClick={() => {
              signOut();
              setIsModalOpen(false);
            }}
          >
            로그아웃
          </li>
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>
          <li>
            <Link to="/wishlist">위시리스트</Link>
          </li>
          <li>
            <Link to="/write">새 글 작성</Link>
          </li>
        </ModalContainer>
      ) : (
        <ModalContainer>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
        </ModalContainer>
      )}
      <BackgroundDiv onClick={() => setIsModalOpen(false)} />
    </>
  );
}
