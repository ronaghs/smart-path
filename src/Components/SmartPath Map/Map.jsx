import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Places";

function Map() {
  const [place, setPlace] = useState();
  const [addressInputs, setAddressInputs] = useState([""]);
  const [positions, setPositions] = useState([]); // State variable to hold all positions

  const center = useMemo(() => ({ lat: 37, lng: -96 }), []);
  const mapRef = useRef(GoogleMap);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const options = useMemo(
    () => ({
      mapId: "d20e70b3a49a9e0b",
    }),
    []
  );

  const handleAddAddress = () => {
    setAddressInputs([...addressInputs, ""]);
  };

  const handleCalculateSmartPath = () => {
    // Calculate the average position coordinate (smart path)
    const totalLat = positions.reduce((sum, position) => sum + position.lat, 0);
    const totalLng = positions.reduce((sum, position) => sum + position.lng, 0);
    const avgLat = totalLat / positions.length;
    const avgLng = totalLng / positions.length;
    setPlace({ lat: avgLat, lng: avgLng });
    mapRef.current?.panTo({ lat: avgLat, lng: avgLng });
    console.log("Average Position Coordinate: ", { lat: avgLat, lng: avgLng });
  };

  return (
    <div className="googleMapContainer">
      <div className="inputContainer">
        <h2>Enter Addresses</h2>
        {addressInputs.map((address, index) => (
          <Places
            key={index}
            setPlace={(position) => {
              setPlace(position);
              setPositions([...positions, position]); // Add the new position to the state variable
              console.log("Selected Address Position: ", position);
            }}
          />
        ))}
        <button onClick={handleAddAddress}>Add Address</button>
        <button onClick={handleCalculateSmartPath}>Calculate SmartPath</button>
      </div>
      <div className="googleMap">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="mapContainer"
          onLoad={onLoad}
          options={options}
        >
          {place && (
            <>
              <Marker position={place} />
              <Circle center={place} radius={2000} options={nearbyOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const nearbyOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};

export default Map;
