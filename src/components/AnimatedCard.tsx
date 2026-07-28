"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className, style }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        position: "relative",
        cursor: "pointer"
      }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div style={{ transform: "translateZ(20px)", height: "100%", width: "100%" }}>
        {children}
      </div>
      
      {/* Glow effect */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
          filter: "blur(20px)",
          zIndex: -1,
          opacity: useTransform(x, [-0.5, 0, 0.5], [0, 0.6, 0])
        }}
      />
    </motion.div>
  );
};
