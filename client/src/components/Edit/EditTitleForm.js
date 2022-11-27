/* eslint-disable */
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { editTitleState } from "../../atoms/edit";

const TitleContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const TitleInput = styled.input`
  width: 100%;
  height: 25px;
  border: none;
  border-bottom: 1px solid lightgray;
  font-size: 1em;
  display: flex;
  justify-content: start;
  align-items: start;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

export default function EditTitleForm() {
  const location = useLocation();
  const [title, setTitle] = useRecoilState(editTitleState);

  const { data } = useQuery(
    ["review", location.state.reviewId],
    () => {
      return axios.get(
        `${process.env.REACT_APP_BASE_API}/reviews/${location.state.reviewId}`
      );
    },
    {
      onSuccess: () => {
        setTitle(data?.data.title);
      },
    }
  );

  return (
    <TitleContainer>
      <DescText>여행의 제목을 입력해주세요.</DescText>
      <TitleInput
        placeholder="제목을 입력하세요."
        value={title || ""}
        onChange={(e) => setTitle(e.target.value)}
      ></TitleInput>
    </TitleContainer>
  );
}
