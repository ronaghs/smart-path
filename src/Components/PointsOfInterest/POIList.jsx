import { useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material/";
import POICard from "./POICard";

function POIList({ poiData }) {
  const [type, setType] = useState("restaurants");

  // Extract establishment names from poiData
  const poi = poiData.map((establishment) => establishment.name);

  return (
    <div className="form-container">
      <Typography variant="h4">Discover Something New</Typography>
      <FormControl className="form-type">
        <InputLabel>Select</InputLabel>
        <Select
          label="Select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>

      {/* Display the names of establishments using POICard component */}
      <div className="poi-list-container">
        <Typography variant="h4">Nearby Establishments:</Typography>
        <div className="card-list-container">
          {poiData.map((establishment) => (
            <POICard key={establishment.location_id} poiData={establishment} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Define prop types
POIList.propTypes = {
  poiData: PropTypes.arrayOf(
    PropTypes.shape({
      location_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
      num_reviews: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default POIList;
