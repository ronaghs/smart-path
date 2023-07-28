import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowAltCircleRight } from "react-icons/fa";

function CallToAction() {
  return (
    <div className="calltoactionbtn">
      {" "}
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
  );
}

export default CallToAction;
