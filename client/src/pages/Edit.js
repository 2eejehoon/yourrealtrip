import styled from "styled-components";
import SubHeader from "../components/SubHeader";
import WriteFooter from "../components/Write/WriteFooter";
import EditTitleForm from "../components/Edit/EditTitleForm";
import EditDateForm from "../components/Edit/EditDateForm";
import EditImageUpload from "../components/Edit/EditImageUpload";
import EditTextForm from "../components/Edit/EditTextForm";
import EditAddressForm from "../components/Edit/EditAddressForm";
import EditRating from "../components/Edit/EditRating";
import { useState } from "react";

const Wrapper = styled.div`
  max-width: 410px;
  min-height: calc(100vh - 100px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;

export default function Edit() {
  const [page, setPage] = useState(0);

  return (
    <>
      <SubHeader />
      <Wrapper>
        {page === 0 ? (
          <EditTitleForm />
        ) : page === 1 ? (
          <EditDateForm />
        ) : page === 2 ? (
          <EditImageUpload />
        ) : page === 3 ? (
          <EditTextForm />
        ) : page === 4 ? (
          <EditAddressForm />
        ) : page === 5 ? (
          <EditRating setPage={setPage} />
        ) : null}
      </Wrapper>
      <WriteFooter page={page} setPage={setPage} />
    </>
  );
}
