import {
  ArrowBack,
  ArrowForward,
  Brightness7,
  CallMade,
  Check,
  ChevronRight,
  Close,
  DarkMode,
  Download,
  Folder,
  GitHub,
  Instagram,
  Link,
  LinkedIn,
  Menu,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { cloneElement } from "react";

const ICONS = {
  Menu: <Menu />,
  Sun: <Brightness7 />,
  Moon: <DarkMode />,
  Download: <Download />,
  LinkedIn: <LinkedIn />,
  GitHub: <GitHub />,
  ContactArrow: <CallMade />,
  Instagram: <Instagram />,
  Close: <Close />,
  Check: <Check />,
  ChevronRight: <ChevronRight />,
  RadioButton: <RadioButtonUnchecked />,
  ArrowForward: <ArrowForward />,
  ArrowBack: <ArrowBack />,
  Link: <Link />,
  Folder: <Folder />,
} as const;

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  fontSize?: "small" | "medium" | "large" | "inherit";
}

export function Icon({ name, fontSize = "medium" }: IconProps) {
  const IconComponent = ICONS[name] || ICONS["Menu"];

  return cloneElement(IconComponent, {
    fontSize,
  });
}
