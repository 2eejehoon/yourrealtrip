/* eslint-disable */
import styled from "styled-components";
import { AiOutlineCopy } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const KakaoTalkIcon = styled(RiKakaoTalkFill)``;

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
  const location = useLocation();

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          alert("다시 시도해주세요.");
        });
    }
  };

  const id = useParams().id.slice(1);
  const { data } = useQuery(["review", id], () => {
    return axios.get(`http://localhost:4000/reviews/${id}`);
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const ShareTokakaoTalk = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      kakao.init(process.env.REACT_APP_KAKAOMAP_API);
      kakao.isInitialized();
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: data?.data.title,
        imageUrl: "...",
        link: {
          mobileWebUrl: `http://localhost:3000/:${id}`,
          webUrl: `http://localhost:3000/:${id}`,
        },
      },
    });
  };

  return (
    <>
      <ModalContainer>
        <li
          onClick={() => {
            copyToClipboard(`http://localhost:3000${location.pathname}`);
            setIsModalOpen(false);
          }}
        >
          <ShareIcon size={20} />
          링크복사
        </li>
        <li
          onClick={() => {
            ShareTokakaoTalk();
          }}
        >
          <KakaoTalkIcon size={20} />
          카카오톡
        </li>
      </ModalContainer>
      <BackgroundDiv onClick={() => setIsModalOpen(false)} />
    </>
  );
}
