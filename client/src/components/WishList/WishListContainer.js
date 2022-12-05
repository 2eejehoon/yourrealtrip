/* eslint-disable */
import styled from "styled-components";
import Wish from "./Wish";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";
import { Link } from "react-router-dom";

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const WishContainer = styled.ul`
  padding: 10px;
  width: 100%;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

export default function WishListContainer() {
  const user = useRecoilValue(userState);
  const { data } = useQuery(
    ["reviews"],
    () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/reviews`);
    },
    {
      select: (data) =>
        data?.data.filter((el) => {
          let wishlist = el.Wishlist;
          let result = false;
          for (let el of wishlist) {
            if (el.userId === user.id && el.isWishlist) result = true;
            return result;
          }
        }),
    }
  );

  console.log(data);
  return (
    <>
      <DescText>작성자님의 위시리스트</DescText>
      <WishContainer>
        {data.map((wish) => {
          return <Wish key={wish.id} wish={wish} />;
        })}
      </WishContainer>
    </>
  );
}
