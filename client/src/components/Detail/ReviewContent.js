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

const TextContainter = styled.div`
  width: 100%;
  font-size: 0.75em;
  color: gray;
`;

export default function ReviewContent() {
  const { id } = useParams();
  const { data } = useQuery(["review", id], () => {
    return axios.get(`http://localhost:4000/reviews/${id}`);
  });

  const startDate = new Date(data?.data.startDate);
  const endDate = new Date(data?.data.endDate);

  return (
    <ContentContainer>
      <DateContainer>{`${startDate.getFullYear()}년 ${startDate.getMonth()}월 ${startDate.getDate()}일 ~ ${endDate.getFullYear()}년 ${endDate.getMonth()}월 ${endDate.getDate()}일`}</DateContainer>
      <TextContainter>{data?.data.content}</TextContainter>
    </ContentContainer>
  );
}
