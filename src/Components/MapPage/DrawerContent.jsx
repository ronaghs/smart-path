import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import POIList from "../PointsOfInterest/POIList";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function SwipeableEdgeDrawer(props) {
  const { window, poiData, isMobile, handleMarkerClick } = props; // Destructure the required props
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      {isMobile && (
        <>
          {/* Display a button to open the drawer for mobile devices */}
          <Box sx={{ textAlign: "center", pt: 1 }}></Box>
          <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
              }}
            >
              <Puller />
              <Typography sx={{ p: 2, color: "text.secondary" }}>
                {poiData.length} results
              </Typography>
            </StyledBox>
            <StyledBox
              sx={{
                px: 2,
                pb: 2,
                height: "100%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Display the POIList */}
              {poiData.length > 0 ? (
                <POIList poiData={poiData} onClick={handleMarkerClick} />
              ) : (
                <Typography>No results</Typography>
              )}
            </StyledBox>
          </SwipeableDrawer>
        </>
      )}
      {!isMobile && (
        // Render the POIList directly for larger screen sizes
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {/* Display the POIList  */}
          {poiData.length > 0 ? (
            <POIList poiData={poiData} onClick={handleMarkerClick} />
          ) : (
            <Typography>No results</Typography>
          )}
        </StyledBox>
      )}
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  window: PropTypes.func,
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
  isMobile: PropTypes.bool.isRequired,
  handleMarkerClick: PropTypes.func.isRequired,
};

export default SwipeableEdgeDrawer;
