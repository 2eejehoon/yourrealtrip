import WriteHeader from "../components/Write/WriteHeader";
import WriteFooter from "../components/Write/WriteFooter";
import styled from "styled-components";
import TitleForm from "../components/Write/TitleForm";
import DatePicker from "../components/Write/DatePick";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 744px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export default function Write() {
  return (
    <>
      <WriteHeader></WriteHeader>
      <Wrapper>
        <TitleForm></TitleForm>
        <DatePicker></DatePicker>
      </Wrapper>
      <WriteFooter></WriteFooter>
    </>
  );
}
