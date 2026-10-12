import "./index.css";

import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";

import Header from "@/components/Header";
import SectionContact from "@/components/sections/SectionContact";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio Lucas Fidelis",
  description: "Portfólio de Lucas Fidelis — explore projetos, habilidades, informações profissionais e formas de contato reunidos em um único lugar.",
  icons: "/icon.svg",
};

// Aplica a classe `dark` antes da hidratação para evitar o flash de tema claro.
// Deve manter a mesma chave de armazenamento usada em `ThemeProvider`.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("isDarkMode");
    var isDark = stored !== null
      ? stored === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main
          id="root"
          className="max-w-screen flex flex-col items-center gap-10 md:gap-20 container-padding mb-[8vh] md:mb-[15vh]"
        >
          <ThemeProvider>
            <Header />
            {children}
            <Separator />
            <SectionContact />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
