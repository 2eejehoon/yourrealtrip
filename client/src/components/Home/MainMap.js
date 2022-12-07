/* eslint-disable */
import styled from "styled-components";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MapContainer = styled.div`
  min-height: calc(100vh - 140px);
  margin: auto;
  padding: 25px;
  background-color: white;

  @media screen and (min-width: 400px) {
    width: 410px;
  }
  @media screen and (min-width: 800px) {
    width: 810px;
  }
  @media screen and (min-width: 1200px) {
    width: 1210px;
  }
  @media screen and (min-width: 1600px) {
    width: 1610px;
  }
`;

const Map = styled.div`
  width: 100%;
  height: calc(100vh - 185px);
`;

const { kakao } = window;

export default function MainMap() {
  const { data, isLoading } = useQuery(["review", 48], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/reviews/48`);
  });

  useEffect(() => {
    if (!isLoading) {
      let mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      let map = new kakao.maps.Map(mapContainer, mapOption);

      let makerPosition = new kakao.maps.LatLng(data?.data.lng, data?.data.lat);
      let marker = new kakao.maps.Marker({
        position: makerPosition,
      });
      marker.setMap(map);
    }
  }, [data]);

  return (
    <MapContainer>
      <Map id="map" />
    </MapContainer>
  );
}
