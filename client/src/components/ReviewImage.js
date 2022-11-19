import Slider from "react-slick";
import styled from "styled-components";

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
  }

  .slick-next {
    right: 10px !important;
    z-index: 1000;
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <DetailImageContainer>
        <StyledSlider {...settings}>
          <DetailImage src="http://infor515.cafe24.com/data/file/gallery02/3695747573_0oqRySMm_c0233900223a6c07c902469675421072cd90f0d9.jpg"></DetailImage>
          <DetailImage src="http://infor515.cafe24.com/data/file/gallery02/3695747573_0oqRySMm_c0233900223a6c07c902469675421072cd90f0d9.jpg"></DetailImage>
          <DetailImage src="http://infor515.cafe24.com/data/file/gallery02/3695747573_0oqRySMm_c0233900223a6c07c902469675421072cd90f0d9.jpg"></DetailImage>
        </StyledSlider>
      </DetailImageContainer>
    </>
  );
}
