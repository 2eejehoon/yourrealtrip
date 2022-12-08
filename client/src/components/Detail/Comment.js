/* eslint-disable */
import styled from "styled-components";
import { SlOptions } from "react-icons/sl";
import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import elapsed from "../../utils/elapsedTime";
import CommentOptionModal from "./CommentOptionModal";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";

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
const defaultImage =
  "https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png";

export default function Comment({ comment, reviewId }) {
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const commentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [commentEditInputValue, setCommentEditInputValue] = useState(
    comment.content
  );

  const editComment = useMutation(
    (editedComment) => {
      return axios.put(
        `${process.env.REACT_APP_BASE_API}/reviews/${reviewId}/comments/${comment.id}`,
        editedComment
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleCommentEditSave = () => {
    const editedComment = {
      data: {
        ...comment,
        content: commentEditInputValue,
      },
    };

    editComment.mutate(editedComment);
  };

  const authorData = useQuery(["author", comment.id], () => {
    return axios.get(
      `${process.env.REACT_APP_BASE_API}/users/${comment.authorId}`
    );
  });

  useEffect(() => {
    if (isCommentEdit === true) {
      commentRef.current.focus();
    }
  }, [isCommentEdit]);

  return (
    <CommnetLi>
      <UserProfileImage
        src={authorData.data.data.profileImg || defaultImage}
        referrerpolicy="no-referrer"
      />
      <CommentContainer>
        <UserInfoContainer>
          <UserNameSpan>{authorData.data.data.name}</UserNameSpan>
          <CreatedAtSpan>{elapsed(comment.createdAt)}</CreatedAtSpan>
        </UserInfoContainer>
        {isCommentEdit ? (
          <CommentEditInput
            ref={commentRef}
            value={commentEditInputValue}
            onChange={(e) => setCommentEditInputValue(e.target.value)}
          />
        ) : (
          <CommentText>{comment.content}</CommentText>
        )}
      </CommentContainer>
      {isCommentEdit && user && user.id === comment.authorId ? (
        <CommentEditSaveButton
          onClick={() => {
            handleCommentEditSave();
            setIsCommentEdit(false);
          }}
        >
          저장
        </CommentEditSaveButton>
      ) : !isCommentEdit && user && user.id === comment.authorId ? (
        <OptionButton
          size={15}
          color="gray"
          onClick={() => setIsModalOpen(true)}
        />
      ) : null}
      {isModalOpen ? (
        <CommentOptionModal
          comment={comment}
          reviewId={reviewId}
          setIsModalOpen={setIsModalOpen}
          setIsCommentEdit={setIsCommentEdit}
        />
      ) : null}
    </CommnetLi>
  );
}
