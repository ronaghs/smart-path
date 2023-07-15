import GlobeVideo from "../../assets/globevideo.mp4";
import Button from "@mui/material/Button";

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
            Get Started!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Video;
