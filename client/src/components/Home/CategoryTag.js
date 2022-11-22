import styled from "styled-components";
import { useRecoilState } from "recoil";
import { categoryState } from "../../atoms/filter";

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

  return (
    <CategoryButtonContainer>
      <CategoryButton
        clicked={category === "전체" ? "clicked" : null}
        onClick={() => setCategory("전체")}
      >
        전체
      </CategoryButton>
      <CategoryButton
        clicked={category === "서울" ? "clicked" : null}
        onClick={() => setCategory("서울")}
      >
        서울
      </CategoryButton>
      <CategoryButton
        clicked={category === "제주" ? "clicked" : null}
        onClick={() => setCategory("제주")}
      >
        제주
      </CategoryButton>
      <CategoryButton
        clicked={category === "부산" ? "clicked" : null}
        onClick={() => setCategory("부산")}
      >
        부산
      </CategoryButton>
      <CategoryButton
        clicked={category === "인천" ? "clicked" : null}
        onClick={() => setCategory("인천")}
      >
        인천
      </CategoryButton>
      <CategoryButton
        clicked={category === "대구" ? "clicked" : null}
        onClick={() => setCategory("대구")}
      >
        대구
      </CategoryButton>
      <CategoryButton
        clicked={category === "광주" ? "clicked" : null}
        onClick={() => setCategory("광주")}
      >
        광주
      </CategoryButton>
    </CategoryButtonContainer>
  );
}
