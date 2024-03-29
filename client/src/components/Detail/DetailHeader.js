/* eslint-disable */
import styled from "styled-components";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FiShare } from "react-icons/fi";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";
import axios from "axios";
import ShareModal from "./ShareModal";

const WishlistButton = styled(BsFillSuitHeartFill)`
  position: absolute;
  top: 10px;
  right: 35px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const GoBack = styled(RiArrowGoBackFill)`
  position: absolute;
  top: 10px;
  left: 5px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const Share = styled(FiShare)`
  position: absolute;
  top: 10px;
  right: 5px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const HeaderContainer = styled.header`
  position: relative;
  margin: auto;
  max-width: 410px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;

export default function DetailHeader() {
  const { id } = useParams();
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useQuery(["review", id], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/reviews/${id}`);
  });

  const queryClient = useQueryClient();

  const wish = useMutation(
    (authorId) => {
      return axios.post(
        `${process.env.REACT_APP_BASE_API}/reviews/${id}/wishlist`,
        authorId
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["review", id]);
      },
    }
  );

  const unwish = useMutation(
    (authorId) => {
      return axios.delete(
        `${process.env.REACT_APP_BASE_API}/reviews/${id}/wishlist`,
        { data: authorId }
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["review", id]);
      },
    }
  );

  const handleWish = () => {
    if (!isWish(data?.data.Wishlist, user.id)) {
      wish.mutate({
        data: {
          authorId: user.id,
        },
      });
    } else {
      unwish.mutate({
        data: {
          authorId: user.id,
        },
      });
    }
  };

  const isWish = (wishlist, userId) => {
    let isWish = false;
    for (let wish of wishlist) {
      if (wish.userId === userId && wish.isWishlist) {
        isWish = true;
        break;
      }
    }
    return isWish;
  };

  return (
    <HeaderContainer>
      <Link to="/reviews">
        <GoBack size={25} color="gray" />
      </Link>
      <WishlistButton
        size={23}
        fill={
          !user
            ? "gray"
            : isWish(data?.data.Wishlist, user.id)
            ? "tomato"
            : "gray"
        }
        onClick={() => {
          user && handleWish();
          !user && alert("로그인이 필요한 서비스입니다.");
        }}
      />
      <Share size={25} color="gray" onClick={() => setIsModalOpen(true)} />
      {isModalOpen ? <ShareModal setIsModalOpen={setIsModalOpen} /> : null}
    </HeaderContainer>
  );
}
