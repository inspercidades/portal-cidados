"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SectionCoverProps {
  title: string | React.ReactNode;
  image: StaticImageData | string;
  image2?: StaticImageData | string;
  image3?: StaticImageData | string;
  image4?: StaticImageData | string;
  image2Mobile?: StaticImageData | string;
  image3Mobile?: StaticImageData | string;
  image4Mobile?: StaticImageData | string;
  imageAlt: string;
  grayscaleOpacity?: number;
  titleOpacity?: number;
  currentImageIndex?: number;
  sticky?: boolean;
}

export function SectionCover({
  title,
  image,
  image2,
  image3,
  image4,
  image2Mobile,
  image3Mobile,
  image4Mobile,
  imageAlt,
  grayscaleOpacity = 0,
  titleOpacity = 1,
  currentImageIndex = 0,
  sticky = true,
}: SectionCoverProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const images = [image, image2, image3, image4].filter(
    (img): img is StaticImageData | string => img !== undefined,
  );

  // Usar imagem mobile quando estiver em mobile
  const getImageForIndex = (index: number) => {
    if (index === 1 && isMobile && image2Mobile) {
      return image2Mobile;
    }
    if (index === 2 && isMobile && image3Mobile) {
      return image3Mobile;
    }
    if (index === 3 && isMobile && image4Mobile) {
      return image4Mobile;
    }
    return images[index];
  };

  return (
    <div
      className="w-full h-screen overflow-hidden"
      style={{
        position: sticky ? "sticky" : "relative",
        top: sticky ? 0 : "auto",
        zIndex: sticky ? 0 : "auto",
        WebkitTransform: "translateZ(0)", // Force hardware acceleration
        transform: "translateZ(0)",
      }}
    >
      {/* Renderizar todas as imagens com opacidade controlada */}
      {images.map((_img, index) => {
        const imageToUse = getImageForIndex(index);
        const imageSrc =
          typeof imageToUse === "string" ? imageToUse : imageToUse.src;
        return (
          <div
            key={`image-${index}-${imageSrc}`}
            className="absolute inset-0"
            style={{
              filter:
                index === 0 ? `grayscale(${grayscaleOpacity * 100}%)` : "none",
              opacity: currentImageIndex === index ? 1 : 0,
              transition:
                "filter 1000ms ease-in-out, opacity 1000ms ease-in-out",
              zIndex: currentImageIndex === index ? 1 : 0,
            }}
          >
            <Image
              src={imageToUse}
              alt={imageAlt}
              fill
              className="object-cover"
              style={{
                objectPosition: "center",
              }}
              priority={index === 0}
            />
          </div>
        );
      })}

      {/* Título */}
      <div className="relative z-10 h-full flex items-center pl-6 md:pl-20 lg:pl-24">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl"
          style={{
            color: "#E50505",
            opacity: titleOpacity,
            transition: "opacity 500ms ease-in-out",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
