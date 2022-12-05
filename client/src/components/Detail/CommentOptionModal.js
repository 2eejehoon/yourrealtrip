/* eslint-disable */
import styled from "styled-components";
import { BiPencil } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const EditIcon = styled(BiPencil)``;
const DeleteIcon = styled(HiOutlineTrash)``;

const BackgroundDiv = styled.div`
  inset: 0;
  position: fixed;
  z-index: 1000;
`;

const ModalContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  width: 55px;
  border: 1px solid darkgray;
  border-radius: 5px;
  position: absolute;
  box-shadow: 0.5px 0.5px lightgray;
  right: 0px;
  top: 35px;
  background-color: white;
  z-index: 2000;

  & button {
    width: 100%;
    background: none;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
    padding: 5px;

    &:hover {
      background-color: lightgray;
      transition: 0.5s;
    }
  }
`;

export default function CommentOptionModal({
  setIsModalOpen,
  comment,
  reviewId,
  setIsCommentEdit,
}) {
  const queryClient = useQueryClient();
  const deleteComment = useMutation(
    () => {
      return axios.delete(
        `${process.env.REACT_APP_BASE_API}/reviews/${reviewId}/comments/${comment.id}`
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleCommentDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteComment.mutate();
    }
  };

  return (
    <>
      <ModalContainer>
        <button
          onClick={() => {
            setIsCommentEdit(true);
            setIsModalOpen(false);
          }}
        >
          <EditIcon size={15} />
          수정
        </button>
        <button onClick={handleCommentDelete}>
          <DeleteIcon size={15} />
          삭제
        </button>
      </ModalContainer>
      <BackgroundDiv onClick={() => setIsModalOpen(false)} />
    </>
  );
}
