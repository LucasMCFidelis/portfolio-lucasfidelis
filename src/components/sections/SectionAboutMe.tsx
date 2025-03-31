import { useNavigate } from "react-router-dom";
import SectionWrapper from "../SectionWrapper";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SectionAboutMe() {
  const navigate = useNavigate()
  return (
    <SectionWrapper id="about" className="lg:flex-row justify-between gap-0 sm:gap-8"
    >
      <h2>Sobre min</h2>
      <Card className="bg-transparent border-none w-full lg:w-3/5">
        <CardHeader>
          <CardTitle className="text-sm lg:text-2xl font-sans">
            Sou um Analista e Desenvolvedor de Sistemas em formação, com foco em
            Desenvolvimento WEB.
          </CardTitle>
          <CardDescription>
            Sou estudante de ADS e atualmente estou cursando o quarto período e
            em busca de oportunidades na área. Minhas principais áreas de
            interesse como desenvolvedor são o Frontend e Quality Assurance (QA)
            onde tenho me aprofundado usando tecnologias como React.js,
            Typescript, Tailwind CSS e Cypress
          </CardDescription>
        </CardHeader>
        <CardFooter className="max-w-full flex flex-wrap">
            <Button variant="link" onClick={() => navigate("/about")}>
              Mais sobre mim
            </Button>
        </CardFooter>
      </Card>
    </SectionWrapper>
  );
}
