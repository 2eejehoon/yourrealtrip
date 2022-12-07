import CategoryTag from "../components/Home/CategoryTag";
import MainHeader from "../components/Home/MainHeader";
// import ReviewList from "../components/Home/ReviewList";
import MainMap from "../components/Home/MainMap";

export default function Home() {
  return (
    <>
      <MainHeader />
      <CategoryTag />
      {/* <ReviewList /> */}
      <MainMap />
    </>
  );
}
