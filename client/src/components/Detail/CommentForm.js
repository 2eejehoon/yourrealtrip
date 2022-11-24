import { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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

export default function CommentForm() {
  const [isFocused, setIsFocused] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");

  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data } = useQuery(["review", id], () => {
    return axios.get(`http://localhost:4000/reviews/${id}`);
  });

  const addComment = useMutation((comment) => {
    return axios.post(`http://localhost:4000/comments`, comment);
  });

  const handleCommentSubmit = () => {
    if (commentInputValue === "") {
      return alert("댓글 내용을 입력해주세요.");
    }

    const comment = {
      id: uuidv4(),
      content: commentInputValue,
      createdAt: new Date(),
      review: data?.data,
    };

    addComment.mutate(comment, {
      onSuccess: () => {
        setCommentInputValue("");
        return queryClient.invalidateQueries(["comments"]);
      },
    });
  };
  return (
    <>
      <CommentFormContainer>
        <UserProfileImage src="https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png"></UserProfileImage>
        <CommentInputContainer>
          <CommentInput
            placeholder="댓글을 입력해주세요."
            onFocus={() => setIsFocused(true)}
            value={commentInputValue}
            onChange={(e) => setCommentInputValue(e.target.value)}
          ></CommentInput>
        </CommentInputContainer>
      </CommentFormContainer>
      {isFocused ? (
        <ButtonContainer>
          <CommentCancleButton onClick={() => setIsFocused(false)}>
            취소
          </CommentCancleButton>
          <CommentSubmitButton
            onClick={() => {
              handleCommentSubmit();
              setIsFocused(false);
            }}
          >
            댓글
          </CommentSubmitButton>
        </ButtonContainer>
      ) : null}
    </>
  );
}
