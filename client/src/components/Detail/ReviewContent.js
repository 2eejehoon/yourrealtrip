/* eslint-disable */
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ContentContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

const DateContainer = styled.p`
  width: 100%;
  font-size: 0.75em;
`;

const TextContainter = styled.textarea`
  width: 100%;
  height: 210px;
  font-size: 0.75em;
  color: gray;
  border: none;
  outline: none;
  resize: none;
  background-color: white;
`;

export default function ReviewContent() {
  const { id } = useParams();
  const { data } = useQuery(["review", id], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/reviews/${id}`);
  });

  const startDate = new Date(data?.data.startDate);
  const endDate = new Date(data?.data.endDate);

  return (
    <ContentContainer>
      <DateContainer>
        {`${startDate.getFullYear()}년 ${
          startDate.getMonth() + 1
        }월 ${startDate.getDate()}일 ~ ${endDate.getFullYear()}년 ${
          endDate.getMonth() + 1
        }월 ${endDate.getDate()}일`}
      </DateContainer>
      <TextContainter value={data?.data.content} disabled />
    </ContentContainer>
  );
}
