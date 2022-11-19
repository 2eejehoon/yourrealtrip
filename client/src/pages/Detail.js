import ReviewImage from "../components/ReviewImage";
import ReviewTitle from "../components/ReviewTitle";
import SubHeader from "../components/SubHeader";
import UserInfo from "../components/UserInfo";
import ReviewContent from "../components/ReviewContent";

export default function Detail() {
  return (
    <>
      <SubHeader />
      <UserInfo />
      <ReviewTitle />
      <ReviewImage />
      <ReviewContent />
    </>
  );
}
