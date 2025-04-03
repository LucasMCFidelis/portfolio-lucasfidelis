import { useLocation, useNavigate } from "react-router-dom";
import SectionWrapper from "../SectionWrapper";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Icon } from "../IconWrapper";
import { appSections } from "@/appSections";
import { useEffect, useState } from "react";
import image from "@/assets/undraw_profile.svg";

export default function SectionAboutMe() {
  const fileId = import.meta.env.VITE_FILE_RESUME_ID;
  if (!fileId) {
    console.error("O fileId não foi definido");
  }

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = () => {
    setIsDownloading(true);

    // Simular um tempo de espera antes de resetar o estado
    setTimeout(() => setIsDownloading(false), 3000);
  };

  return (
    <SectionWrapper id="about" className="lg:flex-col">
      <div className="flex flex-col lg:flex-row w-full lg:justify-between">
        {location.pathname === appSections.about.href ? (
          <h1>Sobre mim</h1>
        ) : (
          <h2>Sobre mim</h2>
        )}
        <Card className="bg-transparent border-none w-full lg:w-3/5">
          <CardHeader>
            <CardTitle className="text-sm lg:text-2xl font-sans">
              Sou um Analista e Desenvolvedor de Sistemas em formação, com foco
              em Desenvolvimento WEB.
            </CardTitle>
            <CardDescription>
              Sou estudante de ADS e atualmente estou cursando o quarto período
              e em busca de oportunidades na área. Minhas principais áreas de
              interesse como desenvolvedor são o Frontend e Quality Assurance
              (QA) onde tenho me aprofundado usando tecnologias como React.js,
              Typescript, Tailwind CSS e Cypress
            </CardDescription>
          </CardHeader>
          <CardFooter className="max-w-full flex flex-wrap justify-start items-center gap-4">
            {location.pathname === "/about" ? (
              <>
                <Button
                  disabled={isDownloading}
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <a
                    href={`https://drive.google.com/uc?export=download&id=${fileId}`}
                    download
                    className="flex items-center gap-2"
                  >
                    {isDownloading ? (
                      <>
                        BAIXANDO O ARQUIVO
                        <span className="text-xl leading-none flex">
                          <span className="animate-pulse">.</span>
                          <span className="animate-pulse delay-150">.</span>
                          <span className="animate-pulse delay-300">.</span>
                        </span>
                      </>
                    ) : (
                      <>
                        DOWNLOAD RESUME
                        <Icon name="Download" />
                      </>
                    )}
                  </a>
                </Button>
                <a
                  href="https://www.linkedin.com/in/lucas-fidelis-778705149"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="icon" variant="secondary">
                    <Icon name="LinkedIn" />
                  </Button>
                </a>
                <a
                  href="https://github.com/LucasMCFidelis"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="icon" variant="secondary">
                    <Icon name="GitHub" />
                  </Button>
                </a>
              </>
            ) : (
              <Button variant="link" onClick={() => navigate("/about")}>
                Mais sobre mim
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      {location.pathname === "/about" && (
        <img
          src={image}
          alt=""
          className="w-full md:max-h-96 object-contain py-4"
        />
      )}
    </SectionWrapper>
  );
}
