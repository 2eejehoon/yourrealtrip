/* eslint-disable */
import styled from "styled-components";
import { SlOptions } from "react-icons/sl";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import elapsed from "../../utils/elapsedTime";
import ReviewOptionModal from "./ReviewOptionModal";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";

const OptionButton = styled(SlOptions)`
  position: absolute;
  right: 10px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const UserInfoContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 10px;
  justify-content: start;
  align-items: center;
  position: relative;
`;

const UserProfileContainer = styled.div`
  width: calc(100% - 50px);
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
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

const UserNameSpan = styled.span`
  font-size: 0.75em;
  margin: 5px;
  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const CreatedAtSpan = styled.span`
  font-size: 0.75em;
  color: lightgray;
`;

const defaultImage =
  "https://cdn.pixabay.com/photo/2015/06/23/09/19/gears-818464__340.png";

export default function UserInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useRecoilValue(userState);

  const { id } = useParams();
  const reviewData = useQuery(["review", id], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/reviews/${id}`);
  });

  const authorData = useQuery(["author", id], () => {
    return axios.get(
      `${process.env.REACT_APP_BASE_API}/users/${reviewData.data.data.authorId}`
    );
  });

  return (
    <UserInfoContainer>
      <UserProfileContainer>
        <UserProfileImage
          src={authorData.data.data.profileImg || defaultImage}
        />
        <UserNameSpan>{authorData.data.data.name}</UserNameSpan>
        <CreatedAtSpan>{elapsed(reviewData.data.data.createdAt)}</CreatedAtSpan>
      </UserProfileContainer>
      {user && user.id === reviewData.data.data.authorId ? (
        <OptionButton
          size={15}
          color="gray"
          onClick={() => setIsModalOpen(true)}
        />
      ) : null}

      {isModalOpen ? (
        <ReviewOptionModal setIsModalOpen={setIsModalOpen} />
      ) : null}
    </UserInfoContainer>
  );
}
