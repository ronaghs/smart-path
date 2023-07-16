import { useEffect } from "react";
import NET from "vanta/src/vanta.net";
import SwiperCarousel from "../Components/Information/SwiperCarousel";

function Vanta() {
  useEffect(() => {
    NET({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xffffff,
      backgroundColor: 0x0,
      points: 15.0,
      maxDistance: 19.0,
    });
  }, []);

  return (
    <div>
      <div className="vantaBg" id="vanta">
        <SwiperCarousel />
      </div>
    </div>
  );
}

export default Vanta;
