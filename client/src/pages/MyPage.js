import UserInfo from "../components/MyPage/UserInfo";
import UserProfile from "../components/MyPage/UserProfileImage";
import SubHeader from "../components/SubHeader";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 390px;
  margin: auto;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default function MyPage() {
  return (
    <>
      <SubHeader />
      <Wrapper>
        <UserProfile />
        <UserInfo />
      </Wrapper>
    </>
  );
}
