/* eslint-disable */
import styled from "styled-components";
import DetailStarScore from "./DetailStarScore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;

  & h3 {
    font-size: 1em;
    font-weight: normal;
  }
  & p {
    font-size: 0.75em;
    color: grey;
  }
`;

export default function ReviewTitle() {
  const { id } = useParams();
  const { data } = useQuery(["review", id], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/reviews/${id}`);
  });

  return (
    <TitleContainer>
      <h3>{data?.data.title}</h3>
      <p>{`${data?.data.city} ${data?.data.district} ${data?.data.street}`}</p>
      <DetailStarScore score={data?.data.score} />
    </TitleContainer>
  );
}
