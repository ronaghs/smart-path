import { motion } from "framer-motion";
import GlobeVideo from "../../assets/globevideo.mp4";
import CallToAction from "./CallToAction";

function Video() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  return (
    <div className="hero">
      <video autoPlay loop muted id="video">
        <source src={GlobeVideo} type="video/mp4" />
      </video>
      <header className="content">
        <motion.h1 variants={textVariants} initial="hidden" animate="visible">
          SmartPath
        </motion.h1>
        <motion.p variants={textVariants} initial="hidden" animate="visible">
          Where Efficiency Meets Connection
        </motion.p>
        <motion.div variants={textVariants} initial="hidden" animate="visible">
          <CallToAction />
        </motion.div>
      </header>
    </div>
  );
}

export default Video;
