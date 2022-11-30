/* eslint-disable */
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";
import {
  editScoreState,
  editStartDateState,
  editTitleState,
  editEndDateState,
  editContentState,
  editCityState,
  editDistrictState,
  editLatLngState,
  editStreetState,
  editImagesState,
} from "../../atoms/edit";

const Star = styled(AiFillStar)`
  &:hover {
    transition: 0.5s;
  }
`;

const SubmitButton = styled.button`
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  color: white;
  background-color: gray;
  border: none;
  border-radius: 10px;
  &:hover {
    opacity: 70%;
  }
`;

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

const RatingContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StarContainer = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function EditRating() {
  const location = useLocation();
  const [hover, setHover] = useState(null);
  const [click, setClick] = useRecoilState(editScoreState);
  const title = useRecoilValue(editTitleState);
  const startDate = useRecoilValue(editStartDateState);
  const endDate = useRecoilValue(editEndDateState);
  const images = useRecoilValue(editImagesState);
  const content = useRecoilValue(editContentState);
  const city = useRecoilValue(editCityState);
  const district = useRecoilValue(editDistrictState);
  const latlng = useRecoilValue(editLatLngState);
  const street = useRecoilValue(editStreetState);

  const resetTitle = useResetRecoilState(editTitleState);
  const resetStartDate = useResetRecoilState(editStartDateState);
  const resetEndDate = useResetRecoilState(editEndDateState);
  const resetImages = useResetRecoilState(editImagesState);
  const resetContent = useResetRecoilState(editContentState);
  const resetCity = useResetRecoilState(editCityState);
  const resetDistrict = useResetRecoilState(editDistrictState);
  const resetStreet = useResetRecoilState(editStreetState);
  const resetLatLng = useResetRecoilState(editLatLngState);
  const resetScore = useResetRecoilState(editScoreState);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["review", location.state.reviewId],
    () => {
      return axios.get(
        `${process.env.REACT_APP_BASE_API}/reviews/${location.state.reviewId}`
      );
    },
    {
      onSuccess: () => {
        setClick(data?.data.score);
      },
    }
  );

  const editReview = useMutation(
    (editedReview) => {
      return axios.patch(
        `${process.env.REACT_APP_BASE_API}/reviews/${location.state.reviewId}`,
        editedReview
      );
    },
    {
      onSuccess: () => {
        resetTitle();
        resetStartDate();
        resetEndDate();
        resetContent();
        resetImages();
        resetCity();
        resetDistrict();
        resetStreet();
        resetLatLng();
        resetScore();
        navigate(`/reviews/${location.state.reviewId}`);
        return queryClient.invalidateQueries(["reviews"]);
      },
    }
  );

  const handleWriteSubmit = () => {
    if (title === "") {
      alert("제목을 입력해주세요.");
      return setPage(0);
    }
    if (startDate === "") {
      alert("시작일을 입력해주세요.");
      return setPage(1);
    }
    if (endDate === "") {
      alert("종료일을 입력해주세요.");
      return setPage(1);
    }
    if (images.length === 0) {
      alert("사진을 업로드 해주세요.");
      return setPage(2);
    }
    if (content === "") {
      alert("내용을 입력해주세요.");
      return setPage(3);
    }
    if (city === "") {
      alert("시/도를 입력해주세요.");
      return setPage(4);
    }
    if (district === "") {
      alert("자치구를 입력해주세요.");
      return setPage(4);
    }
    if (street === "") {
      alert("도로명을 입력해주세요.");
      return setPage(4);
    }
    if (click === "") {
      return alert("평점을 입력해주세요.");
    }

    const editedReview = {
      ...data?.data,
      id: uuidv4(),
      title,
      startDate,
      images,
      endDate,
      content,
      city,
      district,
      street,
      latlng,
      score: click,
    };

    editReview.mutate(editedReview);
  };

  const text = [
    "매우 나빴어요.",
    "나빴어요.",
    "보통이에요.",
    "좋았어요.",
    "아주 좋았어요.",
  ];

  return (
    <>
      <RatingContainer>
        <DescText>여행을 별점으로 평가해주세요.</DescText>
        {text[click] !== null ? (
          <StyledText>{text[click - 1]}</StyledText>
        ) : null}
        <StarContainer>
          {[1, 2, 3, 4, 5].map((num) => {
            return (
              <Star
                onMouseEnter={() => setHover(num)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setClick(num)}
                size={45}
                key={num}
                fill={(hover >= num) | (click >= num) ? "gold" : "lightgray"}
              />
            );
          })}
        </StarContainer>
      </RatingContainer>
      <SubmitButton onClick={handleWriteSubmit}>완료</SubmitButton>
    </>
  );
}
