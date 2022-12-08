/* eslint-disable */
import styled from "styled-components";
import Wish from "./Wish";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";

const WishContainer = styled.ul`
  padding: 25px;
  width: 300px;
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

  return (
    <>
      <WishContainer>
        {data.map((wish) => {
          return <Wish key={wish.id} wish={wish} />;
        })}
      </WishContainer>
    </>
  );
}
