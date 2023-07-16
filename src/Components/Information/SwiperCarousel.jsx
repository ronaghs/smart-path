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

export default function SwiperCarousel() {
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
        <SwiperSlide className="swiper-slider">Slide 1</SwiperSlide>
        <SwiperSlide className="swiper-slider">Slide 2</SwiperSlide>
        <SwiperSlide className="swiper-slider">Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
}
