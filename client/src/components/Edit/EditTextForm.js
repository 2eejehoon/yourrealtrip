import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { editContentState } from "../../atoms/edit";

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

const TextInputContainer = styled.div`
  position: relative;
  width: 350px;
  height: 300px;
  border: 1px solid lightgray;
  border-radius: 10px;

  &:focus-within {
    border: 1px solid black;
  }
`;

const TextInput = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 10px;
  outline: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const LengthSpan = styled.span`
  position: absolute;
  width: 100px;
  height: 20px;
  font-size: 0.75em;
  color: gray;
  bottom: 0;
  left: 5px;
`;

export default function EditTextForm() {
  const location = useLocation();

  const [text, setText] = useRecoilState(editContentState);
  const [length, setLength] = useState(text.length);

  const { data } = useQuery(
    ["review", location.state.reviewId],
    () => {
      return axios.get(
        `http://localhost:4000/reviews/${location.state.reviewId}`
      );
    },
    {
      onSuccess: () => {
        setText(data?.data.content);
      },
    }
  );

  return (
    <>
      <DescText>공유하고 싶은 내용을 적어주세요.</DescText>
      <TextInputContainer>
        <TextInput
          typeof="textarea"
          value={text}
          cols={38}
          rows={15}
          maxLength={400}
          onChange={(e) => {
            setText(e.target.value);
            setLength(e.target.value.length);
          }}
          placeholder="내용을 입력해주세요."
        ></TextInput>
        <LengthSpan>{`${length} / 400`}</LengthSpan>
      </TextInputContainer>
    </>
  );
}
