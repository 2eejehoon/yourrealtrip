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
  const content = useRecoilValue(editContentState);
  const city = useRecoilValue(editCityState);
  const district = useRecoilValue(editDistrictState);
  const latlng = useRecoilValue(editLatLngState);
  const street = useRecoilValue(editStreetState);

  const resetTitle = useResetRecoilState(editTitleState);
  const resetStartDate = useResetRecoilState(editStartDateState);
  const resetEndDate = useResetRecoilState(editEndDateState);
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
        `http://localhost:4000/reviews/${location.state.reviewId}`
      );
    },
    {
      onSuccess: () => {
        setClick(data?.data.score);
      },
    }
  );

  const addReview = useMutation(
    (review) => {
      return axios.patch(
        `http://localhost:4000/reviews/${location.state.reviewId}`,
        review
      );
    },
    {
      onSuccess: () => {
        resetTitle();
        resetStartDate();
        resetEndDate();
        resetContent();
        resetCity();
        resetDistrict();
        resetStreet();
        resetLatLng();
        resetScore();
        navigate("/reviews");
        return queryClient.invalidateQueries(["reviews"]);
      },
    }
  );

  const handleWriteSubmit = () => {
    if (title === "") return alert("제목을 입력해주세요.");
    if (startDate === "") return alert("시작일을 입력해주세요.");
    if (endDate === "") return alert("종료일을 입력해주세요.");
    if (content === "") return alert("내용을 입력해주세요.");
    if (city === "") return alert("시/도를 입력해주세요.");
    if (district === "") return alert("자치구를 입력해주세요.");
    if (street === "") return alert("도로명을 입력해주세요.");
    if (click === "") return alert("평점을 입력해주세요.");

    const review = {
      id: uuidv4(),
      title,
      startDate,
      images: [1, 2, 3],
      endDate,
      content,
      city,
      district,
      street,
      latlng,
      score: click,
      createdAt: new Date(),
    };

    addReview.mutate(review);
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
