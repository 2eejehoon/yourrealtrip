import ReviewImage from "../components/Detail/ReviewImage";
import ReviewTitle from "../components/Detail/ReviewTitle";
import SubHeader from "../components/Detail/SubHeader";
import UserInfo from "../components/Detail/UserInfo";
import ReviewContent from "../components/Detail/ReviewContent";
import CommentForm from "../components/Detail/CommentForm";
import CommentList from "../components/Detail/CommentList";
import DetailMap from "../components/Detail/DetailMap";

export default function Detail() {
  return (
    <>
      <SubHeader />
      <UserInfo />
      <ReviewTitle />
      <ReviewImage />
      <ReviewContent />
      <CommentForm></CommentForm>
      <CommentList></CommentList>
      <DetailMap></DetailMap>
    </>
  );
}
