"use client";

import { useEffect, useState } from "react";
import { ToggleButton } from "@once-ui-system/core";
import { Bot, BotOff } from "lucide-react";
import { useParams } from "next/navigation";

export const ChatbotToggle = () => {
  const [isVisible, setIsVisible] = useState(true);
  const params = useParams();
  const locale = (params?.locale as string) || "tr";
  
  const tooltipText = isVisible 
    ? (locale === "tr" ? "Asistanı Gizle" : "Hide Assistant")
    : (locale === "tr" ? "Asistanı Göster" : "Show Assistant");

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
    <ToggleButton
      onClick={toggleVisibility}
      selected={isVisible}
    >
      {isVisible ? <Bot size={20} /> : <BotOff size={20} />}
    </ToggleButton>
  );
};
