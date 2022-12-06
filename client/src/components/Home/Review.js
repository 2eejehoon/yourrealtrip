/* eslint-disable */
import styled from "styled-components";
import Slider from "react-slick";
import { useState } from "react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import StarScore from "./StarScore";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";

const WishlistButton = styled(BsFillSuitHeartFill)`
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 500;
`;

const ReviewContainer = styled.div`
  width: 100%;
  padding: 5px;
`;

const InfoContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2px;

  & h3 {
    font-size: 0.75em;
    font-weight: normal;
  }
  & p {
    font-size: 0.75em;
    color: grey;
  }
`;

const ReviewImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 390px;
  border-radius: 10px;

  &:hover {
    opacity: 70%;
    transition: 0.5s;
  }
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 390px;
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

export default function Review({ review }) {
  const [hover, setHover] = useState(false);
  const user = useRecoilValue(userState);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const isWish = (wishlist, userId) => {
    let isWish = false;
    for (let wish of wishlist) {
      if (wish.userId === userId && wish.isWishlist) {
        isWish = true;
      }
    }
    return isWish;
  };

  return (
    <ReviewContainer>
      <Link to={`/reviews/${review.id}`}>
        <ReviewImageContainer
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <WishlistButton
            size={20}
            color="white"
            fill={
              !user
                ? "gray"
                : isWish(review.Wishlist, user.id)
                ? "tomato"
                : "gray"
            }
          />
          <StyledSlider {...settings} hover={hover ? "hover" : null}>
            {review.photos.map((image) => {
              return <ReviewImage key={image} src={image} />;
            })}
          </StyledSlider>
        </ReviewImageContainer>
      </Link>
      <InfoContainer>
        <StarScore score={review.score} />
        <h3>{review.title}</h3>
        <p>{`${review.city} ${review.district} ${review.street}`}</p>
      </InfoContainer>
    </ReviewContainer>
  );
}
