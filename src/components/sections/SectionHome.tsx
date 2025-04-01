import { Icon } from "../IconWrapper";
import { Button } from "../ui/button";
import profile1 from "../../assets/profile-1.jpg";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "../ui/card";
import SectionWrapper from "../SectionWrapper";

export default function SectionHome() {
  return (
    <SectionWrapper id="home" className="sm:items-center sm:flex-row-reverse sm:justify-between gap-5">
      <img
        src={profile1}
        alt="Foto Lucas"
        className="w-full max-w-sm self-center h-[60vh] sm:h-[40vh] sm:w-[30vh] lg:h-[65vh] lg:w-[55vh] rounded-2xl object-cover object-top"
      />
      <Card className="w-full md:max-w-xl flex flex-col md:flex-1 gap-y-5 bg-transparent border-none">
        <CardHeader>
          <CardTitle>
            <h1>
              Olá, eu sou
              <br className="hidden md:inline" /> Lucas Fidelis
            </h1>
          </CardTitle>
          <CardDescription>
            Estudante de Análise e Desenvolvimento de Sistemas e futuro
            desenvolvedor de frontend.
          </CardDescription>
        </CardHeader>
        <CardAction className="flex justify-start items-center gap-4">
          <Button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior: "smooth"})}>
            CONTATE-ME
            <Icon name="ContactArrow" />
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
        </CardAction>
      </Card>
    </SectionWrapper>
  );
}
