import { Fullscreen } from "@mui/icons-material";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ImageDTO } from "@/data/images/imageDTO";

import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ProjectCarouselFullProps {
  images: Array<ImageDTO>;
  title: string;
}

export function ProjectCarouselFull({
  images,
  title,
}: ProjectCarouselFullProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Open fullscreen carrousel"
          className="absolute top-0 -right-14 z-20 hidden md:block"
        >
          <Fullscreen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-full h-full p-0">
        <DialogHeader className="hidden">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Carousel>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="aspect-video">
                <Card className="h-full py-0">
                  <CardContent className="relative w-full h-11/12 overflow-hidden">
                    {image ? (
                      <Image
                        src={image.url}
                        fill
                        className="rounded-xl object-contain"
                        alt={image.title}
                      />
                    ) : (
                      <span className="text-4xl font-semibold">?</span>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 z-20" />
          <CarouselNext className="right-4 z-20" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
