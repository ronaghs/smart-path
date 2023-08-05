import Vanta from "../../../assets/Vanta";
import SwiperCarousel from "./SwiperCarousel";
import Map from "../../../assets/images/smartpathmap.png";
import Step1 from "../../../assets/images/step1.png";
import Step2 from "../../../assets/images/step2.png";
import Step3 from "../../../assets/images/step3.png";
import Step4 from "../../../assets/images/step4.png";
import CallToAction from "../../HomePage/CallToAction";

function Information() {
  const carouselInfo = [
    {
      description:
        "SmartPath's purpose is to help you discover and choose a place to meetup with your favorite people, while keeping the drive as fair as possible for everyone.",
      img: Map,
      alt: "SmartPath Map",
    },
    {
      description:
        "Simply enter everyones' address and select a location type to look for.",
      img: Step1,
      alt: "Input fields for addresses",
    },
    {
      description:
        "Set the radius for the search and calculate the SmartPath to take!",
      img: Step2,
      alt: "Radius slider",
    },
    {
      description:
        "Select a location to dynamically see where it is in relation to the meetup point",
      img: Step3,
      alt: "Dynamic Display of establishment locations",
    },
    {
      description:
        "Once you are happy with the meetup location, click the address for directions and get going!",
      img: Step4,
      alt: "Get directions",
    },
  ];
  return (
    <div>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "3rem",
          marginTop: "2rem",
        }}
      >
        How it works
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "0.5rem",
        }}
      >
        <CallToAction />
      </div>
      <Vanta />
      <SwiperCarousel slides={carouselInfo} className="carousel-container" />
    </div>
  );
}

export default Information;
