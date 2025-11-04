"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ImageDTO } from "@/data/images/imageDTO";

import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ProjectCarouselFull } from "./ProjectCarouselFull";

export function ProjectCardCarousel({ images }: { images: Array<ImageDTO> }) {
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
    <Carousel
      className="relative w-4/5 lg:w-[30vw] xl:w-[40vw]"
      setApi={setApi}
    >
      <ProjectCarouselFull images={images} title="Teste" />
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div>
              <Card className="py-0">
                <CardContent className="relative w-full h-full overflow-hidden aspect-square">
                  {image ? (
                    <Image
                      src={image.url}
                      fill
                      className={`rounded-xl ${
                        image.mobileScreen ? "object-contain" : "object-cover"
                      }`}
                      alt={image.title}
                    />
                  ) : (
                    <span className="text-4xl font-semibold">?</span>
                  )}
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
  );
}
