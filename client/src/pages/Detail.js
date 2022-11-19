import DetailCarousel from "../components/DetailCarousel";
import DetailTitle from "../components/DetailTitle";
import SubHeader from "../components/SubHeader";
import UserInfo from "../components/UserInfo";

export default function Detail() {
  return (
    <>
      <SubHeader />
      <UserInfo />
      <DetailTitle />

      <DetailCarousel />
    </>
  );
}
