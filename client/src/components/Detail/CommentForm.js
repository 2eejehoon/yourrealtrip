/* eslint-disable */
import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";
import axios from "axios";

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
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
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
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
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
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const defaultImage =
  "https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png";

export default function CommentForm() {
  const user = useRecoilValue(userState);
  const [isFocused, setIsFocused] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");

  const { id } = useParams();
  const queryClient = useQueryClient();

  const addComment = useMutation(
    (comment) => {
      return axios.post(
        `${process.env.REACT_APP_BASE_API}/reviews/${id}/comments`,
        comment
      );
    },
    {
      onSuccess: () => {
        setCommentInputValue("");
        return queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleCommentSubmit = () => {
    if (!user) {
      return alert("로그인이 필요한 서비스입니다.");
    }

    if (commentInputValue === "") {
      return alert("댓글 내용을 입력해주세요.");
    }

    const comment = {
      data: {
        content: commentInputValue,
        createdAt: new Date(),
        reviewId: Number(id),
        authorId: Number(user.id),
      },
    };

    addComment.mutate(comment);
    setIsFocused(false);
  };

  return (
    <>
      <CommentFormContainer>
        <UserProfileImage src={user ? user.profileImg : defaultImage} />
        <CommentInputContainer>
          <CommentInput
            placeholder="댓글을 입력해주세요."
            value={commentInputValue}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setCommentInputValue(e.target.value)}
          />
        </CommentInputContainer>
      </CommentFormContainer>
      {isFocused ? (
        <ButtonContainer>
          <CommentCancleButton onClick={() => setIsFocused(false)}>
            취소
          </CommentCancleButton>
          <CommentSubmitButton onClick={handleCommentSubmit}>
            댓글
          </CommentSubmitButton>
        </ButtonContainer>
      ) : null}
    </>
  );
}
