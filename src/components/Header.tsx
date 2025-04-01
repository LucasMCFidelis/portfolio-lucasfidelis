import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { Icon } from "./IconWrapper";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { appSections } from "@/appSections";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleNavigation = (href?: string, id?: string) => {
    const HEADER_HEIGHT = (12 * window.innerHeight) / 100; // 12vh convertido para pixels

    const section = id ? document.getElementById(id) : null;
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionTop - HEADER_HEIGHT, behavior: "smooth" });
    } else if (href && location.pathname !== href) {
      navigate(href, { state: { scrollTo: id } });
    }
    setTimeout(() => setIsSheetOpen(false), 1000);
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const scrollToSection = () => {
        const section = document.getElementById(location.state.scrollTo);
        if (section) {
          const HEADER_HEIGHT = (12 * window.innerHeight) / 100;
          const sectionTop =
            section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: sectionTop - HEADER_HEIGHT,
            behavior: "smooth",
          });
        }
      };

      // Espera a página carregar completamente antes de tentar dar scroll
      setTimeout(scrollToSection, 300);
    }
  }, [location]);

  return (
    <header className="w-full h-[10vh] flex items-center justify-between sticky top-0 bg-background shadow-md shadow-accent z-20">
      <h1 className="font-title text-3xl">Lucas Fidelis</h1>

      {/* Menu Desktop */}
      <nav className="hidden md:flex items-center gap-4">
        <Menubar className="bg-transparent border-none shadow-none">
          <MenubarMenu>
            {Object.values(appSections).map(({ title, href, id }, index) => (
              <MenubarTrigger
                key={index}
                className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={() => handleNavigation(href, id)}
              >
                {title}
              </MenubarTrigger>
            ))}
          </MenubarMenu>
        </Menubar>
        <ThemeToggle />
      </nav>

      {/* Menu Mobile */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon name="Menu" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 m-4">
              {Object.values(appSections).map(({ title, href, id }, index) => (
                <a
                  key={index}
                  onClick={() => handleNavigation(href, id)}
                  className="text-md hover:text-primary cursor-pointer"
                >
                  {title}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
