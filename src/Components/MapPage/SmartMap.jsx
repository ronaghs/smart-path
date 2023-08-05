import { useLoadScript } from "@react-google-maps/api";
import Map from "./GoogleMap";
const apiKey = import.meta.env.VITE_PLACES_API_KEY;

function SmartMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <Map />
    </div>
  );
}

export default SmartMap;
