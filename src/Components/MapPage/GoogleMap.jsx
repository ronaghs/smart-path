import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import Places from "./Places";
import POIList from "../PointsOfInterest/POIList";
import { fetchPOIs } from "../PointsOfInterest/POIAPI";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Slider,
} from "@mui/material/";
import Vanta2 from "../../assets/Vanta2";
import SwipeableEdgeDrawer from "./DrawerContent";

function Map() {
  const [addressInputs, setAddressInputs] = useState([""]);
  const [positions, setPositions] = useState([]);
  const [smartPathPosition, setSmartPathPosition] = useState(null); //"smartPathPosition" is the caluclated mid point amognst the address inputs
  const [radiusInMiles, setRadiusInMiles] = useState(1); // Default radius in miles
  const [radiusInMeters, setRadiusInMeters] = useState(1 * 1609.34); // Default radius converted to meters (1 mile ≈ 1609.34 meters)
  const [poiData, setPOIData] = useState([]); // State to store fetched POIs
  const [type, setType] = useState("restaurant");
  const [markers, setMarkers] = useState([]); // State to store markers on the map
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Memoized map center - Tampa Bay Area
  const center = useMemo(() => ({ lat: 27.93, lng: -82.74 }), []);

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

  //Logic used to calculate the midpoint. Essentially just the average longitude/latitude of all inputted adresses (postion)
  const handleCalculateSmartPath = async () => {
    // Calculate the average position coordinate (smart path)
    const totalLat = positions.reduce((sum, position) => sum + position.lat, 0);
    const totalLng = positions.reduce((sum, position) => sum + position.lng, 0);
    const avgLat = totalLat / positions.length;
    const avgLng = totalLng / positions.length;
    const smartPathPosition = { lat: avgLat, lng: avgLng };
    setSmartPathPosition(smartPathPosition);
    mapRef.current?.panTo(smartPathPosition);

    // Fetch POIs based on SmartPathPosition and user-selected radius
    try {
      const pois = await fetchPOIs(smartPathPosition, radiusInMiles, type);
      setPOIData(pois); // Save the fetched data in state
    } catch (error) {
      setPOIData([]); // Clear the data in case of an error
    }
  };

  const handleRadiusChange = (value) => {
    const miles = value;
    const meters = miles * 1609.34; // Convert miles to meters (1 mile ≈ 1609.34 meters)
    setRadiusInMiles(miles);
    setRadiusInMeters(meters);
  };

  //Move the marker to the new coordiantes of the selected POI
  const handleMarkerClick = (poiData) => {
    const { latitude, longitude } = poiData;
    const position = { lat: latitude, lng: longitude };

    // Add a new marker to the markers array
    const newMarker = <Marker position={position} />;
    setMarkers([newMarker]);
  };

  return (
    <div className="googleMapContainer">
      <Vanta2 />
      <div className="inputContainer">
        <h1>Enter addresses</h1>

        {addressInputs.map((address, index) => (
          <Places
            key={index}
            setPlace={(position) => {
              setPositions([...positions, position]);
              mapRef.current?.panTo(position);
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <FormControl style={{ flexGrow: 1, zIndex: 0, color: "white" }}>
            <InputLabel style={{ color: "white" }}>Select</InputLabel>
            <Select
              label="Select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="restaurant">Restaurants</MenuItem>
              <MenuItem value="cafe">Cafes</MenuItem>
              <MenuItem value="bar">Bars</MenuItem>
            </Select>
          </FormControl>
          <Button
            id="addAddressBtn"
            variant="contained"
            onClick={handleAddAddress}
            style={{ marginRight: "1rem" }}
          >
            Add Address
          </Button>
        </div>

        <div>
          <p>Radius (miles): {radiusInMiles}</p>
          <Slider
            aria-label="radius"
            value={radiusInMiles}
            onChange={(event, value) => handleRadiusChange(value)}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            style={{ color: "white" }}
          />
          <Button
            color="success"
            variant="contained"
            onClick={handleCalculateSmartPath}
          >
            Calculate SmartPath
          </Button>
        </div>
      </div>
      {isMobile ? (
        // Display the SwipeableEdgeDrawer only for mobile devices
        <SwipeableEdgeDrawer
          poiData={poiData}
          isMobile={isMobile}
          handleMarkerClick={handleMarkerClick}
        />
      ) : poiData.length > 0 ? (
        // Render the POIList directly for larger screen sizes when there is POI data
        <POIList poiData={poiData} onClick={handleMarkerClick} />
      ) : null}
      <div className="googleMap">
        <GoogleMap
          zoom={11}
          center={center}
          mapContainerClassName="mapContainer"
          onLoad={onLoad}
          options={options}
        >
          {markers.map((marker, index) => (
            <React.Fragment key={index}>{marker}</React.Fragment>
          ))}

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
