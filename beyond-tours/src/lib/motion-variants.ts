/**
 * Reusable Framer Motion Animation Variants
 * A comprehensive library of animation variants for Beyond Tours
 */
import type { Variants } from "framer-motion";

// ===== FADE ANIMATIONS =====
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } 
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } 
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// ===== SCALE ANIMATIONS =====
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 12,
      mass: 0.8
    }
  }
};

// ===== STAGGER CONTAINERS =====
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.05, 
      delayChildren: 0.1 
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.3 
    }
  }
};

// ===== PAGE TRANSITIONS =====
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.2, 0.8, 0.2, 1],
      staggerChildren: 0.1 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

export const pageSlideIn: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { duration: 0.3 }
  }
};

// ===== CARD ANIMATIONS =====
export const cardHover = {
  rest: { 
    y: 0, 
    boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)" 
  },
  hover: { 
    y: -8, 
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const card3DTilt = {
  rest: { 
    rotateX: 0, 
    rotateY: 0,
    scale: 1 
  },
  hover: { 
    rotateX: 5, 
    rotateY: 5,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

// ===== IMAGE ANIMATIONS =====
export const imageZoom = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const imageReveal: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 1.1,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// ===== BUTTON ANIMATIONS =====
export const buttonPress = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const buttonGlow = {
  whileHover: { 
    scale: 1.05,
    boxShadow: "0 0 30px rgba(230, 126, 34, 0.4)"
  },
  whileTap: { scale: 0.95 }
};

// ===== TEXT ANIMATIONS =====
export const textReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    clipPath: "inset(100% 0 0 0)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { 
      duration: 0.5, 
      ease: [0.2, 0.8, 0.2, 1] 
    }
  }
};

// ===== SCROLL INDICATOR =====
export const scrollBounce: Variants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ===== ACCORDION =====
export const accordionContent: Variants = {
  hidden: { 
    height: 0, 
    opacity: 0 
  },
  visible: { 
    height: "auto", 
    opacity: 1,
    transition: { 
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: { 
      height: { duration: 0.3 },
      opacity: { duration: 0.2 }
    }
  }
};

// ===== NAV ANIMATIONS =====
export const mobileMenu: Variants = {
  hidden: { 
    x: "100%",
    opacity: 0
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }
  },
  exit: { 
    x: "100%",
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const navItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

// ===== OVERLAY =====
export const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// ===== FLOATING ELEMENTS =====
export const float: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ===== FORM ANIMATIONS =====
export const formField: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const formSection: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// ===== SUCCESS/ERROR STATES =====
export const successCheck: Variants = {
  hidden: { 
    scale: 0, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 15 
    }
  }
};

export const shake: Variants = {
  animate: {
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.4 }
  }
};
