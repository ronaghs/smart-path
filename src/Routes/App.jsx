import LandingPage from "../Components/LandingPage/LandingPage";
import Information from "../Components/Information/Information";
import Map from "../Components/SmartPath Map/SmartMap";
import { Routes, Route } from "react-router-dom";
import DrawerContent from "../Components/SmartPath Map/DrawerContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/info" element={<Information />} />
      <Route path="/map" element={<Map />} />
      <Route path="/test" element={<DrawerContent />} />
    </Routes>
  );
}

export default App;
