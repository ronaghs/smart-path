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

  const center = useMemo(() => ({ lat: 37, lng: -96 }), []);
  const mapRef = useRef(GoogleMap);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const options = useMemo(
    () => ({
      mapId: "d20e70b3a49a9e0b",
    }),
    []
  );

  return (
    <div className="googleMapContainer">
      <div className="inputContainer">
        <h2>Enter Addresses</h2>
        <Places
          setPlace={(position) => {
            setPlace(position);
            mapRef.current?.panTo(position);
            console.log(position);
          }}
        />
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
