"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@once-ui-system/core";

const PRButton = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        cursor: "pointer",
        position: "relative"
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <Button 
          href={href} 
          variant="secondary" 
          prefixIcon="github" 
          size="m" 
          style={{ 
            width: "320px", 
            justifyContent: "flex-start",
            boxShadow: "0px 15px 35px -10px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)"
          }}
        >
          {children}
        </Button>
      </div>
      
      {/* Subtle glow effect behind the button */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
          filter: "blur(15px)",
          zIndex: -1,
          opacity: useTransform(x, [-0.5, 0, 0.5], [0.3, 0.5, 0.3])
        }}
      />
    </motion.div>
  );
};

export const AnimatedPRList = () => {
  const prs = [
    { href: "https://github.com/sceptejas/Stray-SDK/pull/20", label: "Stray-SDK (PR #20)" },
    { href: "https://github.com/rajdeep-singha/StellarPay/pull/44", label: "StellarPay (PR #44)" },
    { href: "https://github.com/RudranshG07/stello_finance/pull/13", label: "stello_finance (PR #13)" },
    { href: "https://github.com/mericcintosun/riskon/pull/43", label: "riskon (PR #43)" },
    { href: "https://github.com/orbitkit-fun/stellar-agent-kit/pull/51", label: "stellar-agent-kit (PR #51)" },
    { href: "https://github.com/gallipolixyz/gallipolixyz.github.io/pull/89", label: "gallipolixyz.github.io (PR #89)" },
    { href: "https://github.com/gallipolixyz/gallipolixyz.github.io/pull/93", label: "gallipolixyz.github.io (PR #93)" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8, rotateX: -20 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
      style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", perspective: "1000px" }}
    >
      {prs.map((pr, idx) => (
        <motion.div key={idx} variants={itemVariants} style={{ transformStyle: "preserve-3d" }}>
          <PRButton href={pr.href}>{pr.label}</PRButton>
        </motion.div>
      ))}
    </motion.div>
  );
};
