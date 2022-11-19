import styled from "styled-components";

const CommentFormContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  height: 25px;
  padding-right: 10px;
  padding-left: 10px;
`;

const CommentCancleButton = styled.button`
  color: white;
  font-size: 0.75em;
  border: none;
  width: 40px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: gray;
  margin: 2px;
`;

const CommentSubmitButton = styled.button`
  color: white;
  font-size: 0.75em;
  border: none;
  width: 40px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: gray;
  margin: 2px;
`;

const CommentInputContainer = styled.div`
  width: calc(100% - 50px);
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 25px;
  border: none;
  border-bottom: 1px solid lightgray;
  font-size: 0.75em;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid lightgray;
  object-fit: cover;
  border-radius: 10px;
`;

export default function CommentForm() {
  return (
    <>
      <CommentFormContainer>
        <UserProfileImage src="https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png"></UserProfileImage>
        <CommentInputContainer>
          <CommentInput placeholder="댓글을 입력해주세요."></CommentInput>
        </CommentInputContainer>
      </CommentFormContainer>
      <ButtonContainer>
        <CommentCancleButton>취소</CommentCancleButton>
        <CommentSubmitButton>댓글</CommentSubmitButton>
      </ButtonContainer>
    </>
  );
}
