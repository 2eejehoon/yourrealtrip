import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";

const MapContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

export default function DetailMap() {
  return (
    <MapContainer>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "250px",
        }}
        level={3} // 지도의 확대 레벨
      />
    </MapContainer>
  );
}
