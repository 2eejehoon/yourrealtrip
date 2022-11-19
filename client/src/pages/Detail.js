import ReviewImage from "../components/ReviewImage";
import ReviewTitle from "../components/ReviewTitle";
import SubHeader from "../components/SubHeader";
import UserInfo from "../components/UserInfo";
import ReviewContent from "../components/ReviewContent";
import CommentForm from "../components/CommentForm";

export default function Detail() {
  return (
    <>
      <SubHeader />
      <UserInfo />
      <ReviewTitle />
      <ReviewImage />
      <ReviewContent />
      <CommentForm></CommentForm>
    </>
  );
}
