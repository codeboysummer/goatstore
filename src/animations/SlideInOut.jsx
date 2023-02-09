import { motion, AnimatePresence } from "framer-motion";

const SlideInOut = ({ children, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        animate={{ x: 0 }}
        exit={{ x: "100vw" }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default SlideInOut;
