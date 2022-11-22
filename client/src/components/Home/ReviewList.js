import styled from "styled-components";
import Review from "./Review";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { categoryState } from "../../atoms/filter";
import { searchState } from "../../atoms/search";
import { useRecoilValue } from "recoil";

const ReviewListContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  padding: 10px;
`;

export default function ReviewList() {
  const category = useRecoilValue(categoryState);
  const search = useRecoilValue(searchState);

  const { data } = useQuery(
    ["reviews"],
    () => {
      return axios.get("http://localhost:4000/reviews");
    },
    {
      select: (reviews) =>
        category === "전체" && search === ""
          ? reviews.data
          : category === "전체" && search !== ""
          ? reviews.data.filter(
              (el) =>
                el.place.includes(search) ||
                el.title.includes(search) ||
                el.address.includes(search)
            )
          : category !== "전체" && search === ""
          ? reviews.data.filter((el) => el.city === category)
          : category !== "전체" && search !== ""
          ? reviews.data.filter(
              (el) =>
                el.place.includes(search) ||
                el.title.includes(search) ||
                el.address.includes(search)
            )
          : null,
    }
  );

  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const lastPage = Math.ceil(data?.length / 10);

    if (page !== lastPage && inView) setPage(page + 1);
  }, [inView]);

  return (
    <>
      <ReviewListContainer>
        {data?.slice(0, page * 10).map((review) => {
          return <Review key={review.id} review={review} />;
        })}
        <div ref={ref} />
      </ReviewListContainer>
    </>
  );
}
