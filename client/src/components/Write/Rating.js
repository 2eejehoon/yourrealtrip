/* eslint-disable */
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import {
  contentState,
  endDateState,
  startDateState,
  titleState,
  scoreState,
  cityState,
  districtState,
  streetState,
  latState,
  lngState,
  imagesState,
} from "../../atoms/write";
import axios from "axios";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userState } from "../../atoms/user";

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

export default function Rating({ setPage }) {
  const user = useRecoilValue(userState);
  const [hover, setHover] = useState(null);
  const [click, setClick] = useRecoilState(scoreState);
  const title = useRecoilValue(titleState);
  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);
  // const images = useRecoilValue(imagesState);
  const content = useRecoilValue(contentState);
  const city = useRecoilValue(cityState);
  const district = useRecoilValue(districtState);
  const lat = useRecoilValue(latState);
  const lng = useRecoilValue(lngState);
  const street = useRecoilValue(streetState);

  const resetTitle = useResetRecoilState(titleState);
  const resetStartDate = useResetRecoilState(startDateState);
  const resetEndDate = useResetRecoilState(endDateState);
  // const resetImages = useResetRecoilState(imagesState);
  const resetContent = useResetRecoilState(contentState);
  const resetCity = useResetRecoilState(cityState);
  const resetDistrict = useResetRecoilState(districtState);
  const resetStreet = useResetRecoilState(streetState);
  const resetLat = useResetRecoilState(latState);
  const resetLng = useResetRecoilState(lngState);
  const resetScore = useResetRecoilState(scoreState);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addReview = useMutation(
    (review) => {
      return axios.post(`${process.env.REACT_APP_BASE_API}/reviews`, review);
    },
    {
      onSuccess: () => {
        resetTitle();
        resetStartDate();
        resetEndDate();
        // resetImages();
        resetContent();
        resetCity();
        resetDistrict();
        resetStreet();
        resetLat();
        resetLng();
        resetScore();
        navigate(`/reviews`);
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
    // if (images.length === 0) {
    //   alert("사진을 업로드 해주세요.");
    //   return setPage(2);
    // }
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

    const review = {
      data: {
        title,
        startDate,
        // images,
        endDate,
        content,
        city,
        district,
        street,
        lat,
        lng,
        score: click,
        createdAt: new Date(),
        authorId: user.id,
      },
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
