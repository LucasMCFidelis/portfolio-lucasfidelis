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
import { SvgIconProps } from "@mui/material/SvgIcon";
import { cloneElement, ReactElement } from "react";

const ICONS: Record<string, ReactElement<SvgIconProps>> = {
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
};

interface IconProps {
  name: keyof typeof ICONS;
  fontSize?: "small" | "medium" | "large" | "inherit";
}

export function Icon({ name, fontSize = "medium" }: IconProps) {
  const IconComponent = ICONS[name] || ICONS["Menu"];

  return cloneElement(IconComponent, {
    fontSize,
  });
}
