import styled from "styled-components";

const LoginContainer = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginInputContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  border: 1px solid lightgray;
`;

export default function LoginForm() {
  return (
    <LoginContainer>
      <LoginInputContainer></LoginInputContainer>
    </LoginContainer>
  );
}
