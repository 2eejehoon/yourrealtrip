import styled from "styled-components";
import SubHeader from "../components/SubHeader";
import WriteFooter from "../components/Write/WriteFooter";
import TitleForm from "../components/Write/TitleForm";
import DateForm from "../components/Write/DateForm";
import ImageUpload from "../components/Write/ImageUpload";
import TextForm from "../components/Write/TextForm";
import AddressForm from "../components/Write/AddressForm";
import Rating from "../components/Write/Rating";
import { useState } from "react";

const Wrapper = styled.div`
  max-width: 410px;
  margin: auto;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;
export default function Write() {
  const [page, setPage] = useState(0);

  return (
    <>
      <SubHeader />
      <Wrapper>
        {page === 0 ? (
          <TitleForm />
        ) : page === 1 ? (
          <DateForm />
        ) : page === 2 ? (
          <ImageUpload />
        ) : page === 3 ? (
          <TextForm />
        ) : page === 4 ? (
          <AddressForm />
        ) : page === 5 ? (
          <Rating setPage={setPage} />
        ) : null}
      </Wrapper>
      <WriteFooter page={page} setPage={setPage} />
    </>
  );
}
