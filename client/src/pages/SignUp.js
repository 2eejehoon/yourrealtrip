import styled from "styled-components";
import SignUpForm from "../components/SignUp/SignUpForm";
import SubHeader from "../components/SubHeader";

const Wrapper = styled.div`
  max-width: 410px;
  min-height: calc(100vh - 50px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;

export default function SignUp() {
  return (
    <>
      <SubHeader />
      <Wrapper>
        <SignUpForm />
      </Wrapper>
    </>
  );
}
