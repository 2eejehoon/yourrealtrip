import styled from "styled-components";
import { SlOptions } from "react-icons/sl";

const OptionButton = styled(SlOptions)`
  position: absolute;
  right: 10px;
`;

const CommnetLi = styled.li`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 50px;
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid lightgray;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 5px;
`;

const UserInfoContainer = styled.div`
  width: 100%;
  justify-content: start;
  align-items: center;
`;

const UserNameSpan = styled.span`
  font-size: 0.75em;
  margin-right: 5px;
`;

const CreatedAtSpan = styled.span`
  font-size: 0.75em;
  color: lightgray;
`;

const CommentText = styled.p`
  height: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  font-size: 0.75em;
  color: gray;
`;

export default function Comment() {
  return (
    <CommnetLi>
      <UserProfileImage src="https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png" />
      <CommentContainer>
        <UserInfoContainer>
          <UserNameSpan>작성자</UserNameSpan>
          <CreatedAtSpan>1시간 전</CreatedAtSpan>
        </UserInfoContainer>
        <CommentText>댓글 내용</CommentText>
      </CommentContainer>
      <OptionButton size={15} color="gray"></OptionButton>
    </CommnetLi>
  );
}
