import { useAnimation, motion } from "framer-motion";

const Draggable = ({ children }) => {
  const controls = useAnimation();
  const dragElastic = 0.2;

  const dragConstraints = {
    left: 0,
    right: "20%",
    top: 0,
    bottom: "20%",
  };

  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      dragElastic={dragElastic}
      dragMomentum={false}
      onDragEnd={() => {
        // your onDragEnd logic here
      }}
      whileTap={{ cursor: "grabbing" }}
      whileHover={{ scale: 1.2 }}
      animate={controls}
      style={{
        position: "fixed",
        top: 0,

        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "10%",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Draggable;
