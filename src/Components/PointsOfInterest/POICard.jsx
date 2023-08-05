import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Link,
} from "@mui/material/";
import { PiDotOutlineBold } from "react-icons/pi";
import { FaStar, FaDollarSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function POICard({ poiData, onClick }) {
  // Helper function to display the number of reviews
  const renderReviewCount = (reviewCount) => {
    return reviewCount > 0 ? `(${reviewCount} reviews)` : "(No reviews yet)";
  };

  // Helper function to generate dynamic dollar signs based on price level
  const renderPriceLevel = (priceLevel) => {
    return [...Array(priceLevel)].map((_, index) => (
      <FaDollarSign key={index} color="green" />
    ));
  };

  const handleClick = () => {
    onClick(poiData); // Call the onClick prop with poiData as the argument
  };

  const handleAddressClick = () => {
    // Generate the Google Maps URL from the establishment's name and address
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      poiData.name + " " + poiData.address
    )}`;

    window.open(googleMapsURL, "_blank");
  };

  return (
    <Card onClick={handleClick} id="poiCard" role="button">
      <CardMedia
        className="cardMedia"
        image={
          poiData.photos && poiData.photos.length > 0
            ? poiData.photos[0].getUrl()
            : // If google places API does not return an image for an esatblishment, use this stock photo instead
              "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={poiData.name}
        alt={poiData.name}
      />
      <CardContent mb={5}>
        <Typography gutterBottom variant="h5">
          {poiData.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">
            {/* Display the actual rating number */}
            {poiData.rating}
            <FaStar aria-label="Star Icon" color="gold" />
            <PiDotOutlineBold />
            {renderReviewCount(poiData.num_reviews)}
          </Typography>

          <Typography gutterBottom variant="subtitle1">
            {/* Replace the plain price level number with dynamic dollar signs */}
            Price: {renderPriceLevel(poiData.price_level)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Chip label={poiData.cuisine} variant="standard" />
          <Link
            component="button"
            onClick={handleAddressClick}
            variant="subtitle1"
          >
            {" "}
            <FaLocationDot aria-label="Location Pin" />
            {poiData.address}
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}

POICard.propTypes = {
  poiData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      images: PropTypes.shape({
        large: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
    price_level: PropTypes.number.isRequired,
    ranking: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    num_reviews: PropTypes.number.isRequired,
    cuisines: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    photos: PropTypes.array,
  }).isRequired,

  onClick: PropTypes.func.isRequired, // Adding the onClick prop validation
};

export default POICard;
