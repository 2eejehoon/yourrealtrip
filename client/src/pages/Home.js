import styled from "styled-components";
import CategoryTag from "../components/Home/CategoryTag";
import MainHeader from "../components/Home/MainHeader";
import ReviewList from "../components/Home/ReviewList";
import { useState } from "react";
import MainMap from "../components/Home/MainMap";

const SwitchButton = styled.button`
  position: fixed;
  width: 150px;
  height: 50px;
  background-color: black;
  z-index: 2000;
  left: 50%;
  transform: 50%;
  bottom: 100px;
  border: none;
  border-radius: 20px;
  color: white;
  transform: translateX(-50%);
`;

export default function Home() {
  const [view, setView] = useState(0);

  return (
    <>
      <MainHeader />
      <CategoryTag />
      {view === 0 && (
        <>
          <ReviewList />
          <SwitchButton onClick={() => setView(1)}>지도 보기</SwitchButton>
        </>
      )}
      {view === 1 && (
        <>
          <MainMap />
          <SwitchButton onClick={() => setView(0)}>목록 보기</SwitchButton>
        </>
      )}
    </>
  );
}
