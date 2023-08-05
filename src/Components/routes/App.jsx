import LandingPage from "../HomePage/HomePage";
import Information from "../HomePage/InformationCarousel/Information";
import Map from "../MapPage/SmartMap";
import { Routes, Route } from "react-router-dom";
import DrawerContent from "../MapPage/DrawerContent";

function App() {
  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/info" element={<Information />} />
        <Route path="/map" element={<Map />} />
        <Route path="/test" element={<DrawerContent />} />
      </Routes>
    </div>
  );
}

export default App;
