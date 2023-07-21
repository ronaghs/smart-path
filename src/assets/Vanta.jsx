import { useEffect, useRef } from "react";
import NET from "vanta/src/vanta.net";

function Vanta() {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js background
    vantaRef.current = NET({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xc0cbd9,
      backgroundColor: 0x0b0e17,
      points: 15.0,
      maxDistance: 1.0,
    });

    // Clean up Vanta.js background on component unmount
    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div className="vantaBg" id="vanta" ref={vantaRef} />
    </div>
  );
}

export default Vanta;
