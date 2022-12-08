/* eslint-disable */
import styled from "styled-components";
import { useRef } from "react";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { userState } from "../../atoms/user";
import WishCustomMarker from "./WishCustomMarker";
import WishCustomOverlay from "./WishCustomOverlay";

const MapContainer = styled.div`
  margin: auto;
  width: calc(100% - 300px);
  padding: 25px;
  background-color: white;
`;

const StyledCustomOverlay = styled(CustomOverlayMap)``;

const OverlayWrapper = styled.div``;

const { kakao } = window;

export default function WishMap() {
  const user = useRecoilValue(userState);
  const [selected, setSelected] = useState(null);
  const mapRef = useRef();

  const { data } = useQuery(
    ["reviews"],
    () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/reviews`);
    },
    {
      select: (data) =>
        data?.data.filter((el) => {
          let wishlist = el.Wishlist;
          let result = false;
          for (let el of wishlist) {
            if (el.userId === user.id && el.isWishlist) result = true;
            return result;
          }
        }),
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
          height: "calc(100vh - 100px)",
        }}
        level={3} // 지도의 확대 레벨
        ref={mapRef}
      >
        {data.map((review, index) => (
          <OverlayWrapper key={`${index}+${review.lat}`}>
            <WishCustomMarker
              key={index}
              position={{ lat: review.lat, lng: review.lng }}
              onClick={() => setSelected(index)}
            />
            <StyledCustomOverlay
              position={{ lat: review.lat, lng: review.lng }}
            >
              {selected === index && (
                <WishCustomOverlay review={review} setSelected={setSelected} />
              )}
            </StyledCustomOverlay>
          </OverlayWrapper>
        ))}
      </Map>
    </MapContainer>
  );
}
