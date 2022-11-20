import styled from "styled-components";
import Comment from "./Comment";

const CommentListContainer = styled.ul`
  width: 100%;
  padding: 10px;
`;

export default function CommentList() {
  return (
    <CommentListContainer>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
    </CommentListContainer>
  );
}
