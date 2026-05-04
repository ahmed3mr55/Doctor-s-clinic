"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ================= FadeIn ================= */
export const FadeIn = ({
  children,
  delay = 0,
  y = 15,
  x = 0,
}) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px", // مهم للموبايل
  });

  // حل مشاكل hydration في Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={
        mounted && isInView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 1 } // fallback عشان العنصر يفضل ظاهر
      }
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

/* ================= StaggerContainer ================= */
export const StaggerContainer = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/* ================= Stagger Item ================= */
export const StaggerItem = ({
  children,
  y = 20,
  x = 0,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, x },
        visible: { opacity: 1, y: 0, x: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};