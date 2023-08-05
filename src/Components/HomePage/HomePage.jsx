import Navbar from "./Navbar";
import Video from "./Video";
import Information from "./InformationCarousel/Information";
import Divider from "./Divider";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Video />
      <Divider />
      <div className="vantaWrapper">
        <Information />
      </div>
    </div>
  );
}

export default LandingPage;
