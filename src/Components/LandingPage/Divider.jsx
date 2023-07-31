import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Map from "../../assets/Map.jpg";
import Friends from "../../assets/friends.jpg";
import Restaurant from "../../assets/restaurant.jpg";

function Divider() {
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const captionVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const controls = useAnimation();
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2, // Adjust this threshold value as needed
      }
    );

    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      if (imageContainerRef.current) {
        observer.unobserve(imageContainerRef.current);
      }
    };
  }, [controls]);

  return (
    <div className="divider">
      <h1 className="content">
        Drive Less, do more!
        <p>
          Streamline meeting up with your favorite people and discover new
          hangout spots.
        </p>
      </h1>
      <div className="image-container" ref={imageContainerRef}>
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={controls}
          className="image-wrapper"
        >
          <img src={Map} alt="Map" className="divider-image" />
          <motion.p variants={captionVariants} className="caption">
            Explore
          </motion.p>
        </motion.div>
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={controls}
          className="image-wrapper"
        >
          <img
            src={Restaurant}
            alt="outdoor restaurant"
            className="divider-image"
          />
          <motion.p variants={captionVariants} className="caption">
            Discover
          </motion.p>
        </motion.div>
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={controls}
          className="image-wrapper"
        >
          <img
            src={Friends}
            alt="group of friends talking"
            className="divider-image"
          />
          <motion.p variants={captionVariants} className="caption">
            Connect
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default Divider;
