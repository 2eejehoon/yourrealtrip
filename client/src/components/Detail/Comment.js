/* eslint-disable */
import styled from "styled-components";
import { SlOptions } from "react-icons/sl";
import CommentOptionModal from "./CommentOptionModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import elapsed from "../../utils/elapsedTime";
import { useRef } from "react";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const OptionButton = styled(SlOptions)`
  position: absolute;
  right: 0px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
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
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const UserInfoContainer = styled.div`
  width: 100%;
  justify-content: start;
  align-items: center;
`;

const UserNameSpan = styled.span`
  font-size: 0.75em;
  margin-right: 5px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
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

const CommentEditInput = styled.input`
  height: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  font-size: 0.75em;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const CommentEditSaveButton = styled.button`
  right: 0;
  bottom: 5px;
  position: absolute;
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

export default function Comment({ comment }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [commentEditInputValue, setCommentEditInputValue] = useState(
    comment.content
  );

  const { data } = useQuery(["comment", comment.id], () => {
    return axios.get(`http://localhost:4000/comments/${comment.id}`);
  });

  const editComment = useMutation((editedComment) => {
    return axios.patch(
      `http://localhost:4000/comments/${comment.id}`,
      editedComment
    );
  });

  const handleCommentEditSave = () => {
    const editedComment = {
      ...comment,
      content: commentEditInputValue,
    };

    editComment.mutate(editedComment, {
      onSuccess: () => {
        return queryClient.invalidateQueries(["comment", comment.id]);
      },
    });
  };

  const commentRef = useRef(null);

  useEffect(() => {
    if (isCommentEdit === true) {
      commentRef.current.focus();
    }
  }, [isCommentEdit]);
  return (
    <CommnetLi>
      <UserProfileImage src="https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png" />
      <CommentContainer>
        <UserInfoContainer>
          <UserNameSpan>작성자</UserNameSpan>
          <CreatedAtSpan>{elapsed(data?.data.createdAt)}</CreatedAtSpan>
        </UserInfoContainer>
        {isCommentEdit ? (
          <CommentEditInput
            ref={commentRef}
            value={commentEditInputValue}
            onChange={(e) => setCommentEditInputValue(e.target.value)}
          />
        ) : (
          <CommentText>{data?.data.content}</CommentText>
        )}
      </CommentContainer>
      {isCommentEdit ? (
        <CommentEditSaveButton
          onClick={() => {
            handleCommentEditSave();
            setIsCommentEdit(false);
          }}
        >
          저장
        </CommentEditSaveButton>
      ) : (
        <OptionButton
          size={15}
          color="gray"
          onClick={() => setIsModalOpen(true)}
        />
      )}

      {isModalOpen ? (
        <CommentOptionModal
          setIsModalOpen={setIsModalOpen}
          comment={comment}
          setIsCommentEdit={setIsCommentEdit}
        />
      ) : null}
    </CommnetLi>
  );
}
