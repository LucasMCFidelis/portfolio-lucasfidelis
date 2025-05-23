import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { Icon } from "./IconWrapper";
import { useState } from "react";
import { appSections } from "@/utils/lists/appSections";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleNavigation = (id: string) => {
    const HEADER_HEIGHT = (12 * window.innerHeight) / 100; // 12vh convertido para pixels

    const section = id ? document.getElementById(id) : null;
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionTop - HEADER_HEIGHT, behavior: "smooth" });
    } 
    setTimeout(() => setIsSheetOpen(false), 1000);
  };

  return (
    <header className="w-full h-[10vh] flex items-center justify-between sticky top-0 bg-background shadow-md shadow-accent z-20">
      <h1 className="font-title text-3xl">Lucas Fidelis</h1>

      {/* Menu Desktop */}
      <nav className="hidden md:flex items-center gap-4">
        <Menubar className="bg-transparent border-none shadow-none">
          <MenubarMenu>
            {Object.values(appSections).map(({ title, id }, index) => (
              <MenubarTrigger
                key={index}
                className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={() => handleNavigation(id)}
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
          <SheetContent side="right" className="p-4">
            <SheetTitle className="text-lg font-medium">Menu de navegação</SheetTitle>
            <nav className="flex flex-col gap-4">
              {Object.values(appSections).map(({ title, id }, index) => (
                <a
                  key={index}
                  onClick={() => handleNavigation( id)}
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
