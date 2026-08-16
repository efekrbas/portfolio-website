"use client";

import React, { useEffect, useState } from "react";
import { Row, ToggleButton, useTheme } from "@once-ui-system/core";

import { Sun, MoonStar } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, [theme]);

  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "var(--radius-m)",
        border: "1px solid transparent",
        backgroundColor: "transparent",
        color: "var(--neutral-on-background-strong)",
        cursor: "pointer",
        transition: "color 0.2s, background-color 0.2s"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.color = "var(--neutral-on-background-strong)";
        e.currentTarget.style.backgroundColor = "var(--neutral-alpha-weak)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.color = "var(--neutral-on-background-weak)";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {currentTheme === "dark" ? (
        <Sun size={18} strokeWidth={2} />
      ) : (
        <MoonStar size={18} strokeWidth={2} />
      )}
    </button>
  );
};
