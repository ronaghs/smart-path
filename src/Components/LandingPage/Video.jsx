import GlobeVideo from "../../assets/globevideo.mp4";
import CallToAction from "./CallToAction";

function Video() {
  return (
    <div className="hero">
      <video autoPlay loop muted id="video">
        <source src={GlobeVideo} type="video/mp4" />
      </video>
      <div className="content">
        <h1>SmartPath</h1>
        <p>Where Efficiency Meets Connection</p>
        <div>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}

export default Video;
