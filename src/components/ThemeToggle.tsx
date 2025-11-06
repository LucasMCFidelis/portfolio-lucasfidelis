"use client";

import { useThemeContext } from "@/hooks/states/useThemeContext";

import { Icon } from "./IconWrapper";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Button
      onClick={toggleTheme}
      name="toggle-theme"
      aria-label="toggle-theme"
      size={"icon"}
      variant={"outline"}
    >
      <Icon name={isDarkMode ? "Sun" : "Moon"} />
    </Button>
  );
}
