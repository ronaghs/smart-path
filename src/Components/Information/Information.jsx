import Vanta from "../../assets/Vanta";
import SwiperCarousel from "./SwiperCarousel";
import Map from "../../assets/smartpathmap.png";
import Step1 from "../../assets/step1.png";
import Step2 from "../../assets/step2.png";
import Step3 from "../../assets/step3.png";
import Step4 from "../../assets/step4.png";
import CallToAction from "../LandingPage/CallToAction";

function Information() {
  const carouselInfo = [
    {
      description:
        "SmartPath's purpose is to help you discover and choose a place to meetup with your favorite people, while keeping the drive as fair as possible for everyone.",
      img: Map,
    },
    {
      description:
        "Simply enter everyones' address and select a location type to look for.",
      img: Step1,
    },
    {
      description:
        "Set the radius for the search and calculate the SmartPath to take!",
      img: Step2,
    },
    {
      description:
        "Select a location to dynamically see where it is in relation to the meetup point",
      img: Step3,
    },
    {
      description:
        "Once you are happy with the meetup location, click the address for directions and get going!",
      img: Step4,
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
