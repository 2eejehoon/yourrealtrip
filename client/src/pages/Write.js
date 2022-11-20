import WriteHeader from "../components/Write/WriteHeader";
import WriteFooter from "../components/Write/WriteFooter";
import styled from "styled-components";

// import TitleForm from "../components/Write/TitleForm";
// import DateForm from "../components/Write/DateForm";
// import ImageUpload from "../components/Write/ImageUpload";
// import TextForm from "../components/Write/TextForm";
// import AddressForm from "../components/Write/AddressForm";
import Rating from "../components/Write/Rating";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 744px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Write() {
  return (
    <>
      <WriteHeader></WriteHeader>
      <Wrapper>
        {/* <TitleForm/> */}
        {/* <DateForm/> */}
        {/* <ImageUpload/> */}
        {/* <TextForm/> */}
        {/* <AddressForm /> */}
        <Rating />
      </Wrapper>
      <WriteFooter></WriteFooter>
    </>
  );
}
