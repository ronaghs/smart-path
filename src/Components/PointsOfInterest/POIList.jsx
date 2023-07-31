import PropTypes from "prop-types";
import POICard from "./POICard";

function POIList({ poiData, onClick }) {
  const poi = poiData.map((establishment) => ({
    location_id: establishment.place_id, // Use place_id as the location_id
    name: establishment.name,
    latitude: establishment.geometry.location.lat(),
    longitude: establishment.geometry.location.lng(),
    num_reviews: establishment.user_ratings_total,
    // Add any other relevant properties you need from the Google Places API data
    rating: establishment.rating,
    price_level: establishment.price_level,
    // Add other relevant properties from the Google Places API data
    cuisine:
      establishment.types && establishment.types.length > 0
        ? establishment.types[0]
        : "Unknown", // Use the first type as cuisine/category
    address: establishment.vicinity, // Use the 'vicinity' field as the address
    photos: establishment.photos, // Add the 'photos' property to the extracted data
  }));

  return (
    <div className="form-container">
      {/* Display the names of establishments using POICard component */}
      <div className="poi-list-container">
        <div className="card-list-container">
          {poi.map((establishment) => (
            <POICard
              key={establishment.location_id}
              poiData={establishment}
              onClick={() => onClick(establishment, "poi")} // Pass the source "poi" when clicking on the POI card
            />
          ))}
        </div>
      </div>
    </div>
  );
}

POIList.propTypes = {
  poiData: PropTypes.arrayOf(
    PropTypes.shape({
      place_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      geometry: PropTypes.shape({
        location: PropTypes.shape({
          lat: PropTypes.func.isRequired,
          lng: PropTypes.func.isRequired,
        }).isRequired,
      }).isRequired,
      user_ratings_total: PropTypes.number.isRequired,
      // Add other relevant PropTypes based on the Google Places API data
      rating: PropTypes.number.isRequired,
      price_level: PropTypes.number,
      // Add other relevant PropTypes from the Google Places API data
      types: PropTypes.arrayOf(PropTypes.string), // Add the 'types' property to the propTypes
      vicinity: PropTypes.string, // Add the 'vicinity' property to the propTypes
      photos: PropTypes.array, // Add the 'photos' property to the propTypes
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired, // Add the onClick prop validation
};

export default POIList;
