import LandingPage from "../Components/Landing Page/LandingPage";
import Information from "../Components/Information/Information";
import Map from "../Components/Map/Map.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/info" element={<Information />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  );
}

export default App;
