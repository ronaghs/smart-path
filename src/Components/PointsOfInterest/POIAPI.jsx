export const fetchPOIs = async (smartPathPosition, radiusInMiles) => {
  const latitude = smartPathPosition.lat;
  const longitude = smartPathPosition.lng;
  const distance = radiusInMiles;

  const url = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${latitude}&longitude=${longitude}&limit=30&currency=USD&distance=${distance}&open_now=false&lunit=mi&lang=en_US`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "60105630f6msh3a88e5da35ce962p1909d6jsn16f0b6413c91",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data; // Assuming the data is stored in the 'data' field of the API response
  } catch (error) {
    console.error("Error fetching POIs:", error);
    return [];
  }
};
