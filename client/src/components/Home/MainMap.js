/* eslint-disable */
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { categoryState } from "../../atoms/filter";
import { searchState } from "../../atoms/search";
import axios from "axios";

const MapContainer = styled.div`
  margin: auto;
  min-height: calc(100vh - 140px);
  padding: 10px;
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
  min-height: calc(100vh - 140px);
  z-index: 1000;
`;

const { kakao } = window;

export default function MainMap() {
  const category = useRecoilValue(categoryState);
  const search = useRecoilValue(searchState);

  const { data, isLoading } = useQuery(
    ["reviews"],
    () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/reviews`);
    },
    {
      select: (reviews) =>
        category === "전체" && search === ""
          ? reviews.data
          : category === "전체" && search !== ""
          ? reviews.data.filter(
              (el) =>
                el.title.includes(search) ||
                el.city.includes(search) ||
                el.district.includes(search) ||
                el.street.includes(search)
            )
          : category !== "전체" && search === ""
          ? reviews.data.filter((el) => el.city.includes(category))
          : category !== "전체" && search !== ""
          ? reviews.data.filter(
              (el) =>
                el.city.includes(category) &&
                (el.title.includes(search) ||
                  el.city.includes(search) ||
                  el.district.includes(search) ||
                  el.street.includes(search))
            )
          : null,
    }
  );

  useEffect(() => {
    if (!isLoading) {
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다

      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      var bounds = new kakao.maps.LatLngBounds();

      var i, marker;
      for (i = 0; i < data.length; i++) {
        // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
        marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(data[i].lng, data[i].lat),
        });
        marker.setMap(map);

        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(new kakao.maps.LatLng(data[i].lng, data[i].lat));
      }

      function setBounds() {
        // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
        // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
        map.setBounds(bounds);
      }

      setBounds();
    }
  });

  return (
    <MapContainer>
      <Map id="map" />
    </MapContainer>
  );
}
