import styled from "styled-components";
import { SlOptions } from "react-icons/sl";

const OptionButton = styled(SlOptions)`
  position: absolute;
  right: 10px;
`;

const UserInfoContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
`;

const UserProfileContainer = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 5px;
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid lightgray;
  object-fit: cover;
  border-radius: 10px;
`;

const UserNameSpan = styled.span`
  font-size: 0.75em;
  margin: 5px;
`;

const CreatedAtSpan = styled.span`
  font-size: 0.75em;
  color: lightgray;
`;

export default function UserInfo() {
  return (
    <UserInfoContainer>
      <UserProfileContainer>
        <UserProfileImage src="https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png"></UserProfileImage>
        <UserNameSpan>작성자</UserNameSpan>
        <CreatedAtSpan>1시간 전</CreatedAtSpan>
      </UserProfileContainer>
      <OptionButton size={15} color="gray"></OptionButton>
    </UserInfoContainer>
  );
}
