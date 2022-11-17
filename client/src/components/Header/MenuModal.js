import styled from "styled-components";

const ModalContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  width: 100px;
  border: 1px solid darkgray;
  border-radius: 5px;
  position: absolute;
  right: 15px;
  top: 55px;

  & li {
    width: 100%;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;

    &:hover {
      background-color: lightgray;
      transition: 0.5s;
    }
  }
`;

export default function MenuModal() {
  return (
    <ModalContainer>
      <li>로그인</li>
      <li>회원가입</li>
    </ModalContainer>
  );
}
