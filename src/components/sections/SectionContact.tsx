import { Icon } from "../IconWrapper";
import SectionWrapper from "../SectionWrapper";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SectionContact() {
  return (
    <SectionWrapper>
      <Card className="bg-transparent border-none w-full lg:w-3/5">
        <CardHeader className="p-0">
          <CardTitle><h2>Conecte-se a mim</h2></CardTitle>
          <CardDescription>
            Entre em contato comigo pelo e-mail:
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Button variant={"link"} className="lowercase">lucasm241301@gmail.com</Button>
        </CardContent>
        <CardFooter className="p-0">
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
        </CardFooter>
      </Card>
    </SectionWrapper>
  );
}
