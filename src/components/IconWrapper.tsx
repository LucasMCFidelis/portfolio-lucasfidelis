import { cloneElement, ReactElement } from "react";
import {
  Brightness7,
  CallMade,
  DarkMode,
  Download,
  GitHub,
  Instagram,
  LinkedIn,
  Menu,
  Close,
  Check,
  ChevronRight,
  RadioButtonUnchecked,
  ArrowBack,
  ArrowForward,
  Link
} from "@mui/icons-material";
import { SvgIconProps } from "@mui/material/SvgIcon";

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
  Link: <Link/>
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
