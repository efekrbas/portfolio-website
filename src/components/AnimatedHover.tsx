"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimatedHover = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
};
