import { useAnimation } from "framer-motion";

const expandedVariants = {
  width: "90%",
  height: "50%",
  top: "50%",
  left: "50%",
  translateX: "-50%",
  translateY: "-50%",
  borderRadius: 0,
};

const collapsedVariants = {
  width: "95%",
  height: "auto",
  borderRadius: "4px",
};

const transition = { duration: 0.5 };

export { transition, collapsedVariants, expandedVariants };

export const useMyAnimation = () => {
  const animation = useAnimation();

  const startAnimation = async () => {
    await animation.start({
      width: "100vw",
      position: "absolute",
      height: "100vh",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,

      transition: { duration: 2, ease: "easeOut" },
    });

    await animation.start({
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      textAlign: "center",

      width: "30px",
      height: "30px",
      borderRadius: "50%",
      transition: { ease: "easeOut", duration: 0.2 },
    });

    await animation.start({
      y: ["0", "8rem", "10rem"],
      width: ["5rem", "5rem", "6rem"],
      height: ["5rem", "5rem", "4rem"],
      transition: {
        duration: 0.8,
        yoyo: Infinity,
        ease: "easeOut",
      },
    });
    await animation.start({
      transition: { duration: 2 },
    });
    await animation.start({
      opacity: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "white",
      scale: 2,
      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)",
      borderRadius: "50%",
      transition: { duration: 2, ease: "easeOut" },
    });
  };
  return { animation, startAnimation };
};

export const useFormAnimation = () => {
  const formAnimation = useAnimation();

  const startFormAnimation = async () => {
    await formAnimation.start({
      height: 0,
      overflow: "hidden",

      transition: { duration: 0.5, ease: "easeOut" },
    });
  };
  return { formAnimation, startFormAnimation };
};
