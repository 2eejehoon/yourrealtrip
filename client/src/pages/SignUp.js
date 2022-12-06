import styled from "styled-components";
import SignUpForm from "../components/SignUp/SignUpForm";
import SubHeader from "../components/SubHeader";

const Wrapper = styled.div`
  max-width: 390px;
  min-height: calc(100vh - 50px);
  margin: auto;
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
