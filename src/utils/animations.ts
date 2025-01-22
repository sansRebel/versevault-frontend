// src/utils/animations.ts
export const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  
  export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Increased the stagger for a smoother delay
        delayChildren: 0.5, // Slight delay before children start animating
      },
    },
  };
  
  export const cardHover = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05, // Slight scale on hover
      transition: { duration: 0.3 },
    },
  };
  