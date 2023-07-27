import { useEffect, useRef } from "react";
import WAVES from "vanta/src/vanta.waves";

function Vanta2() {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js background
    vantaRef.current = WAVES({
      el: "#vanta",
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x131e34,
      shininess: 10.0,
      waveSpeed: 0.5,
      zoom: 0.5,
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

export default Vanta2;
