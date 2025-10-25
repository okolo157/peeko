"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageModal from "../components/ImageModal";

import { photos } from "@/utils/photos";

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Gyroscope effect for mobile
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const gamma = event.gamma || 0;
      const beta = event.beta || 0;

      const tiltX = Math.max(-8, Math.min(8, beta / 10));
      const tiltY = Math.max(-8, Math.min(8, gamma / 10));

      cardRefs.current.forEach((card) => {
        if (card && window.innerWidth < 1024) {
          // Only on mobile/tablet
          card.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
        }
      });
    };

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      "requestPermission" in DeviceOrientationEvent
    ) {
      (
        DeviceOrientationEvent as unknown as {
          requestPermission: () => Promise<string>;
        }
      )
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  const handleTap = (index: number) => {
    setTappedIndex(index);
    setTimeout(() => setTappedIndex(null), 400);
  };

  const handleImageClick = (photo: (typeof photos)[0]) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const shuffledPhotos = useMemo(() => {
  // Create a copy of the array to avoid mutating the original
  const photosCopy = [...photos];
  for (let i = photosCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photosCopy[i], photosCopy[j]] = [photosCopy[j], photosCopy[i]];
  }
  return photosCopy;
}, [photos]);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-[95vw] mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="mb-12 md:mb-16 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-4">
              <span
                className="font-bold"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                GALLERY
              </span>
            </h1>
            <p
              className="text-zinc-400 text-lg md:text-xl tracking-wide max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-waiting-for-the-sunrise)" }}
            >
              A curated collection of visual stories
            </p>
          </div>

          {/* Full Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {shuffledPhotos.map((photo, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`group relative aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer transition-all duration-200 ease-out ${
                  tappedIndex === index ? "scale-95" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
                onTouchStart={() => handleTap(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handleImageClick(photo)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                    <div className="w-12 h-12 mx-auto border border-white/50 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Image Modal */}
      {selectedPhoto && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          photo={selectedPhoto}
        />
      )}
    </div>
  );
}


