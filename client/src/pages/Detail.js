import styled from "styled-components";
import ReviewImage from "../components/Detail/ReviewImage";
import ReviewTitle from "../components/Detail/ReviewTitle";
import SubHeader from "../components/Detail/SubHeader";
import UserInfo from "../components/Detail/UserInfo";
import ReviewContent from "../components/Detail/ReviewContent";
import CommentForm from "../components/Detail/CommentForm";
import CommentList from "../components/Detail/CommentList";
import DetailMap from "../components/Detail/DetailMap";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;
export default function Detail() {
  return (
    <>
      <SubHeader />
      <Wrapper>
        <UserInfo />
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
