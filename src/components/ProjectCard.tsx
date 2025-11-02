"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Icon, IconName} from "@/components/IconWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { ProjectDTO } from "@/data/projects/projectDTO";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";

interface LinkInProjectCartProps {
  iconKey: IconName;
  href: string;
  title: string;
}

function LinkInProjectCart({ href, iconKey, title }: LinkInProjectCartProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "first-letter:uppercase",
        buttonVariants({ variant: "link" })
      )}
    >
      {title}
      <Icon name={iconKey} />
    </Link>
  );
}

export default function ProjectCard({
  title,
  description,
  yearDevelopment,
  typeProject,
  repositoryUrl,
  deploymentUrl,
  documentationUrl,
  images,
}: ProjectDTO) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
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
          {images.length > 0 ? (
            images.map((image, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card className="py-0">
                    <CardContent className="relative w-full h-full overflow-hidden aspect-square">
                      {image ? (
                        <Image
                          src={image.url}
                          fill
                          className={
                            `rounded-xl ${image.mobileScreen
                              ? "object-contain"
                              : "object-cover"}`
                          }
                          alt={image.title}
                        />
                      ) : (
                        <span className="text-4xl font-semibold">?</span>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <Card className="py-0 overflow-hidden rounded-xl">
                <CardContent className="aspect-square flex items-center justify-center p-0 text-muted-foreground">
                  <span className="text-lg">Nenhuma imagem disponível</span>
                </CardContent>
              </Card>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </Carousel>
      <Card className="bg-transparent border-none w-full flex justify-between">
        <CardHeader>
          <CardTitle>
            <h3>{title}</h3>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-3 sm:space-y-5">
          <h4 className="uppercase">Informações do Projeto</h4>
          <Separator />
          <div className="flex justify-between items-center">
            <p>Ano</p>
            <p>{yearDevelopment}</p>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <p>Área</p>
            <p className="first-letter:uppercase">
              {typeProject === "qa" ? "Quality Assurance (QA)" : typeProject}
            </p>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="max-w-full flex flex-wrap gap-x-2">
          <LinkInProjectCart
            iconKey={"GitHub"}
            href={repositoryUrl}
            title={"Repositório"}
          />
          {deploymentUrl && (
            <LinkInProjectCart
              iconKey={"Link"}
              href={deploymentUrl}
              title={"Deploy"}
            />
          )}
          {documentationUrl && (
            <LinkInProjectCart
              iconKey={"Folder"}
              href={documentationUrl}
              title={"Documentação"}
            />
          )}
        </CardFooter>
      </Card>
    </article>
  );
}
