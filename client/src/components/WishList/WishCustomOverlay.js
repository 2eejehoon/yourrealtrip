/* eslint-disable */
import styled from "styled-components";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const CustomOverlayWrapper = styled.div`
  transform: translateX(-50%) translateY(-50%);
`;

const CustomOverlayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 33px;
  background-color: black;
  color: white;
  font-size: 1em;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px;
`;

const DeleteButton = styled(ImCancelCircle)``;

const CustomOverlayBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;
  background-color: white;
  color: black;
  font-size: 1em;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 10px;

  & div {
    width: 120px;
    height: 120px;

    & img {
      border-radius: 7px;
      width: 120px;
      height: 120px;
      object-fit: cover;
    }
  }
  & p {
    width: 100%;
    font-size: 0.75em;
    height: 10px;
    color: gray;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: 5px !important;
    z-index: 1000;
    visibility: ${(props) => (props.hover === "hover" ? "visible" : "hidden")};
  }

  .slick-next {
    right: 5px !important;
    z-index: 1000;
    visibility: ${(props) => (props.hover === "hover" ? "visible" : "hidden")};
  }

  .slick-dots {
    display: flex;
    width: 100px;
    margin: 0;
    padding: 0;
    left: 50%;
    bottom: 10px;
    transform: translate(-50%, -50%);
  }

  .slick-dots li {
    width: 6px;
    height: 6px;
    margin: 0 3.5px;
  }

  .slick-dots li button {
    width: 6px;
    height: 6px;
  }

  .slick-dots li button:before {
    width: 6px;
    height: 6px;
    color: white;
  }

  .slick-dots li.slick-active button:before {
    color: white !important;
  }

  li {
    margin: 0;
    padding: 0;
  }
`;

export default function WishCustomOverlay({ review, setSelected }) {
  const [hover, setHover] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <CustomOverlayWrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CustomOverlayHeader>
        <h3>{review.title}</h3>
        <DeleteButton
          fill="white"
          size={18}
          onClick={() => setSelected(null)}
        />
      </CustomOverlayHeader>
      <Link to={`/reviews/${review.id}`}>
        <CustomOverlayBody>
          <StyledSlider {...settings} hover={hover ? "hover" : null}>
            {review.photos.map((image) => {
              return (
                <div key={image}>
                  <img src={image} />
                </div>
              );
            })}
          </StyledSlider>
        </CustomOverlayBody>
      </Link>
    </CustomOverlayWrapper>
  );
}
