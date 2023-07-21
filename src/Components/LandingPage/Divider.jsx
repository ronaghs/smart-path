import Map from "../../assets/Map.jpg";
import Friends from "../../assets/friends.jpg";
import Restaurant from "../../assets/restaurant.jpg";

function Divider() {
  return (
    <div className="divider">
      <h1 className="content">
        Drive Less, do more!
        <p>
          Streamline meeting up with your favorite people and discover new
          hangout spots.
        </p>
      </h1>
      <div className="image-container">
        <div className="image-wrapper">
          <img src={Map} alt="Map" className="divider-image" />
          <p className="caption">Explore</p>
        </div>
        <div className="image-wrapper">
          <img
            src={Restaurant}
            alt="outdoor restaurant"
            className="divider-image"
          />
          <p className="caption">Discover</p>
        </div>
        <div className="image-wrapper">
          <img
            src={Friends}
            alt="group of friends talking"
            className="divider-image"
          />
          <p className="caption">Connect</p>
        </div>
      </div>
    </div>
  );
}

export default Divider;
