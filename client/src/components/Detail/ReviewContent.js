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
  return (
    <ContentContainer>
      <DateContainer>{data?.data.createdAt}</DateContainer>
      <TextContainter>{data?.data.content}</TextContainter>
    </ContentContainer>
  );
}
