import styled from "styled-components";
import GoogleLoginForm from "../components/Login/GoogleLoginForm";
import LoginForm from "../components/Login/LoginForm";
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

export default function Login() {
  return (
    <>
      <SubHeader />
      <Wrapper>
        <LoginForm />
        <GoogleLoginForm />
      </Wrapper>
    </>
  );
}
