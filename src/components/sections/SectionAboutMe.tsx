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

export default function SectionAboutMe() {
  const navigate = useNavigate();
  const location = useLocation();

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
                <Button>
                  DOWNLOAD RESUME
                  <Icon name="Download" />
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
          src="https://placehold.co/600x400"
          alt=""
          className="w-full rounded-3xl md:max-h-96 lg:max-h-[600px] object-cover"
        />
      )}
    </SectionWrapper>
  );
}
