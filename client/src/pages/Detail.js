/* eslint-disable */
import styled from "styled-components";
import ReviewImage from "../components/Detail/ReviewImage";
import ReviewTitle from "../components/Detail/ReviewTitle";
import DetailHeader from "../components/Detail/DetailHeader";
import UserInfo from "../components/Detail/UserInfo";
import ReviewContent from "../components/Detail/ReviewContent";
import CommentForm from "../components/Detail/CommentForm";
import CommentList from "../components/Detail/CommentList";
import DetailMap from "../components/Detail/DetailMap";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
  max-width: 390px;
  min-height: calc(100vh - 50px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default function Detail() {
  const { id } = useParams();
  const { data } = useQuery(["review", id], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/reviews/${id}`);
  });

  return (
    <>
      <DetailHeader review={data?.data} reviewId={id} />
      <Wrapper>
        <UserInfo review={data?.data} reviewId={id} />
        <ReviewTitle />
        <ReviewImage />
        <ReviewContent />
        <CommentForm />
        <CommentList />
        <DetailMap />
      </Wrapper>
    </>
  );
}
