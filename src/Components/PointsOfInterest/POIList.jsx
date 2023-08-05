import PropTypes from "prop-types";
import POICard from "./POICard";

// Transform each establishment in poiData into a simplified format for rendering
function POIList({ poiData, onClick }) {
  // Extract relevant information for rendering POICard components
  const poi = poiData.map((establishment) => ({
    location_id: establishment.place_id, // Use place_id as the location_id
    name: establishment.name,
    latitude: establishment.geometry.location.lat(),
    longitude: establishment.geometry.location.lng(),
    num_reviews: establishment.user_ratings_total,
    rating: establishment.rating,
    price_level: establishment.price_level,
    cuisine:
      establishment.types && establishment.types.length > 0
        ? establishment.types[0]
        : "Unknown", // Use the first type as cuisine/category
    address: establishment.vicinity, // Use the 'vicinity' field as the address
    photos: establishment.photos, // Add the 'photos' property to the extracted data
  }));

  return (
    <div className="form-container">
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
      rating: PropTypes.number.isRequired,
      price_level: PropTypes.number,
      types: PropTypes.arrayOf(PropTypes.string),
      vicinity: PropTypes.string,
      photos: PropTypes.array,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default POIList;
