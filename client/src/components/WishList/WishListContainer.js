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
  overflow-y: scroll;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export default function WishListContainer({ setSelected }) {
  const user = useRecoilValue(userState);
  const { data } = useQuery(
    ["wishlist"],
    () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/reviews`);
    },
    {
      select: (data) =>
        data?.data.filter((review) => {
          let wishlist = review.Wishlist;
          for (let wish of wishlist) {
            if (wish.userId === user.id && wish.isWishlist) return true;
          }
        }),
    }
  );

  return (
    <>
      <WishContainer>
        {data.map((wish) => {
          return <Wish key={wish.id} wish={wish} setSelected={setSelected} />;
        })}
      </WishContainer>
    </>
  );
}
