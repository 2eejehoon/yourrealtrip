import styled from "styled-components";
import { useRecoilState } from "recoil";
import { categoryState } from "../../atoms/filter";
import { useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const StyledLeftClick = styled(BsArrowLeftCircle)`
  display: ${(props) => (props.page === "none" ? "none" : null)};
  visibility: ${(props) => (props.hover === "hover" ? "visible" : "hidden")};
  position: absolute;
  left: 5px;
  z-index: 50;
`;
const StyledRightClick = styled(BsArrowRightCircle)`
  display: ${(props) => (props.page === "none" ? "none" : null)};
  visibility: ${(props) => (props.hover === "hover" ? "visible" : "hidden")};
  position: absolute;
  right: 5px;
  z-index: 50;
`;

const CategoryButton = styled.button`
  width: 45px;
  height: 45px;
  border: 1px solid lightgray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  box-shadow: 0.5px 0.5px lightgray;
  background-color: ${(props) =>
    props.clicked === "clicked" ? "lightgray" : "white"};

  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const CategoryButtonContainer = styled.div`
  width: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const cities = [
  "전체",
  "서울",
  "부산",
  "인천",
  "대구",
  "대전",
  "광주",
  "수원",
  "울산",
  "고양",
  "용인",
  "창원",
  "성남",
  "청주",
  "부천",
  "화성",
  "남양주",
  "전주",
  "천안",
  "안산",
  "안양",
  "김해",
  "평택",
  "포항",
  "제주",
  "시흥",
  "파주",
  "의정부",
  "김포",
  "구미",
  "광주",
  "양산",
  "원주",
  "진주",
  "세종",
  "광명",
  "아산",
  "익산",
  "춘천",
  "경산",
  "군포",
  "군산",
  "하남",
  "여수",
  "순천",
  "경주",
  "거제",
  "목포",
  "오산",
  "이천",
  "강릉",
  "양주",
  "충주",
  "안성",
  "구리",
  "서산",
  "제주",
  "당진",
  "안동",
  "포천",
  "의왕",
  "광양",
  "김천",
  "제천",
  "통영",
  "논산",
  "칠곡",
  "사천",
  "여주",
  "공주",
  "양평",
  "정읍",
  "영주",
  "나주",
  "음성",
  "밀양",
  "홍성",
  "보령",
  "완주",
  "상주",
  "영천",
  "동두천",
  "동해",
  "김제",
  "무안",
  "남원",
  "진천",
  "예산",
  "속초",
  "문경",
  "함안군",
  "삼척",
  "홍천",
  "해남",
  "부여",
  "창녕",
  "태안",
  "고흥",
  "화순",
  "거창",
  "가평",
  "영암",
  "금산",
  "고창",
  "과천",
  "서천",
  "고성",
  "부안",
  "의성",
  "옥천",
  "영광",
  "영동",
  "울진",
  "완도",
  "예천",
  "철원",
  "태백",
  "연천",
  "담양",
  "합천",
  "하동",
  "횡성",
  "남해",
  "계룡",
  "장성",
  "청도",
  "성주",
  "평창",
  "보성",
  "괴산",
  "함양",
  "증평",
  "영월",
  "장흥",
  "영덕",
  "정선",
  "신안",
  "산청",
  "강진",
  "고령",
  "보은",
  "청양",
  "봉화",
  "함평",
  "인제",
  "진도",
  "곡성",
  "고성",
  "단양",
  "순창",
  "임실",
  "의령",
  "양양",
  "화천",
  "청송",
  "구례",
  "무주",
  "진안",
  "양구",
  "군위",
];

export default function CategoryTag() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [hover, setHover] = useState(false);
  const [page, setPage] = useState(1);
  const lastPage = Math.ceil(cities.length / 8);
  const offset = (page - 1) * 8;

  const handleClick = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Wrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CategoryButtonContainer>
        {cities.slice(offset, 8 * page).map((city, index) => {
          return (
            <CategoryButton
              key={index}
              value={city}
              clicked={category === city ? "clicked" : null}
              onClick={handleClick}
            >
              {city}
            </CategoryButton>
          );
        })}
      </CategoryButtonContainer>
      <StyledLeftClick
        size={"20px"}
        fill="gray"
        hover={hover ? "hover" : null}
        page={page === 1 ? "none" : null}
        onClick={() => {
          setPage(page - 1);
        }}
      />
      <StyledRightClick
        size={"20px"}
        fill="gray"
        hover={hover ? "hover" : null}
        page={page === lastPage ? "none" : null}
        onClick={() => {
          setPage(page + 1);
        }}
      />
    </Wrapper>
  );
}
