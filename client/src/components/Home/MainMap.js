/* eslint-disable */
import styled from "styled-components";
import { useRef } from "react";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { categoryState } from "../../atoms/filter";
import { searchState } from "../../atoms/search";
import axios from "axios";
import { useState } from "react";
import CustomMarker from "./CustomMarker";
import CustomOverlay from "./CustomOverlay";
import { useEffect } from "react";

const MapContainer = styled.div`
  margin: auto;
  min-height: calc(100vh - 140px);
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

const StyledCustomOverlay = styled(CustomOverlayMap)``;

const OverlayWrapper = styled.div``;

const { kakao } = window;

export default function MainMap() {
  const [selected, setSelected] = useState(null);
  const category = useRecoilValue(categoryState);
  const search = useRecoilValue(searchState);
  const mapRef = useRef();

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

      onSuccess: () => {
        const bounds = new kakao.maps.LatLngBounds();
        data.forEach((review) => {
          bounds.extend(new kakao.maps.LatLng(review.lat, review.lng));
        });
        const map = mapRef.current;
        if (map) map.setBounds(bounds);
      },
    }
  );

  useEffect(() => {
    const bounds = new kakao.maps.LatLngBounds();
    data.forEach((review) => {
      bounds.extend(new kakao.maps.LatLng(review.lat, review.lng));
    });
    const map = mapRef.current;
    if (map) map.setBounds(bounds);
  }, [data]);

  if (data.length === 0) return <MapContainer></MapContainer>;

  return (
    <MapContainer>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: "100%",
          height: "calc(100vh - 190px)",
        }}
        level={3} // 지도의 확대 레벨
        ref={mapRef}
      >
        {data.map((review, index) => (
          <OverlayWrapper key={`${index}+${review.lat}`}>
            <CustomMarker
              key={index}
              position={{ lat: review.lat, lng: review.lng }}
              onClick={() => setSelected(index)}
            />
            <StyledCustomOverlay
              position={{ lat: review.lat, lng: review.lng }}
            >
              {selected === index && (
                <CustomOverlay review={review} setSelected={setSelected} />
              )}
            </StyledCustomOverlay>
          </OverlayWrapper>
        ))}
      </Map>
    </MapContainer>
  );
}
