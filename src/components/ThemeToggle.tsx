import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Icon } from "./IconWrapper";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size={"icon"}
      variant={"outline"}
    >
      {theme === "dark" ? <Icon name="Son"/> : <Icon name="Moon"/>}
    </Button>
  );
}
