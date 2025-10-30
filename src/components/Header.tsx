"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { appSections } from "@/utils/lists/appSections";
import { scrollToContactSession } from "@/utils/scrollToContactSession";

import { Icon } from "./IconWrapper";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const router = useRouter();

  function handleNavigation(id: string) {
    if (id == appSections.contact.id) return scrollToContactSession();

    const section = appSections[id];
    if (!section) return;

    if (section.href) {
      const hrefNormalized =
        section.href +
        `${section.id == appSections.skills.id ? "#" + section.id : ""}`;
      router.push(hrefNormalized);
    }
  }

  return (
    <header className="w-full h-[10vh] flex items-center justify-between sticky top-0 bg-background shadow-md shadow-accent z-20">
      <h1 className="font-title text-3xl">Lucas Fidelis</h1>

      {/* Menu Desktop */}
      <nav className="hidden md:flex items-center gap-4">
        <Menubar className="bg-transparent border-none shadow-none">
          <MenubarMenu>
            {Object.values(appSections).map(({ title, id }) => (
              <MenubarTrigger
                key={id}
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
            <SheetTitle className="text-lg font-medium">
              Menu de navegação
            </SheetTitle>
            <nav className="flex flex-col gap-4">
              {Object.values(appSections).map(({ title, id }, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => {
                    handleNavigation(id);
                    setTimeout(() => setIsSheetOpen(false), 500);
                  }}
                  className="text-md justify-start hover:text-primary cursor-pointer"
                >
                  {title}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
