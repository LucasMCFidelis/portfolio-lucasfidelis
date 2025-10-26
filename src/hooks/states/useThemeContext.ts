import { useContext } from "react";

import { ThemeContext } from "@/providers/ThemeProvider";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("Theme Provider not found");

  return context;
};
