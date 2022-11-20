import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
`;

const AddressFormContainer = styled.div`
  width: 350px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 5px;

  &:focus-within {
    border: 1px solid black;
  }
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;

  & span {
    width: 60px;
  }
  & input {
    width: 100%;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

export default function AddressForm() {
  const [inputs, setInputs] = useState({
    city: "",
    district: "",
    street: "",
  });

  const { city, district, street } = inputs;

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Wrapper>
      <DescText>주소를 입력해주세요.</DescText>
      <AddressFormContainer>
        <InputContainer>
          <span>시/도</span>
          <input
            type="text"
            name={"city"}
            value={city}
            onChange={handleInputChange}
            placeholder="시/도를 입력해주세요."
          />
        </InputContainer>
        <InputContainer>
          <span>자치구</span>
          <input
            type="text"
            name={"district"}
            value={district}
            onChange={handleInputChange}
            placeholder="자치구를 입력해주세요."
          />
        </InputContainer>
        <InputContainer>
          <span>도로/동</span>
          <input
            type="text"
            name={"street"}
            value={street}
            onChange={handleInputChange}
            placeholder="도로명 또는 동을 입력해주세요."
          />
        </InputContainer>
      </AddressFormContainer>
      <DescText>정확한 위치를 지도에 표시해주세요.</DescText>
    </Wrapper>
  );
}
