import styled from "styled-components";
import { useRecoilState } from "recoil";
import { categoryState } from "../atoms/filter";

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
  background-color: white;
  z-index: 1000;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: solid 1px lightgray;
  padding: 10px;
`;

export default function CategoryTag() {
  const [category, setCategory] = useRecoilState(categoryState);

  const handleClick = (e) => {
    setCategory(e.target.value);
  };

  return (
    <CategoryButtonContainer>
      <CategoryButton
        value="전체"
        clicked={category === "전체" ? "clicked" : null}
        onClick={handleClick}
      >
        전체
      </CategoryButton>
      <CategoryButton
        value="서울"
        clicked={category === "서울" ? "clicked" : null}
        onClick={handleClick}
      >
        서울
      </CategoryButton>
      <CategoryButton
        value="제주"
        clicked={category === "제주" ? "clicked" : null}
        onClick={handleClick}
      >
        제주
      </CategoryButton>
      <CategoryButton
        value="부산"
        clicked={category === "부산" ? "clicked" : null}
        onClick={handleClick}
      >
        부산
      </CategoryButton>
      <CategoryButton
        value="인천"
        clicked={category === "인천" ? "clicked" : null}
        onClick={handleClick}
      >
        인천
      </CategoryButton>
      <CategoryButton
        value="대구"
        clicked={category === "대구" ? "clicked" : null}
        onClick={handleClick}
      >
        대구
      </CategoryButton>
      <CategoryButton
        value="광주"
        clicked={category === "광주" ? "clicked" : null}
        onClick={handleClick}
      >
        광주
      </CategoryButton>
    </CategoryButtonContainer>
  );
}
