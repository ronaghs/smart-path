import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowAltCircleRight } from "react-icons/fa";

function CallToAction() {
  return (
    <nav className="calltoactionbtn">
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
          Get Started{" "}
          <FaArrowAltCircleRight
            aria-label="Go to SmartMap"
            className="arrowIcon"
          />
        </Button>
      </Link>
    </nav>
  );
}

export default CallToAction;
