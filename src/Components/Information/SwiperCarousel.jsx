import PropTypes from "prop-types";
import {
  Navigation,
  Pagination,
  A11y,
  Keyboard,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function SwiperCarousel(props) {
  const { slides } = props;

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, A11y, Keyboard, EffectCoverflow]}
        spaceBetween={100}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        effect="coverflow"
      >
        {slides.map((slide, index) => (
          <SwiperSlide className="swiperSlider" key={index}>
            <div className="slideContent">
              <p>{slide.description}</p>
            </div>
            <img className="slideImage" src={slide.img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

SwiperCarousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ),
};

export default SwiperCarousel;
