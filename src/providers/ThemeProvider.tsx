"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const STORAGE_KEY = "isDarkMode";

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // Lê a preferência salva (ou a do sistema) apenas no cliente, após a hidratação
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsDarkMode(stored !== null ? stored === "true" : prefersDark);
    setIsThemeLoaded(true);
  }, []);

  useEffect(() => {
    // Evita sobrescrever a preferência salva antes de ela ser carregada
    if (!isThemeLoaded) return;

    localStorage.setItem(STORAGE_KEY, String(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode, isThemeLoaded]);

  const value = useMemo(
    () => ({ isDarkMode, toggleTheme }),
    [isDarkMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
