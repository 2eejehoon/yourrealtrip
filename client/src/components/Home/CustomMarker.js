/* eslint-disable */
import styled from "styled-components";
import { useState } from "react";
import { useMap, MapMarker } from "react-kakao-maps-sdk";

// const CustomMarkerDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 0.75em;
//   width: 80px;
//   height: 30px;
//   background-color: white;
//   border-radius: 10px;
// `;

export default function CustomMarker({ position, onClick }) {
  const map = useMap();

  return (
    <MapMarker
      position={position} // 마커를 표시할 위치
      // @ts-ignore
      onClick={onClick}
    />
  );
}
