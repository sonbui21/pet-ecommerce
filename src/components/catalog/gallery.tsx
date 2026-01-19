"use client";

import { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Image as ImageProps } from "@/lib/types/catalog";

const Lightbox = dynamic(() => import("yet-another-react-lightbox").then((mod) => mod.default), {
  ssr: false,
  loading: () => null,
});

export function Gallery({ images }: { images: ImageProps[] }) {
  const [id, setId] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeImage = useMemo(() => {
    return images[activeIndex] || images[0];
  }, [images, activeIndex]);

  const handleImageClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setId(activeIndex);
    },
    [activeIndex]
  );

  const handleThumbnailClick = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setActiveIndex(index);
    },
    []
  );

  const handleCloseLightbox = useCallback(() => {
    setId(null);
  }, []);

  return (
    <>
      <div className='tab-content' id='myTabContent'>
        <div className='tab-pane show active' role='tabpanel' id='gallery-active-image'>
          <div className='cursor-pointer' onClick={handleImageClick}>
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={1000}
              height={1000}
              priority={activeIndex === 0}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px'
              quality={75}
              loading='eager'
            />
          </div>
        </div>
      </div>

      <ul className='nav nav-tabs flex justify-center' id='myTab' role='tablist'>
        {images.map((item, index) => (
          <li key={item.src} className='nav-item' role='presentation'>
            <button
              className={index === activeIndex ? "nav-link active" : "nav-link"}
              type='button'
              role='tab'
              aria-controls='gallery-active-image'
              aria-selected={index === activeIndex}
              onClick={handleThumbnailClick(index)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={100}
                height={100}
                loading='lazy'
                sizes='100px'
                className='object-cover'
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        slides={images}
        open={id !== null}
        index={id ?? 0}
        close={handleCloseLightbox}
        styles={{ container: { background: "rgba(0,0,0,0.75)" } }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
