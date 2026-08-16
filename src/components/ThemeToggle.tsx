"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@once-ui-system/core";
import { Sun, Moon } from "lucide-react";

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

  if (!mounted) {
    return (
      <button
        className="theme-toggle-btn"
        aria-label="Loading theme"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "var(--radius-m)",
          border: "1px solid transparent",
          backgroundColor: "transparent",
          cursor: "pointer",
          transition: "color 0.2s, background-color 0.2s"
        }}
      >
        <Moon size={20} strokeWidth={2} />
      </button>
    );
  }

  return (
    <button
      className="theme-toggle-btn"
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
        cursor: "pointer",
        transition: "color 0.2s, background-color 0.2s"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "var(--neutral-alpha-weak)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {currentTheme === "light" ? (
        <Moon size={20} strokeWidth={2} />
      ) : (
        <Sun size={20} strokeWidth={2} />
      )}
    </button>
  );
};
