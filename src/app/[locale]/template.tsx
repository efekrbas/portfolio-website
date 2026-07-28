"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {children}
    </motion.div>
  );
}
