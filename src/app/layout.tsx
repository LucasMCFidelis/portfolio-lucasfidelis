import "./index.css";

import type { Metadata } from "next";

import Header from "@/components/Header";
import SectionContact from "@/components/sections/SectionContact";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Portfolio Lucas Fidelis",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main
          id="root"
          className="max-w-screen flex flex-col items-center gap-10 md:gap-20 container-padding mb-[8vh] md:mb-[15vh]"
        >
          <ThemeProvider>
            <Header />
            {children}
            <SectionContact />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
