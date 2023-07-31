/* eslint-disable no-undef */
export const fetchPOIs = (smartPathPosition, radiusInMiles, type) => {
  return new Promise((resolve, reject) => {
    const location = new google.maps.LatLng(
      smartPathPosition.lat,
      smartPathPosition.lng
    );

    const request = {
      location,
      radius: radiusInMiles * 1609.34,
      type: type,
    };
    console.log(request);

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        reject(new Error("Error fetching POIs"));
      }
    });
  });
};
