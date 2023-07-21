import React, { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import Places from "./Places";
import POIList from "../PointsOfInterest/POIList";
import { fetchPOIs } from "../PointsOfInterest/POIAPI";
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material/";

function Map() {
  const [addressInputs, setAddressInputs] = useState([""]);
  const [positions, setPositions] = useState([]);
  const [smartPathPosition, setSmartPathPosition] = useState(null);
  const [radiusInMiles, setRadiusInMiles] = useState(1); // Default radius in miles
  const [radiusInMeters, setRadiusInMeters] = useState(1 * 1609.34); // Default radius converted to meters (1 mile ≈ 1609.34 meters)
  const [poiData, setPOIData] = useState([]); // State to store fetched POIs
  const [type, setType] = useState("restaurant");

  const center = useMemo(() => ({ lat: 27.9, lng: -82.5 }), []);
  const mapRef = useRef(null);
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

  const handleCalculateSmartPath = async () => {
    // Calculate the average position coordinate (smart path)
    const totalLat = positions.reduce((sum, position) => sum + position.lat, 0);
    const totalLng = positions.reduce((sum, position) => sum + position.lng, 0);
    const avgLat = totalLat / positions.length;
    const avgLng = totalLng / positions.length;
    const smartPathPosition = { lat: avgLat, lng: avgLng };
    setSmartPathPosition(smartPathPosition);
    mapRef.current?.panTo(smartPathPosition);

    // Fetch POIs based on smartPathPosition and user-selected radius
    try {
      const pois = await fetchPOIs(smartPathPosition, radiusInMiles, type);
      setPOIData(pois); // Save the fetched data in state
      console.log("Fetched POIs:", pois);
    } catch (error) {
      console.error("Error fetching POIs:", error);
      setPOIData([]); // Clear the data in case of an error
    }

    console.log("Average Position Coordinate: ", smartPathPosition);
  };

  const handleRadiusChange = (event) => {
    const miles = event.target.value;
    const meters = miles * 1609.34; // Convert miles to meters (1 mile ≈ 1609.34 meters)
    setRadiusInMiles(miles);
    setRadiusInMeters(meters);
  };

  return (
    <div className="googleMapContainer">
      <div className="inputContainer">
        <h2>Enter Addresses</h2>
        {addressInputs.map((address, index) => (
          <Places
            key={index}
            setPlace={(position) => {
              setPositions([...positions, position]);
              mapRef.current?.panTo(position);
              console.log("Selected Address Position: ", position);
            }}
          />
        ))}
        <button onClick={handleAddAddress}>Add Address</button>

        <button onClick={handleCalculateSmartPath}>Calculate SmartPath</button>
        <div>
          <p>Radius (miles)</p>
          <input
            type="number"
            value={radiusInMiles}
            onChange={handleRadiusChange}
            placeholder="Radius (mi)"
          />
          <FormControl className="form-type">
            <InputLabel>Select</InputLabel>
            <Select
              label="Select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="restaurant">Restaurants</MenuItem>
              <MenuItem value="cafe">Cafes</MenuItem>
              <MenuItem value="bar">Bars</MenuItem>
            </Select>
          </FormControl>
        </div>
        <POIList poiData={poiData} />
      </div>
      <div className="googleMap">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="mapContainer"
          onLoad={onLoad}
          options={options}
        >
          {positions.map((position, index) => (
            <React.Fragment key={index}>
              <Marker
                position={position}
                icon="https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png"
              />
              {smartPathPosition && (
                <Circle
                  center={smartPathPosition}
                  radius={radiusInMeters}
                  options={nearbyOptions}
                />
              )}
            </React.Fragment>
          ))}
          {smartPathPosition && (
            <>
              <Marker
                position={smartPathPosition}
                icon="https://maps.gstatic.com/mapfiles/ms2/micons/grn-pushpin.png"
              />
              <Circle
                center={smartPathPosition}
                radius={radiusInMeters}
                options={smartPathOptions}
              />
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

const smartPathOptions = {
  ...defaultOptions,
  zIndex: 4,
  fillOpacity: 0.2,
  strokeColor: "#00FF00",
  fillColor: "#00FF00",
};

export default Map;
