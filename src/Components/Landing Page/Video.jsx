import GlobeVideo from "../../assets/globevideo.mp4";
import Button from "@mui/material/Button";
FaArrowAltCircleRight;
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

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
          <Link to="/info">
            <Button
              variant="outlined"
              size="large"
              sx={{
                marginRight: "1rem",
                color: "white",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              How does it Work?
            </Button>
          </Link>
          <Link to="/map">
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              Get Started <FaArrowAltCircleRight className="arrowIcon" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Video;
