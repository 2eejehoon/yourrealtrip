/* eslint-disable */
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { categoryState } from "../../atoms/filter";
import { searchState } from "../../atoms/search";
import { useRecoilValue } from "recoil";
import Review from "./Review";
import { userState } from "../../atoms/user";

const ReviewListContainer = styled.div`
  min-height: calc(100vh - 100px);
  padding: 5px;
  background-color: white;
`;

export default function ReviewList() {
  const category = useRecoilValue(categoryState);
  const search = useRecoilValue(searchState);

  const { data } = useQuery(
    ["reviews"],
    () => {
      return axios.get(`${process.env.REACT_APP_BASE_API}/reviews`);
    },
    {
      select: (reviews) =>
        category === "전체" && search === ""
          ? reviews.data
          : category === "전체" && search !== ""
          ? reviews.data.filter(
              (el) =>
                el.title.includes(search) ||
                el.city.includes(search) ||
                el.district.includes(search) ||
                el.street.includes(search)
            )
          : category !== "전체" && search === ""
          ? reviews.data.filter((el) => el.city.includes(category))
          : category !== "전체" && search !== ""
          ? reviews.data.filter(
              (el) =>
                el.city.includes(category) &&
                (el.title.includes(search) ||
                  el.city.includes(search) ||
                  el.district.includes(search) ||
                  el.street.includes(search))
            )
          : null,
    }
  );

  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const lastPage = Math.ceil(data?.length / 15);

    if (page !== lastPage && inView) setPage(page + 1);
  }, [inView]);

  return (
    <>
      <ReviewListContainer>
        {data?.slice(0, page * 15).map((review) => {
          return <Review key={review.id} review={review} />;
        })}
        <div ref={ref} />
      </ReviewListContainer>
    </>
  );
}
