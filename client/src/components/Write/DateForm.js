import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { ko } from "date-fns/esm/locale";

const DescText = styled.p`
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpan = styled.span`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
`;

const DatePickerContainer = styled.div`
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker-wrapper {
    width: 250px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    border-radius: 10px;
    &:focus-within {
      border: 1px solid black;
    }
  }
  .react-datepicker__input-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & input {
      border: none;
      text-align: center;
      font-size: 1em;
      &:focus {
        outline: none;
      }
    }
  }
  .react-datepicker__triangle {
  }
  .react-datepicker__header {
    background-color: white;
    border: none;
  }
  .react-datepicker__current-month {
    font-size: 1em;
    font-weight: normal;
  }
  .react-datepicker__navigation--next {
    right: 2px;
  }
  .react-datepicker__day--in-selecting-range {
    background-color: gray;
  }
  .react-datepicker__day--in-range {
    background-color: gray;
    opacity: 0.5;
  }
  .react-datepicker__day--selecting-range-start,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: gray;
  }
  .react-datepicker__day--outside-month {
    background-color: transparent;
    color: black;
  }
  .react-datepicker__day--disabled {
    background-color: white;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: gray;
    color: white;
  }
`;

export default function DateForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <DatePickerContainer>
      <DescText>전체 여행 일정을 알려주세요.</DescText>
      <StyledSpan>시작일</StyledSpan>
      <DatePicker
        dateFormat="yyyy년 MM월 dd일"
        locale={ko}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        selectsStart
        onChange={(date) => setStartDate(date)}
        placeholderText="시작일을 입력해주세요."
        closeOnScroll={true}
      ></DatePicker>
      <StyledSpan>종료일</StyledSpan>
      <DatePicker
        dateFormat="yyyy년 MM월 dd일"
        locale={ko}
        selected={endDate}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        minDate={startDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="종료일을 입력해주세요."
        closeOnScroll={true}
      ></DatePicker>
    </DatePickerContainer>
  );
}
