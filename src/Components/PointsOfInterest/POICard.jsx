import { Pool } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material/";

import { FaLocationDot } from "react-icons/fa6";

function POICard({ poiData }) {
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          poiData.photo
            ? poiData.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={poiData.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {poiData.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {poiData.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Rank</Typography>
          <Typography gutterBottom variant="subtitle1">
            {poiData.ranking}
          </Typography>
        </Box>
        {poiData?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} />
        ))}
        {poiData?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            mt={2}
            className="addressInfo"
          >
            <FaLocationDot className="addressIcon" /> {poiData.address}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default POICard;
