import {
  Brightness7,
  CallMade,
  DarkMode,
  Download,
  GitHub,
  Instagram,
  LinkedIn,
  Menu,
} from "@mui/icons-material";

const ICONS = {
  Menu: <Menu />,
  Son: <Brightness7 />,
  Moon: <DarkMode />,
  Download: <Download />,
  LinkedIn: <LinkedIn />,
  GitHub: <GitHub />,
  ContactArrow: <CallMade />,
  Instagram: <Instagram />,
};

interface IconProps {
  name: keyof typeof ICONS;
}

export function Icon({ name }: IconProps) {
  return ICONS[name] || <Menu />;
}
