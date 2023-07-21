import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
const apiKey = import.meta.env.VITE_PLACES_API_KEY;

function SmartMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="map">
      <Map />
    </div>
  );
}

export default SmartMap;
