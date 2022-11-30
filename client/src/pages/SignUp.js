import styled from "styled-components";
import SignUpForm from "../components/SignUp/SignUpForm";
import SubHeader from "../components/Write/SubHeader";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
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
