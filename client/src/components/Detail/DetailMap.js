/* eslint-disable */
import styled from "styled-components";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const MapContainer = styled.div`
  width: 100%;
  height: 390px;
  padding: 10px;
  border-radius: 10px;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const { kakao } = window;

export default function DetailMap() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["review", id], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/reviews/${id}`);
  });

  useEffect(() => {
    if (!isLoading) {
      let mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(data?.data.lng, data?.data.lat), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
      let makerPosition = new kakao.maps.LatLng(data?.data.lng, data?.data.lat);
      let map = new kakao.maps.Map(mapContainer, mapOption);
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
