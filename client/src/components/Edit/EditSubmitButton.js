/* eslint-disable */
import styled from "styled-components";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  editScoreState,
  editStartDateState,
  editTitleState,
  editEndDateState,
  editContentState,
  editCityState,
  editDistrictState,
  editStreetState,
  editImagesState,
  editLatState,
  editLngState,
} from "../../atoms/edit";
import { userState } from "../../atoms/user";

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

export default function EditSubmitButton({ setPage }) {
  const { id } = useParams();
  const user = useRecoilValue(userState);

  const title = useRecoilValue(editTitleState);
  const startDate = useRecoilValue(editStartDateState);
  const endDate = useRecoilValue(editEndDateState);
  const images = useRecoilValue(editImagesState);
  const content = useRecoilValue(editContentState);
  const city = useRecoilValue(editCityState);
  const district = useRecoilValue(editDistrictState);
  const lat = useRecoilValue(editLatState);
  const lng = useRecoilValue(editLngState);
  const street = useRecoilValue(editStreetState);
  const score = useRecoilValue(editScoreState);

  const resetTitle = useResetRecoilState(editTitleState);
  const resetStartDate = useResetRecoilState(editStartDateState);
  const resetEndDate = useResetRecoilState(editEndDateState);
  const resetImages = useResetRecoilState(editImagesState);
  const resetContent = useResetRecoilState(editContentState);
  const resetCity = useResetRecoilState(editCityState);
  const resetDistrict = useResetRecoilState(editDistrictState);
  const resetStreet = useResetRecoilState(editStreetState);
  const resetLat = useResetRecoilState(editLatState);
  const resetLng = useResetRecoilState(editLngState);
  const resetScore = useResetRecoilState(editScoreState);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editReview = useMutation(
    (editedReview) => {
      return axios.patch(
        `${process.env.REACT_APP_BASE_API}/reviews/${id}`,
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
        resetLat();
        resetLng();
        resetScore();
        navigate(`/reviews/${id}`);
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
    if (score === "") {
      return alert("평점을 입력해주세요.");
    }

    const editedReview = {
      data: {
        title,
        startDate,
        photos: images,
        endDate,
        content,
        city,
        district,
        street,
        lat,
        lng,
        score,
        authorId: user.id,
      },
    };

    editReview.mutate(editedReview);
  };

  return <SubmitButton onClick={handleWriteSubmit}>완료</SubmitButton>;
}
