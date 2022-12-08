/* eslint-disable */
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  editCityState,
  editDistrictState,
  editLatState,
  editLngState,
  editStreetState,
} from "../../atoms/edit";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

const AddressFormContainer = styled.div`
  width: 350px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 5px;

  &:focus-within {
    border: 1px solid black;
  }
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;

  & span {
    width: 60px;
  }
  & input {
    width: 100%;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

const MapContainer = styled.div`
  width: 97%;
  height: 350px;
  padding: 10px;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const { kakao } = window;

export default function EditAddressForm() {
  const { id } = useParams();

  const [city, setCity] = useRecoilState(editCityState);
  const [district, setDistrict] = useRecoilState(editDistrictState);
  const [street, setStreet] = useRecoilState(editStreetState);
  const [, setLat] = useRecoilState(editLatState);
  const [, setLng] = useRecoilState(editLngState);

  const { data, isLoading } = useQuery(
    ["review", id],
    () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/reviews/${id}`);
    },
    {
      onSuccess: () => {
        setCity(data?.data.city);
        setDistrict(data?.data.district);
        setStreet(data?.data.street);
        setLat(data?.data.lat);
        setLng(data?.data.lng);
      },
    }
  );

  useEffect(() => {
    let mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.56, 126.9753), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    let map = new kakao.maps.Map(mapContainer, mapOption);
    let marker = new kakao.maps.Marker({
      map: map,
    });

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(`${city}${district}${street}`, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setLat(coords.Ma);
        setLng(coords.La);
        map.setCenter(coords);
        marker.setPosition(coords);
      }
    });

    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      let latlng = mouseEvent.latLng;
      setLat(latlng.Ma);
      setLng(latlng.La);
      marker.setPosition(latlng);
    });
  }, [city, district, street]);

  useEffect(() => {
    if (!isLoading) {
      setCity(data?.data.city);
      setDistrict(data?.data.district);
      setStreet(data?.data.street);
      setLat(data?.data.lat);
      setLng(data?.data.lng);
    }
  }, [data]);

  return (
    <Wrapper>
      <DescText>주소를 입력해주세요.</DescText>
      <AddressFormContainer>
        <InputContainer>
          <span>시/도</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="시/도를 입력해주세요."
          />
        </InputContainer>
        <InputContainer>
          <span>자치구</span>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="자치구를 입력해주세요."
          />
        </InputContainer>
        <InputContainer>
          <span>도로/동</span>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="도로명 또는 동을 입력해주세요."
          />
        </InputContainer>
      </AddressFormContainer>
      <DescText>정확한 위치를 지도에 표시해주세요.</DescText>
      <MapContainer>
        <Map id="map" />
      </MapContainer>
    </Wrapper>
  );
}
