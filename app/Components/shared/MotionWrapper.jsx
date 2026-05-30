"use client";
import React, { useEffect, useRef } from "react";

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  className = "",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("active");
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-fade ${className}`}
      style={{
        "--delay": `${delay}s`,
        "--duration": `${duration}s`,
        "--y": `${y}px`,
      }}
    >
      {children}
    </div>
  );
};

export const StaggerContainer = ({
  children,
  stagger = 0.12,
  className = "",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const items = ref.current.querySelectorAll(".stagger-item");
      items.forEach((item, index) => {
        item.style.setProperty("--delay", `${index * stagger}s`);
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("active");
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={`stagger-container ${className}`}>
      {children}
    </div>
  );
};

export const StaggerItem = ({ children, className = "" }) => {
  return <div className={`stagger-item ${className}`}>{children}</div>;
};
