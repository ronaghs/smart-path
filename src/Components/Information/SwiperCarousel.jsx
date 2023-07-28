import PropTypes from "prop-types";
import { useState, useEffect } from "react"; // Import useState and useEffect
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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Event listener to update isMobile on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              {isMobile && (
                <img className="slideImage" src={slide.img} alt="" />
              )}
            </div>
            {!isMobile && <img className="slideImage" src={slide.img} alt="" />}
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
