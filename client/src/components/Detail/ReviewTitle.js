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
    font-weight: lighter;
    color: grey;
  }
`;

export default function ReviewTitle() {
  const { id } = useParams();
  const { data } = useQuery(["review", id], () => {
    return axios.get(`http://localhost:4000/reviews/${id}`);
  });

  return (
    <TitleContainer>
      <h3>{data?.data.title}</h3>
      <p>
        {data?.data.place},{" "}
        {`${data?.data.city} ${data?.data.district} ${data?.data.street}`}
      </p>
      <DetailStarScore score={data?.data.score} />
    </TitleContainer>
  );
}
