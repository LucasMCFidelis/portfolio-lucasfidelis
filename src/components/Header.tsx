import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { Icon } from "./IconWrapper";

export default function Header() {
  const sections = [
    { title: "Início", href: "/" },
    { title: "Projetos", href: "/projetos" },
    { title: "Sobre", href: "/sobre" },
    { title: "Contato", href: "/contato" },
  ];

  return (
    <header className="w-full h-[10vh] flex items-center justify-between sticky top-0 bg-background shadow-md shadow-accent z-20">
      <h1 className="font-title text-3xl">Lucas Fidelis</h1>

      {/* Menu Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Menubar className="bg-transparent border-none shadow-none">
          {sections.map(({ title, href }, index) => (
            <MenubarMenu key={index}>
              <a href={href}>
                <MenubarTrigger className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  {title}
                </MenubarTrigger>
              </a>
            </MenubarMenu>
          ))}
        </Menubar>
        <ThemeToggle />
      </div>

      {/* Menu Mobile */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon name="Menu" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 m-4">
              {sections.map(({ title, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-md hover:text-primary"
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
