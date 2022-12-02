/* eslint-disable */
import { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailImageContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
`;

const DetailImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
`;

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: 10px !important;
    z-index: 1000;
    visibility: ${(props) => (props.hover === "hover" ? "visible" : "hidden")};
  }

  .slick-next {
    right: 10px !important;
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

export default function DetailCarousel() {
  const { id } = useParams();
  const [hover, setHover] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { data } = useQuery(["review", id], () => {
    return axios.get(`${process.env.REACT_APP_BASE_API}/reviews/${id}`);
  });

  return (
    <>
      <DetailImageContainer
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <StyledSlider {...settings} hover={hover ? "hover" : null}>
          {/* {data?.data.images.map((image) => {
            return <DetailImage key={image} src={image} />;
          })} */}
          <DetailImage></DetailImage>
        </StyledSlider>
      </DetailImageContainer>
    </>
  );
}
