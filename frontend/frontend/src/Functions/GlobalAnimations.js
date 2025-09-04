const isMobile = window.innerWidth < 768; // Animation stop at 768

const fadeIn = !isMobile
  ? {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { delay: 0.4 },
  }
  : {};

const zoomIn = !isMobile
  ? {
    initial: { opacity: 0, scale: 0.3 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
  }
  : {};

const fadeInUp = !isMobile
  ? {
    initial: { opacity: 0, y: "30%" },
    whileInView: { opacity: 1, y: "0" },
    viewport: { once: true },
    transition: { ease: "circOut", duration: 1 },
  }
  : {};

const fadeInDown = !isMobile
  ? {
    initial: { opacity: 0, y: -50 },
    whileInView: { opacity: 1, y: "0" },
    viewport: { once: true },
    transition: { ease: "circOut", duration: 1 },
  }
  : {};

const fadeInBlur = !isMobile
  ? {
    initial: { opacity: 0, filter: "blur(20px)" },
    whileInView: { opacity: 1, filter: "blur(0px)" },
    viewport: { once: true },
    transition: { ease: "circOut", duration: 1 },
  }
  : {};

const fadeInRight = !isMobile
  ? {
    initial: { opacity: 0, x: "-50%" },
    whileInView: { opacity: 1, x: "0" },
    viewport: { once: true },
    transition: { ease: "circOut", duration: 1 },
  }
  : {};

const fadeInLeft = !isMobile
  ? {
    initial: { opacity: 0, x: "50%" },
    whileInView: { opacity: 1, x: "0" },
    viewport: { once: true },
    transition: { ease: "circOut", duration: 1 },
  }
  : {};

const zoomOut = !isMobile
  ? {
    initial: { opacity: 0, scale: 1.2 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { delay: 0.4 },
  }
  : {};

const bounce = !isMobile
  ? {
    transition: {
      y: {
        duration: 0.6,
        viewport: { once: true },
        ease: "easeOut",
        yoyo: Infinity,
        type: "spring",
      },
    },
    whileInView: { y: ["40px", "20px"] },
  }
  : {};

const flash = !isMobile
  ? {
    transition: {
      opacity: {
        duration: 0.6,
        viewport: { once: true },
        ease: "easeOut",
        yoyo: 2,
        type: "spring",
      },
    },
    whileInView: { opacity: [0, 1] },
  }
  : {};

const pulse = !isMobile
  ? {
    whileInView: { scale: [1, 1.05, 1] },
    transition: { duration: 0.9, ease: "easeIn", delay: 0.3 },
    viewport: { once: true },
  }
  : {};

const rubberBand = !isMobile
  ? {
    transition: {
      scaleX: {
        duration: 0.6,
        viewport: { once: true },
        ease: "easeOut",
        yoyo: 1,
        type: "spring",
      },
    },
    whileInView: { scaleX: [1, 1.5, 1] },
  }
  : {};

const rotateInDown = !isMobile
  ? {
    initial: { opacity: 0, y: -150, rotate: 45 },
    whileInView: { opacity: 1, y: "0", rotate: 0 },
    viewport: { once: true },
    transition: { ease: "circOut", duration: 1 },
  }
  : {};

const rotateInLeft = !isMobile
  ? {
    initial: { opacity: 0, rotateY: 100 },
    whileInView: { opacity: 1, rotateY: [90, -20, 10, -5, 0] },
    viewport: { once: true },
    transition: { ease: "circOut", duration: 5 },
  }
  : {};

export { flash, fadeIn, fadeInUp, fadeInDown, fadeInBlur, fadeInRight, fadeInLeft, zoomIn, zoomOut, bounce, rotateInDown, pulse, rubberBand, rotateInLeft };
