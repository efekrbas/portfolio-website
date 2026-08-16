"use client";

import { useEffect, useState } from "react";
import { Bot, BotOff } from "lucide-react";

export const ChatbotToggle = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const tooltipText = isVisible ? "Hide Assistant" : "Show Assistant";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("chatbotHidden");
      if (stored === "true") {
        setIsVisible(false);
      }
    }
  }, []);

  const toggleVisibility = () => {
    const newState = !isVisible;
    setIsVisible(newState);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("setChatbotVisibility", { detail: { visible: newState } })
      );
    }
  };

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleVisibility}
      aria-label={tooltipText}
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
      {isVisible ? <Bot size={20} strokeWidth={2} /> : <BotOff size={20} strokeWidth={2} />}
    </button>
  );
};
