import Vanta from "../../assets/Vanta";
import SwiperCarousel from "./SwiperCarousel";
import Qmark from "../../assets/qmark.png";
import Map from "../../assets/map.png";
import Done from "../../assets/done.png";

function Information() {
  const carouselInfo = [
    {
      description: "Here is some stuff regarding the website and its purpose",
      img: Qmark,
    },
    {
      description: "Some basic steps on how to get started and what to do",
      img: Map,
    },
    {
      description: "This is what the end result would be! Great, get started!",
      img: Done,
    },
  ];
  return (
    <div>
      <Vanta />
      <SwiperCarousel slides={carouselInfo} className="carousel-container" />
    </div>
  );
}

export default Information;
