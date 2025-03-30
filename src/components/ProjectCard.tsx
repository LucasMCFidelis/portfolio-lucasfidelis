import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/IconWrapper";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import React from "react";
import { ProjectCardProps } from "@/interfaces/ProjectCardProps";

export default function ProjectCard({
  title,
  description,
  year,
  area,
  urlGitHub,
}: ProjectCardProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <article className="w-full flex flex-col justify-between items-center lg:flex-row lg:items-start lg:gap-20 lg:pl-20">
      <Carousel
        className="w-[60vw] md:max-w-80 lg:max-w-2xl xl:max-w-3xl"
        setApi={setApi}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </Carousel>
      <Card className="bg-transparent border-none w-full flex justify-between">
        <CardHeader>
          <CardTitle><h3>{title}</h3></CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-3 sm:space-y-5">
          <h4 className="uppercase">Informações do Projeto</h4>
          <Separator />
          <div className="flex justify-between items-center">
            <p>Ano</p>
            <p>{year}</p>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <p>Área</p>
            <p>{area}</p>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="max-w-full flex flex-wrap gap-x-2">
          {urlGitHub.length === 1 ? (
            <a
              href={urlGitHub[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="has-[>svg]:pl-0">
                VER NO GITHUB
                <Icon name="GitHub" />
              </Button>
            </a>
          ) : (
            urlGitHub.map((repo, index) => (
              <a
                key={index}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="link" className="has-[>svg]:pl-0">
                  {repo.name || `VER NO GITHUB ${index + 1}`}
                  <Icon name="GitHub" />
                </Button>
              </a>
            ))
          )}
        </CardFooter>
      </Card>
    </article>
  );
}
